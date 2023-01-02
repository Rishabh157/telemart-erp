import React, { useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";

const options = [
  {
    label: <div className="text-primary-main"> Option1 </div>,
    value: {
      name: "Option1",
      age: 24,
    },
  },
  {
    label: "Option 2",
    value: {
      name: "Option 2",
      age: 23,
    },
  },
  {
    label: "Option 3",
    value: {
      name: "Option 3",
      age: 22,
    },
  },
];

const Test = () => {
  const [selectValue, setSelectValue] = useState("");

  return (
    <SideNavLayout>
      <div className="h-full flex  w-full">
        <div className="w-full">
          {/* <ATMSelect
            options={[
              { value: "ocean", label: "Ocean",color: "#00B8D9"},
              { value: "blue", label: "Blue", color: "#0052CC"},
              { value: "purple", label: "Purple", color: "#5243AA"},
              { value: "red", label: "Red", color: "#FF5630"},
              { value: "orange", label: "Orange", color: "#FF8B00"},
              { value: "yellow", label: "Yellow", color: "#FFC400"},
              { value: "green", label: "Green", color: "#36B37E"},
              { value: "forest", label: "Forest", color: "#00875A"},
              { value: "slate", label: "Slate", color: "#253858"},
              { value: "silver", label: "Silver", color: "#666666"},
            ]}
            // onSelect={(newValue) => { setSelectValue(newValue) }}
            // renderValue={(selected) => selected.value?.name}
            // options={[{name: ""}]}
          /> */}
        </div>
      </div>
        
    </SideNavLayout>
  );
};

export default Test;
