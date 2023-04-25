import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "./AddCountryWrapper";
import ATMBreadCrumbs, {
    BreadcrumbType,
  } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
  


type Props = {
  onClose: () => void;
  formikProps: FormikProps<FormInitialValues>;
  apiStatus: boolean
};


const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Location",
      path: "/configurations/location",
    },
    {
      label: "Add Country",
    },
  ];
  

const AddCountryDialog = ({ onClose,formikProps,apiStatus }: Props) => {

    const { values, setFieldValue } = formikProps;

  return (
    <>
      <Dialog open={true} onClose={onClose} fullWidth>
        <DialogTitle className="text-primary-main"> Add Country </DialogTitle>
        <DialogContent>
          <div>
            <div>
              <ATMTextField
                name="countryName"
                value={values.countryName}
                placeholder="Enter a country name"
                label="Country Name"
                onChange={(e) => setFieldValue("countryName", e.target.value)}
              />
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <button
            type="button"
            onClick={() => onClose()}
          >
            {" "}
            Cancel
          </button>
          <button
            type="button"
            disabled={apiStatus}
            className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${true?"disabled:opacity-25":""}`}
            onClick={() => formikProps.handleSubmit()}

          >
            {" "}
            Submit{" "}
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCountryDialog;
