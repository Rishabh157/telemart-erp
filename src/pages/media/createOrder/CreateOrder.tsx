// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import MainLayout from 'src/components/layouts/MainLayout/MainLayout'

// |-- Redux --|
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

// |-- Types --|
type FormFields = {
    userName: string
    didNumber: string
    campaignName: string
    mobileNumber: string
    callType: string
}

const CreateOrder = () => {
    const [value, setValue] = useState<FormFields>({
        userName: '',
        didNumber: '',
        campaignName: '',
        mobileNumber: '',
        callType: '',
    })

    // Hooks
    const { userData } = useGetLocalStorage()
    const navigate = useNavigate()

    useEffect(() => {
        setValue((prev) => ({
            ...prev,
            userName: userData?.userName,
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const callTypeOptions = [
        {
            label: 'Inbound',
            value: 'INBOUND',
        },
        {
            label: 'Outbound',
            value: 'OUTBOUND',
        },
        {
            label: 'Manual',
            value: 'MANUAL',
        },
    ]

    return (
        <MainLayout>
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                {/* <div className="font-bold text-black ">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div> */}

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Page Details </ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            Create Order Details
                        </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={false}
                                onClick={() => {
                                    navigate('/media/order-creation', {
                                        state: value,
                                    })
                                }}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    false ? 'opacity-50' : ''
                                }`}
                            >
                                Redirect
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-3 py-8 grow ">
                        <div className="grid grid-cols-3 gap-4 pb-3">
                            <ATMTextField
                                disabled
                                readOnly
                                name=""
                                InfoTitle="please Enter full name "
                                value={userData?.userName}
                                label="User Name"
                                placeholder="Enter username"
                                onChange={(e) => {}}
                            />

                            <ATMTextField
                                name=""
                                InfoTitle="please Enter full name "
                                value={value?.didNumber}
                                label="DID Number"
                                placeholder="Enter Did Number"
                                onChange={(e) => {
                                    setValue((prev) => ({
                                        ...prev,
                                        didNumber: e.target.value,
                                    }))
                                }}
                            />

                            <ATMTextField
                                name=""
                                InfoTitle="please Enter full name "
                                value={value?.campaignName}
                                label="Campaign"
                                placeholder="Campaign Name"
                                onChange={(e) => {
                                    setValue((prev) => ({
                                        ...prev,
                                        campaignName: e.target.value,
                                    }))
                                }}
                            />

                            <ATMTextField
                                name=""
                                value={value?.mobileNumber}
                                label="Mobile Number"
                                placeholder="Enter Mobile Number"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        setValue((prev) => ({
                                            ...prev,
                                            mobileNumber: e.target.value,
                                        }))
                                    }
                                }}
                            />

                            {/* Branch Name */}
                            <ATMSelectSearchable
                                required
                                name=""
                                label="Calltype"
                                options={callTypeOptions}
                                value={value?.callType}
                                onChange={(e) => {
                                    setValue((prev) => ({
                                        ...prev,
                                        callType: e,
                                    }))
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default CreateOrder
