import React, { useState } from "react";
import LocationListView from "../../sharedComponents/LocationListView";
import AddDistrictWrapper from "../add/AddDistrictWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { setSearchValue, setSelectedLocationDistrict } from "src/redux/slices/districtSlice";
import { setFilterValue } from "src/redux/slices/tehsilSlice";

type Props = {
  districts: any[];
};

const DistrictListing = ({ districts }: Props) => {
  const [isOpenAddForm, setisOpenAddForm] = useState(false);
  const dispatch=useDispatch()
  const {searchValue}:any=useSelector((state:RootState)=>state.district)
  const {selectedLocationState}:any=useSelector((state:RootState)=>state.states)
  const {selectedLocationDistrict}:any=useSelector((state:RootState)=>state.district)
  
  function handleCountryClick(newValue: any) {
    if(selectedLocationDistrict?.value === newValue.value)
    {
        dispatch(setSelectedLocationDistrict(null)); 
        dispatch(setFilterValue(""))
    }
    else{
         dispatch(setSelectedLocationDistrict(newValue));
        dispatch(setFilterValue(newValue.value))

       
    }
}


  return (
    <>
      <LocationListView
        listHeading="Districts"
        searchValue={searchValue}
        OnSearchChange={(newValue)=>dispatch(setSearchValue(newValue))}
        listData={districts}
        onAddClick={() => {
          setisOpenAddForm(true);
        }}
        
        onListItemClick={(newValue) => {
          handleCountryClick(newValue)      
        }}
        disabled={  selectedLocationState === null}

      />

      {isOpenAddForm && (
        <AddDistrictWrapper onClose={() => setisOpenAddForm(false)} />
      )}
    </>
  );
};

export default DistrictListing;
