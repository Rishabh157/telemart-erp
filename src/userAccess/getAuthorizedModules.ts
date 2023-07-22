/* eslint-disable array-callback-return */
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'
import {
    ModulesTypes,
    userAccesTypes,
} from 'src/redux/slices/access/userAcessSlice'

export const configurationModules = [
    UserModuleNameTypes.attribute,
    UserModuleNameTypes.attributeGroup,
    UserModuleNameTypes.productCategory,
    UserModuleNameTypes.productSubCategory,
    UserModuleNameTypes.productGroup,
    UserModuleNameTypes.scheme,
    UserModuleNameTypes.item,
    UserModuleNameTypes.locations,
    UserModuleNameTypes.product,
    UserModuleNameTypes.cartonBox,
    UserModuleNameTypes.company,
    UserModuleNameTypes.barcode,
    UserModuleNameTypes.dealerCategory,
]

export const mediaModules = [
    UserModuleNameTypes.channelGroup,
    UserModuleNameTypes.channelCategory,
    UserModuleNameTypes.channelManagement,
    UserModuleNameTypes.didManagement,
    UserModuleNameTypes.artist,
    UserModuleNameTypes.competitor,
    UserModuleNameTypes.slotManagement,
    UserModuleNameTypes.tapeManangement,
]

export const assetModules = [
    UserModuleNameTypes.assetRequest,
    UserModuleNameTypes.assetRelocation,
    UserModuleNameTypes.assetLocation,
    UserModuleNameTypes.assetCategory,
    UserModuleNameTypes.assetAllocation,
]

export const dispositionModule = [
    UserModuleNameTypes.dispositionOne,
    UserModuleNameTypes.dispositionTwo,
    UserModuleNameTypes.dispositionThree,
    UserModuleNameTypes.initialCallerOne,
    UserModuleNameTypes.initialCallerTwo,
    UserModuleNameTypes.initialCallerThree,
    UserModuleNameTypes.dispositionComplaint,
]

export const allWebsiteModule = [
    UserModuleNameTypes.website,
    UserModuleNameTypes.websiteBlog,
    UserModuleNameTypes.websitePage,
    UserModuleNameTypes.websiteTags,
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
    if (UserModuleNameTypes.configuration === moduleName) {
        return modules?.some((ele) =>
            configurationModules.includes(ele as UserModuleNameTypes)
        )
    }

    //FOR MEDIA
    if (UserModuleNameTypes.media === moduleName) {
        return modules?.some((ele) =>
            mediaModules.includes(ele as UserModuleNameTypes)
        )
    }

    //FOR ASSET
    if (UserModuleNameTypes.assets === moduleName) {
        return modules?.some((ele) =>
            assetModules.includes(ele as UserModuleNameTypes)
        )
    }

    //FOR DISPOSITION
    if (UserModuleNameTypes.disposition === moduleName) {
        return modules?.some((ele) =>
            dispositionModule.includes(ele as UserModuleNameTypes)
        )
    }

    //FOR WEBSITE
    if (UserModuleNameTypes.allWebsite === moduleName) {
        return modules?.some((ele) =>
            allWebsiteModule.includes(ele as UserModuleNameTypes)
        )
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
