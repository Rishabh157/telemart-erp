import React, { useEffect } from "react";
import SideNavLayout from "../SideNavLayout/SideNavLayout";
import { BiSearchAlt2 } from "react-icons/bi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ATMInputAdormant from "src/components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant";
import { IconType } from "react-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/store";
import { setIsCollapsed } from "src/redux/slices/SideNavLayout";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";

type ViewLayoutPropTypes = {
  infoCard?: React.ReactNode;
  actionIcons?: {
    icon: IconType;
    onClick: () => void;
  }[];
  listData?: any[];
  renderListItem: (item: any) => React.ReactNode;
  tabs: {
    label: string;
    icon: IconType;
    path: string;
  }[];
  searchValue: string;
  onSearch: (value: string) => void;
  breadcrumbs: BreadcrumbType[];
};

const ViewLayout = ({
  infoCard,
  listData,
  renderListItem,
  tabs,
  searchValue,
  onSearch,
  breadcrumbs,
}: ViewLayoutPropTypes) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setIsCollapsed(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SideNavLayout>   
        <div className="h-[calc(100vh-55px)]">
          <div className="w-full flex  h-[calc(100%)] bg-white">
            {/* Left Section Side Bar */}
            <div className="w-[250px]  h-full flex flex-col  border-b  border-l rounded-l  ">
              {/* Info Card */}
              <div className=" w-full">{infoCard}</div>

              {/* Search Bar */}
              <div className="px-2 py-2 flex items-center justify-center ">
                <ATMInputAdormant
                  name=""
                  value={searchValue}
                  onChange={(e) => {
                    onSearch(e.target.value);
                  }}
                  placeholder="Search here..."
                  className="h-[30px] border-slate-100 shadow"
                  adormant={
                    <BiSearchAlt2 className="text-slate-400 text-xl " />
                  }
                  adormantProps={{
                    position: "start",
                    extraClasses: "bg-white border-0 ",
                  }}
                />
              </div>

              {/* List */}
              <div className="grow overflow-auto ">
                {listData?.map((item) => {
                  return renderListItem(item);
                })}
              </div>
            </div>

            {/* Right Section */}
            <div className="w-[83%] border-b border-r border-l rounded-r h-full p-3">
              {/* BreadCrumbs */}
              <div className="h-[40px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
              </div>
              {/* Tabs */}
              <div className="h-[45px] border flex gap-4 items-center px-2 py-1 bg-white shadow rounded ">
                {tabs.map((tab, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => navigate(tab.path)}
                      className={`h-full px-3 flex gap-2 items-center  cursor-pointer hover:text-primary-main rounded font-medium
                                                 ${
                                                   location.pathname.split(
                                                     "/"
                                                   )[3] === tab.path
                                                     ? "bg-slate-100 border-primary-main text-primary-main"
                                                     : "text-slate-700"
                                                 }
                                                 `}
                    >
                      <div className=" text-lg  ">
                        <tab.icon />
                      </div>
                      {tab.label}
                    </div>
                  );
                })}
              </div>

              {/* Children */}
              <div className="h-[calc(100%-85px)] pt-4 ">
                <div className="h-full overflow-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SideNavLayout>
    </>
  );
};

export default ViewLayout;
