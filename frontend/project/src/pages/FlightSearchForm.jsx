import React, { useState } from 'react'
import '../assets/styles/pages_styles/flight_widget.css'

// icons
import { Check, ArrowRightLeft ,ChevronDown } from 'lucide-react'

import PassengerSelector from '../components/flightform/PassengerClass'
import MultiCityQueryCard from '../components/flightform/MultiCity'

function FlightSearchForm() {

  // trip segment
  let [tripSegment, setTripSegment] = useState("oneway")

  // add return date in the field if tripsegment is equal to return date
  let [tripData,setTripData] = useState({
    "oneway_rtn":{from:"",to:"",departure_date:"",
      ...(tripSegment=="return" && {return_date:''}),
      class:"",passenger:null},
   
    "multicity":{class:"",passenger:null, 
        multiTripData:[{ from:'',to:'',departure_date:''}]
    }
  })


  // multicity
  let [anCityFrom,setIsActiveFrom] = useState(false);
  let [anCityTo,setIsActiveTo] = useState(false)
  let [isAnotherCityActive,setAnotherCityActive] = useState(false)
  let [anotherCitySuggestion,setAnotherCitySuggestion] = useState(false)

  // passenger & class
  let [adults, setAdults] = useState(1)
  let [children, setChildren] = useState(0)
  let [infants, setInfants] = useState(0)
  let [travelClass, setTravelClass] = useState("Economy")
  let totalTravellers = adults + children + infants
  let  [onPassenger,setClosePassenger]=useState(false)

 


  // suggestion
  let [showFromSuggestion,setFromSuggestion] = useState(false)
  let [showToSuggestion,setToSuggestion] = useState(false)


  let airports = [
    { airport: "Indira Gandhi Airport", code: "DEL", city: "Delhi" },
    { airport: "Chhatrapati Shivaji Airport", code: "MUM", city: "Mumbai" },
    { airport: "Raja Bhoj Airport", code: "BPL", city: "Bhopal" },
    { airport: "Sarrojninaidu International Airport", code: "IDR", city: "Indore" },
    { airport: "Kampengonda International  Airport", code: "BLR", city: "Bengaluru" },
    { airport: "Tirupati Airport", code: "TRP", city: "Tirupati" },


  ]

  function selectSegment(e) {
    let segment = e.target.closest("[data-text]")
    if (!segment) return
    setTripSegment(segment.dataset.text)
  }

  // Format date like "Tuesday, 22 Oct"
  function formatDate(dateStr) {
    if (!dateStr) return null
    let date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    })
  }

  // Route Logic
  // Select From
  let selectFrom=()=>{
    setFromSuggestion(true)
  }
  // select To
  let selectTo=()=>{
    setToSuggestion(true)
  }

  // close suggestion
  function closeFromSuggestion(e){
    e.stopPropagation()
    setFromSuggestion(false)
   
  }
   // close suggestion
  function closeToSuggestion(e){
    e.stopPropagation()
    setToSuggestion(false)
  }

  return (
    <div className="flight-widget">
      {(tripSegment=="oneway" || "return") &&
      <>
      <div className="flight-segment" onClick={selectSegment}>

        {["oneway", "return", "multicity"].map((type) => (
          <div key={type} className="segment-type" data-text={type}>
            <span className="radio">{tripSegment === type && <Check size="14px" />}</span>
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
        ))}
      </div>

      {/* Destination selection */}
      <div className="destination-widget">
       {(tripSegment=="oneway" || tripSegment =="return") ? <>
         <div className="fieldBox fieldBoxFrom" onClick={selectFrom}>
          <span className='heading'>From</span>
          <h4>{airports[0].city}</h4>
          <span>{airports[0].code} - {airports[0].airport}</span>
          
          {/* Recent Searches Suggestion */}
           {showFromSuggestion &&(<div className='recent-searches'>

              <div className='search-input'>
                <input type="text" placeholder='FROM' />

                 <h4>RECENT SEARCHES</h4>
              </div>
              <div className='suggestions'>
              {airports.map((ap,key)=>(
              
                <div key={key} className='box'>
                  <div className='suggested'><span className='city'>{ap.city}</span> <span className='code'>{ap.code}</span></div>
                  <p>{ap.airport}</p>
                </div>
              ))}
                <div className='closeSuggestion'><span onClick={closeFromSuggestion}>Back</span></div>
              </div>
            </div>)}

        </div>

        <span className="swap-icon"><ArrowRightLeft size={30} /></span>

        <div className="fieldBox fieldBoxTo" onClick={selectTo}>
          <span className='heading'>To</span>
          <h4>{airports[1].city}</h4>
          <span>{airports[1].code} - {airports[1].airport}</span>

          {/* Recent Searches Suggestion */}
           {/* Recent Searches Suggestion */}
           {showToSuggestion &&(<div className='recent-searches'>

              <div className='search-input'>
                <input type="text" placeholder='TO' />

                 <h4>Suggestions</h4>
              </div>
              <div className='suggestions'>
              {airports.map((ap,key)=>(
              
                <div key={key} className='box'>
                  <div className='suggested'><span className='city'>{ap.city}</span> <span className='code'>{ap.code}</span></div>
                  <p>{ap.airport}</p>
                </div>
              ))}
              </div>

              <div className='closeSuggestion'><span onClick={closeToSuggestion}>Back</span></div>
            </div>)}

        </div>

        {/* Departure */}
        <div className="fieldBox">
          <span className='heading'>Departure <ChevronDown size={16} color='blue'/> </span>
          <input
            type="date"
            value={tripSegment=="oneway" && tripData?.oneway_rtn?.departure_date || ""}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          {tripData.oneway_rtn.departure_date && <span className="date-display">{formatDate(tripData?.oneway_rtn?.departure_date || "")}</span>}
        </div>

        {/* Return */}
       
  
        <div className="fieldBox">
          <span className='heading'>Return <ChevronDown size={16} color='blue'/> </span>
          {tripSegment === "return" ? (
            <>
              <input
                type="date"
                 value={tripSegment=="oneway" && tripData?.oneway_rtn?.return_date || ''}
                onChange={(e) => setReturnDate(e.target.value)}
              />
              {tripData?.oneway_rtn?.return_date && <span className="date-display">{formatDate(tripData?.oneway_rtn?.return_date)}</span>}
            </>
          ) : (
            <p>Tap to add a return date for bigger discount </p>
          )}
        </div>
      {/* Passenger & Class */}
        <div className='fieldBox fieldBoxPassenger' onClick={()=>setClosePassenger(true)}>
          <span className='Heading'>Traveller & Class <ChevronDown size={16} color='blue' /></span>
          <div className='h3'><span className='passenger-count'>{1} </span><span className='class'>Traveller</span></div>
          {onPassenger && (
             <>
               {/* Overlay that closes card when clicked */}
               <div className="passenger-overlay" onClick={(e) => {
                e.stopPropagation()
                setClosePassenger(false)
               }}> </div>
   
               {/* The card itself */}
               <div className="passengerSelecterOverlay">
                 <PassengerSelector 
                   adults={adults} children={children} infants={infants}
                   setAdults={setAdults} setChildren={setChildren} setInfants={setInfants}
                   setTravelClass={setTravelClass} travelClass={travelClass}
                   totalTravellers={totalTravellers}
                   onClose={() => setClosePassenger(false)} // pass close handler down
                 />
               </div>
             </>
           )}
        </div>
        </>
       : 
      
       (
       
       <MultiCityQueryCard
       tripData ={tripData}
       setTripData={setTripData}
       anCityFrom={anCityFrom} anCityTo={anCityTo}
       isAnotherCityActive={isAnotherCityActive} setAnotherCityActive={setAnotherCityActive}
       onPassenger={onPassenger}
       />
       )}

      </div>
     </>
      }
    </div>


  )
}

export default FlightSearchForm
