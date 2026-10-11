import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./components/Footer/Footer"
import { useState } from "react"
import LoginPopup from "./components/LoginPopup/LoginPopup"
import Verify from "./pages/Verify/Verify"
import MyOrders from "./pages/MyOrders/MyOrders"

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [searchText, setSearchText] = useState("")

  return (
    <>
    {showLogin? <LoginPopup setShowLogin= {setShowLogin}/> : <></> }
    <div className = 'app'>
      <Navbar setShowLogin={setShowLogin} searchText={searchText} setSearchText={setSearchText} />
      <Routes>
        <Route path = '/' element= {<Home searchText={searchText} />} />
        <Route path = '/cart' element = {<Cart />} />
        <Route path ='/order' element = {<PlaceOrder/>} />
        <Route path = '/verify' element= {<Verify/>}/>
        <Route path = '/myorders' element= {<MyOrders/>}/>
      </Routes>
      
    </div>
    <Footer/>
    </>
    
  )
}

export default App
