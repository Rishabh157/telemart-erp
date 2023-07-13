/// ==============================================
// Filename:UserAccess.tsx
// Type: Access Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// |-- External Dependencies --|
// import { FormikProps } from 'formik'
// import { MdDeleteOutline } from 'react-icons/md'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
// import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
// import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
// import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
// import { SelectOption } from 'src/models/FormField/FormField.model'
// import { HiPlus } from 'react-icons/hi'
import { default as modulesData } from 'src/defaultData/moduleData.json'
// import { default as user } from 'src/defaultData/user.json'
import {
    moduleActionTypes,
    ModulesTypes,
    setUserModule,
} from 'src/redux/slices/access/userAcessSlice'
import { RootState } from 'src/redux/store'
import {
    getDepartmentLabel,
    getUserRoleLabel,
} from 'src/utils/GetHierarchyByDept'
// import { BsInfoCircle } from 'react-icons/bs'
// import Popover from '@mui/material/Popover'
// import Typography from '@mui/material/Typography'
// import Button from '@mui/material/Button'

// |-- Types --|
type Props = {
    apiStatus?: boolean
    department: string
    userRole: string
    handleUserAccessSubmit: () => void
}

// Breadcrumbs

const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Hierarchy',
        path: '/configurations/hierarchy',
    },
    {
        label: 'User Access',
    },
]

const UserAcess = ({
    apiStatus,
    department,
    userRole,
    handleUserAccessSubmit,
}: Props) => {
    const { modules } = modulesData

    const dispatch = useDispatch()
    const { userAccessItems } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { modules: moduleList } = userAccessItems
    const handleUserModuleAccess = (
        module: ModulesTypes,
        moduleValue: boolean
    ) => {
        const moduleAccess = modules?.find(
            (moduleitem) => moduleitem.moduleId === module.moduleId
        )
        if (moduleAccess) {
            let value = moduleList ? [...moduleList] : []

            if (moduleValue) {
                value.push(moduleAccess)
            } else {
                let valueRemove = userAccessItems?.modules.filter(
                    (moduleitem) => moduleitem.moduleId !== module.moduleId
                )
                value = valueRemove
            }
            dispatch(setUserModule(value))
        }
    }
    const handleUserActionAccess = (
        module: ModulesTypes,
        action: moduleActionTypes,
        actionValue: boolean
    ) => {
        const moduleIndex = userAccessItems.modules.findIndex(
            (moduleitem) => moduleitem.moduleId === module.moduleId
        )
        if (moduleIndex >= 0) {
            let moduleValue = [...userAccessItems?.modules]
            let moduleAction = [
                ...userAccessItems?.modules[moduleIndex].moduleAction,
            ]
            if (actionValue) {
                moduleAction.push(action)
            } else {
                let valueRemove = moduleAction.filter(
                    (actionitem) => actionitem.actionId !== action.actionId
                )
                moduleAction = valueRemove
            }
            moduleValue[moduleIndex] = {
                ...moduleValue[moduleIndex],
                moduleAction: moduleAction,
            }
            dispatch(setUserModule(moduleValue))
        }
    }
    // const handleUserFieldAccess = (
    //     module: ModulesTypes
    //     action: string,
    //     fieldValue: boolean
    // ) => {
    //     console.log('first', module, action, fieldValue, actionField)
    // }

    const isCheckedModule = (module: ModulesTypes) => {
        const isExistMoule = userAccessItems?.modules?.some(
            (moduleitem) => moduleitem.moduleId === module.moduleId
        )
        return isExistMoule || false
    }
    const isCheckedModuleAction = (
        module: ModulesTypes,
        actions: moduleActionTypes
    ) => {
        const isExistMoule = userAccessItems.modules?.find(
            (moduleitem) => moduleitem.moduleId === module.moduleId
        )
        return (
            isExistMoule?.moduleAction?.some(
                (actionItems) => actionItems.actionId === actions.actionId
            ) || false
        )
    }
    return (
        <div className="h-[calc(100vh-55px)] bg-white">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Modules </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            Modules Details
                            <div></div>
                        </div>

                        {/* BUTTON - Add SO */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => {
                                    handleUserAccessSubmit()
                                }}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-4 border-b border-slate-300">
                        <div className="flex gap-3 p-2">
                            <h4 className="font-bold">Department :</h4>{' '}
                            <p>{getDepartmentLabel(department)}</p>
                        </div>
                        <div className="flex gap-3 p-2">
                            <h4 className="font-bold">User Role :</h4>{' '}
                            <p>{getUserRoleLabel(userRole, department)}</p>
                        </div>
                    </div>
                    <div className="py-5 px-16 border-b border-slate-300">
                        <div className="grid grid-cols-6 gap-3">
                            {modules?.map(
                                (module: ModulesTypes, ind: number) => {
                                    return (
                                        <div className="" key={ind}>
                                            <div className="font-bold text-medium  gap-2 flex">
                                                <input
                                                    type={'checkbox'}
                                                    checked={isCheckedModule(
                                                        module
                                                    )}
                                                    onChange={(e) =>
                                                        handleUserModuleAccess(
                                                            module,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <div> {module.moduleName}</div>
                                            </div>
                                            <ul className="pt-2">
                                                {module?.moduleAction.map(
                                                    (
                                                        actionsItems: moduleActionTypes
                                                    ) => {
                                                        return (
                                                            <li
                                                                className=" flex"
                                                                key={
                                                                    actionsItems.actionId
                                                                }
                                                            >
                                                                <div className="gap-2 flex px-3">
                                                                    <input
                                                                        type={
                                                                            'checkbox'
                                                                        }
                                                                        checked={isCheckedModuleAction(
                                                                            module,
                                                                            actionsItems
                                                                        )}
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleUserActionAccess(
                                                                                module,
                                                                                actionsItems,
                                                                                e
                                                                                    .target
                                                                                    .checked
                                                                            )
                                                                        }
                                                                    />
                                                                    <div>
                                                                        {
                                                                            actionsItems.actionName
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAcess
