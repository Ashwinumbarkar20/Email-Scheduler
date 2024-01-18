import Sidebar from './Component/Sidebar'
import Containerbox from './Component/Containerbox'
import './App.css'
import styled from 'styled-components'

function App() {
 console.log("Hello")

  return (
    <>
    <Maindiv className='container-fulid d-flex flex-row' >
    <Sidebar/>
    <Containerbox/>
    </Maindiv>
    
    </>
  )
}

export default App

const Maindiv=styled.div`
`
