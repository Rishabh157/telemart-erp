import React, { useState } from 'react'
import { BsPrinter } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ATMDrawer from 'src/components/UI/atoms/ATMDrawer/ATMDrawer'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import {
    setBarcodesToPrint,
    setCartonBoxBarcode,
} from 'src/redux/slices/barcodeSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { useAddCartonBoxBarcodeMutation } from 'src/services/CartonBoxBarcodeService'
import { useAddInventoriesMutation } from 'src/services/InventoriesService'
import { showToast } from 'src/utils'

type Props = {
    onClose: () => void
    productGroupName: string
    groupBarcodeNumber: string
    productDetail: any[]
    wareHouse: string
    packaging: string
}

const MoveToCartonDrawer = ({
    onClose,
    productGroupName,
    groupBarcodeNumber,
    productDetail,
    wareHouse,
    packaging,
}: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [AddCartonBoxBarcode] = useAddCartonBoxBarcodeMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const [addInventory] = useAddInventoriesMutation()
    const handleSave = async () => {
        const barCodesToPrint = productDetail?.map((ele) => {
            return ele?.barcodeNumber
        })
        setApiStatus(true)
        dispatch(setBarcodesToPrint(barCodesToPrint))

        await AddCartonBoxBarcode({
            cartonBoxId: packaging,
            barcodeGroupNumber: groupBarcodeNumber,
            itemBarcodeNumber: barCodesToPrint,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    dispatch(
                        setCartonBoxBarcode(res?.data?.data[0]?.barcodeNumber)
                    )
                }
            }
        })

        await addInventory({
            productGroupName,
            groupBarcodeNumber: groupBarcodeNumber,
            productDetail,
            wareHouse,
            companyId: userData?.companyId || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Product-category added successfully!')
                    navigate('/barcodes', { state: { path: '/inventories' } })
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }
    return (
        <ATMDrawer open={true} onClose={onClose}>
            <div className="w-[300px] p-3">
                <div className="w-full p-2 shadow rounded border">
                    <div className="bg-slate-100 h-[120px] flex justify-center items-center">
                        <ATMLoadingButton
                            className="w-fit px-6"
                            onClick={() => handleSave()}
                            disabled={apiStatus}
                        >
                            <div className="flex gap-2 items-center justify-center">
                                <BsPrinter className="text-xl" /> Save & Print
                            </div>
                        </ATMLoadingButton>
                    </div>
                    <div className="py-2">
                        {' '}
                        {productGroupName} ({productDetail?.length}){' '}
                    </div>
                </div>
            </div>
        </ATMDrawer>
    )
}

export default MoveToCartonDrawer
