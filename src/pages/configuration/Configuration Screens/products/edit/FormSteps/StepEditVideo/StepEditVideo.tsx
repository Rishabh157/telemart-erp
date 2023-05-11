import React from "react";
import { FormikProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../EditProductWrapper";
import { FieldArray } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const StepEditVideo = ({ formikProps }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className=" ">
      <FieldArray name="videos">
        {({ push, remove }) => (
          <div className="">
            {values.videos?.map((video, videoIndex) => {
              const { videoName, videoLink } = video;

              return (
                <div
                  key={videoIndex}
                  className={`flex flex-col gap-3 py-6 px-7 ${
                    videoIndex !== values.videos.length - 1 && "border-b"
                  }  border-slate-300 `}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-primary-main text-lg pb-2 font-medium ">
                      Video #{videoIndex + 1}
                    </div>
                    {/* Delete Button */}
                    {values.videos?.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(videoIndex)}
                        className="p-1 bg-red-500 text-white rounded"
                      >
                        <MdDeleteOutline className="text-2xl" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 gap-y-5">
                    {/* Video Name */}
                    <ATMTextField
                      name={`videos[${videoIndex}].videoName`}
                      value={videoName}
                      onChange={(e) => {
                        setFieldValue(
                          `videos[${videoIndex}].videoName`,
                          e.target.value
                        );
                      }}
                      label="Video Name"
                      placeholder="Video Name"
                      className="shadow bg-white rounded"
                    />

                    {/* Video Link */}
                    <ATMTextField
                      name={`videos[${videoIndex}].videoLink`}
                      value={videoLink}
                      onChange={(e) => {
                        setFieldValue(
                          `videos[${videoIndex}].videoLink`,
                          e.target.value
                        );
                      }}
                      label="Video Link"
                      placeholder="Video Link"
                      className="shadow bg-white rounded"
                    />

                    {/* Preview */}
                    <div className="rounded">
                      {values.videos[videoIndex].videoLink ? (
                        <div className="border rounded h-[160px] flex justify-center items-center">
                          Preview
                        </div>
                      ) : (
                        <iframe
                          width="100%"
                          height="160"
                          src={values.videos[videoIndex].videoLink}
                          title="video"
                          className="rounded"
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* BUTTON- Edit More Video */}
            <div className="flex justify-end p-5">
              <button
                type="button"
                onClick={() =>
                  push({
                    videoName: "",
                    videoLink: "",
                  })
                }
                className="bg-primary-main px-3 py-1 text-white rounded"
              >
                <AddCircleOutlineOutlinedIcon style={{fontSize: '32px'}}/>
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default StepEditVideo;
