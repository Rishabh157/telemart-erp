/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:BarcodeListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
//import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IconType } from 'react-icons'
import { MdOutbond } from 'react-icons/md'
import { BiFilter } from 'react-icons/bi'

// |-- Internal Dependencies --|
import {
    BarcodeListResponseType,
    ProductBarcodeGroupResponse,
} from 'src/models'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import {
    setActiveTabIndex,
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/barcodeSlice'
import BarcodeListing from './BarcodeListing'
import {
    useGetBarcodeQuery,
    useGetProductGroupBarcodeQuery,
} from 'src/services/BarcodeService'
import { useGetCartonBoxBarcodeQuery } from 'src/services/CartonBoxBarcodeService'
import {
    setIsTableLoading as cbsetIsTableLoading,
    setItems as cbsetItems,
    setTotalItems as cbsetTotalItems,
} from 'src/redux/slices/CartonBoxBarcodeSlice'
import {
    setIsTableLoading as pgSetIsTableLoading,
    setItems as pgSetItems,
    setTotalItems as pgSetTotalItems,
} from 'src/redux/slices/productGroupBarcodeSlice'
import CartonBoxBarcodeListing from './components/CartonBoxBarcode/CartonBoxBarcodeListing'
import ProductGroupListing from './components/BarcodeGroup/ProductGroupBarcodeListing'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { showAllowedTabs } from 'src/userAccess/getAuthorizedModules'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    active?: boolean
    index: number
    name?: string
}
export type barcodecardType = {
    _id?: string
    label: String
    barcodenumber: String
    count?: string
}

