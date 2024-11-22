package com.Easeat.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Easeat.data.Entity.Comment;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    // เพิ่มเมธอดการค้นหาตาม postId
    List<Comment> findByPostId(Integer postId);  // ถูกต้องหรือไม่
}

