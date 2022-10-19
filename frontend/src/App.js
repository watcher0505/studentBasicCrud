import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import {Home} from './components/Home';
import {AddUser} from './components/AddUser';
import EditUser from './components/EditUser';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/create' element={<AddUser></AddUser>}/>
          <Route path='/edit' element={<EditUser></EditUser>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
