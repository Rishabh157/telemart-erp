/// ==============================================
// Filename:StepEditOthersWrapper.tsx
// Type: Edit Component
// Last Updated: July 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../EditDealerWrapper'
import StepAddOthers from './StepEditOthers'
import { Field } from 'src/models/FormField/FormField.model'
import { useGetDistributionsRoleMutation } from 'src/services/UserServices'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { useSelector } from 'react-redux'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const StepEditOthersWrapper = ({ formikProps }: Props) => {
    const { userData }: any = useSelector((state: RootState) => state.auth)
    const [getRoleForDistribution] = useGetDistributionsRoleMutation()
    const [executive, setExecutive] = useState<any>([])
    const [manger, setManager] = useState<any>([])

    useEffect(() => {
        if (userData?.companyId) {
            getRoleForDistribution({
                comapnyId: userData?.companyId,
                role: 'executive',
            }).then((res: any) => {
                if (res?.data?.status) {
                    setExecutive(res?.data?.data)
                }
            })
        }
    }, [userData?.companyId, getRoleForDistribution])

    useEffect(() => {
        if (userData?.companyId) {
            getRoleForDistribution({
                comapnyId: userData?.companyId,
                role: 'manager',
            }).then((res: any) => {
                if (res?.data?.status) {
                    setManager(res?.data?.data)
                }
            })
        }
    }, [userData?.companyId, getRoleForDistribution])

    const dropDownOption = {
        executiveOption: executive?.map((executiveItem: any) => {
            return {
                label: executiveItem.firstName + ' ' + executiveItem.lastName,
                value: executiveItem?._id,
            }
        }),
        managerOption: manger?.map((managerItem: any) => {
            return {
                label: managerItem.firstName + ' ' + managerItem.lastName,
                value: managerItem?._id,
            }
        }),
    }
    return (
        <>
            <StepAddOthers
                formikProps={formikProps}
                dropDownOption={dropDownOption}
            />
        </>
    )
}

export default StepEditOthersWrapper
