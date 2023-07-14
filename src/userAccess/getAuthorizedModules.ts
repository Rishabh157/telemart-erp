import { ModulesTypes, userAccesTypes } from "src/redux/slices/access/userAcessSlice"

export const isCheckAuthorizedModule = (checkUserAccess: userAccesTypes, moduleName: string) => {
  let modules = checkUserAccess.modules.map((modules) => { return modules.moduleName })
  return modules.includes(moduleName)

}

export const isCheckAuthorizedModuleAction = (checkUserAccess: userAccesTypes, moduleName: string, actionName: string) => {
  let modules = checkUserAccess?.modules?.find((modules: ModulesTypes) => modules.moduleName === moduleName)
  let moduleAction = modules?.moduleAction?.map((modulesActionkey) => { return modulesActionkey?.actionName })
  return moduleAction?.includes(actionName)

}