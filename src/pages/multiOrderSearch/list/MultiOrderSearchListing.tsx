// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'

import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { FormInitialValues } from './MultiOrderSearchListingWrapper'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const MultiOrderSearchListing = ({
    columns,
    rows,
    formikProps,
    apiStatus,
}: Props) => {
    const { values, setFieldValue, handleSubmit } = formikProps
    const [selectedRows, setSelectedRows] = useState([])

    return (
        <div className="h-[calc(100vh-60px)] px-4">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px] p-1">
                <ATMPageHeading>Multiple Order Search</ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white ">
                {/*Table Header */}
                <div className="flex justify-between px-2 mb-3">
                    <div className="w-[80%] flex gap-x-4">
                        <ATMTextArea
                            name=""
                            value={values?.orderNumbers}
                            label=""
                            placeholder="Order number..."
                            className="rounded"
                            isDisable={
                                values.mobileNumbers.length ? true : false
                            }
                            onChange={(newValue) => {
                                let formatedCommaValue = newValue?.replace(
                                    /\D+/g,
                                    ','
                                ) // Replace non-digits with commas
                                formatedCommaValue = formatedCommaValue.replace(
                                    /^,/,
                                    ''
                                ) // Remove leading comma, if any
                                setFieldValue(
                                    'orderNumbers',
                                    formatedCommaValue
                                )
                            }}
                        />
                        <ATMTextArea
                            name=""
                            value={values.mobileNumbers}
                            label=""
                            isDisable={
                                values.orderNumbers.length ? true : false
                            }
                            placeholder="Enter Mobile number... "
                            className="rounded"
                            onChange={(event: string) => {
                                let formatedCommaValue = event?.replace(
                                    /\D+/g,
                                    ','
                                ) // Replace non-digits with commas
                                setFieldValue(
                                    'mobileNumbers',
                                    formatedCommaValue
                                )
                            }}
                        />

                        <ATMLoadingButton
                            disabled={
                                !values.orderNumbers.length &&
                                !values.mobileNumbers.length
                            }
                            loadingText="Searching..."
                            onClick={handleSubmit as any}
                            className="flex items-center px-2 py-1 mt-4 text-white rounded bg-primary-main w-30"
                        >
                            Search
                        </ATMLoadingButton>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-auto grow ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="max-h-[calc(100%-150px)] overflow-auto"
                        isLoading={apiStatus}
                    />
                </div>
            </div>
        </div>
    )
}

export default MultiOrderSearchListing
