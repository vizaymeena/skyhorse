import React, { useState,useEffect } from "react";
import "../../assets/styles/components_styles/passengerclass.css";
import { Plus, Minus, X } from "lucide-react";

const PassengerSelector = ({
    onClose,adults,children,infants,setAdults,setChildren,setInfants,setTravelClass,travelClass,totalTravellers
    }) => {

    // states
    let [selectedAdults,setSelectedAdults] = useState(adults || 1)
    let [selectedChilds,setSelectedChilds] = useState(0)
    let [selectedInfants,setSelectedInfants] = useState(0)
    let [selectedClass,setSelectedClass] = useState("economy")


     
    totalTravellers = (adults ? adults : 1 ) + (children || 0) + (infants || 0)
    useEffect(()=>{
        console.log(totalTravellers)
    },[adults,infants,children,travelClass])

    console.log(totalTravellers)
    // handle adults count
    function handleAdults(e){
        let selectedAdult = e.target.closest("span")
        if(!selectedAdult) return

        setSelectedAdults(selectedAdult.textContent) // to highlight the default adult 
        setAdults(parseInt(selectedAdult.textContent))
    }
    console.log("local Adults",selectedAdults)
    console.log(adults);

    function handleChildren(e){
        let selectedChildren = e.target.closest("span")
        if(!selectedChildren) return
        setSelectedChilds(selectedChildren.text

        )
        setChildren(parseInt(selectedChildren.textContent))
    }
    console.log("local Childrens",selectedChilds)
    console.log(children)

    function handleInfants(e){
        let selectedInfants = e.target.closest("span")
        if(!selectedInfants) return
        setSelectedInfants(selectedInfants.text

        )
        setInfants(parseInt(selectedInfants.textContent))
    }
    console.log("local Infants",selectedInfants)
    console.log(infants)

    function handleClass(e){
        let selectedClass = e.target.dataset.text
        if(!selectedClass) return
        setSelectedClass(selectedClass)
        setTravelClass(selectedClass)
    }
    console.log(travelClass)
        
    // close the overlaying passenger card
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
            <div className="adult-count" onClick={handleAdults}>
                {["1",'2','3','4','5','6','7','8','9'].map((adult,index)=>(
                    <span className={selectedAdults==adult ? "selected" : '' }  key={index}>{adult}</span>
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
              <div className="children-count" onClick={handleChildren}>
                  {['0',"1",'2','3','4','5','6'].map((children,key)=>(
                      <span className={selectedChilds==children ? 'selected' : ''} key={key}>{children}</span>
                  ))}
  
              </div>
           </div>
            
            {/* Infants */}
           <div className="infantsWrapper">
             <div className="infants-cat">
                  <h4>Children (2y-12y)</h4>
                  <p>on the day of travel</p>
              </div>
              <div className="infants-count" onClick={handleInfants}>
                  {['0',"1",'2','3','4','5','6'].map((infants,key)=>(
                      <span className={selectedInfants==infants ? 'selected' : ''} key={key}>{infants}</span>
                  ))}
  
              </div>
           </div>

        </div>

        <div className="classCategory">
            <h4>Choose Travel CLass</h4>
            <div className="cat-options" onClick={handleClass}>
                <span className={selectedClass=="economy" ? "selected":''} data-text="economy">Economy</span>
                <span className={selectedClass=="business"? "selected":''}  data-text="business">Buisness</span>
                <span className={selectedClass=="firstclass"? "selected":''}  data-text="firstclass">First Class</span>
            </div>
        </div>
        <div className="submitData">
            <div className="passData">
                <div className='passCategory'>
                    <p>Adults : {adults}</p>
                    <p>Children: {children}</p>
                    <p>Infants : {infants}</p>
                </div>
                <div className="passClass">
                   <p> CLASS : {travelClass.toUpperCase()}</p>
                </div>
            </div>
            
            <button>Apply</button>
        </div>
    </div>
    
    </>
  );
};

export default PassengerSelector;
