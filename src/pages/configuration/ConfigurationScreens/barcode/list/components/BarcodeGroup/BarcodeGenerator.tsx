/// ==============================================
// Filename:ProductGroupBarcodeListing.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect } from 'react'

// |-- External Dependencies --|
import { useBarcode } from '@createnextapp/react-barcode'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

// |-- Redux --|
import { RootState } from 'src/redux/store'

function Barcode({ value }: { value: string }) {
    const { inputRef } = useBarcode({
        value,
        options: {
            displayValue: false,
            background: 'rgb(241 245 249)',
        },
    })

    return <canvas ref={inputRef} className="h-[55px]" />
}

function AllBarcodes() {
    const navigate = useNavigate()
    const location = useLocation()
    const { path, outerBoxCode } = location.state
    const { barcodesToPrint }: any = useSelector(
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
        <div className=" bg-white">
            <div className="flex justify-between items-center h-[45px]">
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
            {outerBoxCode ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1  gap-3 ">
                    <div className={`flex flex-col gap-2 shadow relative   `}>
                        <Barcode value={outerBoxCode} />
                        <div className="w-full flex justify-center p-0 tracking-[.25em] ">
                            {outerBoxCode}
                        </div>
                    </div>
                </div>
            ) : null}

            {/* <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3  gap-5 py-2 px-3">
                {barcodeValues?.map((value: string, index: number) => (
                    <div
                        key={index}
                        className={`flex flex-col gap-2 shadow relative   `}
                    >
                        <Barcode key={index} value={value} />
                        <span>{value}</span>
                    </div>
                ))}
            </div> */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ">
                {barcodeValues?.map((value: string, index: number) => (
                    <div
                        key={index}
                        className={`flex flex-col gap-x-2 shadow relative w-full`}
                    >
                        <Barcode key={index} value={value} />
                        <div className="w-full flex justify-center p-0 tracking-[.25em] ">
                            {value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default AllBarcodes
