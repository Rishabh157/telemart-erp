/// ==============================================
// Filename:MoveToCartonDrawer.tsx
// Type: Add Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { BsPrinter } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMDrawer from 'src/components/UI/atoms/ATMDrawer/ATMDrawer'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
// import { useAddCartonBoxBarcodeMutation } from 'src/services/CartonBoxBarcodeService'
// import { useAddInventoriesMutation } from 'src/services/InventoriesService'
import { showToast } from 'src/utils'

// |-- Redux --|
import {
    setBarcodesToPrint,
    // setCartonBoxBarcode,
} from 'src/redux/slices/barcodeSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { useInwardInventoryBarcodeMutation } from 'src/services/BarcodeService'

// |-- Types --|
type Props = {
    onClose: () => void
    // productGroupName: string
    // groupBarcodeNumber: string
    productDetail: any[]
    wareHouse: string
    packaging: string
}

const MoveToCartonDrawer = ({
    onClose,
    // productGroupName,
    // groupBarcodeNumber,
    productDetail,
    wareHouse,
    packaging,
}: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    // const [AddCartonBoxBarcode] = useAddCartonBoxBarcodeMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const [addInventory] = useInwardInventoryBarcodeMutation()
    const handleSave = async () => {
        const barCodesToPrint = productDetail?.map((ele) => {
            return ele?.barcodeNumber
        })
        setApiStatus(true)
        dispatch(setBarcodesToPrint(barCodesToPrint))
        // productGroupId: string;
        // barcodeGroupNumber: string;
        // outerBoxbarCodeNumber: string;
        // lotNumber: string;
        // isUsed: string;
        // wareHouseId: string;
        // dealerId: string;
        // status: string;
        // companyId: string;

        const barcodeProduct = productDetail.map((ele) => {
            const {
                barcodeNumber,
                outerBoxbarCodeNumber,
                createdAt,
                isActive,
                isDeleted,
                updatedAt,
                status,
                __v,
                ...rest
            } = ele // use object destructuring to remove the _id property

            return {
                ...rest,
                cartonBoxId: packaging,
                wareHouseId: wareHouse,
                companyId: userData?.companyId,
            } // return the new object without the _id property
        })
        // console.log("barcodeProduct",packaging,wareHouse,barcodeProduct)
        // await AddCartonBoxBarcode({
        //     cartonBoxId: packaging,
        //     barcodeGroupNumber: groupBarcodeNumber,
        //     itemBarcodeNumber: barCodesToPrint,
        //     companyId: userData?.companyId || '',
        // }).then((res) => {
        // if ('data' in res) {
        //     if (res?.data?.status) {
        //         dispatch(setCartonBoxBarcode(res?.data?.data[0]?.barcodeNumber))
        //     }
        // }
        // })

        await addInventory({ barcodedata: barcodeProduct }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    console.log('resresresres', res)
                    setTimeout(() => {
                        showToast(
                            'success',
                            'Product-category added successfully!'
                        )
                    }, 2000)
                    navigate('/barcodes', {
                        state: {
                            path: `/warehouse/view/${wareHouse}/inventories`,
                            outerBoxCode:
                                res?.data?.data?.outerBoxbarCodeNumber,
                        },
                    })
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
                        {/* {' '} */}
                        {/* {productGroupName} */}({productDetail?.length})
                    </div>
                </div>
            </div>
        </ATMDrawer>
    )
}

export default MoveToCartonDrawer
