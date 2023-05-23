import { useBarcode } from '@createnextapp/react-barcode'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from 'src/redux/store'

function Barcode({ value }: { value: string }) {
    const { inputRef } = useBarcode({
        value,
        options: {
            displayValue: false,
            background: 'rgb(241 245 249)',
        },
    })

    return <canvas ref={inputRef} />
}

function AllBarcodes() {
    const navigate = useNavigate()
    const location = useLocation()
    const { path } = location.state
    const { barcodesToPrint, cartonBoxBarcode }: any = useSelector(
        (state: RootState) => state?.barcode
    )

    const barcodeValues = barcodesToPrint
    useEffect(() => {
        const printFunc = setTimeout(() => {
            window?.print()
        }, 1000)
        return () => {
            clearInterval(printFunc)
        }
    }, [])

    return (
        <div>
            <div className="flex justify-between items-center h-[55px]">
                {/* <ATMPageHeading> Barcode </ATMPageHeading> */}
                <button
                    onClick={() => {
                        navigate(path)
                    }}
                    className="bg-primary-main text-white rounded py-1 px-5 ml-5"
                >
                    Back
                </button>
            </div>
            {cartonBoxBarcode !== null ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1  gap-5 py-2 px-3">
                    <div className={`flex flex-col gap-2 shadow relative   `}>
                        <Barcode value={cartonBoxBarcode} />
                        <span>{cartonBoxBarcode}</span>
                    </div>
                </div>
            ) : null}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3  gap-5 py-2 px-3">
                {barcodeValues?.map((value: string, index: number) => (
                    <div
                        key={index}
                        className={`flex flex-col gap-2 shadow relative   `}
                    >
                        <Barcode key={index} value={value} />
                        <span>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default AllBarcodes
