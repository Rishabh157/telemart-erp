/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:InwardInventory.tsx
// Type: Add Component
// Last Updated: OCTOBER 20, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import { useParams } from 'react-router-dom'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { useGetByBarcodeMutation } from 'src/services/BarcodeService'
import { SelectBoxOption } from './InwardInventoryWrapper'
import MoveToCartonDrawer from './MoveToCartonDrawer/MoveToCartonDrawer'

// |-- Types --|
type Props = {
    cartonBoxOption: SelectBoxOption[] | []
    wareHouseOption: SelectOption[] | []
}

export type renderBarcodType = {
    productGroupLabel: string
    productGroupNumber: string
    barcodeNumber: string
    isUsed: boolean
}
const InwardInventory = ({ cartonBoxOption, wareHouseOption }: Props) => {
    const [packaging, setPackaging] = React.useState('')
    const { id: warehouseId } = useParams()
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Inventory',
            path: `/warehouse/view/${warehouseId}/inventories`,
        },
        {
            label: 'Inward Inventory',
        },
    ]
    const [wareHouse] = React.useState(warehouseId)
    const [barcodes, setBarcodes] = React.useState<renderBarcodType[]>([])
    const [barcode, setBarcode] = React.useState('')
    const [isOpenMoveToCartonDrawer, setIsOpenMoveToCartonDrawer] =
        React.useState(false)
    // const { data, isLoading, isFetching } = useGetAllBarcodeQuery('')
    const [getBarcodeById] = useGetByBarcodeMutation()
    const handleBarCode = (barcodeId: string) => {
        getBarcodeById(barcodeId).then((res: any) => {
            if (res?.data?.data) {
                const barc = [...barcodes]
                const isExist = barc.find(
                    (ele) => ele.barcodeNumber === res?.data?.data.barcodeNumber
                )
                if (!isExist) {
                    barc.push(res?.data?.data)
                }
                setBarcodes([...barc])
            }
        })
    }

    return (
        <div className="p-4 h-[calc(100vh-95px)] overflow-auto ">
            <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Inventories (from vendor)</ATMPageHeading>
                {barcodes.length ? (
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpenMoveToCartonDrawer(true)
                        }}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Move to Carton
                    </button>
                ) : null}
            </div>

            <div className="grow max-h-full bg-white border bg-1 rounded shadow bg-form-bg bg-cover bg-no-repeat p-2">
                <div className="grid grid-cols-4 gap-5 px-3">
                    <ATMSelect
                        name=""
                        isDisabled={true}
                        value={wareHouse}
                        onChange={() => {
                            //setWareHouse(e.target.value)
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
                    {/* 
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
                    /> */}

                    <ATMTextField
                        name=""
                        disabled={
                            packaging?.length === 0 || wareHouse?.length === 0
                        }
                        value={barcode}
                        onChange={(e) => {
                            setBarcode(e.target.value)
                            if (e.target.value.length > 6) {
                                handleBarCode(e.target.value)
                            }
                            //setShouldPrint(true)
                        }}
                        label="Barcode"
                        placeholder="Barcode"
                        className="mt-0 rounded"
                    />
                </div>

                <div className="mt-5 py-3 px-3 grid grid-cols-6 gap-4  ">
                    {barcodes?.map((barcode, index) => {
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
                    // productGroupName={filterBarcode[0]?.productGroupLabel}
                    // groupBarcodeNumber={filterBarcode[0]?.productGroupNumber}
                    productDetail={barcodes}
                    wareHouse={wareHouse as string}
                    packaging={packaging}
                    onClose={() => setIsOpenMoveToCartonDrawer(false)}
                />
            )}
        </div>
    )
}

export default InwardInventory
