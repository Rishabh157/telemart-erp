// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- Internal Dependencies --|
import { useParams } from 'react-router-dom'
import ATMBreadCrumbs, { BreadcrumbType } from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { useGetByBarcodeMutation } from 'src/services/BarcodeService'
import { SelectBoxOption } from './InwardInventoryWrapper'
import MoveToCartonDrawer from './MoveToCartonDrawer/MoveToCartonDrawer'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetVendorsQuery } from 'src/services/VendorServices'
import { useUpdateBarcodeFreezedStatus } from 'src/hooks/useUpdateBarcodeFreezedStatus'

// |-- Types --|
type Props = {
    cartonBoxOption: SelectBoxOption[] | []
    wareHouseOption: SelectOption[] | []
}

export type renderBarcodType = {
    productGroupLabel: string
    productGroupNumber: string
    barcodeNumber: string
    vendorId: string
    isUsed: boolean
}

const InwardInventory = ({ cartonBoxOption, wareHouseOption }: Props) => {
    const [packaging, setPackaging] = React.useState('')
    const [vendorId, setVendorId] = React.useState('')
    const [vendorLabel, setVendorLabel] = React.useState('')
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
    const [barcode, setBarcode] = React.useState('')
    const [barcodes, setBarcodes] = React.useState<renderBarcodType[]>([])
    const [isOpenMoveToCartonDrawer, setIsOpenMoveToCartonDrawer] = React.useState(false)

    // Get all vendors
    const { options: vendorOptions } = useCustomOptions({
        useEndPointHook: useGetVendorsQuery(''),
        keyName: 'companyName',
        value: '_id',
    })

    const [getBarcodeById] = useGetByBarcodeMutation()
    const { updateStatus } = useUpdateBarcodeFreezedStatus() // Get the function from the hook

    // Fetching the barcode
    const handleBarCode = (barcodeId: string) => {
        getBarcodeById(barcodeId).then((res: any) => {
            if (res?.data?.data) {
                const barc = [...barcodes]
                const isExist = barc.find(
                    (ele) => ele?.barcodeNumber === res?.data?.data?.barcodeNumber
                )
                if (!isExist) {
                    barc.push(res?.data?.data)
                }
                updateStatus({
                    status: true,
                    barcodes: [barcodeId],
                })

                setBarcodes([...barc])
                setBarcode('')
            }
        })
    }

    const getCartonBoxSize = () => {
        let boxItems = cartonBoxOption?.find((ele) => ele?.value === packaging)
        if (boxItems) {
            return barcodes.length === boxItems.itemCount
        }
        return false
    }

    useEffect(() => {
        return () => {
            if (barcodes?.length) {
                const barcodeNumbers = barcodes.map((barcode) => barcode.barcodeNumber)
                updateStatus({
                    status: false,
                    barcodes: [...barcodeNumbers],
                })
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [barcodes])

    return (
        <div className="p-4 h-[calc(100vh-95px)] overflow-auto">
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
                        onChange={() => {}}
                        options={wareHouseOption}
                        label="Warehouse"
                    />

                    <ATMSelect
                        name=""
                        value={barcodes?.[0]?.vendorId || vendorId}
                        options={vendorOptions}
                        label="Vendor"
                        onChange={(e) => {
                            setVendorId(e?.target?.value)
                            const vendorLabel = vendorOptions?.find(
                                (ele) => ele?.value === e?.target?.value
                            )
                            setVendorLabel(vendorLabel?.label || '')
                        }}
                    />

                    <ATMSelect
                        name=""
                        value={packaging}
                        onChange={(e) => {
                            setPackaging(e.target.value)
                            setBarcodes([])
                            setBarcode('')
                        }}
                        options={cartonBoxOption}
                        label="Packaging"
                    />

                    <ATMTextField
                        name=""
                        disabled={
                            packaging?.length === 0 ||
                            wareHouse?.length === 0 ||
                            getCartonBoxSize()
                        }
                        value={barcode}
                        onChange={(e) => {
                            setBarcode(e.target.value)
                            if (e.target.value.length > 6) {
                                handleBarCode(e.target.value)
                            }
                        }}
                        extraClassField="mt-3"
                        label="Barcode"
                        placeholder="Barcode"
                        className="mt-0 rounded"
                    />
                </div>

                <div className="mt-5 py-3 px-3 grid grid-cols-6 gap-4">
                    {barcodes.map((barcode, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer"
                        >
                            <div className="flex justify-between">
                                <div>
                                    <div className="text-[12px] text-slate-500">Barcode No.</div>
                                    <div>{barcode?.barcodeNumber}</div>
                                </div>
                            </div>
                            <div className="text-primary-main font-medium grow flex items-end">
                                {barcode?.productGroupLabel}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isOpenMoveToCartonDrawer && (
                <MoveToCartonDrawer
                    productDetail={barcodes}
                    wareHouse={wareHouse as string}
                    packaging={packaging}
                    vendorId={vendorId}
                    vendorLabel={vendorLabel}
                    onClose={() => setIsOpenMoveToCartonDrawer(false)}
                />
            )}
        </div>
    )
}

export default InwardInventory
