package com.todo.app.ToDo.model;

import java.util.Date;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="ToDo")
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class ToDo {
    @Id
    private String id;

    @NotBlank
    @Size(max=100)
    @Indexed(unique=true)
    private String title;

    private Boolean completed = false;

    private Date createdAt = new Date();

    @Override
    public String toString() {
        return String.format(
                "Todo[id=%s, title='%s', completed='%s']",
                id, title, completed);
    }
}
