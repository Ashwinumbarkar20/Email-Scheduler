/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import  {useContext} from 'react'
import { AppContext } from './Context'
import Tablerow from './Component/Tablerow';
export default function Table() {

   const{schedules,fetchData}=useContext(AppContext);

   console.log(schedules);
  return (
    <Maindiv>
       <div className='Email-Container container-fluid m-3'>
      <table className='container-fluid'>
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
            {
                schedules.map((schedule)=>(<Tablerow key={schedule.id} schedule={schedule} fetchData={fetchData}/>))
            }
          
            
            
        </tbody>
    </table>
      </div>
    </Maindiv>
  )
}
const Maindiv=styled.div`
.Email-container{
    width:100%;
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
        td{
            color: #333;

font-family: "Nunito Sans";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
        }
`
 
 