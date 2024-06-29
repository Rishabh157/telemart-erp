// |-- Types --|
import React from 'react'

// |-- External Dependencies --|
import AreaListingWrapper from './area/list/AreaListingWrapper'
import CountryListingWrapper from './country/list/CountryListingWrapper'
import DistrictListingWrapper from './district/list/DistrictListingWrapper'
import PincodeListingWrapper from './pincode/list/PincodeListingWrapper'
import StateListingWrapper from './state/list/StateListingWrapper'
import TehsilListingWrapper from './tehsil/list/TehsilListingWrapper'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const Locations = () => {
    return (
        <div className="w-full h-full flex gap-4  p-3 overflow-auto">
            {/* Country */}
            <div className=" h-full">
                {isAuthorized(UserModuleNameTypes.ACTION_COUNTRY_LIST) && (
                    <CountryListingWrapper />
                )}
            </div>

            {/* State */}
            <div className=" h-full ">
                {isAuthorized(UserModuleNameTypes.ACTION_STATE_LIST) && (
                    <StateListingWrapper />
                )}
            </div>

            <div className=" h-full">
                {isAuthorized(UserModuleNameTypes.ACTION_DISTRICTS_LIST) && (
                    <DistrictListingWrapper />
                )}
            </div>

            <div className=" h-full">
                {isAuthorized(UserModuleNameTypes.ACTION_TEHSILS_LIST) && (
                    <TehsilListingWrapper />
                )}
            </div>

            <div className=" h-full">
                {isAuthorized(UserModuleNameTypes.ACTION_PINCODES_LIST) && (
                    <PincodeListingWrapper />
                )}
            </div>

            <div className=" h-full">
                {isAuthorized(UserModuleNameTypes.ACTION_AREA_LIST) && (
                    <AreaListingWrapper />
                )}
            </div>
        </div>
    )
}

export default Locations
