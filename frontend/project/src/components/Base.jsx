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

// component
import { RegisterAccount } from './AccountRegistration';

function BaseLayout() {

    let [showAccountForm,setShowAccountForm] = useState(false) // show registration form

    console.log(showAccountForm)




  return (
    <>
    <div className='nav-wrapper'>
        {/* WEBSITE LOGO */}
        <div className='travel-logo-wrapper'>
           <div className='web-logo'>
              <span><MdOutlineFlightTakeoff/></span>
           </div>
            <div className='web-details'>
              <span >AirHorse</span>
              <span ></span>    
            </div> 
        </div>

        {/* REGISTER */}
        <div className='credentials-wrapper'>

            <div className='regs-buisness'>
                <div className='buisnessIcon'>
                      <span><PiBagFill/></span>
                </div>

                <div className='buisnessLink'>
                    <span className='buis-heading'>Register Your Buisness</span>
                    <span>Grow Your Buisness</span>
                </div>
            </div>

            {/* MANAGE BOOKINGS */}
            <div className='manageTrips'>

                <div className='tripIcon'>
                    <span><MdManageAccounts/></span>
                </div>
                <div className='tripLink'>
                    <span className='trip-Heading'>My Trips</span>
                    <span>Manage Your Bookings</span>

                </div>
            </div>

            {/* REGISTER USER */}
            <div className='registerUser' onClick={()=>setShowAccountForm(true)}>
                <div className='registerUserIcon'>
                    <span><FaRegUser/></span>
                </div>
                <div className='registerUserLink'>
                    <span>Login Or CreateAccount</span>
                    <span className='downArrowIcon'><MdKeyboardArrowDown/></span>
                </div>
            </div> 
        </div>
    </div>


    {/* Body */}

    <div className='baseBody'>
        {showAccountForm && <RegisterAccount setShowAccountForm={setShowAccountForm} />}
        
         <Outlet/>
    </div>


   
    
    </>
  )
}

export default BaseLayout