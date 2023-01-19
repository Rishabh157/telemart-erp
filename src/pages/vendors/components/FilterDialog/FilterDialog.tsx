import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@mui/material";
import { FormikProps } from "formik";
import { FormInitalValues } from "./FilterDialogWarpper";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
  
  type Props = {
    onClose: () => void;
    formikProps: FormikProps<FormInitalValues>
  };
  
  const FilterDialog = ({ onClose  , formikProps }: Props) => {

    const {values ,setFieldValue} = formikProps

    return (
      <Dialog open={true} maxWidth="lg" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          Filter
          <button
            onClick={() => onClose()}
            className="px-4 py-2 rounded bg-slate-100 hover:bg-red-400 hover:text-white  "
          >
            X
          </button>
        </DialogTitle>
  
        <DialogContent>
          <ATMTextField
          name=""
          value={values.name}
          onChange={(e)=> setFieldValue("name" , e.target.value)}
          />
        </DialogContent>
  
        <DialogActions>
          <button type="submit" className="bg-primary-main text-white flex items-center py-2 px-4 rounded">
            Apply
          </button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default FilterDialog;
  