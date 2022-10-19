package com.group3.batch24.service;

import java.util.List;
// import java.util.Optional;

import com.group3.batch24.model.Student;
import org.springframework.data.domain.Page;

public interface StudentService {

	//ito ay pag save ng data using PostMapping
		Student saveStudent(Student student);

		Page<Student> getAllStudents(int offSet);

		List<Student> getAll();
	
		Student getStudentByID(long id);

		Student updateStudent (Student student, long id);
		
		void deleteStudent(long id);

		Page<Student> getAllStud(String section, String yr_lvl, int offSet);

		Page<Student> getStudentsWithSorting(int offSet, String field);

		Page<Student> getStudentsWithPagination(int offSet);

		Page<Student> getAgeBracket(int minAge, int maxAge, int offSet);

		Page<Student> getSearchNow(String search, int offSet);
}
