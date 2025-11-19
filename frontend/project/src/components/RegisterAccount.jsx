// css
import '../assets/styles/components_styles/register_account.css'

// Photos
import registration_img from "../assets/images/photos/accountRegistrationImg.jpg"
import business_img from '../assets/images/photos/businessAccReg.jpeg'
import { useEffect, useState } from 'react'

import ForgotWorkId from './forgotId'

export function RegisterAccount({setShowAccountForm}) {

    let [isClosing,setIsClosing]=useState(false)
    let [accType,setAccType]=useState('personal')
    let [isforgetId,setisforgetId] = useState(false)


    useEffect(()=>{
        if(isClosing){
            let timer = setTimeout(()=>{
                setShowAccountForm(false)
            },300)

            return ()=>clearTimeout(timer)
        }
       
    },[isClosing,setShowAccountForm])


    // closing the account registration form
    let handleOverlay=(e)=>{
        if(e.target.classList.contains('closeform')){
            setIsClosing(true)
        }
    }

    // choosing personal / buinsess account
    let handleAccType=(e)=>{
        let selectedType = e.target.dataset.text
        console.log(selectedType)
        if(selectedType){
            setAccType(selectedType)
        }
    }

    // forget business Id
    let handleForgotId=()=>{
        setisforgetId(true)

       
    }

    let handleSubmit=(e)=>{
        e.preventDefault()
    }


  return (
    <div   className={`closeform ${isClosing ? "fadeOut" : "fadeIn"}`} onClick={handleOverlay}>

        { isforgetId && <ForgotWorkId/>}

        <div className={`register ${isClosing ? "scaleOut" : "scaleIn"}`}>
          <section className="register_visual">
            <img
              src={`${accType=='personal' ? registration_img : business_img }`}
              alt="Registration Visual"
              className="register_visual-image"
            />
            <div className="register_visual-overlay">
              <h1 className="register_title">{accType=="personal"? "Your journey awaits!" : "Join with us"}</h1>
            </div>
          </section>

          <section className="register_form-section">
            <div className="register_form-wrapper">
              
              <div className="register_account-type" onClick={handleAccType}>
                <button data-text={'personal'} className={`register_tab ${accType=='personal'? 'register_tab--active':""}`}>Personal Account</button>
                <button data-text={'business'} className={`register_tab ${accType=='business'? 'register_tab--active':""}`}>Business Account</button>
              </div>

              {accType=='personal'?(
                <>
                  <form className="register_form" onSubmit={handleSubmit}>
                  <div className="register_field">
                    <label htmlFor="email" className="register_label">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="register_input"
                      placeholder="Enter your email"
                    />
                  </div>
              
                  <button type="submit" className="register_button">Continue</button>
                 </form>

                 <p className="register_alt-login">Or login/signup with mobile</p>

                 {/* Alternate Login */}
                 <div className="register_divider">
                   <span>or login/signup with</span>
                 </div>

                 <div className="register_social">
                   <button className="register_social-btn">Google</button>
                   <button className="register_social-btn">Facebook</button>
                 </div>
                </>)  :  (<>
                <form className='buisness-register'>
                    <h2>Login/Signup</h2>
                    <div className='credWrapper'>
                       <div className='forgetIdDiv'> 
                          <span className='emailLabel'>WorkEmail</span> 
                          <p className='labelForgetId' onClick={handleForgotId}>Forget Login Id?</p>
                       </div>
                       <div className='inputEmailWrapper'>
                          <input type="email" placeholder='enter your work email' />
                          <button type='submit'>Continue</button>
                       </div>
                    </div>
                </form>

                <p className='or-business'>Or use your buisness account with</p>
                <span className='googleLogin'>Google</span>

                </>)}
              
            </div>
          </section>
        </div>
    </div>   
  );
}
