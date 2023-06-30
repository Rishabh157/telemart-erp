/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:InwardInventory.tsx
// Type: Add Component
// Last Updated: JUNE 30, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import MoveToCartonDrawer from './MoveToCartonDrawer/MoveToCartonDrawer'
import { SelectBoxOption } from './InwardInventoryWrapper'
import { useGetAllBarcodeQuery } from 'src/services/BarcodeService'
import { SelectOption } from 'src/models/FormField/FormField.model'
// import { useSelector } from 'react-redux'
// import { RootState } from 'src/redux/store'
// import { showToast } from "src/utils";

// |-- Types --|
type Props = {
    cartonBoxOption: SelectBoxOption[] | []
    wareHouseOption: SelectOption[] | []
}

const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Inventory',
        path: '/inventories',
    },
    {
        label: 'Inward Inventory',
    },
]
export type renderBarcodType = {
    productGroupLabel: string
    productGroupNumber: string
    barcodeNumber: string
    isUsed: boolean
}
const InwardInventory = ({ cartonBoxOption, wareHouseOption }: Props) => {
    const [packaging, setPackaging] = React.useState('')
    const [wareHouse, setWareHouse] = React.useState('')
    const [status, setStatus] = React.useState('AVAILABLE')
    //const [shouldPrint, setShouldPrint] = React.useState(false)
    const [condition, setCondition] = React.useState('GOOD')
    const [barcodes, setBarcodes] = React.useState<renderBarcodType[]>([])
    const [filterBarcode, setFilterBarcode] = useState<renderBarcodType[] | []>(
        []
    )
    const [dataToSend, setDataToSend] = useState<any[]>([])
    const [itemCount, setItemCount] = React.useState(0)
    const [barcode, setBarcode] = React.useState('')
    const [isOpenMoveToCartonDrawer, setIsOpenMoveToCartonDrawer] =
        React.useState(false)
    const { data, isLoading, isFetching } = useGetAllBarcodeQuery('')
    useEffect(() => {
        const count =
            (cartonBoxOption?.find((e) => e?.value === packaging)
                ?.itemCount as number) || 0
        if (count) {
            setItemCount(count - 1)
        }
        setFilterBarcode([])
    }, [packaging])

    useEffect(() => {
        if (!isLoading && !isFetching) {
            const dataToSet = data?.data?.map((e: any) => {
                if (e?.isDeleted === false) {
                    return {
                        productGroupLabel: e.productGroupLabel,
                        productGroupNumber: e?.barcodeGroupNumber,
                        barcodeNumber: e?.barcodeNumber,
                        isUsed: e?.isUsed,
                    }
                }
            })
            setBarcodes(dataToSet)
        }
    }, [data, isLoading, isFetching])

    useEffect(() => {
        const newObject = barcodes?.filter(
            (f: any) => f?.barcodeNumber === barcode && f?.isUsed === false
        )

        // console.log(newObject)
        // if (newObject?.length ? newObject[0]?.isUsed === true : barcodes?.length) {
        //   showToast("error", "Barcode already used");
        // }
        const alreadyExist = filterBarcode?.find(
            (f) => f.barcodeNumber === newObject[0]?.barcodeNumber
        )
        const validBarcode = filterBarcode?.length
            ? filterBarcode[0]?.productGroupLabel ===
              newObject[0]?.productGroupLabel
            : true

        if (
            newObject?.length &&
            filterBarcode?.length <= itemCount &&
            !alreadyExist &&
            validBarcode
        ) {
            setFilterBarcode((prevData: any[]) => [...prevData, newObject[0]])
            const dataToSendObject = {
                barcodeNumber: newObject[0]?.barcodeNumber,
                status: status,
                condition: condition,
            }
            setDataToSend((prevData: any[]) => [...prevData, dataToSendObject])
        }
    }, [barcode])

    // useEffect(() => {
    //     if (barcode?.length === 6) {
    //         setBarcode('')
    //     }
    // }, [barcode])

    useEffect(() => {
        if (itemCount && itemCount + 1 === filterBarcode?.length) {
            setIsOpenMoveToCartonDrawer(true)
        }
    }, [itemCount, filterBarcode])
    return (
        <div className="p-4 h-[calc(100vh-95px)] overflow-auto ">
            <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Inventories </ATMPageHeading>
                {barcode && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpenMoveToCartonDrawer(true)
                        }}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Move to Carton
                    </button>
                )}
            </div>

            <div className="grow max-h-full bg-white border bg-1 rounded shadow bg-form-bg bg-cover bg-no-repeat p-2">
                <div className="grid grid-cols-4 gap-5 px-3">
                    <ATMSelect
                        name=""
                        value={wareHouse}
                        onChange={(e) => {
                            setWareHouse(e.target.value)
                        }}
                        options={wareHouseOption}
                        label="Warehouse"
                    />
                    <ATMSelect
                        name=""
                        value={packaging}
                        onChange={(e) => {
                            setPackaging(e.target.value)
                        }}
                        options={cartonBoxOption}
                        label="Packaging"
                    />

                    <ATMSelect
                        name=""
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value)
                        }}
                        options={[
                            { label: 'Select' },
                            { label: 'Available', value: 'AVAILABLE' },
                            { label: 'Out Of Stock', value: 'OUT OF STOCK' },
                        ]}
                        label="Status"
                    />
                    <ATMSelect
                        name=""
                        value={condition}
                        onChange={(e) => {
                            setCondition(e.target.value)
                        }}
                        options={[
                            { label: 'Select' },
                            { label: 'Good', value: 'GOOD' },
                            { label: 'Defective', value: 'DEFECTIVE' },
                        ]}
                        label="Condition"
                    />

                    <ATMTextField
                        name=""
                        disabled={
                            packaging?.length === 0 || wareHouse.length === 0
                        }
                        value={barcode}
                        onChange={(e) => {
                            setBarcode(e.target.value)
                            //setShouldPrint(true)
                        }}
                        label="Barcode"
                    />
                </div>

                <div className="mt-5 py-3 grid grid-cols-6 gap-4  ">
                    {filterBarcode?.map((barcode, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer`}
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-[12px] text-slate-500">
                                            Barcode No.
                                        </div>
                                        <div> {barcode?.barcodeNumber} </div>
                                    </div>
                                </div>

                                <div className="text-primary-main font-medium grow flex items-end">
                                    {barcode?.productGroupLabel}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {isOpenMoveToCartonDrawer && (
                <MoveToCartonDrawer
                    productGroupName={filterBarcode[0]?.productGroupLabel}
                    groupBarcodeNumber={filterBarcode[0]?.productGroupNumber}
                    productDetail={dataToSend}
                    wareHouse={wareHouse}
                    packaging={packaging}
                    onClose={() => setIsOpenMoveToCartonDrawer(false)}
                />
            )}
        </div>
    )
}

export default InwardInventory
