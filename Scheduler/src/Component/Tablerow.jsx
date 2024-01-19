/* eslint-disable react/prop-types */
import React,{useState} from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import Model from './Model';
import styled from 'styled-components'


import { MdEdit } from "react-icons/md";
export default function Tablerow({schedule,fetchData}) {
    const[isEditing, setIsEditing] = useState(false);

    const handleEditClick=()=>{
        setIsEditing(true);
    }

    const handleModalClose = () => {
        setIsEditing(false);
      };
    
    const renderFrequency=(schedule)=>{
        const {frequency, repeat, time}=schedule;
        if(frequency==="Daily")
        {
            return `Daily at ${time}`
        }
        else if(frequency==="Weekly")
        {
            return `Weekly  ${repeat && repeat.join(', ')} at ${time}`;
        }
        else if(frequency==="Monthly"){
            return `Monthly  ${repeat || ''} at ${time}`;
        }
    }
    const DeleteSchedular=async (id)=>{
        try{
            const res = await fetch(`https://emaildata1.onrender.com/schedules/${id}`,
             {
                method: 'DELETE',
              });
              if(res.ok){
                
                fetchData(`https://emaildata1.onrender.com/schedules`);
              }
              else{
                alert("unable to  Removed")
              }
        }
        catch(e){console.log("Error in API")}
    

    }

  return (
    <Tablerowdiv>
    <td>{schedule.title}</td>
    <td>{schedule.description}</td>
    <td>{schedule.subject}</td>
    <td>{renderFrequency(schedule)}</td>
    <td><div className='action'><span className='edit' onClick={handleEditClick}><MdEdit /></span>
    <span className='delete' onClick={()=>{DeleteSchedular(schedule.id)}}><RiDeleteBin6Line /></span></div></td>
    {isEditing && (
        <Model
          title='Edit Schedule'
          onClose={handleModalClose}
          onSave={(data) => {
        
        console.log('Data to be saved:', data)}}
          initialData={schedule} 
        />
      )}

</Tablerowdiv>
  )
}
const Tablerowdiv=styled.tr`
.action{
display:flex;
flex-direction:row;
justify-content:space-evenly;
align-items:center;  
.edit{
    width: 16px;
height: 16px;
flex-shrink: 0;
color:#000;
cursor: pointer;
&:hover{
    
    box-shadow:0px 0px 8px rgba(0,0,0,0.9)
}
}
.delete{
    cursor: pointer;
    width: 16px;
   
height: 16px;
flex-shrink: 0;
color:#3C1E5A;
&:hover{
    
        box-shadow:0px 0px 8px rgba(0,0,0,0.9)
}
}
}`
