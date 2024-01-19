/* eslint-disable react/prop-types */
import React, { useState,useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../Context';

const MonthlyRepeat = ({ value, onChange }) => {
  return (
    <>
      <label>Repeat:</label>
      <select name="repeat" value={value} onChange={onChange}>
        <option value="first Monday">First Monday</option>
        <option value="last Friday">Last Friday</option>
      </select>
    </>
  );
};

const WeeklyRepeat = ({ value, onChange }) => {
  const weekdays = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

  const handleDayClick = (day) => {
    const updatedValue = value ? [...value] : [];

    if (updatedValue.includes(day)) {
      updatedValue.splice(updatedValue.indexOf(day), 1);
    } else {
      updatedValue.push(day);
    }

    onChange({ target: { name: 'repeat', value: updatedValue } });
  };

  return (
    <>
      <label>Repeat:</label>
      <div className='weekdaydiv'>
        {weekdays.map((day) => (
          <DayButton
            key={day}
            selected={value && value.includes(day)}
            className={value && value.includes(day) ? 'selected' : ''}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </DayButton>
        ))}
      </div>
    </>
  );
};

const Model = ({ onClose,title,initialData}) => {
  const {fetchData}=useContext(AppContext);
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    subject: '',
    frequency: 'Daily',
    repeat: null,
    time: '',
  });

  
  const [isModelOpen, setIsModelOpen] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,[name]: value,
    }));
  };

  const handleSave = async(e) => {
    console.log("in handle save")
    e.preventDefault();
   try{
  const endpoint = initialData
  ? `https://emaildata1.onrender.com/schedules/${initialData.id}`
  : 'https://emaildata1.onrender.com/schedules';

     
    const response = await fetch(endpoint, {
      method:initialData ? 'PATCH' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      mode: 'cors',
    });
    const result = await response.json();
    if (response.status==200) {
      
      if (initialData) {
       
        console.log('Schedule updated:', result);
        
      } 
      
      onClose(); 
      alert("Schedule Updated");
      fetchData("https://emaildata1.onrender.com/schedules");
    } 
  else if(response.status==201){
    console.log('Schedule Created:', result);
    
    onClose();
    alert("Schedule Created");
    fetchData("https://emaildata1.onrender.com/schedules");
  }
  
  onClose();
   
}
catch(e){
  console.log(e)
}
    
  };

  useEffect(() => {
    if (!isModelOpen) {
      setFormData(initialData || {
        title: '',
        description: '',
        subject: '',
        frequency: 'Daily',
        repeat: null,
        time: '',
      });
    }
  }, [isModelOpen, initialData]);

  return (
    <ModelContainer>
    <h5>{title}</h5>
      <Form action='https://emaildata1.onrender.com/schedules' method="POST" onSubmit={(e)=>handleSave(e)}>
        <label>*Title:</label>
        <input type="text" required name="title" value={formData.title} onChange={handleInputChange} />

        <label>*Description:</label>
        <textarea name="description" required value={formData.description} onChange={handleInputChange} />

        <label>*Subject:</label>
        <input type="text" name="subject" required value={formData.subject} onChange={handleInputChange} />

        <label>*Frequency:</label>
        <select name="frequency" required value={formData.frequency} onChange={handleInputChange}>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>

        {formData.frequency === 'Weekly' && <WeeklyRepeat value={formData.repeat} onChange={handleInputChange} />}

        {formData.frequency === 'Monthly' && <MonthlyRepeat value={formData.repeat} onChange={handleInputChange} />}

        <label>*Time:</label>
        <input type="time" required name="time" value={formData.time} onChange={handleInputChange} />

        <div className="buttons">
          <button onClick={onClose}>Cancel</button>
          <button type="submit">Done</button>
        </div>
      </Form>
    </ModelContainer>
  );
};

const ModelContainer = styled.div`
  position: absolute;
  width: 336px;

  top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 18px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  @media (max-width: 600px) {
    
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Form = styled.form`
font-size:15px;
  label {
    display: block;
    margin-bottom: 5px;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 5px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;

    button {
      background-color: #391e5a;
      color: #e4e4ee;
      border: 1px solid #e4e4ee;
      border-radius: 4px;
      padding: 8px;
      cursor: pointer;
    }
  }
  .weekdaydiv{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:10px;
  }
`;

const DayButton = styled.div`
  display: flex;
  width:25px;
  height:25px;
  justify-content:center;
  align-items:center;
  flex-direction: column;
  border: 1px solid #391e5a;
  border-radius: 100%;
  padding: 5px 5px;
  margin-right: 8px;
  cursor: pointer;
  &.selected {
    background-color: #391e5a;
    color: #fff;
  }
`;


export default Model;