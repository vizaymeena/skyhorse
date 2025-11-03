import React, { useState } from 'react'
import '../../assets/styles/components_styles/multicity.css'

import { ChevronDown } from 'lucide-react';

function MultiCityQueryCard({
    tripData,setTripData,
    anCityFrom,anCityTo,
    isAnotherCityActive,setAnotherCityActive,
    onPassenger
    }) {


   
  return (
    <>
    <div className='multiCityCardWrapper'>
    {/* CITY ONE */}
     <div className='parentCity'>
         {/* Another City From */}
        <div className='cityOneBox' onClick={()=>setIsActiveFrom(true)}>
            <div className='fromBox'>
                <span className='title'>From</span>
                <h4>Delhi</h4>
                <p>DEL-Indira Gandhi Airport</p>
            </div>
            {anCityFrom && (
                <>
                <div className='suggestionBox'>
                    <input type="text" placeholder='Search' />

                    <h1>SUGESSTIONS</h1>
                    <div className='suggestedAirports'>
                        <div>
                            <div><span>MUMBAI</span> <span>DEL</span></div>
                            <span>Indira Gandhi Airport</span> 
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>

        {/* Another City To */}
        <div className='ToBox' onClick={()=>setIsActiveTo(true)}>
                <span className='title'>From</span>
                <h4>Delhi</h4>
                <p>DEL-Indira Gandhi Airport</p>
            </div>
            {anCityTo && (
                <>
                <div className='suggestionBox'>
                    <input type="text" placeholder='Search' />

                    <h1>SUGESSTIONS</h1>
                    <div className='suggestedAirports'>
                        <div>
                            <div><span>MUMBAI</span> <span>DEL</span></div>
                            <span>Indira Gandhi Airport</span> 
                        </div>
                    </div>
                </div>
                </>
            )}

        {/* Departure */}
        <div className="fieldBox">
          <span className='heading'>Departure <ChevronDown size={16} color='blue'/> </span>
          <input
            type="date"
           value={tripData?.multicity?.multiTripData?.[0]?.departure_date || ""}

            onChange={(e) => setDepartureDate(e.target.value)}
          />
          {tripData?.multicity?.multiTripData?.[0]?.departure_date || "" && <span className="date-display">{formatDate(tripData?.multicity?.multiTripData?.[0]?.departure_date || "")}</span>}
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
     </div>
    

    {/* City Two */}
     <div className='parentCity parentCityTwo'>
         {/* Another City From */}
        <div className='cityOneBox' onClick={()=>setIsActiveFrom(true)}>
            <div className='fromBox'>
                <span className='title'>From</span>
                <h4>Delhi</h4>
                <p>DEL-Indira Gandhi Airport</p>
            </div>
            {anCityFrom && (
                <>
                <div className='suggestionBox'>
                    <input type="text" placeholder='Search' />

                    <h1>SUGESSTIONS</h1>
                    <div className='suggestedAirports'>
                        <div>
                            <div><span>MUMBAI</span> <span>DEL</span></div>
                            <span>Indira Gandhi Airport</span> 
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>

        {/* Another City To */}
        <div className='ToBox' onClick={()=>setIsActiveTo(true)}>
                <span className='title'>From</span>
                <h4>Delhi</h4>
                <p>DEL-Indira Gandhi Airport</p>
            </div>
            {anCityTo && (
                <>
                <div className='suggestionBox'>
                    <input type="text" placeholder='Search' />

                    <h1>SUGESSTIONS</h1>
                    <div className='suggestedAirports'>
                        <div>
                            <div><span>MUMBAI</span> <span>DEL</span></div>
                            <span>Indira Gandhi Airport</span> 
                        </div>
                    </div>
                </div>
                </>
            )}    

        {/* Departure */}
        <div className="fieldBox">
          <span className='heading'>Departure <ChevronDown size={16} color='blue'/> </span>
          <input
            type="date"
            value={tripData?.multicity?.multiTripData?.[0]?.departure_date || ""}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          {tripData?.multicity?.multiTripData?.[0]?.departure_date || '' && <span className="date-display">{formatDate(tripData?.multicity?.multiTripData?.[0]?.departure_date || '')}</span>}
        </div>

        <div className='AnotherCityButton' onClick={()=>isAnotherCityActive(true)}>
           {setAnotherCityActive ? "X":  <button>Add Another City</button>}
        </div>
     </div>

     {isAnotherCityActive && (<>

     <div className='parentCity parentCityTwo'>
         {/* Another City From */}
        <div className='cityOneBox' onClick={()=>setIsActiveFrom(true)}>
            <div className='fromBox'>
                <span className='title'>From</span>
                <h4>Delhi</h4>
                <p>DEL-Indira Gandhi Airport</p>
            </div>
            {anCityFrom && (
                <>
                <div className='suggestionBox'>
                    <input type="text" placeholder='Search' />

                    <h1>SUGESSTIONS</h1>
                    <div className='suggestedAirports'>
                        <div>
                            <div><span>MUMBAI</span> <span>DEL</span></div>
                            <span>Indira Gandhi Airport</span> 
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>

        {/* Another City To */}
        <div className='ToBox' onClick={()=>setIsActiveTo(true)}>
                <span className='title'>From</span>
                <h4>Delhi</h4>
                <p>DEL-Indira Gandhi Airport</p>
            </div>
            {anCityTo && (
                <>
                <div className='suggestionBox'>
                    <input type="text" placeholder='Search' />

                    <h1>SUGESSTIONS</h1>
                    <div className='suggestedAirports'>
                        <div>
                            <div><span>MUMBAI</span> <span>DEL</span></div>
                            <span>Indira Gandhi Airport</span> 
                        </div>
                    </div>
                </div>
                </>
            )}    

        {/* Departure */}
        <div className="fieldBox">
          <span className='heading'>Departure <ChevronDown size={16} color='blue'/> </span>
          <input
            type="date"
            value={tripData.multicity[0].multiTripData[0]?.departure_date || ''}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          {departureDate && <span className="date-display">{formatDate(tripData.multicity[0].multiTripData[0]?.departure_date || '')}</span>}
        </div>

       </div>
     
     </>)}
        

    </div>
    </>
  )
}

export default MultiCityQueryCard