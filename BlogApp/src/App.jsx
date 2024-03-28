import { useState,useEffect } from 'react'

import './App.css'
import authservice from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './features/authSlice'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'


function App() {
  
  const [Loading, setLoading] = useState(true)
  const dispatch=useDispatch()
  useEffect(() => {
    authservice.getCurrentUser().
    then((userdata)=>{
      if(userdata){dispatch(login({userdata}))}
      else{dispatch(logout)}
    }).
    finally(()=>{setLoading(false)})
  }
  )
    
  if(!Loading){
    return(
      <div className=' min-h-screen bg-gray-500 content-between flex'>
        <div className='w-full block'>
        <Header/>
        <main>
          <Outlet>

          </Outlet>
        </main>
        <Footer/>
        </div>
      </div>
    )
  }
}

export default App
