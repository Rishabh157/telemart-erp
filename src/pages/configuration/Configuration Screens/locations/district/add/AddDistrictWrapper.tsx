import React, { useState } from "react";
import AddDistrictDialog from "./AddDistrictDialog";
import { showToast } from "src/utils";
import { useSelector } from "react-redux";
import { useAddDistrictMutation } from "src/services/DistricService";
import { RootState } from "src/redux/store";
import { Formik } from "formik";
import { object, string } from "yup";

type Props = {
  onClose: () => void;
};

export type FormInitialValues = {
  districtName: string;
};

const AddDistrictWrapper = ({ onClose }: Props) => {
  const [AddDistrict] = useAddDistrictMutation();
  const { userData } = useSelector((state: RootState) => state?.auth);
  const { selectedLocationCountries }: any = useSelector(
    (state: RootState) => state?.country
  );
  console.log(selectedLocationCountries);

  const { selectedLocationState }: any = useSelector(
    (state: RootState) => state?.states
  );
  console.log(selectedLocationState);
  const [apiStatus, setApiStatus] = useState(false);

  const initialValues: FormInitialValues = {
    districtName: "",
  };
  const validationSchema = object({
    districtName: string().required("District Name is required"),
  });
  const onSubmitHandler = (values: FormInitialValues) => {
    setApiStatus(true);
    setTimeout(() => {
      AddDistrict({
        districtName: values.districtName,
        stateId: selectedLocationState?.value || "",
        countryId: selectedLocationCountries?.value || "",
        companyId: userData?.companyId || "",
      }).then((res: any) => {
        if ("data" in res) {
          if (res?.data?.status) {
            showToast("success", "District added successfully!");
            onClose();
          } else {
            showToast("error", res?.data?.message);
          }
        } else {
          showToast("error", "Something went wrong");
        }
        setApiStatus(false);
      });
    }, 1000);
  };

  return (
    <>
      {" "}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return (
            <AddDistrictDialog
              onClose={onClose}
              apiStatus={apiStatus}
              formikProps={formikProps}
            />
          );
        }}
      </Formik>
    </>
  );
};

export default AddDistrictWrapper;
