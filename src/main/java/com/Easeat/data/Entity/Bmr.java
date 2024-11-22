package com.Easeat.data.Entity;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.Easeat.data.jackson.LocalDateTimeDeserializer;
import com.Easeat.data.jackson.LocalDateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@CrossOrigin(origins = "http://localhost")
@Entity
@Table(name = "Bmr")

public class Bmr {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String bmr;
    private int count;
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "user_id_bmr")
    @JsonBackReference
    private User user;

    public Bmr() {
    }

    public Bmr(int id, String bmr, LocalDateTime date) {
        this.id = id;
        this.bmr = bmr;
    }

    public Bmr(int id, String bmr, User user, LocalDateTime date) {
        this.id = id;
        this.bmr = bmr;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBmr() {
        return bmr;
    }

    public void setBmr(String bmr) {
        this.bmr = bmr;
    }

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

}
