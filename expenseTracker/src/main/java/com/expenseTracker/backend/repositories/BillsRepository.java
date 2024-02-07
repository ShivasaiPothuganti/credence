package com.expenseTracker.backend.repositories;

import com.expenseTracker.backend.entities.BillsEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillsRepository extends JpaRepository<BillsEntity,Long> {

    List<BillsEntity> findByUserId(Long userId);

    @Transactional
    @Modifying
    @Query(
            nativeQuery = true,
            value = "UPDATE bills SET status = NOT status WHERE id = :billId"
    )
    int toggleBillStatus(@Param("billId") long billId);


    @Query(
            nativeQuery = true,
            value="select * from bills  where userid = :userId AND status=true order by expiry_date ASC limit :numberOfBills"
    )
    List<BillsEntity> getRecentActiveBills(@Param("numberOfBills") long numberOfBills,@Param("userId") long userId );

}
