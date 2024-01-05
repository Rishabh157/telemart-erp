import React from 'react'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
import ATMRadioButton from 'src/components/UI/atoms/formFields/ATMRadioButton/ATMRadioButton'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../CallerPageWrapper'
import {
    genderOption,
    medicalOptions,
    paymentModeOptions,
    relationOptionns,
} from '../components/constants'
type Props = {
    values: FormInitialValues
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void
}

const CallerOtherDetails = ({ values, setFieldValue }: Props) => {
    const [isFacebookId, setFacebookId] = React.useState(false)
    const [isInstagramId, setInstagramId] = React.useState(false)
    const [isOrderOtherFieldEnable, setIsOrderOtherFieldEnable] =
        React.useState(false)
    return (
        <>
            {/* Other Details */}
            <div className="bg-[#87527C] py-1 px-2">
                <h2 className="text-[14px] font-bold text-white">
                    OTHER DETAILS
                </h2>
            </div>

            <div className="grid grid-cols-12 border-[1px] mt-1 border-grey-700">
                <div className="col-span-6 py-2  gap-x-4 border-r-[1px] px-6 border-grey-800">
                    <div className="grid grid-cols-12">
                        <div className="col-span-4 pt-1 text-xs font-medium flex items-center">
                            Gender
                            <span className="text-red-500 text-xs"> * </span>
                        </div>
                        <div className="col-span-4">
                            <div className="-mt-5">
                                <ATMRadioButton
                                    labelCalassName="text-xs"
                                    name="gender"
                                    value={values.gender}
                                    options={genderOption || []}
                                    onChange={(e) => {
                                        setFieldValue('gender', e)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <ATMSelectSearchable
                        isMulti
                        labelSize="xs"
                        componentClass="mt-2"
                        label="Order For"
                        size="xs"
                        selectLabel="select order for"
                        labelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        // isSubmitting
                        maxMenuHeight={190}
                        name="orderFor"
                        value={values.orderFor}
                        options={relationOptionns}
                        onChange={(e) => {
                            setFieldValue('orderFor', e)
                            if (e?.includes('OTHERS')) {
                                setIsOrderOtherFieldEnable(true)
                            } else {
                                setIsOrderOtherFieldEnable(false)
                            }
                        }}
                    />

                    {isOrderOtherFieldEnable && (
                        <ATMTextField
                            label=""
                            labelSize="xs"
                            labelDirection="horizontal"
                            extraClassField="mt-2"
                            size="xs"
                            placeholder="Other"
                            name="orderForOther"
                            value={values.orderForOther || ''}
                            onChange={(e) =>
                                setFieldValue('orderForOther', e.target.value)
                            }
                        />
                    )}

                    <ATMSelectSearchable
                        componentClass="mt-2"
                        label="Age Group"
                        maxMenuHeight={150}
                        size="xs"
                        labelSize="xs"
                        labelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        selectLabel="select age group"
                        // isSubmitting
                        name="ageGroup"
                        value={values.ageGroup}
                        options={[
                            { label: '0-17', value: '0-17' },
                            { label: '18-35', value: '18-35' },
                            { label: '36-55', value: '36-55' },
                            { label: '56-75', value: '56-75' },
                            { label: '76 & Above', value: '76 & above' },
                        ]}
                        onChange={(e) => {
                            setFieldValue('ageGroup', e)
                        }}
                    />

                    <ATMTextField
                        extraClassField="mt-0"
                        label="Email-ID"
                        size="xs"
                        labelSize="xs"
                        labelDirection="horizontal"
                        // isSubmitting
                        name="emailId"
                        placeholder="enter email"
                        value={values.emailId}
                        onChange={(e) => {
                            setFieldValue('emailId', e.target.value)
                        }}
                    />

                    <div className="grid grid-cols-12">
                        <div className="col-span-4 pt-3">
                            <span className="text-xs font-medium">
                                Social Media
                            </span>
                        </div>
                        <div className="col-span-8 flex gap-x-4 px-1 items-center">
                            <ATMCheckbox
                                extraClasses="mt-2"
                                required
                                label="Facebook"
                                labelClasses="text-slate-700 text-xs font-medium pt-1 mb-1 select-none"
                                checked={isFacebookId}
                                onChange={(e) => setFacebookId(e)}
                            />

                            {isFacebookId && (
                                <div className="ml-1">
                                    <ATMTextField
                                        extraClassField="mt-2"
                                        size="xs"
                                        placeholder="Name ID"
                                        // labelDirection="horizontal"
                                        // isSubmitting
                                        name="socialMedia.facebook"
                                        value={
                                            values.socialMedia?.facebook || ''
                                        }
                                        onChange={(e) =>
                                            setFieldValue(
                                                'socialMedia.facebook',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </div>

                        <div className="col-span-4"></div>
                        <div className="col-span-8 flex gap-x-4 px-1 items-center">
                            <ATMCheckbox
                                extraClasses="mt-2"
                                required
                                label="Instagram"
                                labelClasses="text-slate-700 text-xs font-medium pt-1 mb-1 select-none"
                                checked={isInstagramId}
                                onChange={(e) => {
                                    setInstagramId(e)
                                }}
                            />

                            {isInstagramId && (
                                <ATMTextField
                                    extraClassField="mt-2"
                                    size="xs"
                                    // labelDirection="horizontal"
                                    // classDirection="grid grid-cols-3"
                                    placeholder="Name ID"
                                    // isSubmitting
                                    name="socialMedia.instagram"
                                    value={values.socialMedia?.instagram || ''}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'socialMedia.instagram',
                                            e.target.value
                                        )
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="h-[145px]">
                        <ATMSelectSearchable
                            isMulti
                            isMenuOpen
                            labelSize="xs"
                            name="medicalIssue"
                            value={values.medicalIssue}
                            labelDirection="horizontal"
                            selectLabel="select medical issue"
                            size="small"
                            options={medicalOptions || []}
                            label="Any Other Medical Issue"
                            selectClass={'-mt-4 select-margin'}
                            onChange={(value) => {
                                setFieldValue(`medicalIssue`, value)
                            }}
                        />
                    </div>
                </div>

                <div className="col-span-6 py-2 px-8 border-r-[1px]">
                    <div className="grid grid-cols-12">
                        <div className="col-span-3"></div>
                        <div className="col-span-9 bg-slate-300 px-6 border-[1px]">
                            <div className="-mt-6 p-4">
                                <ATMRadioButton
                                    label="Payment Mode :"
                                    labelCalassName="text-xs"
                                    name="paymentMode"
                                    value={values.paymentMode || ''}
                                    className="mt-1"
                                    options={paymentModeOptions}
                                    onChange={(e) => {
                                        setFieldValue('paymentMode', e)
                                    }}
                                />
                                <div>
                                    {values.paymentMode === 'ONLINE' ? (
                                        <a
                                            href={'media/caller-page'}
                                            className="underline"
                                        >
                                            {' '}
                                            Send Payment Link
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="-mt-2">
                        <ATMTextArea
                            name="remark"
                            value={values.remark}
                            placeholder="Other Remarks"
                            minRows={8}
                            onChange={(value) => {
                                setFieldValue('remark', value)
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CallerOtherDetails
