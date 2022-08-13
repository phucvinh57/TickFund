package com.tickfund.TFService.controllers;


import com.tickfund.TFService.services.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AttachmentService attachmentService;

    @GetMapping("/file")
    @ResponseBody
    public Map<String, Object> getTransactionById(@RequestParam Integer code)  {
        Map<String, Object> response = new HashMap<>();
        response.put("message", attachmentService.authenticateCode(code));
        return response;
    }
}
