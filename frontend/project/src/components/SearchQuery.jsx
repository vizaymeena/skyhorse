import React from 'react'

// css
import '../assets/styles/components_styles/search_query.css'

import { Plane, Car, Hotel } from "lucide-react";

function SearchQuery() {
  return (
    <div className='searchSegmentBox'>
        <div className='segmentBox'>

            <div data-text={'flights'} className='segment'>
                <span className='icon'><Plane/></span>
                <span className='service'>Flights</span>
            </div>

            <div data-text={'cabs'} className='segment'>
                <span className='icon'><Car/></span>
                <span className='service'>Cabs</span>
            </div>

            <div data-text={'hotels'} className='segment'>
                <span className='icon'><Hotel/></span>
                <span className='service'>Hotels</span>
            </div>
        </div>
    </div>
  )
}

export default SearchQuery