package com.Easeat.data.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Easeat.data.Entity.Comment;
import com.Easeat.data.services.CommentService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost") // Adjust based on your actual client
public class CommentControllers {
    
    private CommentService commentService;

    @Autowired
    public CommentControllers(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/comment")
    public Comment addComment(@RequestBody Comment comment) {
        comment.setId(0); // Ensure we are creating a new comment, not updating
        return commentService.save(comment);
    }

    @GetMapping("/comment")
    public List<Comment> getAllComments() {
        return commentService.findAll(); // Retrieves all comments
    }

    @GetMapping("/comment/{id}")
    public Comment getComment(@PathVariable int id) {
        Comment comment = commentService.findById(id);
        if (comment == null) {
            throw new RuntimeException("Comment not found for id: " + id);
        }
        return comment;
    }

    @DeleteMapping("/comment/{id}")
    public String deleteComment(@PathVariable int id) {
        Comment comment = commentService.findById(id);
        if (comment == null) {
            throw new RuntimeException("Comment not found for id: " + id);
        }
        commentService.deleteById(id);
        return "Comment deleted successfully";
    }

    @PutMapping("/comment")
    public Comment updateComment(@RequestBody Comment comment) {
        return commentService.save(comment);
    }

    @GetMapping("/comment/all/{post_id}")
    public List<Comment> getCommentsByPostId(@PathVariable("post_id") Integer postId) {
        return commentService.findByPostId(postId); // เรียกใช้ commentService เพื่อดึงความคิดเห็นตาม postId
    }

}
