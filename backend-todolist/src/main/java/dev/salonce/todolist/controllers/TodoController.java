package dev.salonce.todolist.controllers;

import dev.salonce.todolist.dtos.TaskUpdateRequest;
import dev.salonce.todolist.entities.TodoTask;
import dev.salonce.todolist.services.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:80", "http://localhost:3000", "http://saloncedevcom-frontend:3000"}, allowCredentials = "true")
@RequiredArgsConstructor
@RequestMapping("/todo")
public class TodoController {

    private final TodoService todoService;

    @PostMapping("/task")
    public ResponseEntity<String> postRequest(@RequestBody TodoTask todoTask){
        todoService.saveTodoTask(todoTask);
        return ResponseEntity.ok("Request processed successfully");
    }

    @GetMapping("/task")
    public ResponseEntity<List<TodoTask>> getTaskList(){
        return ResponseEntity.ok(todoService.getTasks());
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id){
        todoService.deleteTask(id);
        return ResponseEntity.ok("Request processed successfully");
    }

    @PatchMapping("/task/{id}")
    public ResponseEntity<String> switchTaskState(@PathVariable Long id, @RequestBody TaskUpdateRequest taskUpdateRequest){
        if (taskUpdateRequest.getStateSwitch() == true)
            todoService.switchTaskState(id);
        return ResponseEntity.ok("Request processed successfully");
    }
}
