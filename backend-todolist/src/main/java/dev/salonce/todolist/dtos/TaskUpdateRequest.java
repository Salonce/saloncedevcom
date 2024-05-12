package dev.salonce.todolist.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class TaskUpdateRequest {
    private String description;
    private Boolean stateSwitch;
}
