package com.Easeat.data.Controllers;

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

import com.Easeat.data.Entity.Post;
import com.Easeat.data.services.PostService;

@CrossOrigin(origins = "http://localhost")
@RestController
@RequestMapping("/api/posts")
public class PostControllers {
    private PostService postService;

    @Autowired
    public PostControllers(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public Post addPost(@RequestBody Post post) {
        post.setId(0); // id 0 สำหรับการสร้างโพสต์ใหม่
        return postService.save(post);
    }

    @GetMapping
    public List<Post> getAllPost() {
        return postService.findAll(); // ดึงข้อมูลโพสต์ทั้งหมด
    }

    // แก้ไขพาธจาก "userid}" เป็น "/posts/{id}"
    @GetMapping("/posts/{id}")
    public Post getPost(@PathVariable int id) {
        Post myPost = postService.findById(id); // ค้นหาโพสต์ตาม id
        if (myPost == null) {
            throw new RuntimeException("ไม่พบโพสต์ที่ต้องการ");
        }
        return myPost;
    }

    @DeleteMapping("/posts/{id}")
    public String deletePost(@PathVariable int id) {
        Post myPost = postService.findById(id); // ค้นหาโพสต์ตาม id
        if (myPost == null) {
            throw new RuntimeException("ไม่พบโพสต์ที่ต้องการลบ");
        }
        postService.deleteById(id); // ลบโพสต์
        return "โพสต์ถูกลบแล้ว"; // แสดงข้อความยืนยัน
    }

    @PutMapping("/posts")
    public Post updatePost(@RequestBody Post post) {
        return postService.save(post); // อัพเดตข้อมูลโพสต์
    }
}
