package com.tickfund.TFService.controllers;

import com.tickfund.TFService.entities.TransactionEntity;
import com.tickfund.TFService.exceptions.ResourceNotFoundException;
import com.tickfund.TFService.services.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AttachmentService attachmentService;

    @GetMapping("/file")
    @ResponseBody
    public Map getTransactionById(@RequestParam Integer code)  {
        Map<String, Object> response = new HashMap<>();
        response.put("message", attachmentService.authenticateCode(code));
        return response;
    }
}
