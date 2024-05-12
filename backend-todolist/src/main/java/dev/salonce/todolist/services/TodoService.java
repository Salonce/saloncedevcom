package dev.salonce.todolist.services;

import dev.salonce.todolist.entities.TodoTask;
import dev.salonce.todolist.repositories.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    public void saveTodoTask(TodoTask todoTask){
        todoRepository.save(todoTask);
    }

    public List<TodoTask> getTasks(){
        return todoRepository.findAll();
    }

    public void deleteTask(Long id){
        todoRepository.deleteById(id);
    }


    public void switchTaskState(Long id){
        TodoTask todoTask = todoRepository.getReferenceById(id);
        todoTask.setFinished(!todoTask.isFinished());
        todoRepository.save(todoTask);
    }
}
