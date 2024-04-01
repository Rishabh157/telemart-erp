import React, { useState } from 'react'
// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { showToast } from 'src/utils'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { MdDeleteOutline } from 'react-icons/md'
import { FormInitialValues } from './DealerPinCodeTabWrapper'
import { FormikProps } from 'formik'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { useGetAllTehsilUnauthQuery } from 'src/services/TehsilService'
import usePincodesByTehsil from 'src/hooks/usePincodesByTehsil'

// import { useGetPincodesByDistrictQuery } from 'src/services/DealerPincodeService'
type Props = {
    formikProps: FormikProps<FormInitialValues>
    itemIndex: any
    value: any
    remove: any
    districtOptions: SelectOption[]
}

const AddDealerLayout = ({
    itemIndex,
    formikProps,
    value,
    remove,
    districtOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps
    const [pincodeOptions, setPincodeOptions] = React.useState<SelectOption[]>(
        []
    )
    const [tehsilOptions, setTehsilOptions] = useState([])
    const { pincodesByTehsil } = usePincodesByTehsil(
        values.pincodeDetail[itemIndex].tehsilId || ''
    )

    React.useEffect(() => {
        if (pincodesByTehsil) {
            const pincodeOption = pincodesByTehsil?.map((pincodes: any) => {
                return {
                    label: pincodes.pincode as string,
                    value: pincodes.pincode as string,
                }
            })
            setPincodeOptions(pincodeOption)
        }
    }, [pincodesByTehsil])

    // set Tehsil
    const {
        data: tehsilData,
        isFetching: tehsilIsFetching,
        isLoading: tehsilIsLoading,
    } = useGetAllTehsilUnauthQuery(
        values.pincodeDetail[itemIndex].district || '',
        {
            skip: !values.pincodeDetail[itemIndex].district,
        }
    )
    React.useEffect(() => {
        if (!tehsilIsFetching && !tehsilIsLoading) {
            const tehsilOption = tehsilData?.data?.map((tehsil: any) => {
                return {
                    label: tehsil?.tehsilName as string,
                    value: tehsil?._id as string,
                }
            })
            setTehsilOptions(tehsilOption)
        }
    }, [tehsilData, tehsilIsFetching, tehsilIsLoading])

    return (
        <div key={itemIndex} className="flex gap-3 items-end ">
            <div className="flex-[1_1_0%]">
                <ATMSelectSearchable
                    name={`pincodeDetail[${itemIndex}].district`}
                    value={value.district}
                    onChange={(e) => {
                        setFieldValue(`pincodeDetail[${itemIndex}].district`, e)
                    }}
                    options={districtOptions}
                    label="District"
                />
            </div>
            {/* TEHSIL */}
            <div className="flex-[1_1_0%]">
                <ATMSelectSearchable
                    fontSizePlaceHolder="14px"
                    fontSizeOptionsClass="13px"
                    minHeight="25px"
                    componentClass="mt-1"
                    label="Tehsil/Taluka"
                    name={`pincodeDetail[${itemIndex}].tehsilId`}
                    value={value.tehsilId || ''}
                    options={tehsilOptions || []}
                    onChange={(e) => {
                        if (
                            !values?.pincodeDetail?.find(
                                (f) => f.tehsilId === e
                            )
                        ) {
                            setFieldValue(
                                `pincodeDetail[${itemIndex}].tehsilId`,
                                e
                            )
                        } else {
                            showToast('error', 'Tehsil Already Added!')
                        }
                    }}
                />
            </div>
            {/* Item Name */}
            <div className="flex-[3_3_0%]">
                <ATMSelectSearchable
                    size="small"
                    isMulti
                    name={`pincodeDetail[${itemIndex}].pincode`}
                    value={value.pincode}
                    onChange={(e) => {
                        if (
                            !values?.pincodeDetail?.find((f) => f.pincode === e)
                        ) {
                            setFieldValue(
                                `pincodeDetail[${itemIndex}].pincode`,
                                e
                            )
                        } else {
                            showToast('error', 'Pincode Already Added!')
                        }
                    }}
                    options={pincodeOptions}
                    label="Pincode"
                />
            </div>

            {/* Rate */}
            <div className="flex-[1_1_0%]">
                <ATMTextField
                    size="small"
                    type="number"
                    min={0}
                    name={`pincodeDetail[${itemIndex}].estTime`}
                    value={value.estTime?.toString() || ''}
                    label="Estimated Time (in Min.)"
                    placeholder="Estimated Time"
                    onChange={(e) =>
                        setFieldValue(
                            `pincodeDetail[${itemIndex}].estTime`,
                            e.target.value
                        )
                    }
                />
            </div>

            {/* BUTTON - Delete */}
            {values.pincodeDetail?.length > 1 && (
                <div>
                    <button
                        type="button"
                        onClick={() => {
                            remove(itemIndex)
                        }}
                        className="p-2  bg-red-500 text-white rounded"
                    >
                        <MdDeleteOutline className="text-2xl" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default AddDealerLayout
