package com.expenseTracker.backend.services;

import java.util.List;
import java.util.Optional;

import com.expenseTracker.backend.entities.RoomEntity;
import com.expenseTracker.backend.repositories.RoomsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expenseTracker.backend.entities.UserRoomsEntity;
import com.expenseTracker.backend.models.RoomUsers;
import com.expenseTracker.backend.repositories.UserRoomsRepository;

import jakarta.transaction.Transactional;

@Service
public class UserRoomsService {
	
	private UserRoomsRepository userRoomsRepository;
	private RoomsRepository roomsRepository;

	@Autowired
	public UserRoomsService(UserRoomsRepository userRoomsRepository, RoomsRepository roomsRepository) {
		this.userRoomsRepository = userRoomsRepository;
		this.roomsRepository = roomsRepository;
	}
	
	@Transactional
	public void deleteUserFromRoom(long userId,long roomId) throws Exception {
		Optional<UserRoomsEntity> userRooms = userRoomsRepository.findByRoomIdAndUserId(roomId, userId);
		if(userRooms.isPresent()) {
			userRoomsRepository.delete(userRooms.get());
		}
		else {
			throw new Exception("User with id "+userId+" does not belong to roomId "+roomId);
		}
	}
	
	public List<RoomUsers> getByRoomId(long roomId) {
		List<RoomUsers> roomUsers = userRoomsRepository.getByRoomId(roomId);
		return roomUsers;
	}

	@Transactional
	public List<RoomEntity> getRoomsOfUser(Long userId) {
		List<RoomEntity> roomsList = roomsRepository.findByUserId(userId);
		return roomsList;
	}

}
