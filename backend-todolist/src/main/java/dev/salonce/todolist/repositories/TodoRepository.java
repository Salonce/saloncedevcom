package dev.salonce.todolist.repositories;

import dev.salonce.todolist.entities.TodoTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<TodoTask, Long> {

}
