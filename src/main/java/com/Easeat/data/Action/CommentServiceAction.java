package com.Easeat.data.Action;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Easeat.data.Entity.Comment;
import com.Easeat.data.repository.CommentRepository;
import com.Easeat.data.services.CommentService;

@Service
public class CommentServiceAction implements CommentService {
    
    @Autowired
    private CommentRepository commentRepository;

    @Override
    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public Comment findById(Integer id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found for id: " + id));
    }

    @Override
    public void deleteById(Integer id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Comment not found for id: " + id);
        }
    }

    // เพิ่มเมธอดสำหรับค้นหาความคิดเห็นตาม postId
    @Override
    public List<Comment> findByPostId(Integer postId) {
        return commentRepository.findByPostId(postId);
    }

}
