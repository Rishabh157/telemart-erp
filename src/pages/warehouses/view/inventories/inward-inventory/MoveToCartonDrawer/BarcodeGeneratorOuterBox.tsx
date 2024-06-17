// |-- Built-in Dependencies --|
import { useEffect } from 'react'

// |-- External Dependencies --|
import { useBarcode } from '@createnextapp/react-barcode'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { Divider } from '@mui/material'
import moment from 'moment'

function Barcode({ value }: { value: string }) {
    const { inputRef } = useBarcode({
        value,
        options: {
            displayValue: false,
            background: 'rgb(241 245 249)',
        },
    })

    return <canvas ref={inputRef} className="h-[25px]" />
}

function BarcodeGeneratorOuterBox() {
    const navigate = useNavigate()
    const location = useLocation()
    const {
        path,
        outerBoxCode,
        productCode,
        productGroupLabel,
        expiryDate,
        lotNumber,
    } = location.state

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
            <div className="flex justify-between items-center h-[45px] no-print">
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
                <div className="flex justify-between items-center text-xs gap-3 mt-4 w-full pb-2 ">
                    <div className="pl-2 w-full">
                        <div className="flex gap-4">
                            <span>Master Id: </span>
                            <span>651</span>
                        </div>
                        <div className="flex gap-4">
                            <span>product Code: </span>
                            <span>{productCode}</span>
                        </div>
                        <div className="flex gap-4">
                            <span> product Name: </span>
                            <span>{productGroupLabel}</span>
                        </div>
                        <div className="flex gap-4">
                            <span> Lot Number: </span>
                            <span>{lotNumber}</span>
                        </div>
                        <div className="flex gap-4">
                            <span> Expiry Date: </span>
                            <span>
                                {moment(expiryDate).format('DD-MM-YYYY')}
                            </span>
                        </div>
                    </div>
                    <div
                        className={`flex flex-col  justify-center   gap-x-4 w-full shadow relative px-2 py-2  custom-border border-2 border-slate-700   `}
                    >
                        <Barcode value={outerBoxCode} />
                        <div className="w-full flex justify-center items-center p-0 tracking-[.90em] text-[0.90rem] ">
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
            <Divider className="mt-3" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-x-3 gap-y-1 mt-5 ">
                {barcodeValues?.map((value: string, index: number) => (
                    <div
                        key={index}
                        className={`flex flex-col gap-x-4 shadow relative w-full py-4 px-4 custom-border border-2 border-indigo-500 `}
                    >
                        <Barcode key={index} value={value} />
                        <div className="w-full flex justify-center p-0 tracking-[.60em] text-[0.60rem] ">
                            {value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BarcodeGeneratorOuterBox
