package com.Easeat.data.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.Easeat.data.repository.StrainRepository;
import com.Easeat.data.Entity.Strain;

@Repository
public interface StrainRepository extends JpaRepository<Strain, Integer> {
    // ถ้าคุณต้องการค้นหาหลายๆ ค่า
    @Query("SELECT s FROM Strain s WHERE s.user.id = :userId")
    List<Strain> findByUserIdStrain(@Param("userId") int userId);

    // ฟังก์ชันนี้ต้องใช้ในกรณีที่ต้องการค่าผลลัพธ์เดี่ยว
    Optional<Strain> findByUserId(int userId);  // คืนค่า Optional<Strain>
}
