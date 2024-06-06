// |-- Built-in Dependencies --|
import React from 'react'
//
import BarcodeDestroySearchListing from './BarcodeDestroySearchListing'
import {
    useGetBarcodeDamageAndExpiryMutation,
    useUpdateExipyBarcodesMutation,
    useUploadBulkBarcodeFileMutation,
} from 'src/services/BarcodeService'
import { useParams } from 'react-router-dom'
import { showToast } from 'src/utils'
// import { showToast } from 'src/utils'

const BarcodeDestroySearchListingWrapper = () => {
    const [getBarCode, getbarcodeInfo] = useGetBarcodeDamageAndExpiryMutation()
    const [updateBarCode] = useUpdateExipyBarcodesMutation()
    const [updateBulkBarcode] = useUploadBulkBarcodeFileMutation()
    const [barcodes, setBarcodes] = React.useState<any>([])
    const params = useParams()
    const wareHouseId = params.id as string
    const handleBarcodeSearch = (barcodeNumber: string) => {
        getBarCode({ barcodeNumber, wareHouseId })
            .then((res: any) => {
                if (res?.data?.status) {
                    if (res?.data?.data) {
                        let barcode = barcodes?.find(
                            (barcode: any) =>
                                barcode?.barcodeNumber ===
                                res?.data?.data?.barcodeNumber
                        )
                        if (barcode) {
                        } else {
                            let newBarcode = [...barcodes]
                            newBarcode.push(res?.data?.data)
                            setBarcodes([...newBarcode])
                        }
                    }
                } else {
                    // showToast('error', 'barcode number is not matched')
                }
            })
            .catch((err) => console.error(err))
    }
    const handleRemoveBarcode = (barcode: any) => {
        let removeBarcode = barcodes.filter(
            (item: any) => item?.barcodeNumber !== barcode?.barcodeNumber
        )
        setBarcodes([...removeBarcode])
    }
    const handleSubmit = () => {
        let barcodesNumbers = barcodes?.map((barcode: any) => {
            return barcode?.barcodeNumber
        })
        if (barcodes.length) {
            updateBarCode({
                wareHouseId: wareHouseId,
                barcodes: barcodesNumbers,
            })
                .then((res: any) => {
                    if (res?.data?.status) {
                        showToast('success', 'Update successfully')
                        setBarcodes([])
                    } else {
                        showToast('error', res?.data?.message)
                    }
                })
                .catch((err: any) => {
                    console.error(err)
                })
        }
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files[0]) {
            const file = files[0]
            // Create a new FormData instance
            const formData = new FormData()
            // Append the file
            formData.append('file', file)
            updateBulkBarcode({ warehouseId: wareHouseId, body: formData })
                .then((res: any) => {
                    if ('data' in res) {
                        showToast('success', 'Upload successfully')
                    }
                })
                .catch((err: any) => {
                    console.error('error', err)
                })
        }
    }
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    return (
        <BarcodeDestroySearchListing
            barcodes={barcodes}
            handleRemoveBarcode={handleRemoveBarcode}
            handleBarcodeSearch={handleBarcodeSearch}
            handleSubmit={handleSubmit}
            isLoading={getbarcodeInfo.isLoading}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
        />
    )
}

export default BarcodeDestroySearchListingWrapper
