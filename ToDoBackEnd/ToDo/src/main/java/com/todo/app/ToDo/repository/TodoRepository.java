package com.todo.app.ToDo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.todo.app.ToDo.model.ToDo;

@Repository
public interface TodoRepository extends MongoRepository<ToDo, String> {

}
