import React, { useState } from "react";
import LocationListView from "../../sharedComponents/LocationListView";
import AddAreaWrapper from "../add/AddAreaWrapper";
import { useSelector, useDispatch} from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { setSearchValue, setSelectedLocationArea } from "src/redux/slices/areaSlice";


type Props = {
  areas: any[];
};

const AreaListing = ({ areas }: Props) => {
  const [isOpenAddForm, setisOpenAddForm] = useState(false);
  const dispatch=useDispatch()
  const {searchValue}:any=useSelector((state:RootState)=>state.areas)
  const {selectedLocationPincode}:any=useSelector((state:RootState)=>state.pincode)
  const {selectedLocationArea}:any=useSelector((state:RootState)=>state.areas)

  function handleCountryClick(newValue: any) {
    if(selectedLocationArea?.value === newValue.value)
    {
        dispatch(setSelectedLocationArea(null)); 
    }
    else{
         dispatch(setSelectedLocationArea(newValue));
     
    }
}


  
  
  return (
    <>
      <LocationListView
        listHeading="Area"
        searchValue={searchValue}
        OnSearchChange={(newValue)=>{setSearchValue(newValue)}}
        listData={areas}
        onAddClick={() => {
          setisOpenAddForm(true);
        }}
        onListItemClick={(newValue) => {
          handleCountryClick(newValue)      
      }}
      disabled={selectedLocationPincode === null}

      />

      {isOpenAddForm && (
        <AddAreaWrapper onClose={() => setisOpenAddForm(false)} />
      )}
    </>
  );
};

export default AreaListing;
