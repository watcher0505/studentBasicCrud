package com.group3.batch24.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.group3.batch24.model.Student;

// import java.util.List;
// import java.util.Optional;


@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query(value = "SELECT * FROM students WHERE section = :section AND yr_lvl = :yr_lvl ORDER BY last_name", nativeQuery = true)
    Page<Student> getSortedStudentsByNamesGroupedByYearLevelAndSection(String section, String yr_lvl, Pageable pageable);

    @Query(value = "SELECT * FROM students WHERE age >= :minAge AND age <= :maxAge ORDER BY last_name", nativeQuery = true)
    Page<Student> getAgeBracket(int minAge, int maxAge, Pageable pageable);

    @Query(value = "SELECT * FROM students WHERE first_name LIKE %:search% OR middle_name LIKE %:search% OR last_name LIKE %:search% OR section LIKE %:search% OR email LIKE %:search% OR address LIKE %:search% OR province LIKE %:search% OR region LIKE %:search% OR age LIKE %:search% OR yr_lvl LIKE %:search% OR mob_num LIKE %:search% OR phone_num LIKE %:search% OR city LIKE %:search% OR zip LIKE %:search%", nativeQuery = true)
    Page<Student> getSearchNow(String search, Pageable pageable);

}
