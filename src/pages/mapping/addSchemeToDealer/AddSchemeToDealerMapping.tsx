// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from './AddSchemeToDealerMappingWrapper'
import ATMTransferList from 'src/components/UI/atoms/ATMTransferList/ATMTransferList'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useGetAllDealerBySchemeIdQuery } from 'src/services/DealerServices'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    schemeListOption: SelectOption[]
}

const AddSchemeToDealerMapping = ({
    formikProps,
    apiStatus,
    schemeListOption,
}: Props) => {
    // const [flag, setFlag] = useState(true)
    const { values, setFieldValue } = formikProps
    const [allOptions, setAllOtions] = useState([])

    const transferListProps = {
        name: 'dealers',
        options: allOptions,
        right: values?.dealers,
        setRight: (newValue: { label: string; value: string }[]) =>
            setFieldValue('dealers', newValue),
        // setLeft: (newValue: { label: string; value: string }[]) =>
        //     setFieldValue('dealers', newValue),
        leftSideTitle: 'All Dealers',
        rightSideTitle: 'Dealers to add',
    }

    // GET SCHEME LIST BY Company Id
    const {
        data: dealerListData,
        isFetching: isDealerListFetching,
        isLoading: isDealerListLoading,
    } = useGetAllDealerBySchemeIdQuery(values?.schemeId, {
        skip: !values?.schemeId,
    })

    // Get Dealer by scheme id
    useEffect(() => {
        if (!isDealerListFetching && !isDealerListLoading) {
            // not having dealer
            setAllOtions(dealerListData?.notAssignedScheme)

            // already having dealers
            setFieldValue('dealers', dealerListData?.alreadyHaveScheme)
        }
    }, [
        dealerListData,
        isDealerListFetching,
        isDealerListLoading,
        setFieldValue,
    ])

    return (
        <div className="h-[calc(100%-55px)]">
            <div className="py-0.5 h-[calc(100%-55px)] flex flex-col gap-2  ">
                {/* <div className="pt-1">
                    <ATMPageHeading> Attributes Group </ATMPageHeading>
                </div> */}

                <div className="grow h-[100%] bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat py-2">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            Schemes To Dealers Mapping
                        </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps?.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow pb-9 pt-2 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            <ATMSelectSearchable
                                minHeight="25px"
                                name="schemeId"
                                selectLabel="Select Scheme"
                                value={values?.schemeId}
                                options={schemeListOption || []}
                                onChange={(e) => {
                                    setFieldValue('schemeId', e)
                                }}
                            />
                        </div>

                        <div className="h-[500px] mt-8">
                            {allOptions?.length ? (
                                <ATMTransferList {...transferListProps} />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSchemeToDealerMapping
