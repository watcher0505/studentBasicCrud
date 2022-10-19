package com.group3.batch24.service.stud;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.group3.batch24.model.Student;
import com.group3.batch24.repository.StudentRepository;
import com.group3.batch24.service.StudentService;

import com.group3.batch24.exception.ResourceNotFoundException;
// import org.springframework.validation.ObjectError;


@Service
public class StudentServiceStud implements StudentService{

	private StudentRepository studentRepository;
	
	
	public StudentServiceStud(StudentRepository studentRepository) {
		super();
		this.studentRepository = studentRepository;
	}


	@Override
	public Student saveStudent(Student student) {
		// ito ay para sa postmapping save data to db
		return studentRepository.save(student);
		
	}


	@Override
	public Page<Student> getAllStudents(int offSet) {
		Page<Student> studentPage = studentRepository.findAll(PageRequest.of(offSet, 5));
		return studentPage;
	}

	@Override
	public List<Student> getAll() {
		return studentRepository.findAll();
	}

	@Override
	public Page<Student> getAllStud(String section, String yr_lvl, int offSet) {
		Page<Student> studentPage = studentRepository.getSortedStudentsByNamesGroupedByYearLevelAndSection(section, yr_lvl, PageRequest.of(offSet, 5));
		return studentPage;

	}

	@Override
	public Page<Student> getStudentsWithSorting(int offSet, String field) {
		Page<Student> students = studentRepository.findAll(PageRequest.of(offSet, 5).withSort(Sort.by(field)));
		return students;
	}

	@Override
	public Page<Student> getStudentsWithPagination(int offSet) {
		Page<Student> students = studentRepository.findAll(PageRequest.of(offSet, 5));
		return students;
	}

	@Override
	public Page<Student> getAgeBracket(int minAge, int maxAge, int offSet) {
		Page<Student> studentPage = studentRepository.getAgeBracket(minAge, maxAge, PageRequest.of(offSet, 5));
		return studentPage;
	}

	@Override
	public Page<Student> getSearchNow(String search, int offSet) {
		return studentRepository.getSearchNow(search, PageRequest.of(offSet, 5));
	}


	@Override
	public Student getStudentByID(long id) {
		Optional<Student>student= studentRepository.findById(id);
		return studentRepository.findById(id).orElseThrow(()
				-> new ResourceNotFoundException("Student", "Id", id));
		
	}


	@Override
	public Student updateStudent(Student student, long id) {
		Student existingStudent = studentRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Student","Id",id));
		
		existingStudent.setFirstName(student.getFirstName());
		existingStudent.setLastName(student.getLastName());
		existingStudent.setMiddleName(student.getMiddleName());
		existingStudent.setAddress(student.getAddress());
		existingStudent.setAge(student.getAge());
		existingStudent.setCity(student.getCity());
		existingStudent.setEmail(student.getEmail());
		existingStudent.setMob_num(student.getMob_num());
		existingStudent.setPhone_num(student.getPhone_num());
		existingStudent.setProvince(student.getProvince());
		existingStudent.setRegion(student.getRegion());
		existingStudent.setYr_lvl(student.getYr_lvl());
		existingStudent.setZip(student.getZip());

		//save existing employee to DB
		studentRepository.save(existingStudent);
		return existingStudent;

	}


	@Override
	public void deleteStudent(long id) {
		//check whether a employee exist in DB or not
				studentRepository.findById(id).orElseThrow(
						() -> new ResourceNotFoundException("Student","Id",id));
				
				studentRepository.deleteById(id);
		
	}



}
