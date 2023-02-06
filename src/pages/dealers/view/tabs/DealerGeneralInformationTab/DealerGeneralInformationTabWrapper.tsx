import React from "react";
import AccordianAddress from "./components/AccordianAddress";
import AccordianContact from "./components/AccordianContact";
import AccordianDocument from "./components/AccordianDocument";
import AccordianGeneralInformation from "./components/AccordianGeneralInformation";
import DealerGeneralInformationTab from "./DealerGeneralInformationTab";

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

]

const DealerGeneralInformationTabWrapper = (props: Props) => {
  return <DealerGeneralInformationTab accordians={accordians} />;
};

export default DealerGeneralInformationTabWrapper;
