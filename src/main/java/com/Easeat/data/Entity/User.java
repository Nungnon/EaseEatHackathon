package com.Easeat.data.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String username;
    private String password;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties({"user"}) 
    private List<Strain> Strain;
    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties({"user"}) 
    private List<Bmr> Bmr;
    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties({"user"}) 
    private List<Post> Post;

    public User() {
    }

    public User(int id, String name, List<Strain> Strain, List<Bmr> Bmr, List<Post> Post) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getusername() {
        return username;
    }

    public void setusername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Strain> getStrain() {
        return Strain;
    }

    public void setStrain(List<Strain> strain) {
        Strain = strain;
    }

    public List<Bmr> getBmr() {
        return Bmr;
    }

    public void setBmr(List<Bmr> bmr) {
        Bmr = bmr;
    }

    public List<Post> getPost() {
        return Post;
    }

    public void setPost(List<Post> post) {
        Post = post;
    }

}
