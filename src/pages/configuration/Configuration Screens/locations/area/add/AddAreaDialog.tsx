import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "./AddAreaWrapper";
import { FormikProps } from "formik";

type Props = {
  onClose: () => void;
  formikProps: FormikProps<FormInitialValues>;
  apiStatus: boolean;
};

const AddAreaDialog = ({ onClose ,formikProps,apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps;

  return (
    <>
      <Dialog open={true} onClose={onClose} fullWidth>
        <DialogTitle className="text-primary-main"> Add Area </DialogTitle>
        <DialogContent>
          <div>
            <div>
              <ATMTextField
                name="area"
                value={values.area}
                onChange={(e) => {setFieldValue("area", e.target.value)}}
                placeholder="Enter an area name "
                label="Area Name"
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
            className="bg-primary-main text-white px-3 py-2 rounded"
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

export default AddAreaDialog;
