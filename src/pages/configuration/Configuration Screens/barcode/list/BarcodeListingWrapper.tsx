import React from "react";
import { useNavigate } from "react-router-dom";
// import {  useSelector } from "react-redux";
import { BarcodeListResponse } from "src/models";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
// import {
//   setIsTableLoading,
//   setItems,
//   setTotalItems,
// } from "src/redux/slices/barcodeSlice";
// import { RootState } from "src/redux/store";
import BarcodeListing from "./BarcodeListing";

const rows = Array(10)
  .fill(null)
  .map((_, index) => ({
    barcode_number: "123456789",
    product_name: "Drink Stop",
    quantity: "10",
    is_used: index === 1 ? true : false,
    _id: index + 1,
  }));

const BarcodeListingWrapper = () => {
  //   const barcodeState: any = useSelector((state: RootState) => state.barcode);

  //   const { page, rowsPerPage } = barcodeState;

  //   const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!isFetching && !isLoading) {
  //       dispatch(setIsTableLoading(false));
  //       dispatch(setItems(data || []));
  //       dispatch(setTotalItems(data?.totalItems || 4));
  //     } else {
  //       dispatch(setIsTableLoading(true));
  //     }

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [isLoading, isFetching, data]);

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
          rows={rows}
          selectedBarcodes={selectedBarcodes}
          onBarcodeSelect={onBarcodeSelect}
          onBarcodeClick={(barcode:BarcodeListResponse) => navigate(`${barcode._id}`)}
        />
      </ConfigurationLayout>
    </>
  );
};

export default BarcodeListingWrapper;
