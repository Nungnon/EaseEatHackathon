package com.Easeat.data.Action;

import com.Easeat.data.Entity.User;
import com.Easeat.data.repository.UserRepository;
import com.Easeat.data.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceAction implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceAction(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ไม่พบข้อมูล: " + id));
    }

    @Override
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public boolean registerUser(String username, String name, String password) {
        if (isUsernameTaken(username)) {
            throw new IllegalArgumentException("Username นี้มีผู้ใช้งานแล้ว");
        }
        User user = new User();
        user.setusername(username);
        user.setName(name);
        user.setPassword(password); // You should encrypt the password here before saving
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean isUsernameTaken(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("ไม่พบผู้ใช้ที่ชื่อ: " + username));
    }
    
}
