package com.expenseTracker.backend.repositories;

import com.expenseTracker.backend.entities.TransactionEntity;

import com.expenseTracker.backend.models.GroupIndTransactionModel;
import com.expenseTracker.backend.models.RoomTransactionModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity,Long> {
    Optional<List<TransactionEntity>> findByUserId(Long userId);

    @Query(

            value = "SELECT \n" +
                    "\tt.id as transactionId,\n" +
                    "\tt.date_of_transaction,\n" +
                    "\tt.category,\n" +
                    "\tt.created_on,\n" +
                    "\tt.description,\n" +
                    "\tt.price,\n" +
                    "\tt.title,\n" +
                    "\tu.username\n" +
                    "FROM transactions t,users u WHERE t.room_id=:roomId AND t.userid=u.id ORDER BY t.id DESC;",
            nativeQuery = true
    )
    List<RoomTransactionModel> findByRoomId(Long roomId);

    @Query(

            value = "SELECT \n" +
                    "\tt.id as transactionId,\n" +
                    "\tt.date_of_transaction,\n" +
                    "\tt.category,\n" +
                    "\tt.created_on,\n" +
                    "\tt.description,\n" +
                    "\tt.price,\n" +
                    "\tt.title,\n" +
                    "\tu.username\n" +
                    "FROM transactions t,users u WHERE t.group_id=:groupId AND t.userid=u.id ORDER BY t.id DESC;",
            nativeQuery = true
    )
    List<GroupIndTransactionModel> findByGroupId(@Param("groupId") Long groupId);

    @Query(
            value="SELECT \n" +
                    "\tt.id as transactionId,\n" +
                    "\tt.date_of_transaction,\n" +
                    "\tt.category,\n" +
                    "\tt.created_on,\n" +
                    "\tt.description,\n" +
                    "\tt.price,\n" +
                    "\tt.title,\n" +
                    "\tu.username\n" +
                    "FROM transactions t, users u WHERE t.room_id=:roomId AND t.userid = u.id AND u.username=:userName",
            nativeQuery = true
    )
    List<RoomTransactionModel> findRoomTransactionsByUserName(@Param("userName") String userName, @Param("roomId") Long roomId);

    @Query(
            value = "SELECT * FROM TRANSACTIONS WHERE userid= :userId and room_id IS NULL and group_id is NULL;",
            nativeQuery = true
    )
    List<TransactionEntity> getPersonalTransactions(@Param("userId") Long userId);
    
    @Query(
    	value = "SELECT t.id as transactionId, * FROM transactions t JOIN users u on t.userid = u.id WHERE t.room_id = :roomId and t.category = :category",
    	nativeQuery = true
    )
    List<RoomTransactionModel> getRoomTransactionsByCategory(@Param("roomId") long roomId, @Param("category") String category);

}
