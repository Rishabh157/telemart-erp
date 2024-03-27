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
import {
    useGetDistributionsRoleMutation,
    useGetSeniorExicutivesByZmIdQuery,
    useGetJuniorExicutivesByZeIdQuery,
} from 'src/services/UserServices'

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
    const [manger, setManager] = useState<any>([])
    const [executive, setExecutive] = useState<any>([])
    const [jrExecutive, setJrExecutive] = useState<any>([])

    // get Zonal Executive (senior) by zonal manger id
    const { isLoading, isFetching, data } = useGetSeniorExicutivesByZmIdQuery(
        formikProps?.values?.zonalManagerId,
        {
            skip: !formikProps?.values?.zonalManagerId,
        }
    )
    useEffect(() => {
        if (!isLoading && !isFetching) {
            setExecutive(data?.data)
        }
    }, [isLoading, isFetching, data])

    // get Zonal Executive (junior) by Zonal Executive (senior) id
    const {
        isLoading: isJrZonalExecutiveLoading,
        isFetching: isJrZonalExecutiveFetching,
        data: jrZonalExecutiveData,
    } = useGetJuniorExicutivesByZeIdQuery(
        formikProps?.values?.zonalExecutiveId,
        {
            skip: !formikProps?.values?.zonalExecutiveId,
        }
    )

    useEffect(() => {
        if (!isJrZonalExecutiveLoading && !isJrZonalExecutiveFetching) {
            setJrExecutive(jrZonalExecutiveData?.data)
        }
    }, [
        isJrZonalExecutiveLoading,
        isJrZonalExecutiveFetching,
        jrZonalExecutiveData,
    ])

    // useEffect(() => {
    //     // if (userData?.companyId) {
    //     //     getRoleForDistribution({
    //     //         comapnyId: userData?.companyId,
    //     //         role: 'executive',
    //     //     }).then((res: any) => {
    //     //         if (res?.data?.status) {
    //     //             setExecutive(res?.data?.data)
    //     //         }
    //     //     })
    //     // }
    // }, [userData?.companyId, getRoleForDistribution])

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
        managerOption: manger?.map((managerItem: any) => {
            return {
                label: managerItem.firstName + ' ' + managerItem.lastName,
                value: managerItem?._id,
            }
        }),

        executiveOption: executive?.map((executiveItem: any) => {
            return {
                label: executiveItem.firstName + ' ' + executiveItem.lastName,
                value: executiveItem?._id,
            }
        }),

        jrExecutiveOption: jrExecutive?.map((jrexecutiveItem: any) => {
            return {
                label:
                    jrexecutiveItem.firstName + ' ' + jrexecutiveItem.lastName,
                value: jrexecutiveItem?._id,
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
