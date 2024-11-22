package com.Easeat.data.services;

import com.Easeat.data.Entity.User;
import java.util.List;

public interface UserService {
    User save(User user);

    List<User> findAll();

    User findById(Integer id);

    void deleteById(Integer id);

    boolean registerUser(String username, String name, String password);

    // ตรวจสอบว่า username มีอยู่ในฐานข้อมูลแล้วหรือไม่
    boolean isUsernameTaken(String username);

    // ค้นหาผู้ใช้ตาม username
    User findByUsername(String username);
}
