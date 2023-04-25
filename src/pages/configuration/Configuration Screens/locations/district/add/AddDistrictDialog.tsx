import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormikProps } from "formik";
import { FormInitialValues } from "./AddDistrictWrapper";

import ATMBreadCrumbs, {
    BreadcrumbType,
  } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";

type Props = {
  onClose: () => void;
  formikProps: FormikProps<FormInitialValues>;
  apiStatus: boolean;
};
const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Location",
      path: "/configurations/location",
    },
    {
      label: "Add District",
    },
  ];


const AddDistrictDialog = ({ onClose , formikProps , apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps;

  return (
    <>
      <Dialog open={true} onClose={onClose} fullWidth>
        <DialogTitle className="text-primary-main"> Add District </DialogTitle>
        <DialogContent>
          <div>
            <div>
              <ATMTextField
                name="districtName"
                value={values.districtName}
                onChange={(e) => {setFieldValue("districtName", e.target.value)}}
                placeholder="Enter a district name"
                label="District Name"
              />
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <button
            type="button"
            onClick={() => onClose()}
            className="border border-primary-main text-primary-main px-3 py-2 rounded"
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

export default AddDistrictDialog;
