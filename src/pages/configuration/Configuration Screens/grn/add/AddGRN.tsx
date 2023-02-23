import React from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import { FormInitialValues } from "./AddGRNWrapper";
import { MdExpandMore } from "react-icons/md";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "GRN",
    path: "/configurations/grn",
  },
  {
    label: "Add GRN",
  },
];

const AddItem = ({ formikProps }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className="">
      <div className="p-4 flex flex-col gap-2  ">
        {/* Breadcrumbs */}
        <div className="">
          <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
        </div>

        {/* Page Heading */}
        <div className="pt-1">
          <ATMPageHeading> Add GRN </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Step Label */}
            <div className="text-xl font-medium">
              <div> PO Details </div>
              <div className="text-[13px] font-medium text-primary-main"> PO Code : 12345 </div>
            </div>
            {/* BUTTON - Add SO */}
            <div>
              <button
                type="button"
                onClick={() => formikProps.handleSubmit()}
                className="bg-primary-main rounded py-1 px-5 text-white border border-primary-main "
              >
                Add GRN
              </button>
            </div>
          </div>

          <div className="px-3 py-3">
            {values.items?.map((item, itemIndex) => (
              <Accordion className="grow max-h-full bg-white border bg-1 rounded shadow bg-form-bg bg-cover bg-no-repeat">
                <AccordionSummary
                  expandIcon={<MdExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="border-b border-slate-300"
                >
                  <div className="flex justify-between px-3 items-center  w-full">
                    <div>
                      Item Name :{" "}
                      <span className="text-primary-main font-medium ">
                        {" "}
                        Slim 24{" "}
                      </span>
                    </div>

                    <div className="text-primary-main text-sm">
                      Req Qnty : 1000Pcs | Received Qnty: 900Pcs
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="grid grid-cols-3 gap-5">
                    <ATMTextField
                      name="recievedQuantity"
                      value={item.recievedQuantity}
                      onChange={(e) =>
                        setFieldValue(
                          `items[${itemIndex}].recievedQuantity`,
                          e.target.value
                        )
                      }
                      label="Received Quantity"
                      placeholder="Received Quantity"
                    />

                    <ATMTextField
                      name="goodQuantity"
                      value={item.goodQuantity}
                      onChange={(e) =>
                        setFieldValue(
                          `items[${itemIndex}].goodQuantity`,
                          e.target.value
                        )
                      }
                      label="Good Quantity"
                      placeholder="Good Quantity"
                    />

                    <ATMTextField
                      name="defectiveQuantity"
                      value={item.defectiveQuantity}
                      onChange={(e) =>
                        setFieldValue(
                          `items[${itemIndex}].defectiveQuantity`,
                          e.target.value
                        )
                      }
                      label="Defective Quantity"
                      placeholder="Defective Quantity"
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
