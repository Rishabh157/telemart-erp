import React, { useEffect, useState } from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import ATMTagsInput from "src/components/UI/atoms/formFields/ATMTagsInput/ATMTagsInput";

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
  const [tags, setTags]= useState<any[]>([])

  //  Find the area of triangle
  const triangleArea = (a:number, b:number , c:number) => {
  const halfOfPerimeter = (a+b+c)/2
  const area = Math.sqrt(halfOfPerimeter* (halfOfPerimeter-a)*(halfOfPerimeter-b)*(halfOfPerimeter-c))
        return area
  }

  console.log(triangleArea(3,4,5))

  return (
    <SideNavLayout>
      <div className="h-full flex w-full">
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

        <ATMTagsInput
          tags={tags}
          setTags={(value)=> setTags(value)}
        />
      </div>

      <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>


        
    </SideNavLayout>
  );
};

export default Test;
