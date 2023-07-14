import { UserModuleActionTypes } from 'src/models/userAccess/UserAccess.model'
import {
    ModulesTypes,
    userAccesTypes,
} from 'src/redux/slices/access/userAcessSlice'

export const isCheckAuthorizedModule = (
    checkUserAccess: userAccesTypes,
    moduleName: string
) => {
    let modules = checkUserAccess.modules.map((modules) => {
        return modules.moduleName
    })
    return modules.includes(moduleName)
}

export const isCheckAuthorizedModuleAction = (
    checkUserAccess: userAccesTypes,
    moduleName: string,
    actionName: string
) => {
    let modules = checkUserAccess?.modules?.find(
        (modules: ModulesTypes) => modules.moduleName === moduleName
    )
    let moduleAction = modules?.moduleAction?.map((modulesActionkey) => {
        return modulesActionkey?.actionName
    })
    return moduleAction?.includes(actionName)
}

export const getAllowedAuthorizedColumns = (
    userAccessData: userAccesTypes,
    columns: any,
    moduleName: string,
    actionName: string
) => {
    let modules = userAccessData?.modules?.find(
        (modules: ModulesTypes) => modules.moduleName === moduleName
    )
    let moduleAction = modules?.moduleAction?.find((modulesActionkey: any) => {
        return modulesActionkey?.actionName === actionName
    })
    let isEditDeleteViewAccess = modules?.moduleAction?.some(
        (mod: any) =>
            mod?.actionName === UserModuleActionTypes.View ||
            mod?.actionName === UserModuleActionTypes.Edit ||
            mod?.actionName === UserModuleActionTypes.Delete
    )
    let allowedFields = moduleAction?.fields?.map((ele: any) => {
        return ele?.fieldValue
    })
    if (isEditDeleteViewAccess) {
        allowedFields?.push('actions')
    }
    let allowedColumn = columns?.filter((col: any) => {
        return allowedFields?.includes(col?.field)
    })

    return allowedColumn
}
