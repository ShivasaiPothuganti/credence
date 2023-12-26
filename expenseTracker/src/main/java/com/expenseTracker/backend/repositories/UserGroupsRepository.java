package com.expenseTracker.backend.repositories;

import com.expenseTracker.backend.entities.GroupEntity;
import com.expenseTracker.backend.entities.UserGroupsEntity;
import com.expenseTracker.backend.models.GroupTransactionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserGroupsRepository extends JpaRepository<UserGroupsEntity,Long> {

    Optional<UserGroupsEntity> findByUserIdAndGroupId(Long userId,Long groupId);

    @Query(
            value = "select g.group_id as groupId, g.group_title as groupTitle, g.owner_id as ownerId, g.created_on as createdOn, g.total_price as totalPrice from groups g, user_groups ug where ug.user_id = :userId;",
            nativeQuery = true
    )
    List<GroupEntity> getByUserId(@Param("userId") long userId);

    List<UserGroupsEntity> findByUserId(long userId);

}
