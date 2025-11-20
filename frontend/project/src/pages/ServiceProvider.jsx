import React from "react";
import "../assets/styles/pages_styles/registerbusiness.css";
import { useState } from "react"
export function ServiceProvider({ setShowSpr }) {

    let [formData,setFormData] = useState({
        email:"", contact:"",password:"",confirmpassword:"",gstnumber:""
    })

    let handleBusiness=(e)=>{
        let {name,value} = e.target

        setFormData((prev)=>({...prev,[name]:value}))

        
    }


  return (
    <div className="overlay" onClick={() => setShowSpr(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Register Your Business</h2>

        <form className="form-grid" onChange={handleBusiness}>
          <div className="input-box">
            <label>Business Email</label>
            <input name="email" defaultValue={formData.email || ""} placeholder="Enter business email" />
          </div>

          <div className="input-box">
            <label>Contact Number</label>
            <input name="contact" defaultValue={formData.contact || ""} placeholder="Enter contact number" />
          </div>

          <div className="input-box">
            <label>Password</label>
            <input name="password" defaultValue={formData.password || ""} type="password" placeholder="Enter password" />
          </div>

          <div className="input-box">
            <label>Confirm Password</label>
            <input name="confirmpassword" defaultValue={formData.confirmpassword || ""} type="password" placeholder="Re-enter password" />
          </div>

          <div className="input-box">
            <label>GSTIN Number</label>
            <input name="gstnumber" defaultValue={formData.gstnumber || ""} placeholder="Enter GSTIN" />
          </div>
          <button type="submit" className="google-btn">REGISTER</button>
        </form>

      </div>
    </div>
  );
}
