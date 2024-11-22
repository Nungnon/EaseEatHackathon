package com.Easeat.data.Action;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Easeat.data.Entity.Post;
import com.Easeat.data.repository.PostRepository;
import com.Easeat.data.services.PostService;
@Service
public class PostServiceAction implements PostService{
    private PostRepository postRepository ;
    @Autowired
    public  PostServiceAction(PostRepository postRepository) {
        this.postRepository = postRepository;
    }
    @Override
    public Post save(Post post) {
        return postRepository.save(post);
    }

    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public Post findByTitle(String title) {
        Optional<Post> result = postRepository.findByTitle(title);
        Post data = null;
        if(result.isPresent()){
            data = result.get();
        } else {
            throw new RuntimeException("ไม่พบข้อมูล: " + title);
        }
        return data;
    }
    

    @Override
    public void deleteById(Integer id) {
        postRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        postRepository.deleteAll();
    }
    @Override
    public Post findById(Integer id) {
        Optional<Post> result = postRepository.findById(id);
        Post data = null;
        if(result.isPresent()){
            data = result.get();
        } else {
            throw new RuntimeException("ไม่พบข้อมูล: " + id);
        }
        return data;
    }
}


   

   