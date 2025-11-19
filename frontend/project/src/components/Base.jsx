// Css
import '../assets/styles/components_styles/base.css'

// Router
import {Outlet} from 'react-router-dom'


// icons
import { useState } from 'react';
import PrimaryNavbar from './navbar_component/PrimaryNavbar';

// component
import {RegisterAccount} from '../components/RegisterAccount'
import { ServiceProviderRegistration as SPR } from '../pages/ServiceProvider'

function BaseLayout() {

    let [showAccountForm,setShowAccountForm] = useState(false) // show registration form
     let [showSpr,setShowSpr] = useState(false)

    console.log(showAccountForm)




  return (
    <>
   
    <PrimaryNavbar setShowSpr={setShowSpr} setShowAccountForm={setShowAccountForm}/>
    
    {/* Body */}

    <div className='baseBody'>
        {showSpr && <SPR setShowSpr={setShowSpr}/>}
        {showAccountForm && <RegisterAccount setShowAccountForm={setShowAccountForm} />}
         <Outlet/>
    </div>


   
    
    </>
  )
}

export default BaseLayout