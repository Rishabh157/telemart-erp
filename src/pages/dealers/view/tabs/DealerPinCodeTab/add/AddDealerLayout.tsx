import React from 'react'
// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { showToast } from 'src/utils'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { MdDeleteOutline } from 'react-icons/md'
import { FormInitialValues } from './DealerPinCodeTabWrapper'
import { FormikProps } from 'formik'
import { SelectOption } from 'src/models/FormField/FormField.model'
import usePincodesByDistrict from 'src/hooks/usePincodesByDistrict'

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
    const { pincodeByDistrict } = usePincodesByDistrict(
        values.pincodeDetail[itemIndex].district
    )
    React.useEffect(() => {
        if (pincodeByDistrict) {
            const pincodeOption = pincodeByDistrict?.map((pincodes: any) => {
                return {
                    label: pincodes.pincode as string,
                    value: pincodes.pincode as string,
                }
            })
            setPincodeOptions(pincodeOption)
        }
    }, [pincodeByDistrict])

    return (
        <div key={itemIndex} className="flex gap-3 items-end ">
            <div className="flex-[1_1_0%]">
                <ATMSelectSearchable
                    name={`pincodeDetail[${itemIndex}].district`}
                    value={value.district}
                    onChange={(e) => {
                        if (
                            !values?.pincodeDetail?.find(
                                (f) => f.district === e
                            )
                        ) {
                            setFieldValue(
                                `pincodeDetail[${itemIndex}].district`,
                                e
                            )
                        } else {
                            showToast('error', 'District Already Added!')
                        }
                    }}
                    options={districtOptions}
                    label="District"
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
