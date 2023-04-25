import React, { useEffect } from "react";
import AccordianAddress from "./components/AccordianAddress";
import AccordianBankDetail from "./components/AccordianBankDetail";
import AccordianContact from "./components/AccordianContact";
import AccordianDocument from "./components/AccordianDocument";
import AccordianGeneralInformation from "./components/AccordianGeneralInformation";
import VendorGeneralInformationTab from "./VendorGeneralInformationTab";
import { useParams } from "react-router-dom";
import { useGetVendorByIdQuery } from "src/services/VendorServices";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedItem } from "src/redux/slices/vendorSlice";
import { RootState } from "src/redux/store";
import { CircularProgress } from "@mui/material";

type Props = {};

export type AccordianType = {
  summary: React.ReactNode;
  component: any;
};

const VendorGeneralInformationTabWrapper = (props: Props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const Id = params.vendorId;
  const { data, isLoading, isFetching } = useGetVendorByIdQuery(Id);
  const { selectedItem }: any = useSelector(
    (state: RootState) => state?.vendor
  );
  console.log(selectedItem);
  useEffect(() => {
    dispatch(setSelectedItem(data?.data));
  }, [dispatch, data, isLoading, isFetching]);

  const accordians: AccordianType[] = [
    {
      summary: "General Information",
      component: <AccordianGeneralInformation data={selectedItem || {}} />,
    },
    {
      summary: "Regd./Billing Address",
      component: <AccordianAddress data={selectedItem || {}} />,
    },
    {
      summary: "Contact",
      component: <AccordianContact data={selectedItem || {}} />,
    },
    {
      summary: "Documents",
      component: <AccordianDocument data={selectedItem || {}} />,
    },
    {
      summary: "Bank Details",
      component: <AccordianBankDetail data={selectedItem || {}} />,
    },
  ];

  return selectedItem ? (
    <VendorGeneralInformationTab accordians={accordians} />
  ) : (
    <div className="">
      <CircularProgress />
    </div>
  );
};

export default VendorGeneralInformationTabWrapper;
