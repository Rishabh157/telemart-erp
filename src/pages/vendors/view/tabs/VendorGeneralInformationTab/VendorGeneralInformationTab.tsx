import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { AccordianType } from "./VendorGeneralInformationTabWrapper";

type Props = {
  accordians: AccordianType[];
};

const VendorGeneralInformationTab = ({ accordians }: Props) => {
  // States
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="flex flex-col gap-3">
      {accordians.map((accordian, accordianIndex) => (
        <Accordion
          key={accordianIndex}
          className="shadow-lg border "
          expanded={expanded === accordianIndex}
          onChange={handleChange(accordianIndex)}
        >
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls={`panel-${accordianIndex}`}
            id={`panel-${accordianIndex}`}
          >
            <span className="text-primary-main font-medium">
              {accordian.summary}
            </span>
          </AccordionSummary>

          <AccordionDetails className="border-t border-slate-300 ">
            <div className="py-3">{accordian.component}</div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default VendorGeneralInformationTab;
