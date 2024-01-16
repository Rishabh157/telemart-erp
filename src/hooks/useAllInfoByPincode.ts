/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useGetAllInfoByPincodeAuthMutation } from 'src/services/PinCodeService'

const useAllInfoByPincode = (pincode?: string) => {
    const [pincodeData, setPincodeData] = useState<any>([])

    const [getAllInfoByPincode, getAllInfoByPincodeInfo] =
        useGetAllInfoByPincodeAuthMutation()

    useEffect(() => {
        if (pincode?.length === 6) {
            getAllInfoByPincode(pincode)
                .then((res: any) => {
                    setPincodeData(res?.data?.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [pincode])

    return { pincodeData, isDataLoading: getAllInfoByPincodeInfo?.isLoading }
}

export default useAllInfoByPincode
