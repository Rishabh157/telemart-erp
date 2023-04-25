import React, { useState } from "react";
import LocationListView from "../../sharedComponents/LocationListView";
import AddTehsilWrapper from "../add/AddTehsilWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import {
  setSearchValue,
  setSelectedLocationTehsil,
} from "src/redux/slices/tehsilSlice";
import { setFilterValue } from "src/redux/slices/pincodeSlice";

type Props = {
  tehsils: any[];
};

const TehsilListing = ({ tehsils }: Props) => {
  const dispatch = useDispatch();

  const { searchValue }: any = useSelector((state: RootState) => state.tehsils);
  const { selectedLocationTehsil }: any = useSelector(
    (state: RootState) => state.tehsils
  );
  const { selectedLocationDistrict }: any = useSelector(
    (state: RootState) => state.district
  );
  const [isOpenAddForm, setisOpenAddForm] = useState(false);
  function handleCountryClick(newValue: any) {
    if (selectedLocationTehsil?.value === newValue.value) {
      dispatch(setSelectedLocationTehsil(null));
      dispatch(setFilterValue(""));
    } else {
      dispatch(setSelectedLocationTehsil(newValue));
      dispatch(setFilterValue(newValue.value));
    }
  }

  return (
    <>
      <LocationListView
        listHeading="Tehsils"
        searchValue={searchValue}
        OnSearchChange={(newValue) => {
          setSearchValue(newValue);
        }}
        listData={tehsils}
        onAddClick={() => {
          setisOpenAddForm(true);
        }}
        onListItemClick={(newValue) => {
          handleCountryClick(newValue);
        }}
        disabled={selectedLocationDistrict === null}
      />
      {isOpenAddForm && (
        <AddTehsilWrapper onClose={() => setisOpenAddForm(false)} />
      )}
    </>
  );
};

export default TehsilListing;
