import React, { useEffect } from 'react'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
import ATMRadioButton from 'src/components/UI/atoms/formFields/ATMRadioButton/ATMRadioButton'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../salesInbound/SalesPageWrapper'
import {
    genderOption,
    medicalOptions,
    paymentModeOptions,
    relationOptionns,
} from '../components/constants'
import { DisabledFieldsPropsTypes } from '../courierNdrDialer/CourierNdrDialerPage'

type Props = {
    values: FormInitialValues
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void
    isCaller?: boolean
    isDisabled?: DisabledFieldsPropsTypes
}

const CallerOtherDetails = ({
    values,
    setFieldValue,
    isCaller,
    isDisabled,
}: Props) => {
    const [isFacebookId, setFacebookId] = React.useState(false)
    const [isInstagramId, setInstagramId] = React.useState(false)
    const [isOrderOtherFieldEnable, setIsOrderOtherFieldEnable] =
        React.useState(false)

    useEffect(() => {
        if (values?.socialMedia?.facebook) {
            setFacebookId(true)
        }
        if (values?.socialMedia?.instagram) {
            setInstagramId(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {/* Other Details */}
            <div className="bg-[#87527C] py-1 px-2">
                <h2 className="text-[10px] font-bold text-white">
                    OTHER DETAILS
                </h2>
            </div>

            <div className="grid grid-cols-12 border-[1px] mt-1 border-grey-700">
                <div className="col-span-6 py-2  gap-x-4 border-r-[1px] px-2 border-grey-800">
                    <div className="grid grid-cols-12">
                        <div className="col-span-4 pt-1 text-xs font-medium flex items-center">
                            Gender
                            <span className="text-red-500 text-xs"> * </span>
                        </div>
                        <div className="col-span-4">
                            <div className="-mt-5">
                                <ATMRadioButton
                                    isDisable={isDisabled?.isGender}
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
                        isDisabled={isDisabled?.isOrderFor}
                        fontSizeOptionsClass="13px"
                        minHeight="35px"
                        fontSizePlaceHolder="14px"
                        isMulti
                        labelSize="xxs"
                        componentClass="mt-2"
                        label="Order For"
                        size="xxs"
                        selectLabel="select order for"
                        labelDirection="horizontal"
                        classDirection="grid grid-cols-3"
                        labelClass="text-slate-700 text-xs font-medium"
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
                            labelSize="xxs"
                            labelDirection="horizontal"
                            extraClassField="mt-2"
                            size="xxs"
                            placeholder="Other"
                            name="orderForOther"
                            value={values.orderForOther || ''}
                            onChange={(e) =>
                                setFieldValue('orderForOther', e.target.value)
                            }
                        />
                    )}

                    <ATMSelectSearchable
                        isDisabled={isDisabled?.isAgeGroup}
                        fontSizeOptionsClass="13px"
                        minHeight="25px"
                        fontSizePlaceHolder="14px"
                        componentClass="mt-2"
                        label="Age Group"
                        maxMenuHeight={150}
                        size="xxs"
                        labelSize="xxs"
                        labelDirection="horizontal"
                        labelClass="text-slate-700 text-xs font-medium"
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

                    {/* <ATMTextField
                        disabled={isDisabled?.isEmailId}
                        extraClassField="mt-2"
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
                    /> */}

                    {/* <div className="grid grid-cols-12">
                        <div className="col-span-4 pt-3">
                            <span className="text-slate-700 text-xs font-medium">
                                Social Media
                            </span>
                        </div>
                        <div className="col-span-8 flex gap-x-4 px-1 items-center">
                            <ATMCheckbox
                                disabled={isDisabled?.isSocialMediaFacebook}
                                extraClasses="mt-2"
                                // required
                                label="Facebook"
                                inputClasses="h-3 w-3"
                                labelClasses="text-slate-700 text-[10px] font-medium pt-1 mb-1 select-none"
                                checked={isFacebookId}
                                onChange={(e) => setFacebookId(e)}
                            />

                            {isFacebookId && (
                                <div className="ml-1">
                                    <ATMTextField
                                        extraClassField="mt-2"
                                        size="xs"
                                        placeholder="Name ID"
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
                                disabled={isDisabled?.isSocialMediaInstagram}
                                extraClasses="mt-2"
                                // required
                                label="Instagram"
                                inputClasses="h-3 w-3"
                                labelClasses="text-slate-700 text-[10px] font-medium pt-1 mb-1 select-none"
                                checked={isInstagramId}
                                onChange={(e) => {
                                    setInstagramId(e)
                                }}
                            />

                            {isInstagramId && (
                                <ATMTextField
                                    extraClassField="mt-2"
                                    size="xs"
                                    placeholder="Name ID"
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
                    </div> */}
                    <div className="h-[145px]">
                        <ATMSelectSearchable
                            isDisabled={isDisabled?.isMedicalIssue}
                            fontSizeOptionsClass="13px"
                            minHeight="35px"
                            fontSizePlaceHolder="14px"
                            isMulti
                            isMenuOpen
                            labelSize="xxs"
                            name="medicalIssue"
                            value={values.medicalIssue}
                            labelDirection="horizontal"
                            labelClass="text-slate-700 text-xs font-medium"
                            selectLabel="select medical issue"
                            size="xxs"
                            options={medicalOptions || []}
                            label="Any Other Medical Issue"
                            selectClass={'-mt-4 select-margin'}
                            onChange={(value) => {
                                setFieldValue(`medicalIssue`, value)
                            }}
                        />
                    </div>
                </div>

                <div className="col-span-6 py-2 px-2 border-r-[1px]">
                    {!isCaller && (
                        <div>
                            <ATMTextField
                                disabled={isDisabled?.isEmailId}
                                extraClassField="mt-2"
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
                                    <span className="text-slate-700 text-xs font-medium">
                                        Social Media
                                    </span>
                                </div>
                                <div className="col-span-8 flex gap-x-4 px-1 items-center">
                                    <ATMCheckbox
                                        disabled={isDisabled?.isSocialMediaFacebook}
                                        extraClasses="mt-2"
                                        // required
                                        label="Facebook"
                                        inputClasses="h-3 w-3"
                                        labelClasses="text-slate-700 text-[10px] font-medium pt-1 mb-1 select-none"
                                        checked={isFacebookId}
                                        onChange={(e) => setFacebookId(e)}
                                    />

                                    {isFacebookId && (
                                        <div className="ml-1">
                                            <ATMTextField
                                                extraClassField="mt-2"
                                                size="xs"
                                                placeholder="Name ID"
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
                                        disabled={isDisabled?.isSocialMediaInstagram}
                                        extraClasses="mt-2"
                                        // required
                                        label="Instagram"
                                        inputClasses="h-3 w-3"
                                        labelClasses="text-slate-700 text-[10px] font-medium pt-1 mb-1 select-none"
                                        checked={isInstagramId}
                                        onChange={(e) => {
                                            setInstagramId(e)
                                        }}
                                    />

                                    {isInstagramId && (
                                        <ATMTextField
                                            extraClassField="mt-2"
                                            size="xs"
                                            placeholder="Name ID"
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

                            <div className="grid-cols-12 hidden">
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
                        </div>
                    )}

                    <div className="-mt-2">
                        <ATMTextArea
                            name="remark"
                            value={values.remark}
                            placeholder="Other Remarks"
                            minRows={6}
                            onChange={(value) => {
                                setFieldValue('remark', value)
                            }}
                        />
                    </div>
                    {isCaller && (
                        <>
                            <div>
                                <ATMTextField
                                    extraClassField="mt-0"
                                    label="Coupon code"
                                    size="xxs"
                                    labelSize="xxs"
                                    labelDirection="horizontal"
                                    labelClass="mt-2"
                                    name="emailId"
                                    placeholder="enter coupon code"
                                    value={''}
                                    onChange={(e) => {
                                        setFieldValue('emailId', e.target.value)
                                    }}
                                />
                            </div>

                            <div className="mt-2">
                                <div className="flex gap-x-14">
                                    <span className="text-slate-700 text-xs">
                                        AVAILABLE COUPONS
                                    </span>

                                    <div className="flex gap-x-2">
                                        <button
                                            type="button"
                                            className="text-slate-700 text-xs rounded px-1 border-[1px] border-[#e5e1d7]"
                                        >
                                            APPLY
                                        </button>
                                        <button
                                            type="button"
                                            className="text-slate-700 text-xs rounded px-1 border-[1px] border-[#e5e1d7]"
                                        >
                                            CLEAR
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2">
                                <div className="flex gap-x-9">
                                    <span className="text-slate-700 text-xs">
                                        Available Loyalty Points
                                    </span>

                                    <div className="text-xs">
                                        0{' '}
                                        <span className="text-[#814cd2] text-xs underline">
                                            Show Details
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-2">
                                        <div className="flex gap-x-32">
                                            <span className="text-slate-700 text-xs flex items-center">
                                                Burn Value
                                            </span>
                                            <div className="flex gap-x-4">
                                                <ATMTextField
                                                    extraClassField="mt-0"
                                                    label=""
                                                    size="xxs"
                                                    labelSize="xxs"
                                                    labelClass="mt-2"
                                                    name="emailId"
                                                    placeholder="enter burn value"
                                                    value={''}
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'emailId',
                                                            e.target.value
                                                        )
                                                    }}
                                                />
                                                <div >
                                                    <button
                                                        type="button"
                                                        className="text-slate-700 px-[3px] py-[1px] text-xs border-[1px] border-[#e5e1d7] rounded"
                                                    >
                                                        APPLY
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="text-slate-700 px-[3px] py-[1px] text-xs border-[1px] border-[#e5e1d7] mx-2 rounded"
                                                    >
                                                        CLEAR
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default CallerOtherDetails
