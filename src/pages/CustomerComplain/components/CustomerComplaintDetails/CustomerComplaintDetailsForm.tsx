import React from 'react'
import { FieldArray, FormikProps } from 'formik'
import { FormInitialValues } from './AddCustomerComplaintDetailsWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import {
    // CircularProgress,
    Divider,
} from '@mui/material'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { useGetAllInitialByCallType } from 'src/hooks/useGetAllInitialByCallType'
import { useGetAllInitialCallTwoByCallTypeAndOneId } from 'src/hooks/useGetAllInitialCallTwoByCallTypeAndOneId'
import { useGetAllInitialCallThreeByCallTypeAndTwoId } from 'src/hooks/useGetAllInitialCallThreeByCallTypeAndTwoId'
import { complaintTypeOptions } from 'src/utils/constants/customeTypes'
import moment from 'moment'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'ADD' | 'EDIT'
    complaintLogs?: any[]
}

const statusOption = [
    {
        label: 'Open',
        value: 'OPEN',
    },
    {
        label: 'Pending',
        value: 'PENDING',
    },
    {
        label: 'Closed',
        value: 'CLOSED',
    },
]

const isShowImageUploadOptionInInitialCallerOneCase = [
    // complaint case
    'DELIVERYBOYHOUSEARRESTCASE',
    'MONEYBACK',
    'PRODUCTREPLACEMENT',
    'SIDEEFFECT',
    'NOTSATISFIEDBYPRODUCT',
    'DUPLICACYOFPRODUCT',
    // inquiry case
    'ALREADYORDERED',
    'DELIVERYRELATEDENQUIRY',
]

