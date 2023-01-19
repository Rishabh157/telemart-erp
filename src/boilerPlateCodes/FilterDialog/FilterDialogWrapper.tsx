import { Formik, Form, FormikProps } from "formik";
import React from "react";
import FilterDialog from "./FilterDialog";

type Props = {
  onClose: () => void;
  onApply: () => void;
};

export type FormInitalValues = {
  name: string;
}

const FilterDialogWarpper = ({ onClose, onApply }: Props) => {
  // Call your api here
  
  // Form Initial Values
  const initialValues: FormInitalValues = {
      name: ""
  }

  // Form Submit Handler
  const onSubmitHandler = (values: FormInitalValues)=> {
    console.log("onSubmit" , values);
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
      >
        {
        (formikProps:FormikProps<FormInitalValues>) => {
          return (
            <Form>
              <FilterDialog onClose={onClose} onApply={onApply} formikProps={formikProps}  />
            </Form>
          );
        }
        }
      </Formik>

    </>
  );
};

export default FilterDialogWarpper;
