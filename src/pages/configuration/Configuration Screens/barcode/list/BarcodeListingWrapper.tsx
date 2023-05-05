import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BarcodeListResponse } from "src/models";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/barcodeSlice";
import { AppDispatch, RootState } from "src/redux/store";
import BarcodeListing from "./BarcodeListing";
import { useGetBarcodeQuery } from "src/services/BarcodeService";
import { useGetCartonBoxBarcodeQuery } from "src/services/CartonBoxBarcodeService";
import {
  setIsTableLoading as cbsetIsTableLoading,
  setItems as cbsetItems,
  setTotalItems as cbsetTotalItems,
} from "src/redux/slices/CartonBoxBarcodeSlice";
import CartonBoxBarcodeListing from "./components/CartonBoxBarcode/CartonBoxBarcodeListing";
import { CartonBoxBarcodeListResponse } from "src/models/CartonBoxBarcode.model";

const BarcodeListingWrapper = () => {
  const barcodeState: any = useSelector((state: RootState) => state.barcode);

  const { page, rowsPerPage, searchValue, items } = barcodeState;
  const [activeStage, setActiveStage] = useState("Product Barcode");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data, isFetching, isLoading } = useGetBarcodeQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: ["barcodeNumber", "productGroupLabel"],
    page: page,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    dateFilter: {},
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data?.data || []));
      dispatch(setTotalItems(data?.totalItem || 4));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  const CartonBoxBarcodeState: any = useSelector(
    (state: RootState) => state.cartonBoxBarcode
  );

  const {
    page: cbPage,
    rowsPerPage: cbrowsPerPage,
    searchValue: cbsearchValue,
    items: cbitems,
  } = CartonBoxBarcodeState;

  const {
    data: cbdata,
    isFetching: cbisFetching,
    isLoading: cbisLoading,
  } = useGetCartonBoxBarcodeQuery({
    limit: cbrowsPerPage,
    searchValue: cbsearchValue,
    params: ["barcodeNumber"],
    page: cbPage,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    dateFilter: {},
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  useEffect(() => {
    console.log(cbdata?.data);
    if (!cbisFetching && !cbisLoading) {
      dispatch(cbsetIsTableLoading(false));
      dispatch(cbsetItems(cbdata?.data || []));
      dispatch(cbsetTotalItems(cbdata?.totalItem || 4));
    } else {
      dispatch(cbsetIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cbisLoading, cbisFetching, cbdata]);

  const [selectedBarcodes, setSelectedBarcodes] = React.useState<
    BarcodeListResponse[]
  >([]);

  const [selectedCartonBoxBarcodes, setSelectedCartonBoxBarcodes] =
    React.useState<CartonBoxBarcodeListResponse[]>([]);

  const onCartonBoxBarcodeSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    barcode: CartonBoxBarcodeListResponse,
    isBarcodeSeleted: boolean
  ) => {
    e.stopPropagation();
    let newValue = [];
    if (isBarcodeSeleted) {
      newValue = selectedCartonBoxBarcodes.filter(
        (seleted: CartonBoxBarcodeListResponse) => seleted._id !== barcode._id
      );
    } else {
      newValue = [...selectedCartonBoxBarcodes, barcode];
    }

    setSelectedCartonBoxBarcodes(newValue);
  };

  // Handle Barcode Select
  const onBarcodeSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    barcode: BarcodeListResponse,
    isBarcodeSeleted: boolean
  ) => {
    e.stopPropagation();
    let newValue = [];
    if (isBarcodeSeleted) {
      newValue = selectedBarcodes.filter(
        (seleted: BarcodeListResponse) => seleted._id !== barcode._id
      );
    } else {
      newValue = [...selectedBarcodes, barcode];
    }

    setSelectedBarcodes(newValue);
  };

  return (
    <>
      <ConfigurationLayout>
        {activeStage === "Product Barcode" ? (
          <BarcodeListing
            setActiveStage={setActiveStage}
            rows={items}
            selectedBarcodes={selectedBarcodes}
            onBarcodeSelect={onBarcodeSelect}
            onBarcodeClick={(barcode: BarcodeListResponse) =>
              navigate(`${barcode._id}`)
            }
          />
        ) : activeStage === "Carton Box Barcode" ? (
          <CartonBoxBarcodeListing
            setActiveStage={setActiveStage}
            rows={cbitems}
            selectedCartonBoxBarcodes={selectedCartonBoxBarcodes}
            onCartonBoxBarcodeSelect={onCartonBoxBarcodeSelect}
            onBarcodeClick={(barcode: CartonBoxBarcodeListResponse) =>
              navigate(`${barcode._id}`)
            }
          />
        ) : null}
      </ConfigurationLayout>
    </>
  );
};

export default BarcodeListingWrapper;
