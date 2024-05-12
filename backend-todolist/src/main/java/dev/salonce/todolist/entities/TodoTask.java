package dev.salonce.todolist.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "task")
public class TodoTask {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    //private String userId;

    private String description;

    private boolean finished;
}
