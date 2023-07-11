/// ==============================================
// Filename:UserAccess.tsx
// Type: Access Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
// import { MdDeleteOutline } from 'react-icons/md'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
// import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
// import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './UserAccessWrapper'
// import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { SelectOption } from 'src/models/FormField/FormField.model'
// import { HiPlus } from 'react-icons/hi'
import { default as modulesData } from 'src/defaultData/moduleData.json'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
// import { BsInfoCircle } from 'react-icons/bs'
// import Popover from '@mui/material/Popover'
// import Typography from '@mui/material/Typography'
// import Button from '@mui/material/Button'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    vendorOptions: any[]
    warehouseOptions: any[]
    itemOptions: any[]
    apiStatus: boolean
}
export type DropdownOptions = {
    vendorOptions: SelectOption[]
    warehouseOptions: SelectOption[]
    itemOptions: SelectOption[]
}

// Breadcrumbs

const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Dashboard',
        path: '/dashboard',
    },
    {
        label: 'User Access',
    },
]

const UserAcess = ({
    formikProps,
    vendorOptions,
    warehouseOptions,
    itemOptions,
    apiStatus,
}: Props) => {
    // const dropdownOptions: DropdownOptions = {
    //     vendorOptions,
    //     warehouseOptions,
    //     itemOptions,
    // }

    // // const { values, setFieldValue } = formikProps

    // // const [open, setOpen] = useState(false)
    // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    //     null
    // )

    // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget)
    // }

    // const handleClose = () => {
    //     setAnchorEl(null)
    // }

    // const open = Boolean(anchorEl)
    // const id = open ? 'simple-popover' : undefined
    const { modules } = modulesData
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
                            {' '}
                            Modules Details{' '}
                        </div>

                        {/* BUTTON - Add SO */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                    <div className="py-5 px-16 border-b border-slate-300">
                        <div className="grid grid-cols-6 gap-3">
                            {modules?.map((i: any, module: any) => {
                                return (
                                    <div key={i}>
                                        <div className=" font-bold p-1">
                                            {module.label}
                                        </div>
                                        <ul>
                                            {module.moduleAction.map(
                                                (index: any, actions: any) => {
                                                    return (
                                                        <li className=" flex" key={index}>
                                                            <div className="-mt-6">
                                                                <ATMCheckbox
                                                                    name={
                                                                        module.ModuleName +
                                                                        actions.name
                                                                    }
                                                                    label={
                                                                        actions.label
                                                                    }
                                                                    value={
                                                                        actions.value
                                                                    }
                                                                    checked={
                                                                        actions.ischeck
                                                                    }
                                                                    onChange={() => {}}
                                                                />
                                                            </div>
                                                            {/* {actions?.listkeys && (
                                                                <>
                                                                 
                                                                    <Button
                                                                        className="p-0 m-0"
                                                                        aria-describedby={
                                                                            id
                                                                        }
                                                                        // variant="contained"
                                                                        onClick={
                                                                            handleClick
                                                                        }
                                                                    >
                                                                        <BsInfoCircle />
                                                                    </Button>
                                                                    <Popover
                                                                        id={id}
                                                                        open={
                                                                            open
                                                                        }
                                                                        anchorEl={
                                                                            anchorEl
                                                                        }
                                                                        onClose={() =>
                                                                            handleClose
                                                                        }
                                                                        anchorOrigin={{
                                                                            vertical:
                                                                                'bottom',
                                                                            horizontal:
                                                                                'left',
                                                                        }}
                                                                    >
                                                                    <ol className="mt-2 p-2 h-full w-full">
                                                                        {actions?.listkeys?.map(
                                                                            (
                                                                                keys: any
                                                                            ) => {
                                                                                return (
                                                                                    <li className="p-1 -mt-8 ">
                                                                                        <ATMCheckbox
                                                                                            name={
                                                                                                keys
                                                                                            }
                                                                                            label={
                                                                                                keys
                                                                                            }
                                                                                            value={
                                                                                                keys
                                                                                            }
                                                                                            checked={
                                                                                                keys
                                                                                            }
                                                                                            onChange={() => {}}
                                                                                        />
                                                                                    </li>
                                                                                )
                                                                            }
                                                                        )}
                                                                    </ol>
                                                                    </Popover>
                                                                </>
                                                            )} */}
                                                        </li>
                                                    )
                                                }
                                            )}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAcess
