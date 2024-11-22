package com.Easeat.data.services;

import java.util.List;

import com.Easeat.data.Entity.Bmr;

public interface BmrService {
    Bmr save(Bmr bmr);
    List<Bmr> findAll();
    Bmr findById(Integer id);
    void deleteById(Integer id);
}
