// css
import '../../assets/styles/components_styles/secondary_navbar.css'

import secondaryLogo from '../../assets/images/photos/secondaryNavLogo.png'



function SecondaryNavbar() {

  return (
    <div className="secondaryNavWrapper">

        <div className="navBox">
            <div className="webLogo">
                <img src={secondaryLogo} alt="" />
                <h1>AIRHORSE</h1>
            </div>

            <div className='serviceTypes'>

                <span data-link="flights" className='links' >Flights</span>
                <span data-link="hotels" className='links' >Hotels</span>
                <span data-link="cabs" className='links' >Cabs</span>
               
            </div>

            <div className='userInfo'>
               <span></span>
            </div>

        </div>


    </div>
  )
}

export default SecondaryNavbar