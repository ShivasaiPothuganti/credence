package com.expenseTracker.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name="groups")
public class GroupEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="group_id")
    private Long groupId;

    @Column(name="group_title")
    private String groupTitle;

    @Column(name="owner_id")
    private Long ownerId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id",referencedColumnName = "id",insertable = false,updatable = false)
    private UserEntity user;

    @Column(name="created_on")
    private LocalDateTime createdOn;

    @Column(name="total_price")
    private Long totalPrice;


}
