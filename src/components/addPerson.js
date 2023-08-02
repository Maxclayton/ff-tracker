import React, { useState, useEffect, useRef } from 'react';
import Nav from './nav';
import './addPerson.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';



function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  function AddPerson() {
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [list, setList] = useState([]);
    const [sortedList, setSortedList] = useState([]);
    const prevListLengthRef = useRef(0);

    
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleTimeChange = (event) => {
      setTime(event.target.value);
    };
  
    const handleAddClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

      if (name.trim() !== '' && time.trim() !== '') {
        let totalSeconds;
        if (time.includes(':')) {
          const [minutes, seconds] = time.split(':').map((num) => parseInt(num, 10));
          totalSeconds = minutes * 60 + seconds;
        } else {
          totalSeconds = parseInt(time, 10);
        }
        const newItem = { name, time: totalSeconds };
        setList((prevList) => [...prevList, newItem]);
        setName('');
        setTime('');
      }
    };
  
    const handleRemoveClick = (index) => {
      const updatedList = [...list];
      updatedList.splice(index, 1);
      setList(updatedList);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    };

    const navClassName = list.length > 0 ? 'has-items' : '';
    const svgMove = list.length > 0 ? 'svg-move' : '';
    const helpText2 = list.length === 0 ? 'Enter a name and a time below to add to list' : '';


    

  useEffect(() => {
    const sortedList = [...list].sort((a, b) => a.time - b.time); // Sort in ascending order
    setSortedList(sortedList);


    // Determine if a new time has taken the number 1 spot
    if (prevListLengthRef.current < sortedList.length && sortedList.length > 0) {
      const firstItem = document.querySelector('.animated-list li');
      if (firstItem) {
        // Apply the animation class to trigger the animation effect
        firstItem.classList.add('new-time-added');
        // After the animation, remove the class
        setTimeout(() => firstItem.classList.remove('new-time-added'), 500);
      }
    }

  
    prevListLengthRef.current = sortedList.length;
  }, [list]);

  return (
    <div  className="container" id={svgMove}>
      <Nav className={navClassName} />

      <svg className='wave'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,96L34.3,122.7C68.6,149,137,203,206,192C274.3,181,343,107,411,106.7C480,107,549,181,617,202.7C685.7,224,754,192,823,181.3C891.4,171,960,181,1029,170.7C1097.1,160,1166,128,1234,133.3C1302.9,139,1371,181,1406,202.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
      <div className="content-wrap">
      <h2>{helpText2}</h2>

        <div className="list-container">

          <ol className="animated-list" id="my-list">
            <div className='item-wrap'>

                {sortedList.map((item, index) => (
            <li key={index}>
          {index + 1}.   {item.name} : {formatTime(item.time)}{' '}
            <div className='btn-remove' onClick={() => handleRemoveClick(index)}>
                <FontAwesomeIcon  width={20} icon={faMinusCircle} />
            </div>
            </li>
                ))}
            </div>
          </ol>
        </div>
        <div className="controls-container">
          <div className="controls-wrap">
            <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
            <input type="text" value={time} onChange={handleTimeChange} placeholder="Time" />
            <button onClick={handleAddClick}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPerson;
