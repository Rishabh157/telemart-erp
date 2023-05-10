import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import EditLanguage from "./EditLanguage";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
// import { useEditLanguageMutation } from "src/services/LanguageService";
import { showToast } from "src/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetLanguageByIdQuery,
  useUpdateLanguageMutation,
} from "src/services/LanguageService";
import { setSelectedItem } from "src/redux/slices/languageSlice";

type Props = {};

export type FormInitialValues = {
  languageName: string;
};

const EditLanguageWrapper = (props: Props) => {
  const params = useParams();
  const Id = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editLanguage] = useUpdateLanguageMutation();
  const [apiStatus, setApiStatus] = useState<boolean>(false);
  const { userData } = useSelector((state: RootState) => state?.auth);
  const { selectedItem }: any = useSelector(
    (state: RootState) => state?.language
  );

  const { data, isLoading, isFetching } = useGetLanguageByIdQuery(Id);
  // const [EditLanguage] = useEditLanguageMutation();
  // Form Initial Values
  const initialValues: FormInitialValues = {
    languageName: selectedItem?.languageName,
  };

  // Form Validation Schema
  const validationSchema = object({
    languageName: string().required("Language Name is required"),
  });
  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
  
    setApiStatus(true);
    editLanguage({
      body: {
        languageName: values.languageName,
        companyId: userData?.companyId || "",
      },
      id: Id || "",
    }).then((res) => {
      if ("data" in res) {
        if (res?.data?.status) {
          showToast("success", "Updated successfully!");
          navigate("/configurations/language");
        } else {
          showToast("error", res?.data?.message);
        }
      } else {
        showToast("error", "Something went wrong");
      }
      setApiStatus(false);
    });
  };
  useEffect(() => {
    dispatch(setSelectedItem(data?.data));
  }, [dispatch, data, isLoading, isFetching]);
  return (
    <ConfigurationLayout>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return (
            <EditLanguage apiStatus={apiStatus} formikProps={formikProps} />
          );
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default EditLanguageWrapper;
