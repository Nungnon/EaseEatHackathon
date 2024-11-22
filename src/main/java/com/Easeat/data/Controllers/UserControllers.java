package com.Easeat.data.Controllers;

import org.springframework.web.bind.annotation.RestController;

import com.Easeat.data.Entity.Bmr;
import com.Easeat.data.Entity.Strain;
import com.Easeat.data.Entity.User;
import com.Easeat.data.repository.BmrRepository;
import com.Easeat.data.repository.StrainRepository;
import com.Easeat.data.repository.UserRepository;
import com.Easeat.data.services.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.MediaType;

import com.Easeat.data.DTO.UserLoginRequest;
import com.Easeat.data.DTO.UserRegisterRequest;

@CrossOrigin(origins = "http://localhost")
@RestController
@RequestMapping("/api/users")
public class UserControllers {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StrainRepository strainRepository;

    @Autowired
    private BmrRepository bmrRepository;

    @Autowired
    public UserControllers(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterRequest request) {
        try {
            boolean isRegistered = userService.registerUser(request.getUsername(), request.getName(),
                    request.getPassword());
            if (isRegistered) {
                return ResponseEntity.ok("ลงทะเบียนสำเร็จ!");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ลงทะเบียนล้มเหลว!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("เกิดข้อผิดพลาด: " + e.getMessage());
        }
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest request) {
        try {
            User user = userService.findByUsername(request.getUsername());
            if (user == null || !user.getPassword().equals(request.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
            }

            // สร้าง DTO สำหรับส่งข้อมูลกลับ
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getusername());
            response.put("name", user.getName());

            return ResponseEntity.ok(response); // ส่งเฉพาะข้อมูลที่ต้องการในรูป JSON
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("เกิดข้อผิดพลาด: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    public List<User> getAllUser() {
        return userService.findAll();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable("userId") Integer userId) {
        System.out.println("Fetching userId: " + userId); // เพิ่ม Log เพื่อตรวจสอบค่า userId
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOpt.get();

        List<Strain> strainHistory = strainRepository.findByUserIdStrain(userId);

        List<Bmr> bmrHistory = bmrRepository.findByUserId(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("strainHistory", strainHistory);
        response.put("bmrHistory", bmrHistory);
        // ส่งข้อมูล JSON กลับไป
        return ResponseEntity.ok(response);
    }

    

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable int id) {
        User myUser = userService.findById(id);
        if (myUser == null) {
            throw new RuntimeException("เกิดข้อผิดพลาดในกระบวนการทำงาน");
        }
        userService.deleteById(id);
        return "ลบข้อมูลแล้ว";
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        return userService.save(user);
    }

}
