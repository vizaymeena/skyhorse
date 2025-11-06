// Css
import '../assets/styles/components_styles/base.css'

// Router
import {Outlet} from 'react-router-dom'


// icons
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { PiBagFill } from "react-icons/pi";
import { MdManageAccounts } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from 'react';
import PrimaryNavbar from './navbar_component/PrimaryNavbar';

// component
import { RegisterAccount } from './AccountRegistration';

function BaseLayout() {

    let [showAccountForm,setShowAccountForm] = useState(false) // show registration form

    console.log(showAccountForm)




  return (
    <>
   
    <PrimaryNavbar setShowAccountForm={setShowAccountForm}/>
    
    {/* Body */}

    <div className='baseBody'>
        {showAccountForm && <RegisterAccount setShowAccountForm={setShowAccountForm} />}
         <Outlet/>
    </div>


   
    
    </>
  )
}

export default BaseLayout