import React from 'react'
import ConfigurationLayout from '../../ConfigurationLayout'
import AreaListingWrapper from './area/list/AreaListingWrapper'
import CountryListingWrapper from './country/list/CountryListingWrapper'
import DistrictListingWrapper from './district/list/DistrictListingWrapper'
import PincodeListingWrapper from './pincode/list/PincodeListingWrapper'
import StateListingWrapper from './state/list/StateListingWrapper'
import TehsilListingWrapper from './tehsil/list/TehsilListingWrapper'

const Locations = () => {
    return (
        <ConfigurationLayout>
            <div className='w-full h-full flex gap-4  p-3 overflow-auto' >

                {/* Country */}
                <div className=' h-full' >
                    <CountryListingWrapper />
                </div>

                {/* State */}
                <div className=' h-full ' >
                    <StateListingWrapper />
                </div>

                <div className=' h-full' >
                    <DistrictListingWrapper />
                </div>

                <div className=' h-full' >
                    <TehsilListingWrapper />
                </div>

                <div className=' h-full' >
                    <PincodeListingWrapper />
                </div>

                <div className=' h-full' >
                    <AreaListingWrapper />
                </div>


            </div>
        </ConfigurationLayout>
    )
}

export default Locations
