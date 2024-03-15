// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from './AddDealerToSchemeMappingWrapper'
import ATMTransferList from 'src/components/UI/atoms/ATMTransferList/ATMTransferList'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { useGetAllSchemeByDealerIdQuery } from 'src/services/SchemeService'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    schemeListOption: SelectOption[]
}

const AddDealerToSchemeMapping = ({
    formikProps,
    apiStatus,
    schemeListOption,
}: Props) => {
    // const [flag, setFlag] = useState(true)
    const { values, setFieldValue } = formikProps
    const [allOptions, setAllOtions] = useState([])

    const transferListProps = {
        name: 'schemes',
        options: allOptions || [],
        right: values?.schemes || [],
        setRight: (newValue: { label: string; value: string }[]) =>
            setFieldValue('schemes', newValue),
        leftSideTitle: 'All Schemes',
        rightSideTitle: 'Schemes to add',
    }

    // GET Dealer List BY Scheme Id
    const {
        data: schemeListData,
        isFetching: isSchemeListFetching,
        isLoading: isSchemeListLoading,
    } = useGetAllSchemeByDealerIdQuery(values?.dealerId, {
        skip: !values?.dealerId,
    })

    // GET Dealer List BY Scheme Id
    useEffect(() => {
        if (!isSchemeListFetching && !isSchemeListLoading) {
            // not having scheme
            setAllOtions(schemeListData?.notAssignedScheme)
            // already having scheme
            setFieldValue('schemes', schemeListData?.alreadyHaveScheme)
        }
    }, [
        schemeListData,
        isSchemeListFetching,
        isSchemeListLoading,
        setFieldValue,
    ])

    return (
        <div className="py-0.5 h-[calc(100%)] flex flex-col gap-2">
            {/* <div className="pt-1">
                    <ATMPageHeading> Attributes Group </ATMPageHeading>
                </div> */}

            <div className="grow h-[100%] bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat py-2">
                <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                    {/* Form Heading */}
                    <div className="text-xl font-medium">
                        Dealer To Schemes Mapping
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
                            name="dealerId"
                            selectLabel="Select Dealer"
                            value={values?.dealerId}
                            options={schemeListOption || []}
                            onChange={(e) => {
                                setFieldValue('dealerId', e)
                            }}
                        />
                    </div>

                    <div className="h-[680px] mt-8">
                        {/* {allOptions?.length ? ( */}
                        <ATMTransferList {...transferListProps} />
                        {/* ) : null} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDealerToSchemeMapping
