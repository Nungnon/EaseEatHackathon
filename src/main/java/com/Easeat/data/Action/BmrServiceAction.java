package com.Easeat.data.Action;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Easeat.data.Entity.Bmr;
import com.Easeat.data.services.BmrService;
import com.Easeat.data.repository.BmrRepository;

@Service
public class BmrServiceAction implements BmrService{
    @Autowired
    private BmrRepository bmrRepository ;

    @Autowired
     public BmrServiceAction(BmrRepository bmrRepository) {
         this.bmrRepository = bmrRepository;
     }
    @Override
    public Bmr save(Bmr bmr) {
        return bmrRepository.save(bmr);
    }

    @Override
    public List<Bmr> findAll() {
        return bmrRepository.findAll();
    }

    @Override
    public Bmr findById(Integer id) {
         Optional<Bmr> result = bmrRepository.findById(id);
         Bmr data=null;
        if(result.isPresent()){
            data=result.get();
        }else{
            throw new RuntimeException("ไม่พบข้อมูล"+id);
        }
        return data;
    }

    @Override
    public void deleteById(Integer id) {
        bmrRepository.deleteById(id);
    }

}
