import React, { useState } from "react";
import "../../assets/styles/components_styles/passengerclass.css";
import { Plus, Minus, X } from "lucide-react";

const PassengerSelector = ({
    onClose,adults,children,infants,setAdults,setChildren,setInfants,setTravelClass,travelClass,totalTravellers
}) => {


    function closeCard(){
        onClose()
    }


  return (
    <>
    <div className="passenger-card" onClick={(e)=>e.stopPropagation()}>
        {/* Adults */}
        <div className="adult-sect"> 
            <div className="closePassengerCard"> <X onClick={closeCard}/> </div> {/* close card */}
            <div className="adult-cat">
                <h4>Adults (12y+)</h4>
                <p>on the day of travel</p>
               
            </div>
            <div className="adult-count">
                {["1",'2','3','4','5','6','7','8','9'].map((adult,index)=>(
                    <span key={index}>{adult}</span>
                ))}
            </div>
        </div>
        
        {/* Children */}
        <div className="childrenInfants-sect">
           <div className="childrenWrapper">
              <div className="children-cat">
                  <h4>Children (2y-12y)</h4>
                  <p>on the day of travel</p>
              </div>
              <div className="children-count">
                  {['0',"1",'2','3','4','5','6'].map((children,key)=>(
                      <span key={key}>{children}</span>
                  ))}
  
              </div>
           </div>
            
            {/* Infants */}
           <div className="infantsWrapper">
             <div className="infants-cat">
                  <h4>Children (2y-12y)</h4>
                  <p>on the day of travel</p>
              </div>
              <div className="infants-count">
                  {['0',"1",'2','3','4','5','6'].map((children,key)=>(
                      <span key={key}>{children}</span>
                  ))}
  
              </div>
           </div>

        </div>

        <div className="classCategory">
            <h4>Choose Travel CLass</h4>
            <div className="cat-options">
                <span>Economy</span>
                <span>Premium Economy</span>
                <span>Buisness</span>
                <span>First Class</span>
            </div>
        </div>
        <div><button>Apply</button></div>
    </div>
    
    </>
  );
};

export default PassengerSelector;
