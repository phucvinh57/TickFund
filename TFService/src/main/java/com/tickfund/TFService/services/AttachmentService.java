package com.tickfund.TFService.services;

import com.tickfund.TFService.entities.tickfund.AttachmentEntity;
import com.tickfund.TFService.entities.tickfund.TransactionEntity;
import com.tickfund.TFService.repositories.tickfund.AttachmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.swing.Timer;
import java.util.*;

@Service
public class AttachmentService {

    @Value("${tickfund.attacment.code.expiration}")
    Integer CODE_EXPIRATION_TIME;

    @Value("${tickfund.attacment.pending.file.expiration}")
    Integer PENDING_EXPIRATION_TIME;
    Map<String, AttachmentEntity> pendingAttachment = Collections.synchronizedMap(new HashMap<>());
    Set<Integer> codeSet = Collections.synchronizedSet(new HashSet<>());
    @Autowired
    AttachmentRepository attachmentRepository;

    public boolean isPendingFileExist(String id){
        return pendingAttachment.keySet().contains(id);
    }

    public void addPendingFile(AttachmentEntity attachmentEntity){
        this.pendingAttachment.put(attachmentEntity.getID(), attachmentEntity);
        Timer timer = new Timer(PENDING_EXPIRATION_TIME, (event) -> {
            this.pendingAttachment.remove(attachmentEntity.getID());
        });
        timer.start();
    }

    public AttachmentEntity createAttachment(String pendingAttachId, TransactionEntity transactionEntity){
        AttachmentEntity attachmentEntity = this.pendingAttachment.get(pendingAttachId);
        attachmentEntity.setTransactionEntity(transactionEntity);
        this.pendingAttachment.remove(pendingAttachId);
        return attachmentEntity;
    }

    public AttachmentEntity getAttachmentById(String id){
        return attachmentRepository.findById(id).orElse(null);
    }

    public Integer genAuthCode(){
        final Integer MAX = 999999;
        final Integer MIN = 100000;
        Integer authCode = null;
        Random random = new Random();
        do {
            authCode = random.nextInt(MAX - MIN) + MIN;
        }
        while (this.codeSet.contains(authCode));
        this.codeSet.add(authCode);
        final Integer effectiveFinalWrapper = authCode;
        Timer timer = new Timer(CODE_EXPIRATION_TIME, (event) -> {
           this.codeSet.remove(effectiveFinalWrapper);
        });
        timer.start();
        return authCode;
    }
    public boolean authenticateCode(Integer authCode){
        return this.codeSet.contains(authCode);
    }
}
