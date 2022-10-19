package com.group3.batch24.model;


import javax.persistence.Column;
//import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data 
@Entity
@Table(name="students")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "middle_name")
	private String middleName;

	@Column(name = "last_name")
	private String lastName;


	@Column(name = "age")
	private Integer age;
	
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "zip")
	private Integer zip;
	
	@Column(name = "city")
	private String city;
	
	@Column(name = "region")
	private String region;
	
	@Column(name = "province")
	private String province;
	
	@Column(name = "phone_num")
	private Long phone_num;
	
	@Column(name = "mob_num")
	private Long mob_num;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "yr_lvl")
	private String yr_lvl;

	
	@Column(name = "section")
	private String section;
	
	public Student() {
		super();
	
	}


	public Student(long id, String firstName, String middleName, String lastName, Integer age, String address, Integer zip, String city, String region, String province, Long phone_num, Long mob_num, String email, String yr_lvl, String section) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.age = age;
		this.address = address;
		this.zip = zip;
		this.city = city;
		this.region = region;
		this.province = province;
		this.phone_num = phone_num;
		this.mob_num = mob_num;
		this.email = email;
		this.yr_lvl = yr_lvl;
		this.section = section;
	}

	public long getId() {
	return id;
}


public void setId(long id) {
	this.id = id;
}



public Integer getAge() {
	return age;
}


public void setAge(Integer age) {
	this.age = age;
}


public String getAddress() {
	return address;
}


public void setAddress(String address) {
	this.address = address;
}


public Integer getZip() {
	return zip;
}


public void setZip(Integer zip) {
	this.zip = zip;
}


public String getCity() {
	return city;
}


public void setCity(String city) {
	this.city = city;
}


public String getRegion() {
	return region;
}


public void setRegion(String region) {
	this.region = region;
}


public String getProvince() {
	return province;
}


public void setProvince(String province) {
	this.province = province;
}


public Long getPhone_num() {
	return phone_num;
}


public void setPhone_num(Long phone_num) {
	this.phone_num = phone_num;
}


public Long getMob_num() {
	return mob_num;
}


public void setMob_num(Long mob_num) {
	this.mob_num = mob_num;
}


public String getEmail() {
	return email;
}


public void setEmail(String email) {
	this.email = email;
}


public String getYr_lvl() {
	return yr_lvl;
}


public void setYr_lvl(String yr_lvl) {
	this.yr_lvl = yr_lvl;
}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

	@Override
	public String toString() {
		return "Student{" +
				"id=" + id +
				", firstName='" + firstName + '\'' +
				", middleName='" + middleName + '\'' +
				", lastName='" + lastName + '\'' +
				", age=" + age +
				", address='" + address + '\'' +
				", zip=" + zip +
				", city='" + city + '\'' +
				", region='" + region + '\'' +
				", province='" + province + '\'' +
				", phone_num=" + phone_num +
				", mob_num=" + mob_num +
				", email='" + email + '\'' +
				", yr_lvl=" + yr_lvl +
				", section='" + section + '\'' +
				'}';
	}
}
