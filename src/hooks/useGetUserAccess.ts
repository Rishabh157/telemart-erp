import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModulesTypes, moduleActionTypes } from "src/redux/slices/access/userAcessSlice";
import { useGetUserAccessQuery } from "src/services/useraccess/UserAccessServices";
import { setPermissions } from "src/redux/slices/authSlice";
// import { ModulesTypes, moduleActionTypes } from "src/redux/slices/access/userAcessSlice";
// import { useGetUserAccessQuery } from "src/services/UserAccessServices";
const useGetUserAccess = () => {
  const [getAllPermission, setPermission] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const userDataLJson = localStorage.getItem("userData");
  const userData = JSON?.parse(userDataLJson as string);
  const dispatch = useDispatch()

  const { data, isLoading, isFetching } = useGetUserAccessQuery({
    userRole: userData?.userRole,
    userId: userData?.userId
  }, {
    skip: !userData?.positionId && !userData?.userId,
    refetchOnFocus: false
  });
  const getPermisssion = (result: any) => {
    let permissions: string[] = []
    result?.module?.forEach((moduleitem: ModulesTypes) => {
      permissions = [...permissions, moduleitem?.moduleName, ...moduleitem?.parentGroup]
      moduleitem.moduleAction.forEach((actionItem: moduleActionTypes) => {
        permissions = [...permissions, actionItem?.actionId]
      })

    })
    return permissions
  }
  useEffect(() => {
    if (isLoading || isFetching) {
      setIsDataLoading(true);
    } else {
      const result: any[] = data?.data;
      const permission = getPermisssion(result)
      dispatch(setPermissions(permission))
      setPermission(permission)

      setIsDataLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isFetching]);

  return { getAllPermission, isDataLoading };
};

export default useGetUserAccess;
