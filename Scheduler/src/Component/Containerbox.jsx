import React from 'react'
import styled from 'styled-components'
import { CgAdd } from "react-icons/cg";

export default function Containerbox() {
  return (
    <Maindiv>
     <div className='tabs'></div>
     <div className='filter'> 
     
     <input type="text" placeholder='Serach'/>
     
     <button className='add'> <CgAdd style={{"height":"24px","width":"18px"}}/> Add</button>
     
      </div>

      <div className='Email-Container m-3'>
      <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Subject</th>
                <th>Schedule</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            
            <tr>
                <td>Sample Title 1</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, repellendus ipsa minima eius quos suscipit laborum maxime ullam, quam nulla quaerat tenetur dolores iusto molestias autem quisquam aperiam vel blanditiis.</td>
                <td>Sample Subject 1</td>
                <td>Sample Schedule 1</td>
                <td>Sample Action 1</td>
            </tr>
            
            
        </tbody>
    </table>
      </div>
    </Maindiv>

  )
}
const Maindiv=styled.div`
margin-top:48px;
width:100%;
margin-right:56px;
margin-left:24px;
.tabs{
    height:40px;
    background-color:#D8D2DE;
}
.filter{
    
    margin-top:20px;
    
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    input{
        height:38px;
        width:300px;
        border-radius: 4px;
        padding:8px;
        border: 1px solid #E4E4EE;
        background: #FFF;
    }
    .add{
        background-color:#391E5A;
        color:#E4E4EE;
        border: 1px solid #E4E4EE;
        border-radius:4px;
        padding: 8px;
    }
}
.Email-container{
    width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
}
th, td {
            border-bottom: 3px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #D8D2DE;
        }
        th:nth-child(2),
        td:nth-child(2) {
            width: 30%; 
        }
`
