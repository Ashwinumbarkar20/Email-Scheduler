/* eslint-disable react/prop-types */
import React, { useState,useEffect } from 'react';
import styled from 'styled-components';

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
   
try{
  if (initialData) {
    const response = await fetch(`http://localhost:3000/schedules/${initialData.id}`, {
          method: 'PATCH',  
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          
          const updatedSchedule = await response.json();
          console.log('Schedule updated:', updatedSchedule);
        } else {
         
          console.error('Failed to update schedule');
        }
  }
  else {
    const response = await fetch('http://localhost:3000/schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      // Successful response
      const createdSchedule = await response.json();
      console.log('New schedule created:', createdSchedule);
    }
    else {
      // Handle error response
      console.error('Failed to create schedule');
    }

  
  }
  e.preventDefault();
   onClose();
}
catch(e){
  console.log("API is not connected")
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
      <Form>
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
          <button onClick={handleSave}>Done</button>
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