import React from 'react'
import styled from 'styled-components'
import { CgAdd } from "react-icons/cg";
import Table from '../Table';

export default function Containerbox() {
  return (
    <Maindiv>
     <div className='tabs'></div>
     <div className='filter'> 
     
     <input type="text" placeholder='Serach'/>
     
     <button className='add'> <CgAdd style={{"height":"24px","width":"18px"}}/> Add</button>
     
      </div>
      <Table/>
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
`
