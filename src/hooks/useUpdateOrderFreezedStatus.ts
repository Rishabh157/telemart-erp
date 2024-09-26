import { useUpdateBarcodeFreezeStatusMutation } from 'src/services/BarcodeService'

type UpdateBarcodeStatusParams = {
    barcodes: string[]
    status: boolean
}

export const useUpdateOrderFreezedStatus = () => {
    const [updateBarcodeStatus] = useUpdateBarcodeFreezeStatusMutation()

    const updateOrderFreezeStatus = async ({
        status,
        barcodes,
    }: UpdateBarcodeStatusParams) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await updateBarcodeStatus({
                status: status,
                body: {
                    bcode: barcodes,
                },
            })
        } catch (error) {
            console.error('Error updating barcode status:', error)
            throw error
        }
    }

    return updateOrderFreezeStatus
}
