// |-- Built-in Dependencies --|
import React, { useState, useRef } from 'react'

// |-- External Dependencies --|
import { Chip, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { SaleOrderListResponseTypes } from 'src/models/SaleOrder.model'
import {
    useDeleteSalesOrderMutation,
    useGetInvoiceOfSaleOrderByIdQuery,
    useGetPaginationSaleOrderByGroupQuery,
    useUpdateSalesOrderApprovalMutation,
    useUpdateSalesOrderInvoiceUrlMutation,
} from 'src/services/SalesOrderService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import SaleOrderListing from './SaleOrderListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { generatePdf } from 'src/utils/formUtils/HtmlToPdf'
import DispatchedInvoiceTemplate from './components/DispatchedInvoiceTemplate'
import { SalesOrderInvoiceResponse } from './components/DispatchedInvoiceWrapper'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { SalesOrderFormInitialValuesFilterWithLabel } from './filter/SalesOrderFilterWrapper'
import { BASE_URL_FILE_PICKER, FILE_BUCKET_NAME } from 'src/utils/constants'
import ATMRequestStatus, { RequestStatus } from 'src/components/UI/atoms/ATMRequestStatus/ATMRequestStatus'
import moment from 'moment'

const SaleOrderListingWrapper = () => {

    useUnmountCleanup()
    const salesOrderState: any = useSelector((state: RootState) => state.listingPagination)

    // useRef
    const saleOrderInvoiceRef = useRef<any>(null)
    const { page, rowsPerPage, searchValue } = salesOrderState
    const navigate = useNavigate()
    const [currentId, setCurrentId] = useState('')
    const [invoiceSoNumber, setInvoiceSoNumber] = useState<string>('')
    const [filter, setFilter] =
        React.useState<SalesOrderFormInitialValuesFilterWithLabel>({
            dealerId: { fieldName: '', label: '', value: '' },
            status: { fieldName: '', label: '', value: '' },
            invoiceNumber: {
                fieldName: '',
                label: '',
                value: '',
            },
            IRNStatus: {
                fieldName: '',
                label: '',
                value: '',
            },
            startDate: {
                fieldName: '',
                label: '',
                value: '',
            },
            endDate: { fieldName: '', label: '', value: '' },
        })
    const [showDropdown, setShowDropdown] = useState(false)
    const [deleteSaleOrder] = useDeleteSalesOrderMutation()
    const [updateSalesOrder, updateSalesOrderInfo] = useUpdateSalesOrderApprovalMutation()
    const { userData }: any = useSelector((state: RootState) => state.auth)


    // Upload File Mutation
    const [uploadFile, uploadFileInfo] = useAddFileUrlMutation()
    const [updateSoInvoice, updateSoInvoiceInfo] = useUpdateSalesOrderInvoiceUrlMutation()

    const { items } = useGetCustomListingData<SaleOrderListResponseTypes>({
        useEndPointHook: useGetPaginationSaleOrderByGroupQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['soNumber', 'dealerLabel'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
                {
                    fieldName: 'dealerId',
                    value: filter.dealerId.value,
                },
                {
                    fieldName: 'invoiceNumber',
                    value: filter.invoiceNumber.value,
                },
                {
                    fieldName: 'status',
                    value: filter.status.value,
                },
                {
                    fieldName: 'IRNStatus',
                    value: filter.IRNStatus.value,
                },
            ],
            dateFilter: {
                startDate: filter.startDate.value as string,
                endDate: filter.endDate.value as string,
            },
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const { items: invoiceData } = useGetDataByIdCustomQuery<SalesOrderInvoiceResponse>({
        useEndPointHook: useGetInvoiceOfSaleOrderByIdQuery(
            invoiceSoNumber || ' ',
            {
                skip: !invoiceSoNumber,
            }
        ),
    })

    const handleAccApproval = async (
        // base64Data: any,
        _id: string,
        value: boolean,
        message: string
    ) => {

        // Approval Api
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateSalesOrder({
            id: _id,
            body: {
                accApproved: value,
                type: 'ACC',
                accApprovedById: userData?.userId,
                accApprovedAt: currentDate,
                accApprovedActionBy: userData?.userName,
            },
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {

                    showToast('success', `Account ${message} is successfully!`)


                    if (value) {
                        setInvoiceSoNumber(_id)

                        // setTimeout(async () => {

                        //     if (invoiceData) {
                        //         const base64Data: any = await generatePdf(saleOrderInvoiceRef)
                        //         // generating the pdf
                        //         const binaryData = atob(base64Data?.split(',')[1])
                        //         const arrayBuffer = new ArrayBuffer(binaryData.length)
                        //         const byteArray = new Uint8Array(arrayBuffer)

                        //         for (let i = 0; i < binaryData.length; i++) {
                        //             byteArray[i] = binaryData.charCodeAt(i)
                        //         }

                        //         const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
                        //         const file = new File([blob], invoiceSoNumber ? `so-${invoiceSoNumber}.pdf` : 'so-generated.pdf', { type: 'application/pdf' })

                        //         let formData: any = new FormData()
                        //         formData.append('type', file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT')
                        //         formData.append('file', file || '')
                        //         formData.append('bucketName', FILE_BUCKET_NAME)

                        //         // Updating the generated pdf after second approval is done
                        //         uploadFile(formData).then((res: any) => {
                        //             if ('data' in res) {
                        //                 const fileUrl = BASE_URL_FILE_PICKER + '/' + res?.data?.file_path

                        //                 // Updating the SO Order with generated Invoice of the acc approval
                        //                 updateSoInvoice({
                        //                     id: _id,
                        //                     body: {
                        //                         invoice: value ? fileUrl !== undefined ? fileUrl : '' : '',
                        //                     }
                        //                 }).then(() => { }).catch((err) => console.error('error', err))

                        //             }
                        //         })
                        //     }

                        // }, 1500)
                    }

                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })




        // This is for commented code preview of embeded
        // const [pdfFile, setPdfFile] = useState<any>() // state
        // if (file) {
        //     const reader = new FileReader()
        //     reader.onloadend = () => {
        //         setPdfFile(reader.result)
        //         // setPdfPreview();
        //     }
        //     reader.readAsDataURL(file)
        // }

    }

    const handleDelete = () => {
        setShowDropdown(false)
        deleteSaleOrder(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Sale Order deleted successfully!')
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

    const handleDHComplete = (_id: string, value: boolean, message: string) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateSalesOrder({
            body: {
                dhApproved: value,
                type: 'DH',
                dhApprovedById: userData?.userId,
                dhApprovedAt: currentDate,
                dhApprovedActionBy: userData?.userName,
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        `Distributor Head ${message} is successfully!`
                    )
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            extraClasses: 'min-w-[100px]',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: SaleOrderListResponseTypes) =>
                row?.dhApproved === null &&
                row?.accApproved === null && (
                    <ActionPopup
                        isEdit={isAuthorized(
                            UserModuleNameTypes.ACTION_SALE_ORDER_EDIT
                        )}
                        isDelete={isAuthorized(
                            UserModuleNameTypes.ACTION_SALE_ORDER_DELETE
                        )}
                        handleEditActionButton={() => {
                            navigate(`/sale-order/edit-sale-order/${row?._id}`)
                        }}
                        handleDeleteActionButton={() => {
                            showConfirmationDialog({
                                title: 'Delete SaleOrder',
                                text: 'Do you want to delete SaleOrder?',
                                showCancelButton: true,
                                next: (res: any) => {
                                    return res.isConfirmed
                                        ? handleDelete()
                                        : setShowDropdown(false)
                                },
                            })
                        }}
                        handleOnAction={() => {
                            setShowDropdown(!showDropdown)
                            setCurrentId(row?._id)
                        }}
                    />
                ),
        },
        {
            field: 'status',
            headerName: 'Request Status',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_STATUS,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                const status = row?.documents?.[0]?.status as RequestStatus;
                return <ATMRequestStatus status={status} />;
            },
        },
        {
            field: 'soNumber',
            headerName: 'So Number',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            name: UserModuleNameTypes.SALE_ORDER_LIST_SO_NUMBER,
            renderCell: (row: SaleOrderListResponseTypes) => (
                <span> {row?._id} </span>
            ),
        },
        // Dh
        {
            field: 'dhApproved',
            headerName: 'DH First Approval',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_DH_APPROVAL,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return (
                    <div className="z-0">
                        {row?.dhApproved === null ? (
                            <Chip onClick={() => {
                                // here only admin and user who has rights can approve the request
                                if (isAuthorized(UserModuleNameTypes.ACTION_SALE_ORDER_LIST_FIRST_APPROVAL)) {
                                    showConfirmationDialog({
                                        title: 'DH Approve',
                                        text: 'Do you want to Approve ?',
                                        showCancelButton: true,
                                        showDenyButton: true,
                                        denyButtonText: 'Reject',
                                        next: (res) => {
                                            if (res.isConfirmed) {
                                                return handleDHComplete(
                                                    row?._id,
                                                    res?.isConfirmed,
                                                    'Approval'
                                                )
                                            }
                                            if (res.isDenied) {
                                                return handleDHComplete(
                                                    row?._id,
                                                    !res.isDenied,
                                                    'Rejected'
                                                )
                                            }
                                        },
                                    })
                                } else {
                                    showToast('error', "You don't have permission to approve the request")
                                }
                            }}
                                label="DH Pending"
                                color="warning"
                                variant="outlined"
                                size="small"
                                clickable={true}
                            />
                        ) : (
                            <Chip
                                label={row?.dhApproved === true ? "DH Approved" : "DH Rejected"}
                                color={row?.dhApproved === true ? "success" : "error"}
                                variant="outlined"
                                size="small"
                                clickable={false}
                            />
                        )}
                    </div>
                )
            },
        },
        {
            field: 'dhApprovedActionBy',
            headerName: 'DH Approved By',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_DH_APPROVED_BY,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return <div>
                    <div className="font-medium">
                        {row?.dhApprovedActionBy}
                    </div>
                    <div className="text-[12px] text-slate-500 font-medium">
                        {row?.dhApprovedAt}
                    </div>
                </div>
            },
        },
        // Acc Approval
        {
            field: 'accApproved',
            headerName: 'Acc Second Approval',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_ACC_APPROVAL,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return (
                    <div className="z-0">
                        {row?.accApproved === null ? (
                            <Chip onClick={() => {
                                if (isAuthorized(UserModuleNameTypes.ACTION_SALE_ORDER_LIST_SECOND_APPROVAL)) {
                                    if (row?.dhApproved) {
                                        showConfirmationDialog({
                                            title: 'Account Approval',
                                            text: 'Do you want to Approve ?',
                                            showCancelButton: true,
                                            showDenyButton: true,
                                            denyButtonText: 'Reject',
                                            next: (res) => {
                                                if (res.isConfirmed) {
                                                    return handleAccApproval(
                                                        row?._id,
                                                        res?.isConfirmed,
                                                        'Approval'
                                                    )
                                                }
                                                if (res.isDenied) {
                                                    return handleAccApproval(
                                                        row?._id,
                                                        !res.isDenied,
                                                        'Rejected'
                                                    )
                                                }
                                            },
                                        })
                                    } else {
                                        showToast('error', `First approval is still ${row?.dhApproved === null ? 'pending' : 'rejected'}`)
                                    }
                                } else {
                                    showToast('error', "You don't have permission to approve the request")
                                }
                            }}
                                label="Acc Pending"
                                color="warning"
                                variant="outlined"
                                size="small"
                                clickable={true}
                            />
                        ) : (
                            <Chip
                                label={row?.accApproved === true ? "Acc Approved" : "Acc Rejected"}
                                color={row?.accApproved === true ? "success" : "error"}
                                variant="outlined"
                                size="small"
                                clickable={false}
                            />
                        )}
                    </div>
                )
            },
        },
        {
            field: 'accApprovedActionBy',
            headerName: 'Acc Approved By',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_ACC_APPROVED_BY,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return <div>
                    <div className="font-medium">
                        {row?.accApprovedActionBy}
                    </div>
                    <div className="text-[12px] text-slate-500 font-medium">
                        {row?.accApprovedAt}
                    </div>
                </div>
            },
        },
        {
            field: 'dealerLabel',
            headerName: 'Dealer Name',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_DEALER_NAME,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => (
                <>
                    {row?.documents?.[0]?.dealerId ? (
                        <div className="flex flex-col items-start">
                            <span
                                className="font-semibold cursor-pointer text-primary-main hover:underline"
                                onClick={() =>
                                    navigate(`/dealers/${row?.documents?.[0]?.dealerId}/general-information`)
                                }
                            >
                                {row?.dealerName?.replaceAll('_', ' ') || '-'}
                            </span>
                            <span className="text-[10px] text-gray-500">({row?.dealerCode})</span>
                        </div>
                    ) : (
                        <span className="text-gray-400">-</span>
                    )}
                </>
            ),
        },
        {
            field: 'warehouseStateLabel',
            headerName: 'State',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_STATE,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => (
                <span> {row?.documents?.[0]?.warehouseStateLabel || '-'} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            extraClasses: 'min-w-[200px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_ITEM_QUANTITY,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return (
                    <div className="w-full">
                        {row?.documents?.map((item, ind) => {
                            return (
                                <div
                                    key={ind}
                                    className="grid grid-cols-3 mb-1 text-center border rounded border-slate-400"
                                >
                                    <div className="col-span-2 border-r-[1px] border-slate-400 py-1 px-2">
                                        {item?.productSalesOrder?.groupName}
                                    </div>
                                    <div className="col-span-1 px-2 py-1">
                                        {item?.productSalesOrder?.quantity}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            field: 'invoice',
            headerName: 'PDF',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_PDF,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return row?.documents?.[0]?.invoice ? (
                    <a
                        href={row.documents[0].invoice} // Provide the URL to the invoice file
                        download={`Invoice_${row._id}.pdf`} // Set the filename for the downloaded file
                        className="text-blue-500 hover:underline"
                    >
                        PDF
                    </a>
                ) : <span title='Invoice is generated after the account approval' className="text-blue-500 cursor-default select-none opacity-50">PDF</span>
            },
        },
        {
            field: 'invoiceNumber',
            headerName: 'Invoice No',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_INVOICE_NUMBER,
            renderCell: (row: SaleOrderListResponseTypes) => (
                <span
                    title={row?.documents?.[0]?.invoiceNumber}
                    className="min-w-[100px] truncate"
                >
                    {row?.documents?.[0]?.invoiceNumber}
                </span>
            ),
        },
        {
            field: 'invoiceDate',
            headerName: 'Invoice Date',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_INVOICE_DATE,
            renderCell: (row: SaleOrderListResponseTypes) => (
                <span> {row?.invoiceDate} </span>
            ),
        },
        {
            field: 'expectedDeliveryDate',
            headerName: 'Expected Delivery Date',
            extraClasses: 'min-w-[180px] capitalize',
            flex: 'flex-[2_2_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_EXPECTED_DELIVERY_DATE,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return (
                    <span> {row?.documents?.[0]?.expectedDeliveryDate} </span>
                )
            },
        },
        {
            field: 'printWeb',
            headerName: 'PRINT EWB',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_PRINT_WEB,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return (
                    <span className="text-primary-main select-none opacity-50 cursor-default">
                        PRINT EWB
                    </span>
                )
            },
        },
        {
            field: 'createdAt',
            headerName: 'Create Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_CREATED_AT,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: SaleOrderListResponseTypes) => (
                <div className="py-0">
                    <div className="text-[12px] text-slate-700 font-medium">
                        {moment(row?.createdAt).format('DD MMM YYYY')}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                        {moment(row?.createdAt).format('hh:mm A')}
                    </div>
                </div>
            ),
        },
    ]




    React.useEffect(() => {
        if (invoiceSoNumber && invoiceData) {
            (async () => {
                const base64Data: any = await generatePdf(saleOrderInvoiceRef);

                const binaryData = atob(base64Data?.split(',')[1]);
                const arrayBuffer = new ArrayBuffer(binaryData.length);
                const byteArray = new Uint8Array(arrayBuffer);

                for (let i = 0; i < binaryData.length; i++) {
                    byteArray[i] = binaryData.charCodeAt(i);
                }

                const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
                const file = new File([blob], `so-${invoiceSoNumber}.pdf`, { type: 'application/pdf' });

                let formData: any = new FormData();
                formData.append('type', file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT');
                formData.append('file', file || '');
                formData.append('bucketName', FILE_BUCKET_NAME);

                // Uploading the file
                uploadFile(formData).then((res: any) => {
                    if ('data' in res) {
                        const fileUrl = BASE_URL_FILE_PICKER + '/' + res?.data?.file_path;

                        setInvoiceSoNumber('')
                        // Update the SO Order with the generated invoice
                        updateSoInvoice({
                            id: invoiceSoNumber,
                            body: {
                                invoice: fileUrl || '',
                            },
                        }).then(() => {
                            showToast('success', 'Invoice updated successfully');
                        }).catch((err) => console.error('Error updating invoice:', err));
                    }
                });
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceSoNumber, invoiceData]); // Run only when `invoiceSoNumber` or `invoiceData` changes


    return (
        <SideNavLayout>
            <div className="relative z-50">
                <SaleOrderListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                    setFilter={setFilter}
                    filter={filter}
                />
            </div>

            {updateSalesOrderInfo?.isLoading || uploadFileInfo?.isLoading || updateSoInvoiceInfo?.isLoading ?
                <div className="absolute flex flex-col opacity-70 z-50 top-0 items-center justify-center h-[100vh] w-full bg-white">
                    <CircularProgress />
                    {(uploadFileInfo?.isLoading || updateSoInvoiceInfo?.isLoading) &&
                        <div className='text-black font-semibold'>
                            Generating Invoice please wait .....
                        </div>}
                </div> : null
            }

            <div className="absolute top-0 opacity-0 -z-10">
                {<DispatchedInvoiceTemplate
                    ref={saleOrderInvoiceRef}
                    items={invoiceData || null}
                />
                }
            </div>

            {/* Do Not Delete This */}
            {/* {pdfFile && (
                <div className="absolute z-[100000] w-full h-screen">
                    <embed
                        src={pdfFile}
                        type="application/pdf"
                        width="100%"
                        height="600px"
                    />
                </div>
            )} */}
        </SideNavLayout>
    )
}

export default SaleOrderListingWrapper
