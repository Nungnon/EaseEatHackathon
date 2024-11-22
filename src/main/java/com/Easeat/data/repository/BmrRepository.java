package com.Easeat.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Easeat.data.Entity.Bmr;
import java.util.List;

public interface BmrRepository extends JpaRepository<Bmr, Integer> {
    // ค้นหาประวัติ BMR ตาม userId
    List<Bmr> findByUserId(Integer userId);  // แก้จาก findByUserIdBmr เป็น findByUserId
}
