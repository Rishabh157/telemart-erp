/// ==============================================
// Filename:AddGRNWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useLocation } from 'react-router-dom'
// import { MdExpandMore } from 'react-icons/md'
// import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { FormInitialValues } from './AddGRNWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'GRN',
        path: '/grn',
    },
    {
        label: 'Add GRN',
    },
]

const AddItem = ({ formikProps, apiStatus }: Props) => {
    const { state } = useLocation()
    const { poCode, itemName, quantity,receivedQuantity } = state
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
                    <ATMPageHeading> Add GRN </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[80px] items-center border-b border-slate-300 py-4">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium py-5">
                            <div className="py-2"> PO Details </div>
                        </div>
                        {/* BUTTON - Add SO */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => {
                                    formikProps.handleSubmit()
                                }}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Add GRN
                            </button>
                        </div>
                    </div>

                    <div className="px-3 py-3">
                        <div className="flex justify-between  items-center  w-full">
                            <div className="flex gap-5">
                                <div className="text-[18px] font-medium text-primary-main">
                                    PO Code :
                                    <span className=" text-black px-2">
                                        {poCode}
                                    </span>
                                </div>
                                <div>|</div>
                                <div className="text-[18px] font-medium text-primary-main">
                                    Item Name :
                                    <span className=" text-black px-2">
                                        {itemName}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <div className="text-[18px] font-medium text-primary-main">
                                    Requested Qnty :
                                    <span className=" text-black px-2">
                                        {quantity}
                                    </span>
                                </div>
                                <div>|</div>
                                <div className="text-[18px] font-medium text-primary-main">
                                    Total Received Qnty:
                                    <span className=" text-black px-2">
                                        {receivedQuantity | 0}
                                    </span>
                                </div>
                            </div>

                            {/* <div className="text-[18px] font-medium text-primary-main">
                                Req Qnty : {quantity} | Received Qnty:
                            </div> */}
                        </div>
                        {/* </AccordionSummary>
                            <AccordionDetails> */}
                        <div className="grid grid-cols-3 gap-5 py-2 pb-9">
                            <ATMTextField
                                name="receivedQuantity"
                                type={'text'}
                                value={values.receivedQuantity}
                                onChange={(e) => {
                                    if (!isNaN(Number(e.target.value))) {
                                        setFieldValue(
                                            `receivedQuantity`,
                                            e.target.value
                                        )
                                        setFieldValue(`goodQuantity`, '')
                                        setFieldValue(`defectiveQuantity`, '')
                                    }
                                }}
                                label="Received Quantity"
                                placeholder="Received Quantity"
                            />

                            <ATMTextField
                                name="goodQuantity"
                                type={'text'}
                                value={values.goodQuantity}
                                onChange={(e) => {
                                    if (!isNaN(Number(e.target.value))) {
                                        setFieldValue(
                                            `goodQuantity`,
                                            e.target.value
                                        )
                                        if (
                                            parseInt(e.target.value) <=
                                            values.receivedQuantity
                                        ) {
                                            let value =
                                                ((values.receivedQuantity as number) -
                                                    parseInt(
                                                        e.target.value
                                                    )) as number
                                            setFieldValue(
                                                `defectiveQuantity`,
                                                value
                                            )
                                        }
                                    }
                                    //  else if (e.target.value === '') {
                                    //     // setFieldValue(`goodQuantity`, '')
                                    //     // setFieldValue(`defectiveQuantity`, '')
                                    // }
                                }}
                                label="Good Quantity"
                                placeholder="Good Quantity"
                            />

                            <ATMTextField
                                name="defectiveQuantity"
                                value={values.defectiveQuantity}
                                onChange={(e) => {
                                    if (!isNaN(Number(e.target.value))) {
                                        setFieldValue(
                                            `defectiveQuantity`,
                                            e.target.value
                                        )
                                        if (
                                            parseInt(e.target.value) <=
                                            values.receivedQuantity
                                        ) {
                                            let value =
                                                ((values.receivedQuantity as number) -
                                                    parseInt(
                                                        e.target.value
                                                    )) as number
                                            setFieldValue(`goodQuantity`, value)
                                        }
                                    }
                                }}
                                label="Defective Quantity"
                                placeholder="Defective Quantity"
                            />
                        </div>
                        {/* </AccordionDetails>
                        </Accordion> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItem
