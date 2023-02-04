// import React from "react";
// import { FieldArray, FormikProps } from "formik";
// import ATMBreadCrumbs, {
//   BreadcrumbType,
// } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
// import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
// import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
// import { FormInitialValues } from "./AddGRNWrapper";
// import { MdDeleteOutline, MdExpandMore } from "react-icons/md";
// import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React from "react";
import {  FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import { FormInitialValues } from "./AddGRNWrapper";
import {  MdExpandMore } from "react-icons/md";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

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
  // const { values, setFieldValue } = formikProps;

  return (
    <div className="">
      <div className="p-4 flex flex-col gap-2  ">
        {/* Breadcrumbs */}
        <div className="">
          <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
        </div>

        {/* Page Heading */}
        <div className="pt-1">
          <ATMPageHeading> Add New Purchase Order </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Step Label */}
            <div className="text-xl font-medium"> PO Details </div>
            {/* BUTTON - Add SO */}
            <div>
              <button
                type="button"
                onClick={() => formikProps.handleSubmit()}
                className="bg-primary-main rounded py-1 px-5 text-white border border-primary-main "
              >
                Add PO
              </button>
            </div>
          </div>


          <Accordion  className="grow max-h-full bg-white border bg-1 rounded shadow m-5 bg-form-bg bg-cover bg-no-repeat">
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>


          {/* <div className="grow max-h-full bg-white border bg-1 rounded shadow m-5 bg-form-bg bg-cover bg-no-repeat">
            <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
             
              <div className="text-xl font-medium"> Item Name : <span className="text-primary-main">  Slim24 </span></div>

              <div className="py-1 px-5 text-primary-main font-semi-bold ">
                Req. Qnty : 1000pcs | Recieved Qnty : 900pcs
              </div>
            </div>

            <div className="px-3 ">
              <FieldArray name="items">
                {({ push, remove }) => {
                  return (
                    <>
                      <div className="flex flex-col gap-y-5 pt-5">
                        {values.items?.map((item, itemIndex) => {
                          const {
                            recievedQuantity,
                            goodQuantity,
                            defectiveQuantity,
                          } = item;

                          return (
                            <div
                              key={itemIndex}
                              className="flex gap-3 items-end "
                            >
                              <div className="flex-[2_2_0%]">
                                <ATMTextField
                                  type="number"
                                  min={0}
                                  name={`items[${itemIndex}].recievedQuantity`}
                                  value={recievedQuantity?.toString() || ""}
                                  label="Recieved Quantity"
                                  placeholder="Recieved Quantity"
                                  onChange={(e) =>
                                    setFieldValue(
                                      `items[${itemIndex}].recievedQuantity`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>


                              <div className="flex-[2_2_0%]">
                                <ATMTextField
                                  type="number"
                                  min={0}
                                  name={`items[${itemIndex}].goodQuantity`}
                                  value={goodQuantity?.toString() || ""}
                                  label="Good Quantity"
                                  placeholder="Good Quantity"
                                  onChange={(e) =>
                                    setFieldValue(
                                      `items[${itemIndex}].goodQuantity`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>


                              <div className="flex-[2_2_0%]">
                                <ATMTextField
                                  type="number"
                                  min={0}
                                  name={`items[${itemIndex}].defectiveQuantity`}
                                  value={defectiveQuantity?.toString() || ""}
                                  label="Defective Quantity"
                                  placeholder="Defective Quantity"
                                  onChange={(e) =>
                                    setFieldValue(
                                      `items[${itemIndex}].defectiveQuantity`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              {values.items?.length > 1 && (
                                <div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      remove(itemIndex);
                                    }}
                                    className="p-2 bg-red-500 text-white rounded"
                                  >
                                    <MdDeleteOutline className="text-2xl" />
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex justify-end py-5">
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              item_name: "",
                              recievedQuantity: null,
                              goodQuantity: null,
                              defectiveQuantity: null

                            })
                          }
                          className="bg-primary-main px-3 py-1 text-white rounded"
                        >
                          Add More Item
                        </button>
                      </div>
                    </>
                  );
                }}
              </FieldArray>
            </div>
          </div> */}
        </div>




      </div>
    </div>
  );
};

export default AddItem;
