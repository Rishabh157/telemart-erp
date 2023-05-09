// import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/productGroupBarcodeSlice";
import { AppDispatch, RootState } from "src/redux/store";

import { ProductBarcodeGroupResponse } from "src/models";
import ProductGroupDetailCard from "./ProductGroupDetailCard";

type Props = {
  rows: any[];
  selectedProductGroupcodes: ProductBarcodeGroupResponse[];
  onProductGroupcodeSelect: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    barcode: ProductBarcodeGroupResponse,
    isBarcodeSeleted: boolean
  ) => void;
  onBarcodeClick: (barcode: ProductBarcodeGroupResponse) => void;
};

const ProductGroupListing = ({
  rows,
  selectedProductGroupcodes,
  onProductGroupcodeSelect,
  onBarcodeClick,
}: Props) => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ProductGroupcodeState: any = useSelector(
    (state: RootState) => state.productGroupBarcode
  );
  //  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { page, rowsPerPage, totalItems, searchValue } = ProductGroupcodeState;
  console.log(totalItems);
  return (
    <div className="px-4 h-full flex flex-col gap-3">
      <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white">
        {/* Header */}
        <ATMTableHeader
          searchValue={searchValue}
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          isFilter
          onSearch={(newValue) => dispatch(setSearchValue(newValue))}
        />

        {/* Barcode Detail Cards */}
        <div className="grow overflow-auto  ">
          <ProductGroupDetailCard
            cardBoxBarcodeList={rows}
            selectedProductGroupBarcodes={selectedProductGroupcodes}
            onProductGroupBarcodeSelect={onProductGroupcodeSelect}
            onBarcodeClick={(barcode) => {
              onBarcodeClick(barcode);
            }}
          />
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-300">
          <ATMPagination
            page={page}
            rowCount={totalItems}
            rows={rows}
            rowsPerPage={rowsPerPage}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
          />
        </div>
      </div>

      {/* {isFilterOpen && (
        <FilterDialogWarpper onClose={() => setIsFilterOpen(false)} />
      )} */}
    </div>
  );
};

export default ProductGroupListing;
