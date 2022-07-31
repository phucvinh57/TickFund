package com.tickfund.TFService.services;

import com.tickfund.TFService.entities.AttachmentEntity;
import com.tickfund.TFService.entities.TransactionEntity;
import com.tickfund.TFService.repository.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AttachmentService {
    Map<String, String> tempFile = new HashMap<>();
    @Autowired
    AttachmentRepository attachmentRepository;

    public boolean isTempExist(String id){
        return tempFile.containsKey(id);
    }

    public void removeTemp(String id){
        this.tempFile.remove(id);
    }

    public AttachmentEntity createAttachment(String id, TransactionEntity transactionEntity){
        AttachmentEntity attachmentEntity = new AttachmentEntity();
        attachmentEntity.setID(id);
        attachmentEntity.setUrl(tempFile.get(id));
        attachmentEntity.setTransactionEntity(transactionEntity);
        return attachmentEntity;
    }
}
