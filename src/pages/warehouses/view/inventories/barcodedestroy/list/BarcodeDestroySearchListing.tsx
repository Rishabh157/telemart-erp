// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { CircularProgress } from '@mui/material'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
type Props = {
    barcodes: any[]
    handleBarcodeSearch: (barocde: string) => void
    handleRemoveBarcode: (barocde: any) => void
    handleSubmit: () => void
    isLoading: boolean
    handleFileChange: (barocde: any) => void
    fileInputRef: any
}

const BarcodeDestroySearchListing = ({
    barcodes,
    handleBarcodeSearch,
    handleRemoveBarcode,
    handleSubmit,
    isLoading,
    handleFileChange,
    fileInputRef,
}: Props) => {
    const [barcode, setBarcode] = React.useState('')
    return (
        <div className="h-[calc(100vh-95px)] px-4">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px] p-1">
                <ATMPageHeading>Exipry Brcode searching</ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-95px)] rounded bg-white ">
                {/*Table Header */}
                <div className="flex justify-between px-2">
                    <div className=" flex w-[25%] gap-2 relative">
                        <ATMTextField
                            name=""
                            extraClassField=" relative w-full"
                            value={barcode}
                            readOnly={isLoading}
                            autoFocus
                            label=""
                            placeholder="barcode.."
                            className="rounded "
                            onChange={(e: any) => {
                                setBarcode(e?.target?.value)
                                if (e?.target?.value?.length > 5) {
                                    handleBarcodeSearch(e?.target?.value)
                                }
                            }}
                        />
                        {isLoading && (
                            <CircularProgress
                                size={20}
                                className="mt-5 absolute top-7 right-3"
                            />
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <div>
                            <input
                                type="file"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange} // Assuming addExcelFile can handle the file input change event
                            />
                            {isAuthorized(
                                UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_COURIER_RETURN_BULK_UPLOAD
                            ) && (
                                <button
                                    onClick={() =>
                                        fileInputRef?.current?.click()
                                    }
                                    className="bg-primary-main text-white rounded p-2 mt-4 "
                                >
                                    + Bulk Upload
                                </button>
                            )}
                        </div>
                        <div>
                            <ATMLoadingButton
                                disabled={!barcodes.length}
                                loadingText="Searching..."
                                onClick={handleSubmit as any}
                                className="flex items-center px-2 py-1 mt-4 text-white rounded bg-primary-main w-30"
                            >
                                Update
                            </ATMLoadingButton>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className=" px-2 grid grid-cols-4 gap-2 ">
                    {barcodes?.map((items: any) => {
                        return (
                            <BarcodeCard
                                key={items?._id}
                                barcodeNumber={items?.barcodeNumber}
                                productGroupLabel={items?.productGroupLabel}
                                handleRemoveBarcode={() => {
                                    handleRemoveBarcode(items)
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default BarcodeDestroySearchListing
