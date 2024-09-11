import { useUpdateBarcodeFreezeStatusMutation } from 'src/services/BarcodeService'

type UpdateBarcodeStatusParams = {
    barcodes: string[]
    status: boolean
}

export const useUpdateBarcodeFreezedStatus = () => {
    const [updateBarcodeStatus] = useUpdateBarcodeFreezeStatusMutation()

    const updateStatus = async ({
        status,
        barcodes,
    }: UpdateBarcodeStatusParams) => {
        try {
            const response = await updateBarcodeStatus({
                status: status,
                body: {
                    bcode: barcodes,
                },
            })
            console.log('HOOK', response)
            // return response
        } catch (error) {
            console.error('Error updating barcode status:', error)
            throw error
        }
    }

    return updateStatus
}
