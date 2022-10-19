import React, {Fragment, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Students from './Students';
import {v4 as uuid} from 'uuid';
import {useNavigate} from 'react-router-dom';
import css from './Home.module.css'  ;
import Styles from './AddUser.css';
import {Navbar, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';




export const AddUser = () => {

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [yr_lvl, setYearLevel] = useState('');
  const [section, setSection] = useState('');
  const [city, setCity] = useState('');
  const [mob_num, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZipCode] = useState('');
  const [region, setRegion] = useState('');
  const [address, setAddress] = useState('');
  const [province, setprovince] = useState('');
  const [phone_num, setPhoneNum] = useState('');

  let history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = {
      firstName, 
      middleName,
      lastName,
      age,
      yr_lvl,
      section,
      city,
      mob_num,
      email,
      zip,
      region,
      address,
      province,
      phone_num
    }

    fetch("http://localhost:8090/api/student", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)
    }).then(() => {
      console.log("New student added");
    });

    history('/');

  }

  return (
<Fragment>
    <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>  
            
                <Navbar.Brand id='brand' href="/" className={css.brand}>
                <FontAwesomeIcon icon={faChevronCircleLeft} />
                   Student Information System
                  </Navbar.Brand>
                  
            </Container>
    </Navbar>
  <body>
      <div id='main'>
        <div id='addHead'>
          Add Student
        </div>
      <Form >

        <div id='nameStatus'>
        <div id='groupDiv'><label id='groupLabel'>Name and Status</label></div>
        <div id='inputDiv'>
        <Form.Group  className='mb-3' controlId='formFirstName'>
          <label>First Name</label>
          <Form.Control id='inputItem' type='text' placeholder='' required onChange={(e) => setFirstName(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group  className='mb-3' controlId='formMiddleName'>
        <label>Middle Name</label>
          <Form.Control id='inputItem' type='text' placeholder='' required onChange={(e) => setMiddleName(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group id='fisrtSec' className='mb-3' controlId='formLastName'>
        <label>Last Name</label>
          <Form.Control id='inputItem' type='text' placeholder='' required onChange={(e) => setLastName(e.target.value)}>
          </Form.Control>
        </Form.Group>
        </div>
       
       <div id='inputDiv'>
        <Form.Group className='mb-3' controlId='formAge'>
        <label>Age</label>
          <Form.Control id='inputItem' type='number' placeholder='' required onChange={(e) => setAge(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formYearLevel'>
        <label>Year Level</label>
          <Form.Control id='inputItemYR' as='select'  required onChange={(e) => setYearLevel(e.target.value)}>
            <option value='' disabled selected ></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group  className='mb-3' controlId='formSection'>
        <label>Section</label>
          <Form.Control id='inputItemSC' as='select' required onChange={(e) => setSection(e.target.value)}>
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
        </div>

        <div id='address'>
        <div id='groupDiv'><label id='groupLabel'>Address</label></div>
        <div id='inputDiv'>
        <Form.Group className='mb-3' controlId='formAddress'>
        <label>Address</label>
          <Form.Control id='inputItemAddress' type='text' placeholder='' required onChange={(e) => setAddress(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formCity'>
        <label>City</label>
          <Form.Control id='inputItemCity' type='text' placeholder='' required onChange={(e) => setCity(e.target.value)}>
          </Form.Control>
        </Form.Group>
       </div>

        <div id='inputDiv'>
        <Form.Group className='mb-3' controlId='formProvince'>
        <label>Province</label>
          <Form.Control id='inputItem' type='text' placeholder='' required onChange={(e) => setprovince(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formRegion'>
        <label>Region</label>
          <Form.Control  id='inputItem' type='text' placeholder='' required onChange={(e) => setRegion(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formZipCode'>
        <label>Zip Code</label>
          <Form.Control id='inputItem' type='number' placeholder='' required onChange={(e) => setZipCode(e.target.value)}>
          </Form.Control>
        </Form.Group>
        </div>
        </div>

        <div id='contacts'>
        <div id='groupDiv'><label id='groupLabel'>Contacts</label></div>
        <div id='inputDiv'>
        <Form.Group className='mb-3' controlId='formPhoneNumber'>
        <label>Phone Number</label>
          <Form.Control  id='inputItem' type='number' placeholder='' required onChange={(e) => setPhoneNum(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formContactNumber'>
        <label>Mobile Number</label>
          <Form.Control id='inputItem' type='number' placeholder='' required onChange={(e) => setContactNumber(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formEmail'>
        <label>Email Address</label>
          <Form.Control id='inputItem'  type='email' placeholder='' required onChange={(e) => setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>
        </div>
        </div>


        <div id='addBtnCont'>
        <Button id='addBtn' className='btn btn-success' onClick={(e) => handleSubmit(e)} type='submit'>Add</Button> 
        <Button id='cancelBtn' className='btn btn-warning' type='button' href='/'>Cancel</Button>    
       
        </div>
      </Form>
      </div>
    
    
  </body>
  </Fragment>
  )
}