package com.expenseTracker.backend.repositories;

import com.expenseTracker.backend.entities.BillsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillsRepository extends JpaRepository<BillsEntity,Long> {

    List<BillsEntity> findByUserId(Long userId);

    @Modifying
    @Query(
            nativeQuery = true,
            value = "UPDATE bills SET status = NOT status Where id:billId"
    )
    int toggleBillStatus(@Param("billId") long billId );

//    Integer deleteByUserIdAndId(long userId, long id);
}
