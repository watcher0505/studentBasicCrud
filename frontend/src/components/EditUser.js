import React, {useState, useEffect} from 'react';
import {Button, Navbar, Nav, Container, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Students from './Students';
import {useNavigate} from 'react-router-dom';
import Styles from './AddUser.css';


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
  const [region, setRegion] = useState("");
  const [province, setprovince] = useState("")
  const [address, setAddress] = useState("")

  let history = useNavigate();

  let index = Students.map(function(e) {
    return e.id;
}).indexOf(id);


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
  setRegion(localStorage.getItem('region'))
  setprovince(localStorage.getItem('province'));
  setAddress(localStorage.getItem('address'));

},[])

const handleSubmit = () => {

  const data = {
    firstName: firstName, 
      middleName: middleName,
      lastName: lastName,
      age: age,
      yr_lvl: yearLevel,
      section: section,
      city: city,
      mob_num: contactNumber,
      email: email,
      zip: zipCode,
      region: region,
      address: address,
      province: province,
  }

  const url = `http://localhost:8090/api/student/${id}`;
  fetch(url, {
    method:'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
  })
  .then(response => {
  
  }).catch(e => {
      
  })


  
  history('/');
}





return(
  <div>
     <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Student Information System</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                </Nav>
                </Navbar.Collapse>
            </Container>
     </Navbar>
     <body>
      <div id='main'>
        <div id='addHead'>
          Edit Student
        </div>
      <Form >
        <div id='input'>
        <Form.Group  className='mb-3' controlId='formFirstName'>
          <label>First Name</label>
          <Form.Control id='firstSec' type='text' placeholder='' value={firstName} required onChange={(e) => setFirstName(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group  className='mb-3' controlId='formMiddleName'>
        <label>Middle Name</label>
          <Form.Control id='firstSec' type='text' placeholder='' value={middleName}  required onChange={(e) => setMiddleName(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group id='fisrtSec' className='mb-3' controlId='formLastName'>
        <label>Last Name</label>
          <Form.Control id='firstSec' type='text' placeholder='' value={lastName}  required onChange={(e) => setLastName(e.target.value)}>
          </Form.Control>
        </Form.Group>
        </div>

        <div id='input'>
        <Form.Group className='mb-3' controlId='formAge'>
        <label>Age</label>
          <Form.Control id='secondSec' type='text' placeholder='' value={age}   required onChange={(e) => setAge(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formYearLevel'>
        <label>Year Level</label>
          <Form.Control id='secondSec' as='select' value={yearLevel}    required onChange={(e) => setYearLevel(e.target.value)}>
            <option value='' disabled selected ></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group  className='mb-3' controlId='formSection'>
        <label>Section</label>
          <Form.Control id='secondSec' as='select' value={section} required onChange={(e) => setSection(e.target.value)}>
            <option value='' disabled selected ></option>
            <option value="Saint Francis">Saint Francis</option>
            <option value="Saint Paul">Saint Paul</option>
            <option value="Saint Therese">Saint Therese</option>
            <option value="Saint John">Saint John</option>
            <option value="Saint Peter">Saint Peter</option>
            <option value="Saint Luke">Saint Luke</option>
          </Form.Control>
        </Form.Group>
        </div>

        <div id='input'>
        <Form.Group className='mb-3' controlId='formCity'>
        <label>City</label>
          <Form.Control id='city' type='text' placeholder='' value={city} required onChange={(e) => setCity(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formZipCode'>
        <label>Zip Code</label>
          <Form.Control id='zip' type='number' placeholder='' value={zipCode}  required onChange={(e) => setZipCode(e.target.value)}>
          </Form.Control>
        </Form.Group>
        </div>

        <div id='input'>
        <Form.Group className='mb-3' controlId='formContactNumber'>
        <label>Contact Number</label>
          <Form.Control id='fourthSec' type='number' placeholder='' value={contactNumber}  required onChange={(e) => setContactNumber(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formEmail'>
        <label>Email Address</label>
          <Form.Control id='fourthSec' type='email' placeholder='' value={email}  required onChange={(e) => setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formRegion'>
        <label>Region</label>
          <Form.Control id='fourthSec' type='text' placeholder='' value={region}  required onChange={(e) => setRegion(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formProvince'>
        <label>Province</label> 
          <Form.Control id='fourthSec' type='text' placeholder='' value={province}  required onChange={(e) => setprovince(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formProvince'>
        <label>Address</label> 
          <Form.Control id='fourthSec' type='text' placeholder='' value={address}  required onChange={(e) => setAddress(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <div id='addBtnCont'>
        <Button id='addNowBtn' className='btn btn-success' onClick={(e) => handleSubmit(e)} type='submit'>Save Changes</Button> 
        <Button id='cancelBtn' className='btn btn-warning' type='button' href='/'>Cancel</Button>    
       
        </div>
        </div>

      </Form>
      </div>
    
    
  </body>
    
  </div>
)

}
export default EditUser;