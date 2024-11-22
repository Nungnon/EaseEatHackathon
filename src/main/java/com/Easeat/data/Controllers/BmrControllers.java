package com.Easeat.data.Controllers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RestController;

import com.Easeat.data.Entity.Bmr;
import com.Easeat.data.repository.BmrRepository;
import com.Easeat.data.services.BmrService;

@CrossOrigin(origins = "http://localhost")
@RestController
@RequestMapping("/api/bmr")
public class BmrControllers {

    private final BmrService bmrService;
    private final BmrRepository bmrRepository;

    @Autowired
    public BmrControllers(BmrService bmrService, BmrRepository bmrRepository) {
        this.bmrService = bmrService;
        this.bmrRepository = bmrRepository; // ฉีด BmrRepository เข้ามา
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveBmr(@RequestBody Bmr bmr) {
    try {
        bmr.setDate(LocalDateTime.now());
        bmrRepository.save(bmr);

        // สร้าง Map สำหรับ JSON Response
        Map<String, String> response = new HashMap<>();
        response.put("message", "บันทึกข้อมูลสำเร็จ");

        return ResponseEntity.ok(response); // ส่ง Map กลับไปเป็น JSON
    } catch (Exception e) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "เกิดข้อผิดพลาด: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
}

    @GetMapping("/bmr")
    public List<Bmr> getAllbmr() {
        return bmrService.findAll();
    }

    @GetMapping("/bmr/{id}")
    public Bmr getbmr(@PathVariable int id) {
        Bmr myBmr = bmrService.findById(id);
        if (myBmr == null) {
            throw new RuntimeException("เกิดข้อผิดพลาดในกระบวนการทำงาน");
        }
        return myBmr;
    }

    @DeleteMapping("/bmr/{id}")
    public String deletebmr(@PathVariable int id) {
        Bmr myBmr = bmrService.findById(id);
        if (myBmr == null) {
            throw new RuntimeException("เกิดข้อผิดพลาดในกระบวนการทำงาน");
        }
        bmrService.deleteById(id);
        return "ลบข้อมูลแล้ว";
    }

    @PutMapping("/bmr")
    public Bmr updatebmr(@RequestBody Bmr bmr) {
        return bmrService.save(bmr);
    }
}
