import React, { useEffect, useState } from 'react'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { AlertText } from 'src/pages/callerpage/components/constants'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
// import { BarcodeListResponseType } from 'src/models'
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { getCustomerInwardBarcodeOptionTypes } from 'src/utils/constants/customeTypes'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
// import { showToast } from 'src/utils'
import { useDispatchRTOEcomOrderMutation } from 'src/services/EcomOrdersMasterService'
import { useParams } from 'react-router-dom'
import { showToast } from 'src/utils'


type PropType = {
  open: boolean
  orderDetails: any
  onClose: () => void
  ecomType: string
}

const DispatchEcomOrderRTOModel = ({ open, onClose, orderDetails, ecomType }: PropType) => {

  const {
    customized,
    // userData
  } = useSelector(
    (state: RootState) => state?.auth
  )
  
  const params = useParams()
  const warehouseId = params.id

  const [barcodeList, setBarcodeList] = useState<any[]>([])

  useEffect(() => {
    if (orderDetails) {
      const changeBarcodeList = orderDetails?.barcodeData?.map((ele: any) => {
        return {
          condition: '',
          ...ele
        }
      })
      setBarcodeList(changeBarcodeList)
    }
  }, [orderDetails])


  const [barcodeDispatch, barcodeDispatchInfo] =
    useDispatchRTOEcomOrderMutation()



  const dispatch = useDispatch<AppDispatch>()

  const handleReload = () => {
    if (customized) {
      const confirmValue: boolean = window.confirm(AlertText)
      if (confirmValue) {
        dispatch(setFieldCustomized(false))
        // setIsShow(!open)
        // setSelectedItemsTobeDispatch(null)
      }
    }
    // else {
    //   setIsShow(!isShow)
    //   setSelectedItemsTobeDispatch(null)
    // }
  }


  const handleDispatchBarcode = () => {

    const payloadData = {
      barcodes: barcodeList?.map((ele: any) => {
        return {
          barcode: ele?.barcode,
          barcodeId: ele?.barcodeId,
          condition: ele?.condition
        }
      }),
      orderNumber: orderDetails?.orderNumber,
      type: ecomType,
      warehouseId: warehouseId
    }

    barcodeDispatch(payloadData)
      .then((res: any) => {
        if (res?.data?.status) {
          showToast('success', 'dispatched successfully')
          // setIsShow(false)
          dispatch(setFieldCustomized(false))
          onClose()
        } else {
          showToast('error', res?.data?.message)
        }
      })
      .catch((err: any) => {
        console.error(err)
      })
  }


  return (
    <DialogLogBox
      isOpen={open}
      fullScreen={true}
      buttonClass="cursor-pointer"
      maxWidth="lg"
      handleClose={() => {
        handleReload()
        onClose()
      }}
      component={
        <div className="px-4 pt-2 pb-6">
          {/* SO NO. & DEALER NAME */}
          <div className="grid grid-cols-4 pb-2 border-slate-300 border-b-[1px]">
            <div>
              <div className="flex items-center gap-1">
                <div className="font-bold">
                  Order Number
                </div>
                {':'}
                <div >
                  {orderDetails?.orderNumber}
                </div>
              </div>
            </div>
          </div>

          <div className="pb-6 border-b-slate-300 border-[1px] shadow p-4 my-4 rounded">
            <div className="grid grid-cols-1 mt-2">
              <div>
                {/* <div> */}
                <span className="font-bold">Item Name</span>
                <span className="px-4">:</span>
                <span>
                  {orderDetails?.productName}
                </span>
                {/* </div> */}

                <div>
                  <span className="font-bold">
                    Quantity
                  </span>
                  <span className="pl-[2.23rem] pr-[1rem]">
                    :
                  </span>
                  <span>
                    {orderDetails?.quantity}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 mt-2 gap-x-4 opacity-60">
              <ATMTextField
                name=""
                // disabled={
                //   totalBarcodeOfProducts ===
                //   barcodeList?.length
                // }
                disabled={true}
                value={''}
                label="Barcode Number"
                placeholder="enter barcode number"
                className="shadow bg-white rounded w-[50%] "
                onChange={(e) => {
                  // if (e.target.value?.length > 6) {
                  //   handleBarcodeSubmit(e.target.value)
                  // }
                  // setBarcodeNumber(e.target.value)
                }}
              />
            </div>

            <div className="grid grid-cols-4 gap-x-4">
              {barcodeList?.map(
                (
                  barcode: any,
                  barcodeIndex: number
                ) => (
                  <div key={barcode?.barcodeId}>
                    <BarcodeCard
                      barcodeNumber={barcode?.barcode}
                      isRemoveBarcode
                      productGroupLabel={capitalizeFirstLetter(
                        barcode?.productGroupLabel ||
                        ''
                      )}
                    // handleRemoveBarcode={() => {
                    //   handleRemoveBarcode(
                    //     barcode?.barcodeNumber
                    //   )
                    // }}
                    />
                    <ATMSelectSearchable
                      name=""
                      componentClass="mt-0"
                      label="Barcode Condition"
                      selectLabel="Select barcode condition"
                      value={barcode.condition}
                      options={getCustomerInwardBarcodeOptionTypes()}
                      onChange={(newValue) => {


                        // barcode?.barcode
                        // const isBarcodeExist = barcodeList?.find((ele: any) => ele.barcode === barcode?.barcode)

                        const updatedBarcodeList = [...barcodeList]

                        const updatedBarcodeObj = { ...updatedBarcodeList[barcodeIndex], }

                        updatedBarcodeObj.condition = newValue

                        updatedBarcodeList[barcodeIndex] = updatedBarcodeObj

                        // Update state with the modified array
                        setBarcodeList(
                          updatedBarcodeList
                        )

                        // setBarcodeList((prev: any) => ({
                        //   ...prev,

                        // }))

                        // setBarcodeList()
                        // Make a copy of barcodeList
                        // const updatedBarcodeList = [
                        //   ...barcodeList,
                        // ]
                        // // Ensure barcodeIndex is defined and within bounds
                        // if (
                        //   barcodeIndex !==
                        //   undefined &&
                        //   barcodeIndex >= 0 &&
                        //   barcodeIndex <
                        //   updatedBarcodeList.length
                        // ) {
                        //   // Retrieve the object at barcodeIndex
                        //   const updatedBarcodeObj =
                        //   {
                        //     ...updatedBarcodeList[
                        //     barcodeIndex
                        //     ],
                        //   }

                        //   // Update the 'condition' property of the object
                        //   updatedBarcodeObj.condition =
                        //     newValue

                        //   // Update the object at barcodeIndex in the copied array
                        //   updatedBarcodeList[
                        //     barcodeIndex
                        //   ] = updatedBarcodeObj

                        //   // Update state with the modified array
                        //   setBarcodeList(
                        //     updatedBarcodeList
                        //   )
                        // } else {
                        //   showToast(
                        //     'error',
                        //     'Invalid barcode'
                        //   )
                        // }
                      }}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex items-end justify-end ">
            <div>
              <ATMLoadingButton
                // disabled={
                //     !(
                //         totalBarcodeOfProducts ===
                //         barcodeList?.length
                //     )
                // }
                isLoading={barcodeDispatchInfo?.isLoading}
                loadingText="Dispatching"
                onClick={() => handleDispatchBarcode()}
                className="flex items-center px-4 py-1 text-white rounded bg-primary-main"
              >
                Dispatch
              </ATMLoadingButton>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default DispatchEcomOrderRTOModel
