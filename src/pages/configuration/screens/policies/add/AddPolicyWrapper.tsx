import { Form, Formik } from "formik";
import React from "react";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import AddPolicy from "./AddPolicy";

export type AddPolicyFormValues = {
  policyName: string;
  entities: {
    entityName: string;
    actions: {
      list: {
        isAccessible: boolean;
        attributes: any[];
      };
      read: {
        isAccessible: boolean;
        attributes: any[];
      };
      delete: {
        isAccessible: boolean;
      };
    };
    resourceRules: any[];
  }[];
};

const initialValues: AddPolicyFormValues = {
  policyName: "",
  entities: [
    {
      entityName: "",
      actions: {
        list: {
          isAccessible: false,
          attributes: [],
        },
        read: {
          isAccessible: false,
          attributes: [],
        },
        delete: {
          isAccessible: false,
        },
      },
      resourceRules: [],
    },
  ],
};

const AddPolicyWrapper = () => {
  return (
    <ConfigurationLayout>
      <Formik
        initialValues={initialValues}
        // validationSchema={}
        onSubmit={(values) => {console.log(values)}}
      >
        {(formikProps) => {
          return (
            <Form>
              <AddPolicy formikProps={formikProps} />
            </Form>
          );
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddPolicyWrapper;
