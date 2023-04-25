import React, { useState } from "react";
import LocationListView from "../../sharedComponents/LocationListView";
import AddPincodeWrapper from "../add/AddPincodeWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { setFilterValue } from "src/redux/slices/areaSlice";
import { setSearchValue, setSelectedLocationPincode } from "src/redux/slices/pincodeSlice";

type Props = {
  pincodes: any[];
};

const PincodeListing = ({ pincodes }: Props) => {
  const [isOpenAddForm, setisOpenAddForm] = useState(false);
  const dispatch=useDispatch()
  const {searchValue}:any=useSelector((state:RootState)=>state.pincode)
  const {selectedLocationTehsil}:any=useSelector((state:RootState)=>state.tehsils)
  const {selectedLocationPincode}:any=useSelector((state:RootState)=>state.pincode)
  
  function handleCountryClick(newValue: any) {
    if(selectedLocationPincode?.value === newValue.value)
    {
        dispatch(setSelectedLocationPincode(null)); 
        dispatch(setFilterValue(""))
    }
    else{
         dispatch(setSelectedLocationPincode(newValue));
        dispatch(setFilterValue(newValue.value))

       
    }
}



  return (
    <>
      <LocationListView
        listHeading="Pincodes"
        OnSearchChange={(newValue)=>dispatch(setSearchValue(newValue))}

        searchValue={searchValue}
        listData={pincodes}
        onAddClick={() => {
          setisOpenAddForm(true);
        }}
        onListItemClick={(newValue) => {
            handleCountryClick(newValue)      
          }}
         
        disabled={selectedLocationTehsil=== null}
      />
      {isOpenAddForm && (
        <AddPincodeWrapper onClose={() => setisOpenAddForm(false)} />
      )}
    </>
  );
};

export default PincodeListing;
