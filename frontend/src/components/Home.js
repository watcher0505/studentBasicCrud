import React, { Fragment, useState, useEffect } from 'react'
import {Button, Modal, Navbar, Nav, Container, Form, Card, Table, InputGroup, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Students from './Students';
import {Link, useNavigate} from 'react-router-dom';
import css from './Home.module.css';
import Styles from './HomeAdditional.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFilter, faTrashCan, faUsers, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';


export const Home = () => {

    let history = useNavigate();


    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [studentSelected, setStudentSelected] = useState('');
    const [identification, setIdentification] = useState(0);
    const [selectedSort, setSelectedSort] = useState();
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedYearLevel, setSelectedYearLevel] = useState('');
    const [selectedMinAge, setselectedMinAge] = useState('');
    const [selectedMaxAge, setselectedMaxAge] = useState('');
    const [search, setSearch] = useState('');
    const [pageCount, setpageCount] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(0);
    const [studentsInside, setStudentsInside] = useState('normal');

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = (name, id) => {
        setShow(true);
        setStudentSelected(name);
        setIdentification(id);
    }

    const handleEdit =( 
        id,
        firstName,
        middleName,
        lastName,
        age,
        yearLevel,
        section,
        city,
        contactNumber,
        email,
        zipCode,
        region,
        province,
        address
        ) =>{

            localStorage.setItem('firstName', firstName);
            localStorage.setItem('middleName', middleName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('age', age);
            localStorage.setItem('yearLevel', yearLevel);
            localStorage.setItem('section', section);
            localStorage.setItem('city', city);
            localStorage.setItem('contactNumber', contactNumber);
            localStorage.setItem('email', email);
            localStorage.setItem('zipCode', zipCode);
            localStorage.setItem('id', id);
            localStorage.setItem('region', region);
            localStorage.setItem('province', province);
            localStorage.setItem('address', address);

    }

    async function handleDelete(id) {
        await fetch(`http://localhost:8090/api/student/${id}`, {
            method:"DELETE",
            header:{'Accept':'application/json',
                 "Content-Type":"application/json"}
        });
        fetchAllDataItems();
        setShow(false);
    }

    //List of all students that are paginated and returning only the records per page
    async function fetchAllDataItems() {
        const result = await fetch(`http://localhost:8090/api/student/home/${pageCurrent}`);
        const datas = await result.json();
        const resultAll = await fetch(`http://localhost:8090/api/student/totalNumberOfPages`);
        const datasAll = await resultAll.json();
        setpageCount(datasAll);
        setData(datas);
    };

    useEffect(() => {
        fetchAllDataItems();
    },[]);

    const fetchPagination = async (currentPage) => {
        const res = await fetch(`http://localhost:8090/api/student/pagination/${currentPage}`);
        const datas = await res.json();
        return datas;
    }

    async function handlePageClick(data) { 
        setPageCurrent(data.selected);
        if(studentsInside === 'normal'){
            const paginationOffSet = await fetchPagination(data.selected);
            setData(paginationOffSet);
        }else if(studentsInside === 'sort') {
            const paginationSorted = await fetchPaginationSorted(data.selected, selectedSort);
            setData(paginationSorted);
        }else if(studentsInside === 'age') {
            const paginationAge = await fetchPaginationAge(selectedMinAge, selectedMaxAge, data.selected);
            setData(paginationAge);
        }else if(studentsInside === 'group') {
            const paginationGroup = await fetchPaginationGroup(selectedSection, selectedYearLevel, data.selected);
            setData(paginationGroup);
        }else if(studentsInside === 'search') {
            const paginationSearch = await fetchPaginationSearch(search, data.selected);
            setData(paginationSearch);
        } 
    }

    //List all students that can be sorted by names and grouped by year level and section
    async function fetchPaginationGroup(section, yearLevel, currentPage) {
        const res = await fetch(`http://localhost:8090/api/student/groupBySectionAndYearLevel/${section}/${yearLevel}/${currentPage}`);
        const datas = await res.json();
        return datas;
    }

    //List all students that can be sorted by names and grouped by year level and section
    async function handleAgeGrouping(minAge, maxAge) {
        let ageGrouping = await fetch(`http://localhost:8090/api/student/ageBracket/${minAge}/${maxAge}/${0}`);
        ageGrouping = await ageGrouping.json();
        
        const resultAll = await fetch(`http://localhost:8090/api/student/totalNumberOfPages`);
        const datasAll = await resultAll.json();
        setpageCount(datasAll);
        setData(ageGrouping);
        setStudentsInside('age')
        setPageCurrent(0);
    }

    //List all students that can be sorted by names and grouped by year level and section
    async function handleGrouping(section, yearLevel) {
        let group = await fetch(`http://localhost:8090/api/student/groupBySectionAndYearLevel/${section}/${yearLevel}/${0}`);
        group = await group.json(); 
        const resultAll = await fetch(`http://localhost:8090/api/student/totalNumberOfPages`);
        const datasAll = await resultAll.json();
        setpageCount(datasAll);
        setData(group);
        setStudentsInside('group');
        setPageCurrent(0);
    }

    //List all students per year level, section, city, and zip sorted by name
    //Able to show full information about a student
    async function fetchPaginationSearch(search, currentPage) {
        const res = await fetch(`http://localhost:8090/api/student/search/${currentPage}/${search}`);
        const datas = await res.json();
        return datas;
    }

    //List all students per year level, section, city, and zip sorted by name
    //Able to show full information about a student
    async function handleSearchStudent(search) {
        let searchHere = await (await fetch(`http://localhost:8090/api/student/search/${0}/${search}`)).json();

        const resultAll = await (await fetch(`http://localhost:8090/api/student/totalNumberOfPages`)).json();
        setpageCount(resultAll);
        setData(searchHere);
        setStudentsInside('search');
        setPageCurrent(0);
        
    }

    //List of all students based on age bracket and sorted by last name.
    async function fetchPaginationAge(minAge, maxAge, currentPage) {
        const res = await fetch(`http://localhost:8090/api/student/ageBracket/${minAge}/${maxAge}/${currentPage}`);
        const datas = await res.json();
        return datas;
    }
    
    //Sorting by field
    async function fetchPaginationSorted(currentPage, field) {
        const res = await fetch(`http://localhost:8090/api/student/sortedBy/${currentPage}/${field}`);
        const datas = await res.json();
        return datas;
    }

    //Sorting by field
    async function sorting(field) {
        let sorted = await fetch(`http://localhost:8090/api/student/sortedBy/0/${field}`);
        sorted = await sorted.json();
        const resultAll = await fetch(`http://localhost:8090/api/student/totalNumberOfPages`);
        const datasAll = await resultAll.json();
        setpageCount(datasAll);
        setData(sorted);
        setStudentsInside('sort')
        setPageCurrent(0);
    };

    
  return (
    <Fragment>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
            <Navbar.Brand id='brand' href="/">Student Information System</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                <Link to="/create">
                        <Button id='addNewBtn' className='btn btn-success' > <FontAwesomeIcon icon={faPlusCircle} /> Student</Button>
                </Link>


                </Nav>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    id='searchInput'
                    onChange={e=>setSearch(e.target.value)}
                    />
                    <Button id='searchBtn' onClick={() => handleSearchStudent(search)} variant="outline-success">Search</Button>
                </Form>

                </Navbar.Collapse>
            </Container>
        </Navbar>
        <div className={css.mainContainer} >
            
            <div className={css.tableContainer}>
                

                <Card id='tableCard' className={"border border-dark"}>
                <Card.Header>  <FontAwesomeIcon icon={faUsers} /> <b>Student's List</b></Card.Header>
                    <Card.Body id='table'>
                <Table striped>
                    <thead align="center">
                        <tr id={css.header}>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Year Level</th>
                            <th>Section</th>
                            <th>Mobile Number</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>Province</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>Zip Code</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?  data.map((student) => {
                                return(
                                      <tr key={student.id}>
                                        <td>{student.firstName}</td>
                                        <td>{student.middleName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.age}</td>
                                        <td>{student.yr_lvl}</td>
                                        <td>{student.section}</td>
                                        <td>{student.mob_num}</td>
                                        <td>{student.phone_num}</td>
                                        <td>{student.email}</td>
                                        <td>{student.region}</td>
                                        <td>{student.province}</td>
                                        <td>{student.city}</td>
                                        <td>{student.address}</td>
                                        <td>{student.zip}</td>
                                        <td>
                                            <Link to={'/edit'}>
                                                <Button onClick={() => handleEdit(
                                                    student.id,
                                                    student.firstName,
                                                    student.middleName,
                                                    student.lastName,
                                                    student.age,
                                                    student.yr_lvl,
                                                    student.section,
                                                    student.city,
                                                    student.phone_num,
                                                    student.email,
                                                    student.zip,
                                                    student.region,
                                                    student.province,
                                                    student.address
                                                    
                                                    )}><FontAwesomeIcon icon={faEdit} />Edit</Button>
                                            </Link>
                                            
                                        </td>
                                        <td>
                                            <Button data-toggle='modal' onClick={() => handleShow(student.firstName, student.id)} ><FontAwesomeIcon icon={faTrashCan} /> Delete</Button>
                                            
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header>Deleting Student Information</Modal.Header>
                                                <Modal.Body>
                                                    You are deleting {studentSelected}'s Information. Are you sure you want to do this?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant='secondary' onClick={handleClose}>Cancel</Button>
                                                    <Button variant="primary" onClick={() => handleDelete(identification)  }>Yes</Button>
                                                </Modal.Footer>
                                            </Modal>

                                        </td>
                                    </tr>
                                )
                            })
                            : "No data found"
                        }
                    </tbody>
                </Table>
                    </Card.Body>
                    <Card.Footer>
                        <div style={{"float":"left"}}>Showing Page {pageCurrent+1} of {pageCount}</div>
                        <div style={{"float":"right"}}>
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'} 
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                activeClassName={'active'}
                            />
                        </div>
                    </Card.Footer>
                </Card>
            </div>
            <div className={css.commandsContainer}>
                
            <Card className={"border border-dark"}>
                    <Card.Header>  <FontAwesomeIcon icon={faFilter} /><b> Sorting Commands</b></Card.Header>
                    <Card.Body>

                <div className={css.commandDivision}>
                    <div id='commands' className={css.sortCommand}>
                        <label for='commandDiv'>Sorting Section</label>
                        <div className={css.sortInput}>
                        <select class="form-select" aria-label="Default select example" id='groupBy' value={selectedSort} onChange={e=>setSelectedSort(e.target.value)}>
                            <option selected>Sort by</option>
                            <option value="firstName">First Name</option>
                            <option value="middleName">Middle Name</option>
                            <option value="lastName">Last Name</option>
                            <option value="age">Age</option>
                            <option value="yearLevel">Year Level</option>
                            <option value="section">Section</option>
                            <option value="city">City</option>
                            <option value="phone_num">Contact Number</option>
                            <option value="email">Email</option>
                            <option value="zip">Zip Code</option>
                        </select>
                        </div>
                        <Button className='btn btn-success' id='btn' onClick={() => sorting(selectedSort)}>Sort Now</Button>
                    </div>

                    <div id='commands' className={css.groupBySectionAndYearLevel}>
                        <label for='group'>Grouping Section</label>
                        <div id='group' className={css.groupBySectionAndYearLevelDivision}>
                        
                        <div className={css.groupSectionInput}>
                                
                                <select class="form-select" aria-label="Default select example" id='groupBy' value={selectedSection} onChange={e=>setSelectedSection(e.target.value)}>
                                    <option selected>Section</option>
                                    <option value="Saint Francis">Saint Francis</option>
                                    <option value="Saint Paul">Saint Paul</option>
                                    <option value="Saint Therese">Saint Therese</option>
                                    <option value="Saint John">Saint John</option>
                                    <option value="Saint Peter">Saint Peter</option>
                                    <option value="Saint Luke">Saint Luke</option>
                                </select>
                            </div>
                            <div className={css.groupYearLevel}>
                                <select class="form-select" aria-label="Default select example" id='groupBy' value={selectedYearLevel} onChange={e=>setSelectedYearLevel(e.target.value)}>
                                    <option selected>Year Level</option>
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                </select>
                            </div>
                        </div>
                        <Button  className='btn btn-success' id='btn' onClick={() => handleGrouping(selectedSection, selectedYearLevel)}>Group Now</Button>
                      
                    </div>
                        
                    <div id='commands' className={css.groupBySectionAndYearLevel}>
                        <label for='ageGroup'>Age Bracket</label>
                        <div id='ageGroup' className={css.groupBySectionAndYearLevelDivision}>
                        
                        <div className={css.groupSectionInput}>
                                <input  class="form-select" aria-label="Default select example" id='groupBy' placeholder='Min' type="number" name="quantity" value={selectedMinAge} onChange={e=>setselectedMinAge(e.target.value)}></input>
                            </div>
                            <div className={css.groupYearLevelInput}>
                                <input  class="form-select" aria-label="Default select example" id='groupBy' placeholder='Max' type="number" name="quantity" value={selectedMaxAge} onChange={e=>setselectedMaxAge(e.target.value)}></input>
                            </div>
                        </div>
                        <Button className='btn btn-success' id='btn' onClick={() => handleAgeGrouping(selectedMinAge, selectedMaxAge)}>Sort Now</Button>
                      
                    </div>
               </div>
               
               </Card.Body>
            </Card>

           </div>
        </div>
    </Fragment>
  )
}
