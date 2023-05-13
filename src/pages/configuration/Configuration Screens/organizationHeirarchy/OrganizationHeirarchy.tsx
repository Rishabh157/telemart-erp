import React, { ReactNode } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { twMerge } from "tailwind-merge";
import ConfigurationLayout from "../../ConfigurationLayout";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";

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
      <div className="flex justify-between gap-3 items-center">
        <div className="px-4">{children}</div>
        <ATMMenu
          orientation="vertical"
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
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Configuration",
    path: "/dashboard",
  },
  {
    label: "Hierarchy",
  },
];

const OrganisationHierarchy = () => {
  return (
    <ConfigurationLayout>
      <div className="px-4 h-full pt-3  ">
        {/* Breadcrumbs */}
        <div className="h-[30px]">
          <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
        </div>

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
                <StyledNode extraClasses="text-sm font-normal font-sans">
                  HR Dept. Head
                </StyledNode>
              }
            >
              <TreeNode
                label={
                  <StyledNode extraClasses="text-sm font-normal font-sans">
                    Manager
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode extraClasses="text-sm font-normal font-sans">
                      Team Lead{" "}
                    </StyledNode>
                  }
                />
              </TreeNode>
            </TreeNode>

            <TreeNode
              label={
                <StyledNode extraClasses="text-sm font-normal  font-sans">
                  {" "}
                  Account Dept. Head
                </StyledNode>
              }
            >
              <TreeNode
                label={
                  <StyledNode extraClasses="text-sm font-normal font-sans">
                    Manager
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode extraClasses="text-sm font-normal font-sans">
                      Team Lead{" "}
                    </StyledNode>
                  }
                />
              </TreeNode>
            </TreeNode>

            <TreeNode
              label={
                <StyledNode extraClasses="text-sm font-normal  font-sans">
                  Distribution Dept. Head
                </StyledNode>
              }
            >
              <TreeNode
                label={
                  <StyledNode extraClasses="text-sm font-normal font-sans">
                    Manager
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode extraClasses="text-sm font-normal font-sans">
                      Team Lead{" "}
                    </StyledNode>
                  }
                />
              </TreeNode>
            </TreeNode>
            <TreeNode
              label={
                <StyledNode extraClasses="text-sm font-normal  font-sans">
                  Media Dept. Head
                </StyledNode>
              }
            >
              <TreeNode
                label={
                  <StyledNode extraClasses="text-sm font-normal font-sans">
                    Manager
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode extraClasses="text-sm font-normal font-sans">
                      Team Lead{" "}
                    </StyledNode>
                  }
                />
              </TreeNode>
            </TreeNode>
            <TreeNode
              label={
                <StyledNode extraClasses="text-sm font-normal  font-sans">
                  Procurement Dept. Head
                </StyledNode>
              }
            >
              <TreeNode
                label={
                  <StyledNode extraClasses="text-sm font-normal font-sans">
                    Manager
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode extraClasses="text-sm font-normal font-sans">
                      Team Lead{" "}
                    </StyledNode>
                  }
                />
              </TreeNode>
            </TreeNode>
            <TreeNode
              label={
                <StyledNode extraClasses="text-sm font-normal  font-sans">
                  Callcenter Dept. Head
                </StyledNode>
              }
            >
              <TreeNode
                label={
                  <StyledNode extraClasses="text-sm font-normal font-sans">
                    Manager
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode extraClasses="text-sm font-normal font-sans">
                      Team Lead{" "}
                    </StyledNode>
                  }
                />
              </TreeNode>
            </TreeNode>
            <TreeNode
              label={
                <StyledNode extraClasses="text-sm font-normal font-sans">
                  Web Dept. Head
                </StyledNode>
              }
            >
              <TreeNode
                label={
                  <StyledNode extraClasses="text-sm font-normal font-sans">
                    Manager
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode extraClasses="text-sm font-normal font-sans">
                      Team Lead{" "}
                    </StyledNode>
                  }
                />
              </TreeNode>
            </TreeNode>
            <TreeNode
              label={
                <StyledNode extraClasses="text-sm font-normal font-sans">
                  Creatives Dept. Head
                </StyledNode>
              }
            >
              <TreeNode
                label={
                  <StyledNode extraClasses="text-sm font-normal font-sans">
                    Manager
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode extraClasses="text-sm font-normal font-sans">
                      Team Lead{" "}
                    </StyledNode>
                  }
                />
              </TreeNode>
            </TreeNode>
            <TreeNode
              label={
                <StyledNode extraClasses="text-sm font-normal font-sans">
                  Warehouse Dept. Head
                </StyledNode>
              }
            >
              <TreeNode
                label={
                  <StyledNode extraClasses="text-sm font-normal font-sans">
                    Manager
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode extraClasses="text-sm font-normal font-sans">
                      Team Lead{" "}
                    </StyledNode>
                  }
                />
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>
      </div>
    </ConfigurationLayout>
  );
};

export default OrganisationHierarchy;
