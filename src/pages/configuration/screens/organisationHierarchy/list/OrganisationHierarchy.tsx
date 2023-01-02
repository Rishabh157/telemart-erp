import React, { ReactNode } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import { twMerge } from "tailwind-merge";

const StyledNode = ({
  children,
  extraClasses,
}: {
  children: ReactNode;
  extraClasses?: string;
}) => {
  return (
    <button
      className={twMerge(
        `py-1  rounded-lg border inline-block bg-white shadow-xl  ${extraClasses}`
      )}
    >
      <div className="flex justify-between gap-3 items-center" >

        <div className="px-4">
          {children}

        </div>
        <ATMMenu
        orientation='vertical'
          options={[
            {
              label: "Add Policy",
              onClick: () => {
                alert("clicked");
              },
            },
          ]}
        />


      </div>
      
    </button>
  );
};

const OrganisationHierarchy = () => {
  return (
    <ConfigurationLayout>
      <div className="h-full py-4 overflow-auto ">
        <Tree
          lineWidth={"2px"}
          lineHeight={"40px"}
          lineColor={"#bbbbcc"}
          lineBorderRadius={"10px"}
          label={<StyledNode extraClasses=" ">Root</StyledNode>}
        >
          <TreeNode
            label={
              <StyledNode extraClasses=" ">
                Distribution Department Head
              </StyledNode>
            }
          >
            <TreeNode label={<StyledNode>Manager</StyledNode>}>
              <TreeNode label={<StyledNode>Team Lead </StyledNode>} />
            </TreeNode>
          </TreeNode>

          <TreeNode
            label={<StyledNode extraClasses=" ">Department 2 Head</StyledNode>}
          >
            <TreeNode label={<StyledNode>Manager</StyledNode>}>
              <TreeNode label={<StyledNode>Team Lead </StyledNode>} />
            </TreeNode>
          </TreeNode>

          <TreeNode
            label={<StyledNode extraClasses=" ">Department 3 Head</StyledNode>}
          >
            <TreeNode label={<StyledNode>Manager</StyledNode>}>
              <TreeNode label={<StyledNode>Team Lead </StyledNode>} />
            </TreeNode>
          </TreeNode>
        </Tree>
      </div>
    </ConfigurationLayout>
  );
};

export default OrganisationHierarchy;
