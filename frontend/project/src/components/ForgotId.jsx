

import '../assets/styles/components_styles/forgot_id.css'
function ForgotWorkID({setisforgetId}) {
  return (
    <div className="forgotId-overlay">
      <div className="forgotId-modal">
        <button className="forgotId-back" onClick={()=>setisforgetId(false)}>Back</button>

        <h2 className="forgotId-title">We Are Here To Help</h2>

        <p className="forgotId-description">
          If your mobile no. is already verified with myBiz, enter it below to login.
        </p>

        <div className="forgotId-credentials">
          <div className="forgotId-input-group">
            <span className="forgotId-country">INDIA</span>
            <span className="forgotId-code">+91</span>
            <input type="text" placeholder="Enter Your Mobile number" autoFocus className="forgotId-input" />
          </div>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default ForgotWorkID;
