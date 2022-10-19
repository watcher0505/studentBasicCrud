package com.group3.batch24.controller;

import java.util.List;

import com.group3.batch24.dto.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.group3.batch24.model.Student;
import com.group3.batch24.service.StudentService;




@RestController
@RequestMapping("/api/student")
@CrossOrigin
public class StudentController {


	int totalNumberOfPages = 0;

	@Autowired
	private StudentService studentService;

	public StudentController(StudentService studentService) {
		super();
		this.studentService = studentService;
	}
	
	//build create employee REST API 
	@PostMapping()
	public ResponseEntity<Student> saveStudent(@RequestBody Student student){
		return new ResponseEntity<Student>(studentService.saveStudent(student),HttpStatus.CREATED);
	}

	@GetMapping()
	public List<Student> getAllStudents(){
		return studentService.getAll();
	}


	@GetMapping("home/{offSet}")
	public List<Student> getAllStudents(@PathVariable("offSet") int offSet){
		Page<Student> studentPage = studentService.getAllStudents(offSet);
		totalNumberOfPages = studentPage.getTotalPages();
		List<Student> studentList = studentPage.getContent();
		return studentList;
	}

	@GetMapping("groupBySectionAndYearLevel/{section}/{yr_lvl}/{offSet}")
	public List<Student> getAll(@PathVariable("section") String section, @PathVariable("yr_lvl") String yr_lvl, @PathVariable("offSet") int offSet){
		Page<Student> studentPage = studentService.getAllStud(section, yr_lvl, offSet);
		totalNumberOfPages = studentPage.getTotalPages();
		List<Student> studentList = studentPage.getContent();
		return studentList;
	}

	@GetMapping("ageBracket/{minAge}/{maxAge}/{offSet}")
	public List<Student> getAgeBracker(@PathVariable("minAge") int minAge, @PathVariable("maxAge") int maxAge, @PathVariable("offSet") int offSet){
		Page<Student> studentPage = studentService.getAgeBracket(minAge, maxAge, offSet);
		totalNumberOfPages = studentPage.getTotalPages();
		List<Student> studentList = studentPage.getContent();
		return studentList;
	}

	@GetMapping("totalNumberOfPages")
	public int getTotalNumberOfPages() {
		return totalNumberOfPages;
	}

	@GetMapping("sortedBy/{offSet}/{field}")
	public List<Student> getAllSorted(@PathVariable("offSet") int offSet, @PathVariable("field") String field){
		Page<Student> studentPage = studentService.getStudentsWithSorting(offSet, field);
		totalNumberOfPages = studentPage.getTotalPages();
		List<Student> studentList = studentPage.getContent();
		return studentList;
	}

	@GetMapping("pagination/{offSet}")
	public List<Student> getAllSorted(@PathVariable("offSet") int offSet){
		Page<Student> allStudents = studentService.getStudentsWithPagination(offSet);
		totalNumberOfPages = allStudents.getTotalPages();
		List<Student> studentList = allStudents.getContent();
		return studentList;
	}

	@GetMapping("search/{offSet}/{search}")
	public List<Student> getSearch(@PathVariable("offSet") int offSet, @PathVariable("search") String search){
		Page<Student> studentPage = studentService.getSearchNow(search, offSet);
		totalNumberOfPages = studentPage.getTotalPages();
		List<Student> studentList = studentPage.getContent();
		return studentList;
	}

	@GetMapping("{id}") // {id} is a syntax to get path variable
	public ResponseEntity<Student> getStudentById(@PathVariable("id")long studentId){
		return new ResponseEntity<Student>(studentService.getStudentByID(studentId),HttpStatus.OK);
	}

	@PutMapping("{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable("id") long id
												  ,@RequestBody Student student){
		return new ResponseEntity<Student>(studentService.updateStudent(student, id), HttpStatus.OK);
		
	}
	

	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable("id") long id){
			 //delete student from db
		
		studentService.deleteStudent(id);
		
		return new ResponseEntity<String>("Student deleted Successfully",HttpStatus.OK);
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
