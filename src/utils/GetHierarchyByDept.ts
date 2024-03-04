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
    CUSTOMER_CARE_DEPARTMENT = 'CUSTOMER_CARE_DEPARTMENT',
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

export enum getRoleUser {
    SALE_AVP = 'SALE_AVP',
    SALE_AGM_SALES = 'SALE_AGM_SALES',
    MANAGER_SALES_CENTER = 'MANAGER_SALES_CENTER',
    ASST_MANAGER_SALES_CENTER = 'ASST_MANAGER_SALES_CENTER',
    SR_TEAM_LEADER_OR_SR_EXECUTIVE_MIS = 'SR_TEAM_LEADER_OR_SR_EXECUTIVE_MIS',
    TEAM_LEADER_OR_EXECUTIVE_SALES_CENTER = 'TEAM_LEADER_OR_EXECUTIVE_SALES_CENTER',
    SR_EXECUTIVE_SALES_CENTER = 'SR_EXECUTIVE_SALES_CENTER',
    EXECUTIVE_SALES_CENTER = 'EXECUTIVE_SALES_CENTER',
    EXECUTIVE_TRAINEE = 'EXECUTIVE_TRAINEE',
    CUSTOMER_CARE_AVP = 'CUSTOMER_CARE_AVP',
    CUSTOMER_CARE_MANAGER = 'CUSTOMER_CARE_MANAGER',
    CUSTOMER_CARE_AM = 'CUSTOMER_CARE_AM',
    CUSTOMER_CARE_TEAM_LEADER = 'CUSTOMER_CARE_TEAM_LEADER',
    CUSTOMER_CARE_SR_EXECUTIVE = 'CUSTOMER_CARE_SR_EXECUTIVE',
    CUSTOMER_CARE_EXECUTIVE = 'CUSTOMER_CARE_EXECUTIVE',
    HR_AVP = 'HR_AVP',
    AMG_HR_AND_STATUTORY_COMPLIANCE = 'AMG_HR_AND_STATUTORY_COMPLIANCE',
    ASST_MANAGER_HR = 'ASST_MANAGER_HR',
    SR_EXECUTIVE_HR = 'SR_EXECUTIVE_HR',
    EXECUTIVE_HR = 'EXECUTIVE_HR',
    DISTRIBUTION_AVP = 'DISTRIBUTION_AVP',
    SR_MANAGER_DISTRIBUTION = 'SR_MANAGER_DISTRIBUTION',
    MANAGER_AREA = 'MANAGER_AREA',
    SR_EXECUTIVE_AREA = 'SR_EXECUTIVE_AREA',
    EXECUTIVE_AREA = 'EXECUTIVE_AREA',
    FINANCE_AVP = 'FINANCE_AVP',
    AGM_FINANCE = 'AGM_FINANCE',
    SR_MANAGER_FINANCE = 'SR_MANAGER_FINANCE',
    MANAGER_FINANCE = 'MANAGER_FINANCE',
    AM_FINANCE = 'AM_FINANCE',
    EXECUTIVE_FINANCE = 'EXECUTIVE_FINANCE',
    MEDIA_AVP = 'MEDIA_AVP',
    AGM_MEDIA_PLANNING_AND_PROCUREMENT = 'AGM_MEDIA_PLANNING_AND_PROCUREMENT',
    AM_MEDIA = 'AM_MEDIA',
    EXECUTIVE_MEDIA = 'EXECUTIVE_MEDIA',
    AVP_MEDIA_PRODUCTION = 'AVP_MEDIA_PRODUCTION',
    SR_MANAGER_MEDIA_PRODUCTION = 'SR_MANAGER_MEDIA_PRODUCTION',
    SR_EDITOR = 'SR_EDITOR',
    VIDEO_EDITOR = 'VIDEO_EDITOR',
    ASSOCIATE_EDITOR = 'ASSOCIATE_EDITOR',
    IT_AVP = 'IT_AVP',
    MANAGER_SYSTEM_AND_NETWORK = 'MANAGER_SYSTEM_AND_NETWORK',
    MANAGER_SERVER_AND_IT = 'MANAGER_SERVER_AND_IT',
    MANAGER_TELECOM_AND_TECHNOLOGY = 'MANAGER_TELECOM_AND_TECHNOLOGY',
    AM_NETWORK = 'AM_NETWORK',
    EXECUTIVE_NETWORK = 'EXECUTIVE_NETWORK',
    EXECUTIVE_IT = 'EXECUTIVE_IT',
    DEVELOPMENT_AVP = 'DEVELOPMENT_AVP',
    GRAPHIC_DESIGNER = 'GRAPHIC_DESIGNER',
    PRODUCT_DEVELOPMENT_AND_RESEARCH = 'PRODUCT_DEVELOPMENT_AND_RESEARCH',
    SR_3D_ARTIST = 'SR_3D_ARTIST',
    SR_VFX_ARTIST = 'SR_VFX_ARTIST',
    SR_VISUALIZE = 'SR_VISUALIZE',
    WEB_DEVELOPMENT_AVP = 'WEB_DEVELOPMENT_AVP',
    SR_MANAGER_DIGITAL_SALES = 'SR_MANAGER_DIGITAL_SALES',
    SR_MANAGER_SEO = 'SR_MANAGER_SEO',
    MANAGER_SEO = 'MANAGER_SEO',
    EXECUTIVE_SEO = 'EXECUTIVE_SEO',
    CONTENT_CREATOR = 'CONTENT_CREATOR',
    CONTENT_WRITER = 'CONTENT_WRITER',
    FRONTEND_DEVELOPER = 'FRONTEND_DEVELOPER',
    GRAPHIC_DESIGNER_WEB = 'GRAPHIC_DESIGNER_WEB',
    JR_WEB_DEVELOPER = 'JR_WEB_DEVELOPER',
    // SR_WEB_DEVELOPER='SR_WEB_DEVELOPER',
    SR_WEB_DEVELOPER = 'SR_WEB_DEVELOPER',
    WEB_DEVELOPER = 'WEB_DEVELOPER',
    AVP_OPERATIONS = 'AVP_OPERATIONS',
    VP_OPERATIONS = 'VP_OPERATIONS',
    AGM_COMPLIANCE = 'AGM_COMPLIANCE',
    AGM_OPERATIONS = 'AGM_OPERATIONS',
    QA_AVP = 'QA_AVP',
    AM_QUALITY_ANALYST = 'AM_QUALITY_ANALYST',
    TEAM_LEADER_QUALITY_ANALYST = 'TEAM_LEADER_QUALITY_ANALYST',
    EXECUTIVE_QUALITY_ANALYST = 'EXECUTIVE_QUALITY_ANALYST',
    LOGISTICS_AVP = 'LOGISTICS_AVP',
    MANAGER_LOGISTICS = 'MANAGER_LOGISTICS',
    AM_LOGISTICS = 'AM_LOGISTICS',
    EXECUTIVE_LOGISTICS = 'EXECUTIVE_LOGISTICS',
    MAPPING_AVP = 'MAPPING_AVP',
    MANAGER_MIS = 'MANAGER_MIS',
    EXECUTIVE_MIS = 'EXECUTIVE_MIS',
    ADMIN_AVP = 'ADMIN_AVP',
    MANAGER_ADMIN = 'MANAGER_ADMIN',
    SR_EXECUTIVE_ADMIN = 'SR_EXECUTIVE_ADMIN',
    EXECUTIVE_ADMIN = 'EXECUTIVE_ADMIN',
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
        [GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT]: Hierarchy.customerCareDepartment,
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
        [GetHierarchByDeptProps.SALES_DEPARTMENT]:
            Hierarchy.salesDepartment[0].value,
        [GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT]:
            Hierarchy.customerCareDepartment[0].value,
        [GetHierarchByDeptProps.HR_DEPARTMENT]: Hierarchy.hrDepartment[0].value,
        [GetHierarchByDeptProps.DISTRIBUTION_DEPARTMENT]:
            Hierarchy.distributionDepartment[0].value,
        [GetHierarchByDeptProps.FINANCE_DEPARTMENT]:
            Hierarchy.financeDepartment[0].value,
        [GetHierarchByDeptProps.MEDIA_DEPARTMENT]:
            Hierarchy.mediaDepartment[0].value,
        [GetHierarchByDeptProps.MEDIA_PRODUCTION_DEPARTMENT]:
            Hierarchy.mediaProductionDepartment[0].value,
        [GetHierarchByDeptProps.IT_DEPARTMENT]: Hierarchy.ITDepartment[0].value,
        [GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT]:
            Hierarchy.DevelopmentDepartment[0].value,
        [GetHierarchByDeptProps.WEB_DEPARTMENT]:
            Hierarchy.webDepartment[0].value,
        [GetHierarchByDeptProps.OPERATION_DEPARTMENT]:
            Hierarchy.operationDepartment[0].value,
        [GetHierarchByDeptProps.QUALITY_DEPARTMENT]:
            Hierarchy.qualityDepartment[0].value,
        [GetHierarchByDeptProps.LOGISTIC_DEPARTMENT]:
            Hierarchy.logisticDepartment[0].value,
        [GetHierarchByDeptProps.MAPPING_AND_MIS_DEPARTMENT]:
            Hierarchy.mapingAndMISDepartment[0].value,
        [GetHierarchByDeptProps.ADMIN_DEPARTMENT]:
            Hierarchy.adminDepartment[0].value,
    }

    return defaultComponent[department] || []
}
