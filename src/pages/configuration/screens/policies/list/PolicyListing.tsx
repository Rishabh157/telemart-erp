import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import ATMInputAdormant from "src/components/UI/atoms/ATMInputAdormant/ATMInputAdormant";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";

type PolicyListItem = {
  label: string;
};

type Props = {
  policiesList: Array<PolicyListItem>;
};

const PolicyListing = ({ policiesList }: Props) => {
  return (
    <ConfigurationLayout>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-2 px-5 py-5">
        <div className="col-span-full flex justify-between">
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
              className="flex items-center gap-2 bg-primary-main text-white text-sm h-[40px] px-4 rounded font-bold"
            >
              <span className="text-xl"> + </span> Create New Policy
            </button>
          </div>
        </div>
        {policiesList?.map((policy, index) => {
          return (
            <div key={index} className="text-primary-main">
              {policy.label}
            </div>
          );
        })}
      </div>
    </ConfigurationLayout>
  );
};

export default PolicyListing;
