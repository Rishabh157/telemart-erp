/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import StateListing from "./StateListing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { setItems } from "src/redux/slices/statesSlice";
import { useGetStateQuery } from "src/services/StateService";

const StateListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items }: any = useSelector((state: RootState) => state.states);

  const { searchValue: searchValueState, filterValue }: any = useSelector(
    (state: RootState) => state.states
  );

  const states = items?.map((ele: any) => {
    return { label: ele.stateName, value: ele._id };
  });

  const { data, isLoading, isFetching } = useGetStateQuery({
    limit: 100,
    searchValue: searchValueState,
    params: ["stateName", "countryId"],
    page: 0,
    filterBy: [
      {
        fieldName: "countryId",
        value: filterValue ? filterValue : [],
      },
    ],
    dateFilter: {},
    orderBy: "createdAt",
    orderByValue: -1,
  });

  // useEffect(() => {
  //   dispatch(setItems(data?.data));
  // }, [data, isLoading, isFetching]);

  return <StateListing states={states} />;
};

export default StateListingWrapper;
