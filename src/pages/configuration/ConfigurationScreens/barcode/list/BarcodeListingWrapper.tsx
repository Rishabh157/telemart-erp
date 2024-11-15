// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { IconType } from 'react-icons'
import { MdOutbond } from 'react-icons/md'
import { BiFilter } from 'react-icons/bi'

// |-- Internal Dependencies --|
import { ProductBarcodeGroupResponse } from 'src/models'
import BarcodeListing from './BarcodeListing'
import {
    useGetProductGroupBarcodeQuery,
    useGetBarcodeByBarcodeNumberQuery
} from 'src/services/BarcodeService'
import {
    setIsTableLoading as pgSetIsTableLoading,
    setItems as pgSetItems,
    setTotalItems as pgSetTotalItems,
} from 'src/redux/slices/productGroupBarcodeSlice'
import CartonBoxBarcodeListing from './components/CartonBoxBarcode/CartonBoxBarcodeListing'
import ProductGroupListing from './components/BarcodeGroup/ProductGroupBarcodeListing'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import ReprintOuterBoxBarcode from './components/ReprintOuterBoxBarcode/ReprintOuterBoxBarcode'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

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

    useUnmountCleanup()
    const barcodeState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [groupBarcode, setGroupBarcode] = useState('')
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [selectedProductGroup, setSelectedProductGroup] = React.useState<ProductBarcodeGroupResponse[]>([])
    const { searchValue } = barcodeState
    const dispatch = useDispatch<AppDispatch>()

    // const { userData } = useSelector((state: RootState) => state?.auth)

    const { items } = useGetDataByIdCustomQuery({
        useEndPointHook: useGetBarcodeByBarcodeNumberQuery(searchValue, {
            skip: searchValue.length <= 8 // Skip if length is 14 or less
        }),
    })

    const productGroupState: any = useSelector((state: RootState) => state.productGroupBarcode)

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

    const tabs: Tabs[] = [
        {
            index: 0,
            label: 'Product Barcode',
            icon: MdOutbond,
            name: UserModuleNameTypes.ACTION_BARCODE_LIST_TAB,
        },
        // {
        //     label: 'Reprint Barcode / Outerbox',
        //     icon: MdOutbond,
        //     index: 1,
        //     name: UserModuleNameTypes.ACTION_REPRINT_BARCODE_OUTERBOX_TAB,
        // },
        {
            label: 'Barcode Group',
            icon: MdOutbond,
            index: 2,
            name: UserModuleNameTypes.ACTION_BARCODE_GROUP_TAB,
        },
        {
            label: 'Reprint Outerbox Barcode',
            icon: MdOutbond,
            index: 3,
            name: UserModuleNameTypes.ACTION_REPRINT_OUTERBOX_BARCODE,
        },
    ]

    const allowedTabs = tabs
        ?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        ?.map((tab) => tab)

    return (
        <>
            <div className="flex shadow rounded h-[45px] items-center gap-3 bg-white w-full overflow-auto px-3 ">
                {allowedTabs?.map((tab: any, tabIndex: number) => {
                    const { label, index } = tab
                    return (
                        <button
                            type="button"
                            onClick={() => {
                                setActiveTabIndex(index)
                            }}
                            key={tabIndex}
                            className={`flex items-center gap-2 px-4 h-[calc(100%-14px)] rounded transition-all duration-500 ${activeTabIndex === index
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
                                    className="bg-blue-400 flex items-center rounded border"
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
                <BarcodeListing items={items as any} />
            ) : activeTabIndex === 1 ? (
                <CartonBoxBarcodeListing />
            ) : activeTabIndex === 2 ? (
                <ProductGroupListing
                    rows={pgItems}
                    selectedProductGroupcodes={selectedProductGroup}
                    onProductGroupcodeSelect={onProductGroupSelect}
                    onBarcodeClick={(barcode: ProductBarcodeGroupResponse) => {
                        setGroupBarcode(barcode._id)
                        setActiveTabIndex(0)
                    }}
                />
            ) : (
                <ReprintOuterBoxBarcode
                    rows={pgItems}
                    selectedProductGroupcodes={selectedProductGroup}
                    onProductGroupcodeSelect={onProductGroupSelect}
                    onBarcodeClick={(barcode: ProductBarcodeGroupResponse) => {
                        setGroupBarcode(barcode._id)
                        setActiveTabIndex(0)
                    }}
                />
            )}
        </>
    )
}

export default BarcodeListingWrapper
