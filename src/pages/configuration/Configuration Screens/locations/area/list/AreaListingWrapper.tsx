import React, { useEffect } from "react";
import AreaListing from "./AreaListing";
import { useGetAreaQuery } from "src/services/AreaService";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "src/redux/slices/areaSlice";
import { RootState } from "src/redux/store";

const AreaListingWrapper = () => {
  const dispatch = useDispatch();
  const { items }: any = useSelector((state: RootState) => state.areas);

  const { searchValue, filterValue }: any = useSelector(
    (state: RootState) => state.areas
  );
  const area = items?.map((ele: any) => {
    return {
      label: ele.area,
      value: ele.id,
    };
  });
  const { data, isLoading, isFetching } = useGetAreaQuery({
    limit: 100,
    searchValue: searchValue,
    params: ["area", "pincodeId"],
    page: 0,
    filterBy: [
      {
        fieldName: "pincodeId",
        value: filterValue ? filterValue : [],
      },
    ],
    dateFilter: {},
    orderBy: "createdAt",
    orderByValue: -1,
  });

  useEffect(() => {
    dispatch(setItems(data?.data));
  }, [data, isLoading, isFetching, dispatch]);

  return <AreaListing areas={area} />;
};

export default AreaListingWrapper;
