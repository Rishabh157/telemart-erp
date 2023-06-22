import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ATMBreadCrumbs from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { setSelectedItem } from 'src/redux/slices/CartonBoxBarcodeSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { useGetByCartonBoxBarcodeQuery } from 'src/services/CartonBoxBarcodeService'
import CartonBoxBarcodeDetailCard from '../list/components/CartonBoxBarcode/CartonBoxBarcodeDetailCard'

type Props = {
    cartonBoxCode: string
}

// const timeLineItems = Array(50).fill({
//   content: (
//     <div className="flex gap-3">
//       <div> 06 Feb 2023 </div>
//       <div className="bg-slate-100 rounded-full text-[13px] px-2 flex justify-center items-center">
//         {" "}
//         10:00 AM{" "}
//       </div>

//       <div className="text-primary-main font-medium">Applied to the box</div>
//     </div>
//   ),
// });
export type barcodecardType = {
    _id?: string
    label: String
    barcodenumber: String
    count?: string
}

const ViewBarcode = (cartonBoxCode: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const barcodeNumber = cartonBoxCode.cartonBoxCode
    const { data, isFetching, isLoading } =
        useGetByCartonBoxBarcodeQuery(barcodeNumber)

    const { selectedItem }: any = useSelector(
        (state: RootState) => state.cartonBoxBarcode
    )

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [isFetching, data, isLoading, dispatch])

    const datas = selectedItem?.map((ele: any, index: any) => {
        return {
            barcodenumber: ele.itemBarcodeNumber,
            label: ele.cartonboxLabel,
        }
    })

    return (
        <div className="h-[calc(100vh-55px)] overflow-auto px-2 py-2 flex flex-col">
            {/* BreadCrumbs */}
            <div>
                <ATMBreadCrumbs
                    breadcrumbs={[
                        {
                            label: 'Barcodes',
                            path: '/configurations/barcode/',
                        },
                        {
                            label: 'Single Barcode',
                        },
                    ]}
                />
            </div>

            <div className="py-2">
                <ATMPageHeading> Barcode </ATMPageHeading>
            </div>

            <div className="bg-white shadow rounded border grow overflow-auto border-slate-300 relative">
                {/* Barcode Info */}
                <div className="px-3 py-3 border-b border-slate-300 sticky top-0 bg-white z-50 shadow">
                    <div className="flex gap-2">
                        <div className="text-primary-main font-bold">
                            {' '}
                            Barcode Number :{' '}
                        </div>
                        <div className="font-medium text-blue-900">
                            {selectedItem?.[0].barcodeNumber}{' '}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="text-primary-main font-bold">
                            {' '}
                            Carton Box Name :{' '}
                        </div>
                        <div className="font-medium text-blue-900">
                            {' '}
                            {selectedItem?.[0].cartonboxLabel}
                        </div>
                    </div>
                </div>

                {/* Barcode Time Track */}
                <div className="py-3 ">
                    <CartonBoxBarcodeDetailCard
                        barcodeList={datas}
                        onCartonBoxBarcodeSelect={() => {}}
                        onBarcodeClick={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewBarcode
