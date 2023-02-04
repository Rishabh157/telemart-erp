import React from "react";
import AccordianAddress from "./components/AccordianAddress";
import AccordianBankDetail from "./components/AccordianBankDetail";
import AccordianContact from "./components/AccordianContact";
import AccordianDocument from "./components/AccordianDocument";
import AccordianGeneralInformation from "./components/AccordianGeneralInformation";
import VendorGeneralInformationTab from "./VendorGeneralInformationTab";

type Props = {};

export type AccordianType = {
    summary: React.ReactNode;
    component: any
}

const accordians: AccordianType[] = [
    {
        summary: "General Information",
        component: <AccordianGeneralInformation/>,
    },
    {
        summary: "Regd./Billing Address",
        component: <AccordianAddress/>,
    },
    {
        summary: "Contact",
        component: <AccordianContact/>,
    },
    {
        summary: "Documents",
        component: <AccordianDocument/>,
    },
    {
        summary: "Bank Details",
        component: <AccordianBankDetail/>,
    },

]

const VendorGeneralInformationTabWrapper = (props: Props) => {
  return <VendorGeneralInformationTab accordians={accordians} />;
};

export default VendorGeneralInformationTabWrapper;
