import React, { useEffect ,  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';


// import React, {useState} from 'react';
import '../css/App.css';
import ShortestPath from '../Path';
import carGraph from '../img/graphh.png';
import carModel from '../img/car .png'
import wheel from '../img/wheel.png'


function Home() {

const graph = {
    A: { B: 5, C: 7 },
    B: { A: 5, D: 15, E: 20 },
    C: { A: 7, D: 5, E: 35 },
    D: { B: 15, C: 5, F: 20 },
    E: { B: 20, C: 35, F: 10 },
    F: { D: 20, E: 10 },
  };

  // All useState Hooks are present Here
  const [email, setemail] = useState('');
  const [src, setsrc] = useState('');
  const [dest, setdest] = useState('');
  const [car, setcar] = useState('');

  // Function running when we select a perticular radio button
  function onSelect(i){
    let rate;
    if(i === 0){
      rate = 10;
    }else if(i === 1){
      rate = 20;
    }else if(i === 2){
      rate = 30;
    }else if(i === 3){
      rate = 40;
    }else{
      rate = 50;
    }
    setcar(rate);
  }



  // Log out 


  const [loggedInUser, setLoggedInUser] = useState('');
    // const [products, setProducts] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }


  return (
    <>
    <div className="App">

          <div >

                {/* <h1 className='home' > {loggedInUser}</h1> */}
                <button onClick={handleLogout} className="logout hover:bg-blue-600" >Logout</button>

              <ToastContainer />
          </div>
      
      <h1 className="text mt-[8px] mb-[10px] p-4 text-4xl ">Book  Your  Cab</h1>
      <div className="form-container ">
      <img src={carGraph} alt="Car animation"  className='w-full'/>
      <form className="mx-auto  border-black border-dotted border-2" >
        <div className="form-group p-2">
          <label htmlFor="exampleInputEmail1">Email Address</label>
          <input type="email" className="form-control" onChange={(e) => {setemail(e.target.value)}} placeholder="Enter email" required/>
         <br></br>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Source</label>
          <input type="text" className="form-control" onChange={(e) => {setsrc(e.target.value)}} placeholder="Enter Source Node eg. A,B..F" required/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Destination</label>
          <input type="text" className="form-control" onChange={(e) => {setdest(e.target.value)}} placeholder="Enter Destination Node eg. A,B..F" required/>
        </div>
       <div className='mt-2'>
       <ul className='list '>
          <li className=''>
            <input type="radio" value={false} name="options" id='op1' onChange={() => onSelect(0)}/>
                <label htmlFor="op1">Micro (Rs. 10/min) </label>
          </li>
          <li className=''>
            <input type="radio" value={false} name="options" id='op2' onChange={() => onSelect(1)}/>
            <label htmlFor="op2">Mini (Rs. 20/min) </label>
          </li>
          <li className=''>
            <input type="radio" value={false} name="options" id='op3' onChange={() => onSelect(2)}/>
            <label htmlFor="op3">Sedan (Rs. 30/min) </label>
          </li>
          <li className=''>
            <input type="radio" value={false} name="options" id='op4' onChange={() => onSelect(3)}/>
            <label htmlFor="op4">Sedan Prime (Rs. 40/min) </label>
          </li>
          <li className=''>
            <input type="radio" value={false} name="options" id='op5' onChange={() => onSelect(4)}/>
            <label htmlFor="op5">SUV (Rs. 50/min) </label>
          </li>
        </ul>
       </div>
      </form>
      </div>
      <ShortestPath graph={graph} src={src} dest={dest} car={car} email={email}/>
    </div>
      <div className="container">
      <div className="author-name">
      
      <div className="container">
        <div className="bird-container bird-container--one">
          <div className="bird bird--one" />
        </div>
        <div className="bird-container bird-container--two">
          <div className="bird bird--two" />
        </div>
        <div className="bird-container bird-container--three">
          <div className="bird bird--three" />
        </div>
        <div className="bird-container bird-container--four">
          <div className="bird bird--four" />
        </div>
      </div>

      </div>
      <div className="road" />
      <div className="city" />
      <div className="car">
        <img src={carModel} alt="Car" className='car-runing' width={'600px'} />
        <img src={wheel} alt="Wheel" className='wheel first' />
        <img src={wheel} alt="Wheel" className='wheel back' />
      </div>
    </div>

    </>
  );
}

export default Home