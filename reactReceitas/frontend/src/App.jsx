
import { Outlet } from 'react-router-dom'
import Footer from './componets/Footer.jsx'
import Navbar from './componets/Navbar.jsx'
import {ToastContainer} from 'react-toastify'
import './App.css'
function App() {
  return (
    <div className='container'>
      <ToastContainer/>
      <Navbar/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
