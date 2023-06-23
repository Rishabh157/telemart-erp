import React from 'react'
import { FormikProps, FieldArray } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './ViewPurchaseOrderWrapper'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Purchase Order',
        path: '/purchase-order',
    },
    {
        label: 'View Purchase Order',
    },
]

type approval = {
    approvalByName: string
    approvalLevel: number
    time: string
}

const columns: columnTypes[] = [
    {
        field: 'approval[0].approvalByName',
        headerName: 'Approved By',
        flex: 'flex-[1.0_1.0_0%]',
        renderCell: (row: approval) => {
            return <span>{row?.approvalByName} </span>
        },
    },

    {
        field: 'approvalLevel',
        headerName: 'Approval Level',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: approval) => {
            return <span>{row?.approvalLevel} </span>
        },
    },
    {
        field: 'time',
        headerName: 'Time',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: approval) => {
            return <span className="py-4">{row.time} </span>
        },
    },
]

const ViewPurchaseOrder = ({ formikProps }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <div className="px-4 h-[calc(100vh-55px)] bg-white">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> View New Purchase Order </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium"> PO Details </div>

                        {/* BUTTON - View SO */}
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* PO Code */}
                            <ATMTextField
                                name="poCode"
                                disabled
                                value={values?.poCode}
                                label="PO Code"
                                placeholder="PO Code"
                                onChange={(e) =>
                                    setFieldValue('poCode', e.target.value)
                                }
                            />

                            <ATMTextField
                                name="vendor"
                                disabled
                                value={values?.vendor}
                                label="vendor"
                                placeholder="vendor"
                                onChange={() => {}}
                            />

                            {/* Warehouse */}

                            <ATMTextField
                                name="warehouse"
                                disabled
                                value={values?.wareHouse}
                                label="warehouse"
                                placeholder="warehouse"
                                onChange={() => {}}
                            />
                        </div>
                    </div>

                    {/*  Items  */}
                    <div className="px-3">
                        <div className=" text-lg pb-2 font-medium text-primary-main">
                            Items
                        </div>

                        <FieldArray name="purchaseOrder">
                            {({ push, remove }) => {
                                return (
                                    <>
                                        <div className="flex flex-col gap-y-5">
                                            <div className="flex gap-3 items-end ">
                                                <div className="flex-[3_3_0%]">
                                                    <ATMTextField
                                                        type="text"
                                                        min={0}
                                                        disabled
                                                        name="itemName"
                                                        value={
                                                            values
                                                                ?.purchaseOrder
                                                                ?.itemName || ''
                                                        }
                                                        label="Item Name"
                                                        placeholder="item Name"
                                                        onChange={() => {}}
                                                    />
                                                </div>

                                                <div className="flex-[2_2_0%]">
                                                    <ATMTextField
                                                        type="number"
                                                        min={0}
                                                        disabled
                                                        name="rate"
                                                        value={
                                                            values?.purchaseOrder?.rate?.toString() ||
                                                            ''
                                                        }
                                                        label="Rate"
                                                        placeholder="Rate"
                                                        onChange={() => {}}
                                                    />
                                                </div>

                                                <div className="flex-[2_2_0%]">
                                                    <ATMTextField
                                                        type="number"
                                                        min={0}
                                                        disabled
                                                        name="quantity"
                                                        value={
                                                            values?.purchaseOrder?.quantity?.toString() ||
                                                            ''
                                                        }
                                                        label="Quantity"
                                                        placeholder="Quantity"
                                                        onChange={(e) => {}}
                                                    />
                                                </div>

                                                <div className="flex-[3_3_0%]">
                                                    <ATMDatePicker
                                                        disabled
                                                        name="estReceivingDate"
                                                        value={
                                                            values
                                                                ?.purchaseOrder
                                                                ?.estReceivingDate
                                                        }
                                                        label="Est. Receiving Date"
                                                        onChange={() => {}}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end py-5"></div>
                                    </>
                                )
                            }}
                        </FieldArray>
                    </div>

                    {/*  Approval  */}
                    <div className="px-3">
                        <div className=" text-lg pb-2 font-medium text-primary-main">
                            Approval
                        </div>
                    </div>
                    {/*Table Header */}
                    <div className="flex flex-col gap-y-5">
                        <div className="grow overflow-auto  ">
                            <ATMTable
                                columns={columns}
                                rows={values?.approval}
                                extraClasses="max-h-full overflow-auto p-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPurchaseOrder
