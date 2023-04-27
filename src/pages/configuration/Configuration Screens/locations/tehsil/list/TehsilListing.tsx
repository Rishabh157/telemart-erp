import React, { useState } from "react";
import LocationListView from "../../sharedComponents/LocationListView";
import AddTehsilWrapper from "../add/AddTehsilWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import {
  setSearchValue,
  setSelectedLocationTehsil,
} from "src/redux/slices/tehsilSlice";
import {
  setFilterValue,
  setSelectedLocationPincode,
} from "src/redux/slices/pincodeSlice";
import { setFilterValue as setAreaFilterValue } from "src/redux/slices/areaSlice";
import { showToast } from "src/utils";
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
      dispatch(setSelectedLocationPincode(null));

      dispatch(setFilterValue(""));
      dispatch(setAreaFilterValue(""));
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
          if (selectedLocationDistrict === null) {
            showToast("error", "Please select district");
          } else {
            setisOpenAddForm(true);
          }
        }}
        onListItemClick={(newValue) => {
          if (selectedLocationDistrict !== null) {
            handleCountryClick(newValue);
          }
        }}
        disabled={false}
      />
      {isOpenAddForm && (
        <AddTehsilWrapper onClose={() => setisOpenAddForm(false)} />
      )}
    </>
  );
};

export default TehsilListing;
