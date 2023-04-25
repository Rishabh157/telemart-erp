import React, { useState } from "react";
import LocationListView from "../../sharedComponents/LocationListView";
import AddStateWrapper from "../add/AddStateWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { setSearchValue, setSelctedLocationState } from "src/redux/slices/statesSlice";
import { setFilterValue } from "src/redux/slices/districtSlice";

type Props = {
  states: any[];
};

const StateListing = ({ states }: Props) => {
const dispatch=useDispatch()
  const [isOpenAddForm, setisOpenAddForm] = useState(false);
  const {searchValue}:any=useSelector((state:RootState)=>state.states)
  const {selectedLocationCountries}:any=useSelector((state:RootState)=>state.country)
  const {selctedLocationState}:any=useSelector((state:RootState)=>state.states)

  function handleCountryClick(newValue: any) {
    if(selctedLocationState?.value === newValue.value)
    {
        dispatch(setSelctedLocationState(null)); 
        dispatch(setFilterValue(""))
    }
    else{
         dispatch(setSelctedLocationState(newValue));
         dispatch(setFilterValue(newValue.value))

       
    }
}


  return (
    <>
      <LocationListView
        searchValue={searchValue}
        OnSearchChange={(newValue)=>dispatch(setSearchValue(newValue))}
        listHeading="States"
        listData={states}
        onAddClick={() => {
          setisOpenAddForm(true);
        }}
        onListItemClick={(newValue) => {
            handleCountryClick(newValue)      
        }}
        disabled={  selectedLocationCountries === null}


      />

      {isOpenAddForm && (
        <AddStateWrapper onClose={() => setisOpenAddForm(false)} />
      )}
    </>
  );
};

export default StateListing;
