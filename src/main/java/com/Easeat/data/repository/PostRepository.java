package com.Easeat.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Easeat.data.Entity.Post;

public interface PostRepository extends JpaRepository<Post,Integer>{
    Optional<Post> findByTitle(String title);
}
