// Filename:GetHierarchyByDept.ts
// Type: hierarchy Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { default as Hierarchy } from 'src/defaultData/Hierarchy.json'
import { userDepartmentOptions } from '.'

export enum GetHierarchByDeptProps {
    SALES_DEPARTMENT = 'SALES_DEPARTMENT',
    HR_DEPARTMENT = 'HR_DEPARTMENT',
    DISTRIBUTION_DEPARTMENT = 'DISTRIBUTION_DEPARTMENT',
    FINANCE_DEPARTMENT = 'FINANCE_DEPARTMENT',
    MEDIA_DEPARTMENT = 'MEDIA_DEPARTMENT',
    MEDIA_PRODUCTION_DEPARTMENT = 'MEDIA_PRODUCTION_DEPARTMENT',
    IT_DEPARTMENT = 'IT_DEPARTMENT',
    DEVELOPMENT_DEPARTMENT = 'DEVELOPMENT_DEPARTMENT',
    WEB_DEPARTMENT = 'WEB_DEPARTMENT',
    OPERATION_DEPARTMENT = 'OPERATION_DEPARTMENT',
    QUALITY_DEPARTMENT = 'QUALITY_DEPARTMENT',
    LOGISTIC_DEPARTMENT = 'LOGISTIC_DEPARTMENT',
    MAPPING_AND_MIS_DEPARTMENT = 'MAPPING_AND_MIS_DEPARTMENT',
    ADMIN_DEPARTMENT = 'ADMIN_DEPARTMENT',
}

export const getDepartmentLabel = (departmentName: string) => {
    return (
        userDepartmentOptions.find((f) => f.value === departmentName)?.label ||
        ''
    )
}

export const getUserRoleLabel = (userRole: string, departmentName: string) => {
    const userRoles = getHierarchyByDept({
        department: departmentName as GetHierarchByDeptProps,
    })

    return userRoles.find((f) => f.value === userRole)?.label || ''
}
export const getHierarchyByDept = ({
    department,
}: {
    department: keyof typeof GetHierarchByDeptProps
}) => {
    const defaultComponent = {
        [GetHierarchByDeptProps.SALES_DEPARTMENT]: Hierarchy.salesDepartment,
        [GetHierarchByDeptProps.HR_DEPARTMENT]: Hierarchy.hrDepartment,
        [GetHierarchByDeptProps.DISTRIBUTION_DEPARTMENT]:
            Hierarchy.distributionDepartment,
        [GetHierarchByDeptProps.FINANCE_DEPARTMENT]:
            Hierarchy.financeDepartment,
        [GetHierarchByDeptProps.MEDIA_DEPARTMENT]: Hierarchy.mediaDepartment,
        [GetHierarchByDeptProps.MEDIA_PRODUCTION_DEPARTMENT]:
            Hierarchy.mediaProductionDepartment,
        [GetHierarchByDeptProps.IT_DEPARTMENT]: Hierarchy.ITDepartment,
        [GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT]:
            Hierarchy.DevelopmentDepartment,
        [GetHierarchByDeptProps.WEB_DEPARTMENT]: Hierarchy.webDepartment,
        [GetHierarchByDeptProps.OPERATION_DEPARTMENT]:
            Hierarchy.operationDepartment,
        [GetHierarchByDeptProps.QUALITY_DEPARTMENT]:
            Hierarchy.qualityDepartment,
        [GetHierarchByDeptProps.LOGISTIC_DEPARTMENT]:
            Hierarchy.logisticDepartment,
        [GetHierarchByDeptProps.MAPPING_AND_MIS_DEPARTMENT]:
            Hierarchy.mapingAndMISDepartment,
        [GetHierarchByDeptProps.ADMIN_DEPARTMENT]: Hierarchy.adminDepartment,
    }

    return defaultComponent[department] || []

}

export const getHierarchyByDeptWithRole = ({
    department,
}: {
    department: keyof typeof GetHierarchByDeptProps
}) => {
    const defaultComponent = {
        [GetHierarchByDeptProps.SALES_DEPARTMENT]: Hierarchy.salesDepartment[0].value,
        [GetHierarchByDeptProps.HR_DEPARTMENT]: Hierarchy.hrDepartment[0].value,
        [GetHierarchByDeptProps.DISTRIBUTION_DEPARTMENT]:
            Hierarchy.distributionDepartment[0].value,
        [GetHierarchByDeptProps.FINANCE_DEPARTMENT]:
            Hierarchy.financeDepartment[0].value,
        [GetHierarchByDeptProps.MEDIA_DEPARTMENT]: Hierarchy.mediaDepartment[0].value,
        [GetHierarchByDeptProps.MEDIA_PRODUCTION_DEPARTMENT]:
            Hierarchy.mediaProductionDepartment[0].value,
        [GetHierarchByDeptProps.IT_DEPARTMENT]: Hierarchy.ITDepartment[0].value,
        [GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT]:
            Hierarchy.DevelopmentDepartment[0].value,
        [GetHierarchByDeptProps.WEB_DEPARTMENT]: Hierarchy.webDepartment[0].value,
        [GetHierarchByDeptProps.OPERATION_DEPARTMENT]:
            Hierarchy.operationDepartment[0].value,
        [GetHierarchByDeptProps.QUALITY_DEPARTMENT]:
            Hierarchy.qualityDepartment[0].value,
        [GetHierarchByDeptProps.LOGISTIC_DEPARTMENT]:
            Hierarchy.logisticDepartment[0].value,
        [GetHierarchByDeptProps.MAPPING_AND_MIS_DEPARTMENT]:
            Hierarchy.mapingAndMISDepartment[0].value,
        [GetHierarchByDeptProps.ADMIN_DEPARTMENT]: Hierarchy.adminDepartment[0].value,
    }

    return defaultComponent[department] || []

}
