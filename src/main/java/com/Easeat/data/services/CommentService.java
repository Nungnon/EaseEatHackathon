package com.Easeat.data.services;

import java.util.List;

import com.Easeat.data.Entity.Comment;

public interface CommentService {
    Comment save(Comment comment);
     List<Comment> findAll();
     Comment findById(Integer id);
     void deleteById(Integer id);
     List<Comment> findByPostId(Integer postId);
}
