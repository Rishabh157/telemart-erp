import { useGetStatusMarkAsDeleiverdMutation } from 'src/services/OrderService'
import { showToast } from 'src/utils'

const useMarkAsDelivered = () => {
    const [updateDeleveredStatus] = useGetStatusMarkAsDeleiverdMutation()
    const handleDeliveredStatus = ({ orderId }: { orderId: string }) => {
        updateDeleveredStatus({ orderId: orderId }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Status updated successfully!')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast(
                    'error',
                    'Something went wrong, Please try again later'
                )
            }
        })
    }
    return { handleDeliveredStatus }
}

export default useMarkAsDelivered
