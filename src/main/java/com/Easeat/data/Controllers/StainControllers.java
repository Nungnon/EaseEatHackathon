package com.Easeat.data.Controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Easeat.data.Entity.Strain;
import com.Easeat.data.Entity.User;
import com.Easeat.data.repository.StrainRepository;
import com.Easeat.data.repository.UserRepository;
import com.Easeat.data.services.StrainService;

@CrossOrigin(origins = "http://localhost")
@RestController
@RequestMapping("/api/strain")
public class StainControllers {
    @Autowired
    private StrainService strainService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public StainControllers(StrainService strainService) {
        this.strainService = strainService;
    }

    @Autowired
    private StrainRepository strainRepository;

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveStrain(@RequestBody Strain strain) {
        try {
            // ตรวจสอบว่า User ถูกส่งมา
            User user = strain.getUser();
            if (user == null || user.getId() == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID ไม่ถูกต้อง");
            }

            // คำนวณจำนวนครั้ง (count) ที่ผู้ใช้เคยทำ
            List<Strain> strains = strainRepository.findByUserIdStrain(user.getId());
            int currentCount = strains.size(); // ใช้จำนวนรายการแทน

            // ตั้งค่า count และบันทึกข้อมูล
            strain.setCount(currentCount + 1);
            strainService.save(strain);
            return ResponseEntity.ok("บันทึกสำเร็จ");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("เกิดข้อผิดพลาด: " + e.getMessage());
        }
    }



    @GetMapping("/all")
    public ResponseEntity<List<Strain>> getAllStrains() {
        return ResponseEntity.ok(strainService.findAll());
    }

    @GetMapping("/strain")
    public List<Strain> getAllstrain() {
        return strainService.findAll();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Integer userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }   

        User user = userOpt.get();
        List<Strain> strainHistory = strainRepository.findByUserIdStrain(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("strainHistory", strainHistory);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/strain/{id}")
    public String deletestrain(@PathVariable int id) {
        Strain myStrain = strainService.findById(id);
        if (myStrain == null) {
            throw new RuntimeException("เกิดข้อผิดพลาดในกระบวนการทำงาน");
        }
        strainService.deleteById(id);
        return "ลบข้อมูลแล้ว";
    }

    @PutMapping("/strain")
    public Strain updatestrain(@RequestBody Strain strain) {
        return strainService.save(strain);
    }

}
