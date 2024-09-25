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

    return { updateStatus }
}
