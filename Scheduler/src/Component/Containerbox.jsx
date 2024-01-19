import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { CgAdd } from "react-icons/cg";
import Table from '../Table';
import { AppContext } from '../Context';
import Model from './Model';

export default function Containerbox() {
    const {search,setSearch}=useContext(AppContext)
    const [isModelOpen, setIsModelOpen] = useState(false);
    
    const handleAddClick = () => {
        setIsModelOpen(true);
      };
    
      const handleCloseModel = () => {
        setIsModelOpen(false);
      };
  return (
    <Maindiv>
     <div className='tabs'></div>
     <div className='filter'> 
     
     <input type="text" placeholder='Serach' onChange={(e)=>{setSearch(e.target.value)}} value={search}/>
     
     <button className='add' onClick={handleAddClick}> <CgAdd style={{"height":"24px","width":"18px"}}/> Add</button>
     
      </div>
      <Table />
      {isModelOpen && <Model title={"Add Schedule"} onClose={handleCloseModel} onSave={(data) => {
        // Handle saving the data to your schedules or making an API call
        console.log('Data to be saved:', data);
        handleCloseModel();
      }} />}
      
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
    flex-wrap:wrap;
    gap:18px;
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
