import React from "react";
import { BiCircle, BiSearchAlt2 } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import ATMInputAdormant from "src/components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";

type PolicyListItem = {
  label: string;
};

type Props = {
  policiesList: Array<PolicyListItem>;
};

const PolicyListing = ({ policiesList }: Props) => {

const navigate = useNavigate()

  return (
    <ConfigurationLayout>
        <div className="py-4 px-5 flex justify-between">
          <div className=" flex gap-2">
            <ATMInputAdormant
              name=""
              value=""
              onChange={() => {}}
              placeholder="Search"
              adormant={<BiSearchAlt2 className="text-slate-400" />}
              adormantProps={{
                position: "end",
                extraClasses: "bg-white border-none",
              }}
              className="h-[33px]"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={()=> navigate("add-policy")}
              className="flex items-center gap-2 bg-primary-main text-white text-sm h-[40px] px-4 rounded font-bold"
            >
              <span className="text-xl"> + </span> Create New Policy
            </button>
          </div>
        </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-2 px-5 py-5">
        {policiesList?.map((policy, index) => {
          return (
            <div key={index} className="text-primary-main flex gap-2 items-center ">
             <RxDotFilled className="text-xl"/> {policy.label}
            </div>
          );
        })}
      </div>
    </ConfigurationLayout>
  );
};

export default PolicyListing;
