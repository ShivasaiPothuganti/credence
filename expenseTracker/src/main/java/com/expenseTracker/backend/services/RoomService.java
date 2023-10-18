package com.expenseTracker.backend.services;

import com.expenseTracker.backend.entities.RoomEntity;
import com.expenseTracker.backend.entities.TransactionEntity;
import com.expenseTracker.backend.entities.UserRoomsEntity;
import com.expenseTracker.backend.repositories.RoomsRepository;
import com.expenseTracker.backend.repositories.UserRoomsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.Optional;

@Service
public class RoomService {

    private RoomsRepository roomsRepository;
    private UserRoomsRepository userRoomsRepository;

    private TransactionService transactionService;

    @Autowired
    public RoomService(RoomsRepository roomsRepository,UserRoomsRepository userRoomsRepository, TransactionService transactionService){
        this.roomsRepository = roomsRepository;
        this.userRoomsRepository = userRoomsRepository;
        this.transactionService = transactionService;
    }


    // create a room
    @Transactional
    public RoomEntity createRoom(RoomEntity room,Long userId) {
        room.setExpenditure(0.0);
        RoomEntity savedRoom = roomsRepository.save(room);
        System.out.println(room);
        UserRoomsEntity userRoomsEntity = new UserRoomsEntity();
        userRoomsEntity.setUserId(userId);
        userRoomsEntity.setRoomId(room.getRoomId());
        userRoomsRepository.save(userRoomsEntity);
        return savedRoom;
    }

    // add user to a room
    @Transactional
    public void addUserToRoom(UserRoomsEntity userRoomsEntity) throws Exception {
        Optional<UserRoomsEntity> result = userRoomsRepository.findByRoomIdAndUserId(userRoomsEntity.getRoomId(),userRoomsEntity.getUserId());
        System.out.println("this is result "+result);
        if(result.isPresent()){
            throw new Exception("user already belongs to the room");
        }
        else {
            userRoomsRepository.save(userRoomsEntity);
        }
    }

    @Transactional
    public void deleteRoomTransaction(long roomId, long transactionId){
        Optional<TransactionEntity> optionalTransaction = transactionService.getTransactionById(transactionId);
        TransactionEntity transactionEntity = optionalTransaction.get();
        roomsRepository.removeExpenditureById(roomId, transactionEntity.getPrice());
        transactionService.deleteTransactionById(transactionId);
    }

    @Transactional
    public void deleteUserFromRoom(UserRoomsEntity userRoomsEntity){
        userRoomsRepository.delete(userRoomsEntity);
    }

    @Transactional
    public void refreshExpenditure(UserRoomsEntity userRooms) throws Exception {
    	Optional<UserRoomsEntity> savedUserRooms = userRoomsRepository.findByRoomIdAndUserId(userRooms.getRoomId(),userRooms.getUserId());
    	if(savedUserRooms.isEmpty())
    		throw new Exception("Room with id "+userRooms.getRoomId()+" does not belong to userId "+userRooms.getUserId());
    	else
    		roomsRepository.refreshExpenditure(userRooms.getRoomId());
    }

}
