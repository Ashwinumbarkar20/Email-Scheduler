/* eslint-disable react/prop-types */
import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import styled from 'styled-components'
import { MdEdit } from "react-icons/md";
export default function Tablerow({schedule}) {
    const renderFrequency=(schedule)=>{
        const {frequency, repeat, time}=schedule;
        if(frequency==="Daily")
        {
            return `Daily at ${time}`
        }
        else if(frequency==="Weekly")
        {
            return `Weekly  ${repeat.join(', ')} at ${time}`;
        }
        else if(frequency==="Monthly"){
            return `Monthy  ${repeat} at ${time}`;
        }
    }
  return (
    <Tablerowdiv>
    <td>{schedule.title}</td>
    <td>{schedule.description}</td>
    <td>{schedule.subject}</td>
    <td>{renderFrequency(schedule)}</td>
    <td><div className='action'><span className='edit'><MdEdit /></span>
    <span className='delete'><RiDeleteBin6Line /></span></div></td>
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