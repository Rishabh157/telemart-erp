import React, { useState } from "react";
import LocationListView from "../../sharedComponents/LocationListView";
import AddCountryWrapper from "../add/AddCountryWrapper";
import {
  setSearchValue,
  setSelectedCountry,
  setSelectedLocationCountry,
} from "src/redux/slices/countrySlice";
import { useDispatch, useSelector } from "react-redux";
import { red } from "@mui/material/colors";
import { RootState } from "src/redux/store";
import { setFilterValue } from "src/redux/slices/statesSlice";

type Props = {
  contries: any[];
  items: any;
};

const CountryListing = ({ contries, items }: Props) => {
  const dispatch = useDispatch();
  const [isOpenAddForm, setisOpenAddForm] = useState(false);
  const { selectedLocationCountries }: any = useSelector(
    (state: RootState) => state.country
  );

  function handleCountryClick(newValue: any) {
    if (selectedLocationCountries?.value === newValue.value) {
      dispatch(setSelectedLocationCountry(null));
      dispatch(setFilterValue(""));
    } else {
      dispatch(setSelectedLocationCountry(newValue));
      dispatch(setFilterValue(newValue.value));
    }
  }

  return (
    <>
      <LocationListView
        listHeading="Country"
        listData={contries}
        onAddClick={() => {
          setisOpenAddForm(true);
        }}
        onListItemClick={(newValue) => {
          handleCountryClick(newValue);
        }}
        disabled={false}
      />
      {isOpenAddForm && (
        <AddCountryWrapper onClose={() => setisOpenAddForm(false)} />
      )}
    </>
  );
};

export default CountryListing;
