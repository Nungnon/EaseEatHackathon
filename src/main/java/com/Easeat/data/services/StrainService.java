package com.Easeat.data.services;

import java.util.List;
import com.Easeat.data.Entity.Strain;

public interface StrainService {
    Strain save(Strain strain); // บันทึกข้อมูลใหม่
    List<Strain> findAll(); // ดึงข้อมูลทั้งหมด
    Strain findById(Integer id); // ดึงข้อมูลตาม ID
    void deleteById(Integer id); // ลบข้อมูลตาม ID
}
