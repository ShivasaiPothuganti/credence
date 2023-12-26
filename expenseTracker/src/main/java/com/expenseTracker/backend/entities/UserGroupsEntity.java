package com.expenseTracker.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="user_groups")
@Data
public class UserGroupsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id",referencedColumnName = "id",updatable = false,insertable = false)
    private UserEntity user;

    @Column(name="group_id")
    private Long groupId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="group_id",referencedColumnName = "group_id",updatable = false,insertable = false)
    private GroupEntity group;

    @Column(name="has_to_pay")
    private Long hasToPay;

}
