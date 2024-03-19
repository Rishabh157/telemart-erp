/// ==============================================
// Filename:StepEditItems.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { FormInitialValues } from '../../EditProductWrapper'
import { DropdownOptions } from './StepEditItemsWrapper'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
}

const StepEditItems = ({ formikProps, dropdownOptions }: Props) => {
    const { values, setFieldValue } = formikProps

    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="py-6 ">
            <FieldArray name="items">
                {({ push, remove }) => (
                    <div className="">
                        {values?.items?.map((item, itemIndex) => {
                            const { itemId, itemQuantity } = item

                            return (
                                <div
                                    key={itemIndex}
                                    className={`flex flex-col gap-3 pb-6 px-7 ${
                                        itemIndex !==
                                            values?.items?.length - 1 &&
                                        'border-b'
                                    }  border-slate-300 `}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="pb-2 text-lg font-medium text-primary-main ">
                                            Item #{itemIndex + 1}
                                        </div>
                                        {/* Delete Button */}
                                        {values.items?.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    remove(itemIndex)
                                                }
                                                className="p-1 text-white bg-red-500 rounded"
                                            >
                                                <MdDeleteOutline className="text-2xl" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-4 gap-4 gap-y-5">
                                        {/* Item Name */}
                                        <ATMSelectSearchable
                                            required
                                            name={`items[${itemIndex}].itemId`}
                                            value={itemId}
                                            onChange={(e) => {
                                                handleSetFieldValue(
                                                    `items[${itemIndex}].itemId`,
                                                    e
                                                )
                                            }}
                                            size="small"
                                            label="Item Name"
                                            options={
                                                dropdownOptions?.itemOptions ||
                                                []
                                            }
                                        />

                                        {/* Item Quantity */}
                                        <ATMTextField
                                            required
                                            name={`items[${itemIndex}].itemQuantity`}
                                            value={itemQuantity}
                                            onChange={(e) => {
                                                const inputValue =
                                                    e.target.value
                                                if (
                                                    !isNaN(Number(inputValue))
                                                ) {
                                                    handleSetFieldValue(
                                                        `items[${itemIndex}].itemQuantity`,
                                                        e.target.value
                                                    )
                                                }
                                            }}
                                            label="Item Quantity"
                                            placeholder="Item Quantity"
                                            className="mt-2 bg-white rounded shadow"
                                            isSubmitting={isSubmitting}
                                        />
                                    </div>
                                </div>
                            )
                        })}

                        <div className="flex p-5 justify-self-start">
                            <button
                                type="button"
                                onClick={() =>
                                    push({
                                        itemId: '',
                                        itemQuantity: '',
                                    })
                                }
                                className="flex items-center px-2 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded-full "
                            >
                                <HiPlus size="20" /> Add More
                            </button>
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    )
}

export default StepEditItems
