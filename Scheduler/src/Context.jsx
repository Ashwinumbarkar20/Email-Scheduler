/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react';

 const AppContext = createContext();
const url="https://emaildata1.onrender.com/schedules";
const AppProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);
  const [search,setSearch]=useState("");

   const fetchData=async (url)=>{
    const res=await fetch(url);

    const schedulesData= await res.json();
    console.log(schedulesData);
    setSchedules(schedulesData);
  }
  useEffect(()=>{
    fetchData(url);
  },[])

  return (
    <AppContext.Provider
      value={{schedules,setSchedules,fetchData,search,setSearch,url}}>
      {children}
    </AppContext.Provider>
  );
};



export { AppProvider,AppContext };