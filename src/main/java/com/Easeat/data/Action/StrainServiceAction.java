package com.Easeat.data.Action;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Easeat.data.repository.StrainRepository;
import com.Easeat.data.Entity.Strain;
import com.Easeat.data.repository.StrainRepository;
import com.Easeat.data.services.StrainService;

@Service
public class StrainServiceAction implements StrainService {
    private final StrainRepository strainRepository;

    @Autowired
    public StrainServiceAction(StrainRepository strainRepository) {
        this.strainRepository = strainRepository;
    }

    @Override
    public Strain save(Strain strain) {
        strain.setDate(LocalDateTime.now());
        return strainRepository.save(strain);
    }

    @Override
    public List<Strain> findAll() {
        return strainRepository.findAll();
    }

    @Override
    public Strain findById(Integer id) {
        return strainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ไม่พบข้อมูล ID: " + id));
    }

    @Override
    public void deleteById(Integer id) {
        strainRepository.deleteById(id);
    }


}
