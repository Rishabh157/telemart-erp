import React, { useEffect } from "react";
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

const BarcodeListingWrapper = () => {
  const barcodeState: any = useSelector((state: RootState) => state.barcode);

  const { page, rowsPerPage, searchValue, items } = barcodeState;

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

  const [selectedBarcodes, setSelectedBarcodes] = React.useState<
    BarcodeListResponse[]
  >([]);

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
        <BarcodeListing
          rows={items}
          selectedBarcodes={selectedBarcodes}
          onBarcodeSelect={onBarcodeSelect}
          onBarcodeClick={(barcode: BarcodeListResponse) =>
            navigate(`${barcode._id}`)
          }
        />
      </ConfigurationLayout>
    </>
  );
};

export default BarcodeListingWrapper;
