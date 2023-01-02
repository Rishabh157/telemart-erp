import { MenuItem, Select } from "@mui/material";
import { Field, FieldArray, FormikProps } from "formik";
import React, { useState } from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import { MdOutlineRemoveCircle } from "react-icons/md";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { twMerge } from "tailwind-merge";
import { AddPolicyFormValues } from "./AddPolicyWrapper";

const attributeList = [
  {
    label: "Name",
  },
  {
    label: "Description",
  },
  {
    label: "Dealer Code",
  },
  {
    label: "GST No",
  },
];

type Props = {
  formikProps: FormikProps<AddPolicyFormValues>;
};

const AddPolicy = ({ formikProps }: Props) => {
  const { values, setFieldValue } = formikProps;

  const [entities, setEntities] = useState([
    {
      entityName: "Policy 1",
    },
  ]);

  const [openEnityIndex, setOpenEnityIndex] = useState(0);
  const [showListAttributes, setShowListAttributes] = useState(-1);
  const [resources, setResources] = useState([]);
  const [SelectedEntity, setEntity] = useState("");

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setResources(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <div className="flex justify-end py-3">
        <button
          type="submit"
          className="border rounded bg-primary-main text-white px-4 py-2"
        >
          Save
        </button>
      </div>

      {/* Policy Name */}
      <div>
        <ATMTextField
          name="policyName"
          value={values.policyName}
          onChange={(e) => {
            setFieldValue("policyName", e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-[250px]"
          label="Policy Name"
        />
      </div>

    

      {/* Entity List */}
      <FieldArray name="entities">
        {({ push, remove }) => (
          <div className="grid gap-3 py-5">
            <div className="pt-3 text-xl text-slate-600">Entities</div>
            {values.entities.map((entity, entityIndex) => {
              return (
                <div key={entityIndex} className="border rounded bg-white">
                  <div className="p-2 rounded flex items-center justify-between  cursor-pointer bg-slate-200">
                    <div
                      onClick={() =>
                        setOpenEnityIndex((prev) =>
                          entityIndex === prev ? -1 : entityIndex
                        )
                      }
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <BsFillCaretRightFill
                        className={twMerge("text-slate-600")}
                      />
                      <span>{SelectedEntity}</span>
                    </div>
                    <div>
                      {values.entities.length !== 1 && (
                        <button
                          className="text-red-400 font-bold text-sm flex items-center gap-1"
                          onClick={() => {
                            remove(entityIndex);
                          }}
                        >
                          <MdOutlineRemoveCircle /> Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {openEnityIndex === entityIndex && (
                    <div className="py-2 px-4 flex flex-col gap-4">
                      <div className="flex py-2 gap-6">
                        <div className=" text-xl ">Entity</div>

                        <div className="w-[250px]">
                          <Select
                            value={values.entities[entityIndex].entityName}
                            onChange={(e) => {
                              setFieldValue(
                                `entities[${entityIndex}].entityName`,
                                e.target.value
                              );
                            }}
                            fullWidth={true}
                            size="small"
                          >
                            <MenuItem value="Dealer"> Dealer </MenuItem>
                            <MenuItem value="Vendor"> Vendor </MenuItem>
                            <MenuItem value="Warehouse">Warehouse </MenuItem>
                          </Select>
                        </div>
                      </div>

                      <div className="text-lg flex gap-2">
                        <input
                          type="checkbox"
                          checked={
                            values.entities[entityIndex].actions?.list
                              ?.isAccessible
                          }
                          onChange={(e) => {
                            setFieldValue(
                              `entities[${entityIndex}].actions.list.isAccessible`,
                              e.target.checked
                            );
                            setFieldValue(
                              `entities[${entityIndex}].actions.list.attributes`,
                              values.entities[entityIndex].actions?.list
                                ?.isAccessible
                                ? []
                                : attributeList
                            );
                          }}
                          id={`list${entityIndex}`}
                          onClick={() => {
                            setShowListAttributes(entityIndex);
                          }}
                        />
                        <label htmlFor={`list${entityIndex}`}>List</label>
                      </div>

                      {showListAttributes === entityIndex && (
                        <div className="grid grid-cols-4 py-3 px-4">
                          <div className="col-span-full">
                            <label htmlFor={`select-all`}>
                              <div className="text-lg flex gap-2">
                                <input
                                  type="checkbox"
                                  id={`select-all`}
                                  checked={
                                    values.entities[entityIndex].actions?.list
                                      ?.attributes.length ===
                                    attributeList.length
                                  }
                                  onChange={() => {
                                    if (
                                      values.entities[entityIndex].actions?.list
                                        ?.attributes.length ===
                                      attributeList.length
                                    ) {
                                      setFieldValue(
                                        `entities[${entityIndex}].actions.list.attributes`,
                                        []
                                      );
                                    } else {
                                      setFieldValue(
                                        `entities[${entityIndex}].actions.list.attributes`,
                                        attributeList
                                      );
                                    }
                                  }}
                                />
                                Select All
                              </div>
                            </label>
                          </div>
                          {attributeList.map((attribute, attributeIndex) => {
                            return (
                              <label
                                key={attributeIndex}
                                htmlFor={`${attribute.label}${entityIndex}`}
                              >
                                <div className="text-lg flex gap-2 text-primary-main">
                                  <input
                                    type="checkbox"
                                    checked={
                                      values.entities[
                                        entityIndex
                                      ].actions?.list?.attributes.findIndex(
                                        (ele) => ele.label === attribute.label
                                      ) > -1
                                    }
                                    onChange={() => {
                                      let newValue = [];
                                      if (
                                        values.entities[
                                          entityIndex
                                        ].actions?.list?.attributes.find(
                                          (ele) => ele.label === attribute.label
                                        )
                                      ) {
                                        newValue = values.entities[
                                          entityIndex
                                        ].actions?.list?.attributes.filter(
                                          (eleAttr) =>
                                            eleAttr.label !== attribute.label
                                        );
                                      } else {
                                        newValue = [
                                          ...values.entities[entityIndex]
                                            .actions?.list?.attributes,
                                          attribute,
                                        ];
                                      }

                                      setFieldValue(
                                        `entities[${entityIndex}].actions.list.attributes`,
                                        newValue
                                      );
                                    }}
                                    id={`${attribute.label}${entityIndex}`}
                                  />
                                  {attribute.label}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      )}

                      <div className="text-lg text-primary-main  flex gap-2">
                        <input type="checkbox" id={`read${entityIndex}`} />
                        <label htmlFor={`read${entityIndex}`}>Read</label>
                      </div>

                      <div className="text-lg flex gap-2 text-red-400">
                        <input type="checkbox" id={`delete${entityIndex}`} />
                        <label htmlFor={`delete${entityIndex}`}>Delete</label>
                      </div>

                      <div className="flex py-2 gap-6">
                        <div className=" text-xl ">Resource Rules</div>

                        <div className="w-[250px]">
                          <Select
                            fullWidth={true}
                            size="small"
                            multiple
                            value={values.entities[entityIndex].resourceRules}
                            onChange={(e) => {
                              setFieldValue(
                                `entities[${entityIndex}].resourceRules`,
                                e.target.value
                              );
                            }}
                          >
                            <MenuItem value="dealer"> Dealer </MenuItem>
                            <MenuItem value="vendor"> Vendor </MenuItem>
                            <MenuItem value="warehouse">Warehouse </MenuItem>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex justify-end px-2">
              <button
                type="button"
                className="text-primary-main font-bold text-lg"
                onClick={() => {
                  push({
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
                  });
                }}
              >
                + Add New
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default AddPolicy;
