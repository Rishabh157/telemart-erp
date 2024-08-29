// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { BsPrinter } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMDrawer from 'src/components/UI/atoms/ATMDrawer/ATMDrawer'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { showToast } from 'src/utils'

// |-- Redux --|
import { setBarcodesToPrint } from 'src/redux/slices/barcodeSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { useInwardInventoryBarcodeMutation } from 'src/services/BarcodeService'

// |-- Types --|
type Props = {
    onClose: () => void
    productDetail: any[]
    wareHouse: string
    packaging: string
    vendorId: string
}

const MoveToCartonDrawer = ({
    onClose,
    productDetail,
    wareHouse,
    packaging,
    vendorId,
}: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)
    const [addInventory] = useInwardInventoryBarcodeMutation()
    const handleSave = async () => {
        const barCodesToPrint = productDetail?.map((ele) => {
            return ele?.barcodeNumber
        })
        setApiStatus(true)
        dispatch(setBarcodesToPrint(barCodesToPrint))

        const barcodeProduct = productDetail.map((ele) => {
            const {
                // barcodeNumber,
                productGroupLabel,
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
                vendorId: vendorId
            } // return the new object without the _id property
        })

        await addInventory({ barcodedata: barcodeProduct }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    setTimeout(() => {
                        showToast(
                            'success',
                            'Product-category added successfully!'
                        )
                    }, 2000)

                    navigate(`/barcodes-outerbox`, {
                        state: {
                            path: `/warehouse/view/${wareHouse}/inventories`,
                            outerBoxCode:
                                res?.data?.data?.outerBoxbarCodeNumber,
                            productGroupLabel:
                                productDetail[0].productGroupLabel,
                            productCode: productDetail[0].productCode,
                            expiryDate: productDetail[0].expiryDate,
                            lotNumber: productDetail[0].lotNumber,
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
                    <div className="py-2">({productDetail?.length})</div>
                </div>
            </div>
        </ATMDrawer>
    )
}

export default MoveToCartonDrawer
