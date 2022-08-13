package com.tickfund.TFService.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tickfund.TFService.entities.AttachmentEntity;
import com.tickfund.TFService.exceptions.ResourceNotFoundException;
import com.tickfund.TFService.modules.UniqueId;
import com.tickfund.TFService.services.AttachmentService;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerErrorException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/attachments")
public class AttachmentController {
    final String FILE_SERVER_HOST = "http://localhost:6000";
    final String MESSAGE = "message";
    final String ID = "id";
    @Autowired
    AttachmentService attachmentService;

    @GetMapping("/{id}")
    public RedirectView getAttachment(@PathVariable(name = "id") String id, RedirectAttributes attributes) throws ResourceNotFoundException {
        Integer code = attachmentService.genAuthCode();
        AttachmentEntity attachmentEntity = attachmentService.getAttachmentById(id);
        if(attachmentEntity != null){
            attributes.addAttribute("code_callback", String.format("http://localhost:8081/auth/file?code=%d", code));
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl(attachmentEntity.getUrl());
            return redirectView;
        }
        else {
            throw new ResourceNotFoundException(String.format("Attachment id %s is not exist", id));
        }
    }

    @PostMapping("/upload")
    public Map uploadAttachment(@RequestParam("file") MultipartFile file){
        Map<String, Object> response = new HashMap<>();
        WebClient client = WebClient.builder()
                .baseUrl("http://localhost:6000")
                .build();

        try{
            MultipartBodyBuilder builder = new MultipartBodyBuilder();
            final String fileId = UniqueId.generate("0");

            builder.part("file", file.getResource());
            builder.part("prefix_id", fileId);
            builder.part("app_name", "tickfund");
            var fileUploadResponse = client
                .post()
                .uri("/media/upload")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(builder.build()))
                .retrieve()
                .toEntity(String.class)
                .block();
            if(fileUploadResponse.getStatusCode().is2xxSuccessful()){
                Map<String, Object> map = new ObjectMapper().readValue(fileUploadResponse.getBody(), Map.class);
                final String url = (String) map.get("url");
                AttachmentEntity attachmentEntity = new AttachmentEntity();
                attachmentEntity.setID(fileId);
                attachmentEntity.setUrl(url);

                attachmentService.addPendingFile(attachmentEntity);

                response.put(MESSAGE, "Create attachment successfully");
                response.put(ID, fileId);
                return  response;
            }
            else {
                throw new RuntimeException();
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }
    }
}