const CustomerComplaintDetailsForm = ({
    formikProps,
    apiStatus,
    formType,
    complaintLogs,
}: Props) => {
    // const [imageApiStatus, setImageApiStatus] = useState<boolean>(false)

    const { values, setFieldValue, handleSubmit } = formikProps

    // Upload File Mutation
    const [uploadFile] = useAddFileUrlMutation()

    // Get IC1 Option By Only Call Type
    const { initialCallOneByCallType, isDataLoading } =
        useGetAllInitialByCallType(values?.callType)

    // Get IC2 Option By Call Type And IC1 _id
    const {
        initialCallTwoByCallTypeAndOneId,
        isDataLoading: isInitialCallTwoDataLoaading,
    } = useGetAllInitialCallTwoByCallTypeAndOneId(
        values.initialCallOne,
        values.callType
    )

    // Get IC3 Option By Call Type And IC2 _id
    const {
        initialCallThreeByCallTypeAndTwoId,
        isDataLoading: isInitialCallThreeDataLoaading,
    } = useGetAllInitialCallThreeByCallTypeAndTwoId(
        values.initialCallTwo,
        values.callType
    )

    const handleFileUpload = (file: File, name: string) => {
        let formData = new FormData()

        // setImageApiStatus(true)
        formData.append(
            'type',
            file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT'
        )
        formData.append('bucketName', 'SAPTEL_CRM')
        formData.append('file', file || '', file?.name)

        // call the file manager api
        uploadFile(formData).then((res: any) => {
            if ('data' in res) {
                // setImageApiStatus(false)
                let fileUrl = BASE_URL_FILE_PICKER + '/' + res?.data?.file_path
                setFieldValue(name, fileUrl)
                // setImageApiStatus(false)
            }
        })
    }

    return (
        <div className="p-4 h-[70vh]">
            <div>
                <h1 className="text-xl font-semibold mb-2">
                    {formType === 'ADD' ? 'Create' : 'Update'} Complaint
                </h1>
                <div className="w-full mt-1 pt-2 pb-4 bg-[#e9f1fb] border-[1px] border-slate-300">
                    <div className="p-2">
                        <div className="grid gap-x-16 grid-cols-3">
                            {formType === 'EDIT' && (
                                <div className="flex items-center gap-x-3">
                                    <span className="text-sm text-[#406698] font-semibold flex-1">
                                        Complaint No
                                    </span>
                                    {' : '}
                                    <span className="text-sm text-black font-semibold flex-1 text-end">
                                        {values?.complaintNumber}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-x-3">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Order No
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-end">
                                    {values?.orderNo || '-'}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Scheme Name
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-end">
                                    {values?.schemeName}
                                </span>
                            </div>
                            {formType === 'ADD' && (
                                <div className="flex items-center gap-x-4">
                                    <span className="text-sm text-[#406698] font-semibold flex-1">
                                        Scheme Code
                                    </span>
                                    {' : '}
                                    <span className="text-sm text-black font-semibold flex-1 text-end">
                                        {values?.schemeCode}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="grid gap-x-16 grid-cols-3">
                            {formType === 'EDIT' && (
                                <div className="flex items-center gap-x-4">
                                    <span className="text-sm text-[#406698] font-semibold flex-1">
                                        Scheme Code
                                    </span>
                                    {' : '}
                                    <span className="text-sm text-black font-semibold flex-1 text-end">
                                        {values?.schemeCode}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Order Status
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-end">
                                    {values?.orderStatus}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-sm text-[#406698] font-semibold flex-1">
                                    Courier Status
                                </span>
                                {' : '}
                                <span className="text-sm text-black font-semibold flex-1 text-end">
                                    {values?.courierStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Divider />

                    <div className="grid grid-cols-4 gap-x-8 gap-y-1 p-2">
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="Call Type"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select call type"
                            classDirection="grid grid-cols-3"
                            name="callType"
                            value={values.callType || ''}
                            options={complaintTypeOptions()}
                            onChange={(e) => {
                                setFieldValue('callType', e)
                                if (e === 'COMPLAINT') {
                                    setFieldValue('status', 'OPEN')
                                } else if (e === 'INQUIRY') {
                                    setFieldValue('status', 'CLOSED')
                                }
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="IC1"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select IC1"
                            classDirection="grid grid-cols-3"
                            name="initialCallOne"
                            value={values.initialCallOne || ''}
                            options={initialCallOneByCallType}
                            isLoading={isDataLoading}
                            // isValueWithLable
                            onChange={(e) => {
                                setFieldValue('initialCallOne', e)

                                let obj = initialCallOneByCallType?.find(
                                    (ele) => ele?.value === e
                                )
                                if (obj) {
                                    setFieldValue(
                                        'icOneLabel',
                                        obj?.originalLabel
                                    )
                                } else {
                                    setFieldValue('icOneLabel', '')
                                }
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="IC2"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select IC2"
                            classDirection="grid grid-cols-3"
                            name="initialCallTwo"
                            value={values.initialCallTwo || ''}
                            options={initialCallTwoByCallTypeAndOneId}
                            isLoading={isInitialCallTwoDataLoaading}
                            onChange={(e) => {
                                setFieldValue('initialCallTwo', e || '')
                                let obj =
                                    initialCallTwoByCallTypeAndOneId?.find(
                                        (ele) => ele?.value === e
                                    )
                                if (obj) {
                                    setFieldValue(
                                        'icTwoLabel',
                                        obj?.originalLabel
                                    )
                                } else {
                                    setFieldValue('icTwoLabel', '')
                                }
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="IC3"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select IC3"
                            classDirection="grid grid-cols-3"
                            name="initialCallThree"
                            value={values.initialCallThree || ''}
                            options={initialCallThreeByCallTypeAndTwoId}
                            isLoading={isInitialCallThreeDataLoaading}
                            onChange={(e) => {
                                setFieldValue('initialCallThree', e)
                                let obj =
                                    initialCallThreeByCallTypeAndTwoId?.find(
                                        (ele) => ele?.value === e
                                    )
                                if (obj) {
                                    setFieldValue(
                                        'icThreeLabel',
                                        obj?.originalLabel
                                    )
                                } else {
                                    setFieldValue('icThreeLabel', '')
                                }
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            componentClass="mt-1"
                            label="Status"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select status"
                            classDirection="grid grid-cols-3"
                            name="status"
                            isDisabled={values?.callType === 'INQUIRY'}
                            value={values.status || ''}
                            options={statusOption}
                            onChange={(e) => {
                                setFieldValue('status', e)
                            }}
                        />

                        <div className="flex gap-x-4">
                            <label className="text-slate-700 text-sm font-medium">
                                Remarks
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="flex-1 -mt-2">
                                <ATMTextArea
                                    required
                                    label=""
                                    minRows={3}
                                    name="remark"
                                    value={values.remark}
                                    placeholder="remark"
                                    className="rounded"
                                    onChange={(newValue: string) =>
                                        setFieldValue('remark', newValue)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {isShowImageUploadOptionInInitialCallerOneCase?.includes(
                        values.icOneLabel
                    ) && (
                        <FieldArray name="images">
                            {({ push, remove }) => {
                                return (
                                    <div className="flex flex-col px-2">
                                        <div className="grid grid-cols-4 gap-4">
                                            {values?.images?.map(
                                                (item, index) => {
                                                    const { image } = item
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex gap-3 "
                                                        >
                                                            <div>
                                                                <ATMFilePickerWrapper
                                                                    required={
                                                                        true
                                                                    }
                                                                    name={`images[${index}].image`}
                                                                    label=""
                                                                    placeholder={
                                                                        'Upload Product Image'
                                                                    }
                                                                    selectedFile={
                                                                        image
                                                                    }
                                                                    onSelect={(
                                                                        newFile: any
                                                                    ) => {
                                                                        handleFileUpload(
                                                                            newFile,
                                                                            `images[${index}].image`
                                                                        )
                                                                    }}
                                                                    // isSubmitting={false}
                                                                />
                                                                {/* {imageApiStatus ? (
                                                                    <div className="mt-3">
                                                                        <CircularProgress
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    </div>
                                                                ) : null} */}
                                                            </div>

                                                            {/* BUTTON - Delete */}
                                                            {values.images
                                                                ?.length &&
                                                                values.images
                                                                    ?.length >
                                                                    1 && (
                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                remove(
                                                                                    index
                                                                                )
                                                                            }}
                                                                            className="p-2 bg-red-500 text-white rounded"
                                                                        >
                                                                            <MdDeleteOutline
                                                                            // className="text-2xl"
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>

                                        {/* BUTTON - Add More Product */}
                                        <div className="flex justify-self-start py-9">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    push({
                                                        image: '',
                                                    })
                                                }
                                                className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center"
                                            >
                                                <HiPlus size="20" /> Add More
                                            </button>
                                        </div>
                                    </div>
                                )
                            }}
                        </FieldArray>
                    )}

                    <div className="flex justify-center">
                        <ATMLoadingButton
                            className="w-24"
                            onClick={handleSubmit as any}
                            isLoading={apiStatus}
                            loadingText="Saving..."
                        >
                            Save
                        </ATMLoadingButton>
                    </div>
                </div>

                {formType === 'EDIT' && (
                    <div className="mt-4  w-[100%] overflow-x-auto">
                        <h1 className="text-primary-main">Complaint History</h1>
                        <table className="border border-gray-400">
                            <thead>
                                <tr className="bg-#cdddf2">
                                    <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                        Date
                                    </th>
                                    <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                        Order No.
                                    </th>
                                    <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                        Call Type
                                    </th>
                                    <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                        Issue Category (IC1:IC2:IC3)
                                    </th>
                                    <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                        Status (Return Type)
                                    </th>
                                    <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                        Stage
                                    </th>
                                    <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                        Last Remark
                                    </th>
                                    <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                        Last Updated By
                                    </th>
                                    <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                        Last Updated Date
                                    </th>
                                    <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                        Total Calls
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaintLogs?.map((ele, ind) => {
                                    return (
                                        <tr className="bg-#cdddf2" key={ind}>
                                            <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                                <div className="flex flex-col">
                                                    <span>
                                                        {moment(
                                                            ele?.createdAt
                                                        ).format('DD-MM-YYYY')}
                                                    </span>
                                                    <span>
                                                        {' '}
                                                        {moment(
                                                            ele?.createdAt
                                                        ).format('hh:mm:ss A')}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                                {ele?.orderNumber}
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                                {ele?.callType}
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                                {ele?.initialCallOneLabel}
                                                {':'}
                                                <br />
                                                {ele?.initialCallTwoLabel}
                                                {':'}
                                                <br />
                                                {ele?.initialCallThreeLabel}
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                                {ele?.status}
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                                -
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                                {ele?.remark}
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                                -
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                                {moment(ele?.updatedAt).format(
                                                    'DD-MM-YYYY'
                                                )}
                                                {moment(ele?.updatedAt).format(
                                                    'hh:mm:ss A'
                                                )}
                                            </td>
                                            <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                                -
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomerComplaintDetailsForm
