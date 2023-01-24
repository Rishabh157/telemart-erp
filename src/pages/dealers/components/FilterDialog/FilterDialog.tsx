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
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import {CgClose} from 'react-icons/cg'

type Props = {
  onClose: () => void;
  formikProps: FormikProps<FormInitalValues>;
};

const FilterDialog = ({ onClose, formikProps }: Props) => {
  const { values, setFieldValue, handleSubmit, isSubmitting } = formikProps;

  return (
    <Dialog open={true} maxWidth="lg" fullWidth>
      
      {/* Title */}
      <DialogTitle className="flex justify-between items-center">
        Filter
        <button
          onClick={() => onClose()}
          className="px-4 py-2  rounded bg-slate-100 shadow hover:bg-red-500 hover:text-white  "
        >
          <CgClose/>
        </button>
      </DialogTitle>

      {/* Form Fields */}
      <DialogContent>
        <ATMTextField
          name=""
          value={values.name}
          onChange={(e) => setFieldValue("name", e.target.value)}
        />
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <div>
          <ATMLoadingButton
            isLoading={isSubmitting}
            loadingText="Applying"
            onClick={() => handleSubmit()}
            className="bg-primary-main text-white flex items-center py-2 px-4 rounded"
          >
            Apply
          </ATMLoadingButton>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
