package com.expenseTracker.backend.models;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface GroupIndTransactionModel {
    @Value("#{target.transactionId}")
    Long getTransactionId();


    @Value("#{target.description}")
    String getDescription();

    @Value("#{target.price}")
    Double getPrice();

    @Value("#{target.title}")
    String getTitle();

    @Value("#{target.username}")
    String getUsername();

    @Value("#{target.date_of_transaction}")
    LocalDateTime getDateOfTransaction();

    @Value("#{target.created_on}")
    LocalDateTime getCreated_on();
}
