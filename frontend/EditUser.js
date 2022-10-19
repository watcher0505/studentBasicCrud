import React, {useState, useEffect} from 'react';
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Students from './Students';
import {v4 as uuid} from 'uuid';
import {Link, useNavigate} from 'react-router-dom';



function EditUser(){
  
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [section, setSection] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [id, setId] = useState(""); // add ID to determine or pick specific user :>

  let history = useNavigate();

  let index = Students.map(function(e) {
    return e.id;
}).indexOf(id);



const handleSubmit = (e) => {
  e.preventDefault();

 let a = Students[index];
 a.firstName= firstName;
 a.middleName=middleName;
 a.lastName= lastName;
 a.age=age;
 a.yearLevel=yearLevel;
 a.section =section;
 a.city = city;
 a.contactNumber=contactNumber;
 a.email =email;
 a.zipCode= zipCode;

  history('/');
}

useEffect(() =>{
  setFirstName(localStorage.getItem('firstName'))
  setMiddleName(localStorage.getItem('middleName'))
  setLastName(localStorage.getItem('lastName'))
  setAge(localStorage.getItem('age'))
  setYearLevel(localStorage.getItem('yearLevel'))
  setSection(localStorage.getItem('section'))
  setCity(localStorage.getItem('city'))
  setContactNumber(localStorage.getItem('contactNumber'))
  setEmail(localStorage.getItem('email'))
  setZipCode(localStorage.getItem('zipCode'))
  setId(localStorage.getItem('id'))

},[])


return(
  <div>
     <Form className='d-grid gap-2' style={{margin: "10rem"}}>
        <Form><h1>Edit Student</h1></Form>
        <Form.Group className='mb-3' controlId='formFirstName'>
          <Form.Control type='text' placeholder='Enter First Name' value={firstName} required onChange={(e) => setFirstName(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formMiddleName'>
          <Form.Control type='text' placeholder='Enter Middle Name'  value={middleName}  required onChange={(e) => setMiddleName(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formLastName'>
          <Form.Control type='text' placeholder='Enter Last Name'  value={lastName}  required onChange={(e) => setLastName(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formAge'>
          <Form.Control type='text' placeholder='Enter Age'  value={age} required onChange={(e) => setAge(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formYearLevel'>
          <Form.Control type='text' placeholder='Enter Year Level'  value={yearLevel}  required onChange={(e) => setYearLevel(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formSection'>
          <Form.Control type='text' placeholder='Enter Section'  value={section}  required onChange={(e) => setSection(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formCity'>
          <Form.Control type='text' placeholder='Enter City'  value={city}  required onChange={(e) => setCity(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formContactNumber'>
          <Form.Control type='text' placeholder='Enter Contact Number'  value={contactNumber}  required onChange={(e) => setContactNumber(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Control type='text' placeholder='Enter Email'  value={email}  required onChange={(e) => setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formZipCode'>
          <Form.Control type='text' placeholder='Enter Zip Code'  value={zipCode}  required onChange={(e) => setZipCode(e.target.value)}>
          </Form.Control>
        </Form.Group>
      <Button onClick={(e) => handleSubmit(e)} type='submit'>Update Student</Button>
        
      </Form> 
  </div>
)

}
export default EditUser;