/* eslint-disable array-callback-return */
import { UserModuleActionTypes } from 'src/models/userAccess/UserAccess.model'
import {
    ModulesTypes,
    userAccesTypes,
} from 'src/redux/slices/access/userAcessSlice'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

export const configurationModules = [
    UserModuleNameTypes.NAV_ATTRIBUTE,
    UserModuleNameTypes.NAV_ATTRIBUTE_GROUP,
    UserModuleNameTypes.NAV_PRODUCT_CATEGORY,
    UserModuleNameTypes.NAV_PRODUCT_SUB_CATEGORY,
    UserModuleNameTypes.NAV_PRODUCT_GROUP,
    UserModuleNameTypes.NAV_SCHEME,
    UserModuleNameTypes.NAV_ITEMS,
    UserModuleNameTypes.NAV_LOCATION,
    UserModuleNameTypes.NAV_PRODUCTS,
    UserModuleNameTypes.NAV_CARTON_BOX,
    UserModuleNameTypes.NAV_COMPANY,
    UserModuleNameTypes.NAV_BARCODE,
    UserModuleNameTypes.NAV_DEALERS_CATEGORY,
]

export const mediaModules = [
    UserModuleNameTypes.NAV_CHANNEL_GROUP,
    UserModuleNameTypes.NAV_CHANNEL_CATEGORY,
    UserModuleNameTypes.NAV_CHANNEL_MANAGEMENT,
    UserModuleNameTypes.NAV_DID_MANAGEMENT,
    UserModuleNameTypes.NAV_ARTIST,
    UserModuleNameTypes.NAV_COMPETITOR,
    UserModuleNameTypes.NAV_SLOT_MANAGEMENT,
    UserModuleNameTypes.NAV_TAPE_MANAGEMENT,
]

export const assetModules = [
    UserModuleNameTypes.NAV_ASSETS_REQUEST,
    UserModuleNameTypes.NAV_ASSETS_RELOCATION,
    UserModuleNameTypes.NAV_ASSETS_LOCATION,
    UserModuleNameTypes.NAV_ASSETS_CATEGORY,
    UserModuleNameTypes.NAV_ASSETS_ALLOCATION,
]

export const dispositionModule = [
    UserModuleNameTypes.NAV_DISPOSITION_ONE,
    UserModuleNameTypes.NAV_DISPOSITION_TWO,
    UserModuleNameTypes.NAV_DISPOSITION_THREE,
    UserModuleNameTypes.NAV_IC_ONE,
    UserModuleNameTypes.NAV_IC_TWO,
    UserModuleNameTypes.NAV_IC_THREE,
    UserModuleNameTypes.NAV_DISPOSITION_COMPLAINT,
    UserModuleNameTypes.NAV_NDR_DISPOSITION,
]

export const allWebsiteModule = [
    UserModuleNameTypes.NAV_WEBSITES,
    UserModuleNameTypes.NAV_WEBSITES_BLOG,
    UserModuleNameTypes.NAV_WEBSITES_PAGES,
    UserModuleNameTypes.NAV_WEBSITES_TAGS,
]
export const isCheckAuthorizedModule = (
    checkUserAccess: userAccesTypes,
    moduleName: string
) => {
    let modules = checkUserAccess?.modules?.map((modules) => {
        return modules?.moduleName
    })

    // if (
    //     modules.includes(
    //         UserModuleNameTypes.country ||
    //             UserModuleNameTypes.state ||
    //             UserModuleNameTypes.district ||
    //             UserModuleNameTypes.pincode ||
    //             UserModuleNameTypes.tehsil ||
    //             UserModuleNameTypes.area
    //     ) &&
    //     !configurationModules.includes(UserModuleNameTypes.locations)
    // ) {
    //     configurationModules.push(UserModuleNameTypes.locations)
    // }

    // FOR CONFIGURATION
    if (UserModuleNameTypes.NAV_CONFIGURATION === moduleName) {
        return modules?.some((ele) => configurationModules.includes(ele as any))
    }

    //FOR MEDIA
    if (UserModuleNameTypes.NAV_MEDIA === moduleName) {
        return modules?.some((ele) => mediaModules.includes(ele as any))
    }

    //FOR ASSET
    if (UserModuleNameTypes.NAV_ASSETS === moduleName) {
        return modules?.some((ele) => assetModules.includes(ele as any))
    }

    //FOR DISPOSITION
    if (UserModuleNameTypes.NAV_DISPOSITION === moduleName) {
        return modules?.some((ele) => dispositionModule.includes(ele as any))
    }

    //FOR WEBSITE
    if (UserModuleNameTypes.NAV_ALL_WEBSITE === moduleName) {
        return modules?.some((ele) => allWebsiteModule.includes(ele as any))
    }

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

export const showAllowedTabs = (
    checkUserAccess: userAccesTypes,
    moduleName: string,
    allTabs: any,
    userRole: string
) => {
    if (userRole === 'ADMIN') {
        return allTabs
    }
    let modules = checkUserAccess?.modules?.find(
        (modules: ModulesTypes) => modules.moduleName === moduleName
    )

    const commonObjects = allTabs.filter((objA: any) =>
        modules?.moduleAction.some((objB: any) => objB.actionName === objA.name)
    )

    return commonObjects
}

export const getAllowedAuthorizedColumns = (
    userAccessData: userAccesTypes,
    columns: any,
    moduleName: string,
    actionName: string
) => {
    let userData = localStorage.getItem('userData')
    let parseUserData = JSON.parse(userData as string)
    if (parseUserData?.userRole === 'ADMIN') {
        return columns
    }
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
