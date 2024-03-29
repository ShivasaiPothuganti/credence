package com.expenseTracker.backend.services;

import com.expenseTracker.backend.entities.BudgetEntity;
import com.expenseTracker.backend.entities.CategoriesEntity;
import com.expenseTracker.backend.repositories.CategoryRepository;

import jakarta.transaction.Transactional;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriesService {

	private CategoryRepository categoryRepository;

	@Autowired
	public CategoriesService(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	// add a category

	public void addCategory(Long userId) {
		categoryRepository.addCategory(userId);
	}


	@Transactional
	public void deleteCategories(CategoriesEntity categories){
		this.updateCategories(categories);
	}

	// update a category list
	@Transactional
	public void updateCategories(CategoriesEntity categories) {
		String[] categoriesArray = categories.getCategories().toArray(new String[categories.getCategories().size()]);
		categoryRepository.updateCategories(categories.getUserId(),categoriesArray);
	}

	public CategoriesEntity findCategoriesByUserId(Long userId) {
		return categoryRepository.findByUserId(userId);
	}

	public boolean isUserHasCategory(long userId,String category) {
		Optional<CategoriesEntity> categoryEntity=categoryRepository.isExists(userId, category);
		if(categoryEntity.isPresent())
			return true;
		else
			return false;
	}
}
