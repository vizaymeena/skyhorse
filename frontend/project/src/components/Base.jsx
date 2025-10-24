// Css
import '../assets/styles/components_styles/base.css'

// Router
import {Outlet} from 'react-router-dom'

// states
import { useState } from 'react';

// component
import PrimaryNavbar from './navbar_component/PrimaryNavbar';
import { RegisterAccount } from './AccountRegistration';
import SecondaryNavbar from './navbar_component/SecondaryNavbar';

function BaseLayout() {

    let [showAccountForm,setShowAccountForm] = useState(false) // show registration form

    console.log(showAccountForm)




  return (
    <>
   
    <PrimaryNavbar/>
    
    {/* Body */}

    <main className='baseBody'>
        {showAccountForm && <RegisterAccount setShowAccountForm={setShowAccountForm} />}
        
         <Outlet/>
    </main>


   
    
    </>
  )
}

export default BaseLayout