const BarcodeListingWrapper = () => {
    const barcodeState: any = useSelector((state: RootState) => state.barcode)
    const [groupBarcode, setGroupBarcode] = useState('')
    const { page, rowsPerPage, searchValue, items, activeTabIndex } =
        barcodeState
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    // const navigate = useNavigate()

    const { data, isFetching, isLoading } = useGetBarcodeQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['barcodeNumber', 'productGroupLabel'],
        page: page,
        filterBy: [
            {
                fieldName: 'barcodeGroupNumber',
                value: [groupBarcode],
            },
            {
                fieldName: 'companyId',
                value: userData?.companyId,
            },
        ],
        dateFilter: {},

        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    const productGroupState: any = useSelector(
        (state: RootState) => state.productGroupBarcode
    )

    const {
        page: pgPage,
        rowsPerPage: pgRowsPerPage,
        searchValue: pgSearchValue,
        items: pgItems,
    } = productGroupState

    const {
        data: pgData,
        isFetching: pgIsFetching,
        isLoading: pgIsLoading,
    } = useGetProductGroupBarcodeQuery({
        limit: pgRowsPerPage,
        searchValue: pgSearchValue,
        params: ['barcodeNumber', 'productGroupLabel'],
        page: pgPage,
        filterBy: [
            {
                fieldName: '',
                value: [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!pgIsFetching && !pgIsLoading) {
            dispatch(pgSetIsTableLoading(false))
            dispatch(pgSetItems(pgData?.data || []))
            dispatch(pgSetTotalItems(pgData?.totalItem || 4))
        } else {
            dispatch(pgSetIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pgIsLoading, pgIsFetching, pgData])

    // carton box api
    const CartonBoxBarcodeState: any = useSelector(
        (state: RootState) => state.cartonBoxBarcode
    )

    const {
        page: cbPage,
        rowsPerPage: cbrowsPerPage,
        searchValue: cbsearchValue,
        // items: cbitems,
    } = CartonBoxBarcodeState

    const {
        data: cbdata,
        isFetching: cbisFetching,
        isLoading: cbisLoading,
    } = useGetCartonBoxBarcodeQuery({
        limit: cbrowsPerPage,
        searchValue: cbsearchValue,
        params: ['barcodeNumber', 'cartonboxLabel'],
        page: cbPage,
        filterBy: [
            {
                fieldName: '',
                value: [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!cbisFetching && !cbisLoading) {
            dispatch(cbsetIsTableLoading(false))
            dispatch(cbsetItems(cbdata?.data || []))
            dispatch(cbsetTotalItems(cbdata?.totalItem || 4))
        } else {
            dispatch(cbsetIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cbisLoading, cbisFetching, cbdata])

    const [selectedBarcodes, setSelectedBarcodes] = React.useState<
        BarcodeListResponseType[]
    >([])

    const [selectedCartonBoxBarcodes, setSelectedCartonBoxBarcodes] =
        React.useState<barcodecardType[]>([])

    // const onCartonBoxBarcodeSelect = (
    //     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    //     barcode: barcodecardType,
    //     isBarcodeSeleted: boolean
    // ) => {
    //     e.stopPropagation()
    //     let newValue = []
    //     if (isBarcodeSeleted) {
    //         newValue = selectedCartonBoxBarcodes.filter(
    //             (seleted: barcodecardType) => seleted._id !== barcode._id
    //         )
    //     } else {
    //         newValue = [...selectedCartonBoxBarcodes, barcode]
    //     }

    //     setSelectedCartonBoxBarcodes(newValue)
    // }

    const [selectedProductGroup, setSelectedProductGroup] = React.useState<
        ProductBarcodeGroupResponse[]
    >([])

    const onProductGroupSelect = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        barcode: ProductBarcodeGroupResponse,
        isBarcodeSeleted: boolean
    ) => {
        e.stopPropagation()
        let newValue = []
        if (isBarcodeSeleted) {
            newValue = selectedProductGroup.filter(
                (seleted: ProductBarcodeGroupResponse) =>
                    seleted._id !== barcode._id
            )
        } else {
            newValue = [...selectedProductGroup, barcode]
        }

        setSelectedProductGroup(newValue)
    }
    // Handle Barcode Select
    const onBarcodeSelect = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        barcode: BarcodeListResponseType,
        isBarcodeSeleted: boolean
    ) => {
        e.stopPropagation()
        let newValue = []
        if (isBarcodeSeleted) {
            newValue = selectedBarcodes.filter(
                (seleted: BarcodeListResponseType) =>
                    seleted._id !== barcode._id
            )
        } else {
            newValue = [...selectedBarcodes, barcode]
        }

        setSelectedBarcodes(newValue)
    }

    const tabs: Tabs[] = [
        {
            index: 0,
            label: 'Product Barcode',
            icon: MdOutbond,
            name: 'PRODUCT_BARCODE',
        },
        {
            label: 'Reprint Barcode / Outerbox',
            icon: MdOutbond,
            index: 1,
            name: 'REPRINT_BARCODE_OUTERBOX',
        },
        {
            label: 'Barcode Group',
            icon: MdOutbond,
            index: 2,
            name: 'BARCODE_GROUP',
        },
    ]

    const allowedTabs = showAllowedTabs(
        checkUserAccess,
        UserModuleNameTypes.barcode,
        tabs,
        userData?.userRole || 'ADMIN'
    )
    return (
        <>
            <ConfigurationLayout>
                <div className="flex shadow rounded h-[45px] items-center gap-3 bg-white w-full overflow-auto px-3 ">
                    {allowedTabs?.map((tab: any, tabIndex: number) => {
                        const { label, index } = tab
                        return (
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch(setActiveTabIndex(index))
                                }}
                                key={tabIndex}
                                className={`flex items-center gap-2 px-4 h-[calc(100%-14px)] rounded transition-all duration-500 ${
                                    activeTabIndex === index
                                        ? 'bg-slate-100 text-primary-main '
                                        : 'text-slate-500'
                                }`}
                            >
                                <div>
                                    {' '}
                                    <tab.icon className="text-xl" />{' '}
                                </div>
                                <div className="font-medium"> {label} </div>
                                {index === 0 && groupBarcode.length ? (
                                    <button
                                        onClick={() => setGroupBarcode('')}
                                        className="bg-blue-400   flex items-center rounded border"
                                    >
                                        <BiFilter
                                            color="white"
                                            className="text-2xl "
                                        />
                                    </button>
                                ) : null}
                            </button>
                        )
                    })}
                </div>
                {activeTabIndex === 0 ? (
                    <BarcodeListing
                        rows={items}
                        selectedBarcodes={selectedBarcodes}
                        onBarcodeSelect={onBarcodeSelect}
                        onBarcodeClick={() => {}}
                        // onBarcodeClick={(barcode: BarcodeListResponseType) =>
                        //     navigate(`${barcode._id}`)
                        //}
                    />
                ) : activeTabIndex === 1 ? (
                    <CartonBoxBarcodeListing />
                ) : (
                    <ProductGroupListing
                        rows={pgItems}
                        selectedProductGroupcodes={selectedProductGroup}
                        onProductGroupcodeSelect={onProductGroupSelect}
                        onBarcodeClick={(
                            barcode: ProductBarcodeGroupResponse
                        ) => {
                            setGroupBarcode(barcode._id)
                            dispatch(setActiveTabIndex(0))
                        }}
                    />
                )}
            </ConfigurationLayout>
        </>
    )
}

export default BarcodeListingWrapper
