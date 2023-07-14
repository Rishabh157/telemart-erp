/// ==============================================
// Filename:PageRoutes.tsx
// Type: Route Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// |-- Internal Dependencies --|
import { UserModuleNameTypes, UserModuleActionTypes } from 'src/models/userAccess/UserAccess.model'
import {
    AddArtistWrapper,
    AddASRWrapper,
    AddAssetsCategoryWrapper,
    AddAssetsLocationWrapper,
    AddCompetitorWrapper,
    AddDidManagementWrapper,
    ArtistListingWrapper,
    ASRListingWrapper,
    AssetsCategoryWrapper,
    AssetsLocationWrapper,
    BarcodeGenerator,
    CompetitorManagementListingWrapper,
    DealerOrderLedgerListTabWrapper,
    EditArtistWrapper,
    EditAssetsCategoryWrapper,
    EditAssetsLocatonWrapper,
    EditAssetsRequestwrapper,
    EditChannelManagementWrapper,
    EditCompetitorWraper,
    EditDidManagementWrapper,
    EditPurchaseOrderWrapper,
    AddAttributeWrapper,
    AttributesListingWrapper,
    AddAttributeGroupWrapper,
    AttributesGroupListingWrapper,
    AddBarcodeWrapper,
    BarcodeListingWrapper,
    ViewBarcodeWrapper,
    AddCartonBoxWrapper,
    CartonBoxListingWrapper,
    AddCompanyWrapper,
    ConfigurationCompanyListingWrapper,
    AddDealersCategoryWrapper,
    DealersCategoryListingWrapper,
    AddGRNWrapper,
    GRNListingWrapper,
    AddItemWrapper,
    ItemListingWrapper,
    AddLanguageWrapper,
    LanguageListingWrapper,
    Locations,
    AddProductCategoryWrapper,
    ProductCategoryListingWrapper,
    AddProductGroupWrapper,
    ProductGroupListingWrapper,
    AddProductWrapper,
    ProductsListingWrapper,
    AddProductSubCategoryWrapper,
    ProductSubCategoryListingWrapper,
    AddPurchaseOrderWrapper,
    PurchaseOrderListingWrapper,
    AddSchemeWrapper,
    SchemeListingWrapper,
    AddTaxesWrapper,
    TaxesListingWrapper,
    ConfigurationLayout,
    DashboardWrappper,
    AddDealerWrapper,
    DealersListingWrapper,
    ViewDealer,
    DealerActivityTabWrapper,
    DealerGeneralInformationTabWrapper,
    DealerWarehouseTabWrapper,
    EditDealerWarehouseWrapper,
    DealerSalesOrderTabWrapper,
    AddDealerPinCodeTabWrapper,
    AddDealerSchemeTabWrapper,
    ListDealerPincodeTabWrapper,
    ListDealerSchemeTabWrapper,
    InwardInventoryWrapper,
    InventoryListingWrapper,
    OrderListing,
    AddSaleOrderWrapper,
    EditSaleOrderWrapper,
    SaleOrderListingWrapper,
    Test,
    UsersListingWrapper,
    AddUserWrapper,
    EditUserWrapper,
    AddVendorWrapper,
    VendorsListingWrapper,
    AddPurchaseOrderTabWrapper,
    ViewVendor,
    VendorActivityTabWrapper,
    VendorGeneralInformationTabWrapper,
    VendorWarehouseTabWrapper,
    VendorPurchaseOrderTabWrapper,
    AddWarehouseWrapper,
    WarehousesListingWrapper,
    ViewWarehouseWrapper,
    ProfileWrappper,
    EditCompanyWrapper,
    EditAttributeWrapper,
    EditProductCategoryWrapper,
    EditAttributeGroupWrapper,
    EditProductGroupWrapper,
    EditItemWrapper,
    EditCartonBoxWrapper,
    EditASRWrapper,
    EditTaxesWrapper,
    EditLanguageWrapper,
    EditDealersCategoryWrapper,
    EditProductSubCategoryWrapper,
    EditVendorWrapper,
    EditDealerWrapper,
    EditWarehouseWrapper,
    EditProductWrapper,
    EditSchemeWrapper,
    ViewPurchaseOrderWrapper,
    AddCbBarcodeWrapper,
    DidManagementListingWrapper,
    OrganisationHierarchy,
    ChannelManagementListingWrapper,
    SlotManagementListingWrapper,
    AddTapeManagementWrapper,
    TapeManagementListingWrapper,
    ChannelGroupListingWrapper,
    AddChannelGroupWrapper,
    EditChannelGroupWrapper,
    AddChannelManagementWrapper,
    ChannelCategoryListingWrapper,
    AddChannelCategoryWrapper,
    EditTapeManagementWrapper,
    EditChannelCategoryWrapper,
    Auth,
    AddSlotManagementWrapper,
    EditSlotManagementWrapper,
    InbouundWrapper,
    WebstieListingWrapper,
    AddWebsiteWrapper,
    EditWebsiteWrapper,
    DispositionOneListingWrapper,
    ListWebstieBlogWrapper,
    AddWebsiteBlogWrapper,
    EditWebsiteBlogWrapper,
    WebsiteBlogViewWrapper,
    WebsitePageListingWrapper,
    AddWebsitePageWrapper,
    EditWebsitePageWrapper,
    ViewWebsitePageWrapper,
    InitialCallOneListingWrapper,
    InitialCallTwoListingWrapper,
    DispositionTwoListingWrapper,
    DispositionThreeListingWrapper,
    AddDispositionOneWrappper,
    PageNotFound,
    AddDispositionThreeWrappper,
    EditDispositionThreeWrapper,
    AddDispositionTwoWrapper,
    EditDispositionTwoWrapper,
    EditDispositionOneWrappper,
    AddInitialCallOneWrapper,
    AddInitialCallTwoWrapper,
    EditInitialCallOneWrapper,
    EditInitialCallTwoWrapper,
    DispositionComplaintListingWrapper,
    AddDispositionComplaintWrappper,
    EditDispositionComplaintWrappper,
    InitialCallThreeListingWrapper,
    EditInitialCallThreeWrapper,
    AddInitialCallThreeWrappper,
    ViewDispositionThreeWrappper,
    ViewInitialCallThreeWrappper,
    OrderViewWrapper,
    Order,
    InquiryViewWrapper,
    InquiryListingWrapper,
    InfluencerListingWrapper,
    AddAssetsRequestWrapper,
    AddAssetsRelocationWrapper,
    AssetsRelocationWrapper,
    AssetsRequestWrapper,
    AssetsAllocationWrapper,
    AddAssetsAllocationWrapper,
    AddInfluencerWrapper,
    CallListingWrapper,
    WebsiteTagListingWrapper,
    AddWebsiteTagsWrapper,
    EditWebsiteTagWrapper,
    ViewWebsiteTagsWrapper,
    ListDealerSupervisorTabWrapper,
    DealerSupervisorTabWrapper,
    UserAccessWrapper,
    ApprovedOrderListing,
    ApprovedOrderViewWrapper,
    EditDealerSchemeWrapper,
    DealerListLedgerTabWrapper,
    AddDealerWarehouseWarpper,
    AddVendorWarehouseWrapper,
    EditVendorWarehouseWrapper,
    VendorListLedgerTabWrapper,
    AddInventoryManagementWrapper,
    EditInventoryManagementWrapper,
    InventoryManagementListingWrapper,
} from './pages/index'
import CallerPageWrapper from './pages/callerpage/CallerPageWrapper'

import { useDispatch, useSelector } from 'react-redux'
import {
    setAccessToken,
    setDeviceId,
    setRefreshToken,
    setUserData,
} from './redux/slices/authSlice'
import { v4 as uuidv4 } from 'uuid'
import InventorisTabsLayout from './pages/inventories/tabs'
import OutwardDealerTabsListingWrapper from './pages/inventories/outward/Dealer/OutwardDealerTabsListingWrapper'
import OutwardTabs from './pages/inventories/outward'
import OutwardCustomerTabsListingWrapper from './pages/inventories/outward/Customer/OutwardCustomerTabsListingWrapper'
import InwardsTabs from './pages/inventories/inward'
import InwardDealerTabsListingWrapper from './pages/inventories/inward/Dealer/InwardDealerTabsListingWrapper'
import InwardCustomerTabsListingWrapper from './pages/inventories/inward/Customer/InwardCustomerTabsListingWrapper'
import DealersRatioListingWrapper from './pages/DealerRatioMapping/list/DealersRatioListingWrapper'
import AuthHOC from './AuthHOC'
import { useGetUserAccessQuery } from './services/useraccess/UserAccessServices'
import { setCheckUserAccess } from './redux/slices/access/userAcessSlice'
import { RootState } from './redux/store'
import ActionAuthHOC from './ActionAuthHoc'
const PageRoutes = () => {
    const deviceId = localStorage.getItem('device-id') || ''
    if (deviceId === '') {
        const uniqueId = uuidv4()
        localStorage.setItem('device-id', uniqueId)
    }
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem('authToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const userDataLs = localStorage.getItem('userData') || '{}'
    const userData = JSON.parse(userDataLs)
    dispatch(setAccessToken(accessToken))
    dispatch(setRefreshToken(refreshToken))
    dispatch(setDeviceId(deviceId))
    dispatch(setUserData(userData))
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    console.log(checkUserAccess, 'checkUserAccess')
    const { data, isLoading, isFetching } = useGetUserAccessQuery(
        {
            userRole: userData.userRole as string,
        },
        {
            skip: !userData.userRole,
        }
    )

    useEffect(() => {
        console.log(!isLoading, !isFetching)
        if (!isLoading && !isFetching && data) {
            if (data?.data !== null) {
                dispatch(setCheckUserAccess(data?.data?.module))
            } else {
                dispatch(setCheckUserAccess([]))
            }
        }

        // eslint-disable-next-line
    }, [data, isLoading, isFetching])

    if (!accessToken && window.location.pathname !== '/') {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Auth />} />
                        <Route
                            path="media/caller-page/"
                            element={<CallerPageWrapper />}
                        />
                    </Routes>
                </BrowserRouter>
            </>
        )
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<PageNotFound />} />
                    <Route
                        path="warehouse/view/:id"
                        element={<InventorisTabsLayout />}
                    >
                        <Route
                            // index
                            path="inventories"
                            element={<InventoryListingWrapper />}
                        />
                        <Route
                            path="outward-inventories"
                            element={<OutwardTabs />}
                        >
                            <Route
                                path="dealer"
                                element={<OutwardDealerTabsListingWrapper />}
                            />
                            <Route
                                path="customer"
                                element={<OutwardCustomerTabsListingWrapper />}
                            />
                            <Route
                                path="rtv"
                                element={<OutwardDealerTabsListingWrapper />}
                            />
                            <Route
                                path="warehoue"
                                element={<OutwardDealerTabsListingWrapper />}
                            />
                            <Route
                                path="sample"
                                element={<OutwardDealerTabsListingWrapper />}
                            />
                            <Route
                                path="ecom"
                                element={<OutwardDealerTabsListingWrapper />}
                            />
                            <Route
                                path="replacement"
                                element={<OutwardDealerTabsListingWrapper />}
                            />
                        </Route>
                        <Route
                            path="inward-inventories"
                            element={<InwardsTabs />}
                        >
                            <Route
                                path="dealer"
                                element={<InwardDealerTabsListingWrapper />}
                            />
                            <Route
                                path="customer"
                                element={<InwardCustomerTabsListingWrapper />}
                            />
                            <Route
                                path="rtv"
                                element={<InwardDealerTabsListingWrapper />}
                            />
                            <Route
                                path="warehoue"
                                element={<InwardDealerTabsListingWrapper />}
                            />
                            <Route
                                path="sample"
                                element={<InwardDealerTabsListingWrapper />}
                            />
                            <Route
                                path="ecom"
                                element={<InwardDealerTabsListingWrapper />}
                            />
                            <Route
                                path="replacement"
                                element={<InwardDealerTabsListingWrapper />}
                            />
                        </Route>

                        <Route
                            path="inventories/inward-inventory/add"
                            element={<InwardInventoryWrapper />}
                        />
                        <Route
                            path="warehouse-details"
                            element={
                                <ActionAuthHOC
                                    Component={<ViewWarehouseWrapper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={UserModuleActionTypes.VIew}
                                    isRedirect
                                />
                            }
                        />
                    </Route>

                    <Route path="/" element={<Auth />} />
                    <Route path="/dashboard" element={<DashboardWrappper />} />
                    <Route path="/profile" element={<ProfileWrappper />} />
                    <Route
                        path="media/caller-page"
                        element={<CallerPageWrapper />}
                    />
                    <Route path="/orders"
                         element={
                            <ActionAuthHOC
                                Component={<OrderListing />}
                                moduleName={UserModuleNameTypes.order}
                            />
                        }
                     />

                    <Route path="/orders"
                         element={
                            <ActionAuthHOC
                                Component={<Order />}
                                moduleName={UserModuleNameTypes.order}
                            />
                        }
                    >
                    <Route index element={<OrderListing />} />
                        <Route path="view/:id" element={<OrderViewWrapper />} />
                        <Route
                            path="approved-orders"
                            element={<ApprovedOrderListing />}
                        />
                    </Route>
                    <Route
                        path="/approved-orders/view/:id"
                        element={<ApprovedOrderViewWrapper />}
                    />
                  
                    <Route
                        path="/dealers"
                        element={
                            <AuthHOC
                                Component={<DealersListingWrapper />}
                                moduleName={'DEALER'}
                            />
                        }
                    />
                    <Route
                        path="/dealers-ratio"
                        element={
                            <AuthHOC
                                Component={<DealersRatioListingWrapper />}
                                moduleName={UserModuleNameTypes.dealer}
                            />
                        }
                    />
                    <Route
                        path="/dealers/add-dealer"
                        element={                            
                            <ActionAuthHOC
                                Component={<AddDealerWrapper />}
                                moduleName={UserModuleNameTypes.dealer}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/dealers/edit-dealer/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditDealerWrapper />}
                                moduleName={UserModuleNameTypes.dealer}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/vendors"
                        element={
                            <AuthHOC
                                Component={<VendorsListingWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                            />
                        }
                    />
                    <Route
                        path="/vendors/add-vendor"
                        element={
                            <ActionAuthHOC
                                Component={<AddVendorWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/vendors/edit-vendor/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditVendorWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route path="/vendors/:vendorId" 
                    element={
                        <ActionAuthHOC
                            Component={<ViewVendor />}
                            moduleName={UserModuleNameTypes.vendor}
                            actionName={UserModuleActionTypes.View}
                            isRedirect
                        />
                    }
                    >
                        <Route
                            path="general-information"
                            element={<VendorGeneralInformationTabWrapper />}
                        />
                        <Route
                            path="purchase-order"
                            element={<VendorPurchaseOrderTabWrapper />}
                        />
                        <Route
                            path="purchase-order/add"
                            element={<AddPurchaseOrderTabWrapper />}
                        />
                        <Route
                            path="warehouse"
                            element={<VendorWarehouseTabWrapper />}
                        />
                        <Route
                            path="return-to-vendor"
                            element={'Return To Vendor'}
                        />
                        <Route
                            path="ledger"
                            element={<VendorListLedgerTabWrapper />}
                        />
                        <Route
                            path="activities"
                            element={<VendorActivityTabWrapper />}
                        />
                    </Route>

                    <Route
                        path="/warehouse"
                        element={
                            <AuthHOC
                                Component={<WarehousesListingWrapper />}
                                moduleName={UserModuleNameTypes.wareHouse}
                            />
                        }
                    />
                    <Route
                        path="/warehouse/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditWarehouseWrapper />}
                                moduleName={UserModuleNameTypes.wareHouse}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/warehouse/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddWarehouseWrapper />}
                                moduleName={UserModuleNameTypes.wareHouse}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    {/* <Route
                        path="/warehouse/view/:id"
                        element={<ViewWarehouseWrapper />}
                    /> */}

                    <Route
                        path="/vendors/:vendorId/warehouse/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddVendorWarehouseWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/vendors/:vendorId/warehouse/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditVendorWarehouseWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/sale-order"
                        element={
                            <AuthHOC
                                Component={<SaleOrderListingWrapper />}
                                moduleName={UserModuleNameTypes.saleOrder}
                                />
                            }
                    />
                    <Route
                        path="/sale-order/add-sale-order"
                        element={
                            <ActionAuthHOC
                                Component={<AddSaleOrderWrapper />}
                                moduleName={UserModuleNameTypes.saleOrder}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/dealers/:dealerId/sale-order/add-sale-order"
                        element={
                            <ActionAuthHOC
                                Component={<AddSaleOrderWrapper />}
                                moduleName={UserModuleNameTypes.dealer}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/sale-order/edit-sale-order/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditSaleOrderWrapper />}
                                moduleName={UserModuleNameTypes.saleOrder}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="vendors/:dealerId/warehouse/add-warehouse"
                        element={
                            <ActionAuthHOC
                                Component={<AddWarehouseWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dealers/:dealerId/warehouse/add-warehouse"
                        element={
                            <ActionAuthHOC
                                Component={<AddDealerWarehouseWarpper />}
                                moduleName={UserModuleNameTypes.dealer}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="dealers/:dealerId/warehouse/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditDealerWarehouseWrapper />}
                                moduleName={UserModuleNameTypes.dealer}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route path="/dealers/:dealerId" 
                        element={
                            <ActionAuthHOC
                                Component={<ViewDealer />}
                                moduleName={UserModuleNameTypes.dealer}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                            }
                    >
                        <Route
                            path="general-information"
                            element={<DealerGeneralInformationTabWrapper />}
                        />
                        <Route
                            path="sale-order"
                            element={<DealerSalesOrderTabWrapper />}
                        />
                        <Route
                            path="warehouse"
                            element={<DealerWarehouseTabWrapper />}
                        />

                        <Route
                            path="ledger"
                            element={<DealerListLedgerTabWrapper />}
                        />
                        <Route
                            path="order-ledger"
                            element={<DealerOrderLedgerListTabWrapper />}
                        />

                        <Route
                            path="activities"
                            element={<DealerActivityTabWrapper />}
                        />
                        <Route
                            path="pincode/add"
                            element={<AddDealerPinCodeTabWrapper />}
                        />
                        <Route
                            path="scheme/add"
                            element={<AddDealerSchemeTabWrapper />}
                        />
                        <Route
                            path="scheme/edit/:schemeId"
                            element={<EditDealerSchemeWrapper />}
                        />
                        <Route
                            path="pincode"
                            element={<ListDealerPincodeTabWrapper />}
                        />
                        <Route
                            path="scheme"
                            element={<ListDealerSchemeTabWrapper />}
                        />
                        <Route
                            path="supervisor"
                            element={<ListDealerSupervisorTabWrapper />}
                        />
                        <Route
                            path="supervisor/add"
                            element={<DealerSupervisorTabWrapper />}
                        />
                    </Route>

                    <Route 
                        path="users" 
                        element={
                            <AuthHOC
                                Component={<UsersListingWrapper />}
                                moduleName={UserModuleNameTypes.user}
                            />
                            }
                        />
                    <Route
                        path="/users/add-user"
                        element={
                            <ActionAuthHOC
                                Component={<AddUserWrapper />}
                                moduleName={UserModuleNameTypes.user}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                           />
                        }
                    />
                    <Route 
                        path="/users/:id" 
                        element={
                            <ActionAuthHOC
                                Component={<EditUserWrapper />}
                                moduleName={UserModuleNameTypes.user}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                       } 
                    />
                    <Route path="test" element={<Test />} />

                    <Route 
                        path="/asr" 
                        element={
                            <AuthHOC
                                Component={<ASRListingWrapper />}
                                moduleName={UserModuleNameTypes.asr}
                            />
                        }
                    />
                    <Route 
                        path="/asr/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddASRWrapper />}
                                moduleName={UserModuleNameTypes.asr}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        } 
                    />
                    <Route 
                        path="/asr/:id" 
                        element={
                            <ActionAuthHOC
                                Component={<EditASRWrapper />}
                                moduleName={UserModuleNameTypes.asr}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route 
                        path="/grn" 
                        element={
                            <AuthHOC
                                Component={<GRNListingWrapper />}
                                moduleName={UserModuleNameTypes.grn}
                            />
                        }
                    />
                    <Route 
                        path="/grn/add" 
                        element={
                            <ActionAuthHOC
                                Component={<AddGRNWrapper />}
                                moduleName={UserModuleNameTypes.grn}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/scheme"
                        element={
                            <AuthHOC
                                Component={<SchemeListingWrapper />}
                                moduleName={UserModuleNameTypes.scheme}
                            />
                        }
                    />
                    <Route
                        path="/configurations/scheme/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddSchemeWrapper />}
                                moduleName={UserModuleNameTypes.scheme}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/scheme/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditSchemeWrapper />}
                                moduleName={UserModuleNameTypes.scheme}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/purchase-order"
                        element={
                            <AuthHOC
                                Component={<PurchaseOrderListingWrapper />}
                                moduleName={UserModuleNameTypes.purchaseOrder}
                            />
                        }
                    />
                    <Route
                        path="/purchase-order/view/:id"
                        element={
                            <ActionAuthHOC
                                Component={<ViewPurchaseOrderWrapper />}
                                moduleName={UserModuleNameTypes.purchaseOrder}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/purchase-order/edit/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditPurchaseOrderWrapper />}
                                moduleName={UserModuleNameTypes.purchaseOrder}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/purchase-order/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddPurchaseOrderWrapper />}
                                moduleName={UserModuleNameTypes.purchaseOrder}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/inventory-management/add"
                        element={<AddInventoryManagementWrapper />}
                    />
                    <Route
                        path="/inventory-management/edit/:id"
                        element={<EditInventoryManagementWrapper />}
                    />
                    <Route
                        path="/inventory-management"
                        element={<InventoryManagementListingWrapper />}
                    />

                    <Route
                        path="/configurations"
                        element={<ConfigurationLayout />}
                    />

                    <Route
                        path="/configurations/attributes"
                        element={
                            <AuthHOC
                                Component={<AttributesListingWrapper />}
                                moduleName={UserModuleNameTypes.attribute}                            
                            />
                        }
                    />

                    <Route
                        path="/configurations/attributes/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddAttributeWrapper />}
                                moduleName={UserModuleNameTypes.attribute}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/attributes/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditAttributeWrapper />}
                                moduleName={UserModuleNameTypes.attribute}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/product-group"
                        element={
                            <AuthHOC
                                Component={<ProductGroupListingWrapper />}
                                moduleName={UserModuleNameTypes.productGroup}                            
                            />
                        }
                    />

                    <Route
                        path="/configurations/product-group/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddProductGroupWrapper />}
                                moduleName={UserModuleNameTypes.productGroup}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/product-group/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditProductGroupWrapper />}
                                moduleName={UserModuleNameTypes.productGroup}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/attributes-group"
                        element={
                            <AuthHOC
                                Component={<AttributesGroupListingWrapper />}
                                moduleName={UserModuleNameTypes.attributeGroup}                                
                            />
                        }
                    />

                    <Route
                        path="/configurations/attributes-group/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddAttributeGroupWrapper />}
                                moduleName={UserModuleNameTypes.attributeGroup}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/attributes-group/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditAttributeGroupWrapper />}
                                moduleName={UserModuleNameTypes.attributeGroup}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-category"
                        element={
                            <AuthHOC
                                Component={<ProductCategoryListingWrapper />}
                                moduleName={UserModuleNameTypes.productCategory}
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-category/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddProductCategoryWrapper />}
                                moduleName={UserModuleNameTypes.productCategory}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-category/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditProductCategoryWrapper />}
                                moduleName={UserModuleNameTypes.productCategory}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/product-sub-category"
                        element={
                            <AuthHOC
                                Component={<ProductSubCategoryListingWrapper />}
                                moduleName={UserModuleNameTypes.productSubCategory}
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-sub-category/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddProductSubCategoryWrapper />}
                                moduleName={UserModuleNameTypes.productSubCategory}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-sub-category/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditProductSubCategoryWrapper />}
                                moduleName={UserModuleNameTypes.productSubCategory}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/item"
                        element={
                            <AuthHOC
                                Component={<ItemListingWrapper />}
                                moduleName={UserModuleNameTypes.item}
                            />
                        }
                    />
                    <Route
                        path="/configurations/item/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddItemWrapper />}
                                moduleName={UserModuleNameTypes.item}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/item/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditItemWrapper />}
                                moduleName={UserModuleNameTypes.attributeGitemroup}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/products"
                        element={
                            <AuthHOC
                                Component={<ProductsListingWrapper />}
                                moduleName={UserModuleNameTypes.product}
                            />
                        }
                    />

                    <Route
                        path="/configurations/products/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddProductWrapper />}
                                moduleName={UserModuleNameTypes.product}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/product/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditProductWrapper />}
                                moduleName={UserModuleNameTypes.product}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/carton-box"
                        element={
                            <AuthHOC
                                Component={<CartonBoxListingWrapper />}
                                moduleName={UserModuleNameTypes.cartonBox}
                            />
                        }
                    />
                    <Route
                        path="/configurations/carton-box/add"
                        element={
                                <ActionAuthHOC
                                Component={<AddCartonBoxWrapper />}
                                moduleName={UserModuleNameTypes.cartonBox}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/barcode/carton-box-items/:cartonboxcode"
                        element={
                            <ActionAuthHOC
                                Component={<ViewBarcodeWrapper />}
                                moduleName={UserModuleNameTypes.barcode}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/carton-box/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditCartonBoxWrapper />}
                                moduleName={UserModuleNameTypes.cartonBox}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/taxes/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddTaxesWrapper />}
                                moduleName={UserModuleNameTypes.tax}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/taxes"
                        element={
                            <AuthHOC
                                Component={<TaxesListingWrapper />}
                                moduleName={UserModuleNameTypes.tax}
                            />
                        }
                    />

                    <Route
                        path="/configurations/taxes/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditTaxesWrapper />}
                                moduleName={UserModuleNameTypes.tax}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/barcode"
                        element={
                            <AuthHOC
                                Component={<BarcodeListingWrapper />}
                                moduleName={UserModuleNameTypes.barcode}
                            />
                        }
                    />

                    <Route
                        path="/configurations/barcode/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddBarcodeWrapper />}
                                moduleName={UserModuleNameTypes.barcode}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/barcode/carton-box/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddCbBarcodeWrapper />}
                                moduleName={UserModuleNameTypes.barcode}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/barcode/:barcodeId"
                        element={
                            <ActionAuthHOC
                                Component={<ViewBarcodeWrapper />}
                                moduleName={UserModuleNameTypes.barcode}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/company"
                        element={
                            <AuthHOC
                                Component={<ConfigurationCompanyListingWrapper />}
                                moduleName={UserModuleNameTypes.company}
                            />
                        }
                    />
                    <Route
                        path="/configurations/dealers-category/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddDealersCategoryWrapper />}
                                moduleName={UserModuleNameTypes.dealerCategory}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/dealers-category/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditDealersCategoryWrapper />}
                                moduleName={UserModuleNameTypes.dealerCategory}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/company/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddCompanyWrapper />}
                                moduleName={UserModuleNameTypes.company}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/company/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditCompanyWrapper />}
                                moduleName={UserModuleNameTypes.company}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/language/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddLanguageWrapper />}
                                moduleName={UserModuleNameTypes.language}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/language/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditLanguageWrapper />}
                                moduleName={UserModuleNameTypes.language}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/location"
                        element={<Locations />}
                    />
                    {/* <Route path="/disposition" element={<Disposition />} /> */}
                    <Route
                        path="/configurations/dealers-category"
                        element={
                            <AuthHOC
                                Component={<DealersCategoryListingWrapper />}
                                moduleName={UserModuleNameTypes.dealerCategory}
                            />
                        }
                    />
                    <Route
                        path="/configurations/language"
                        element={
                            <AuthHOC
                                Component={<LanguageListingWrapper />}
                                moduleName={UserModuleNameTypes.language}
                            />
                        }
                    />

                    <Route
                        path="configurations/hierarchy"
                        element={<OrganisationHierarchy />}
                    />
                    <Route path="/barcodes" element={<BarcodeGenerator />} />

                    {/* Media Module Routes */}
                    <Route
                        path="media/did"
                        element={
                            <AuthHOC
                                Component={<DidManagementListingWrapper />}
                                moduleName={UserModuleNameTypes.didManagement}
                            />
                        }
                    />
                    <Route
                        path="media/did/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddDidManagementWrapper />}
                                moduleName={UserModuleNameTypes.didManagement}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/did/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditDidManagementWrapper />}
                                moduleName={UserModuleNameTypes.didManagement}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/channel-group"
                        element={
                            <AuthHOC
                                Component={<ChannelGroupListingWrapper />}
                                moduleName={UserModuleNameTypes.channelGroup}
                            />
                        }
                    />
                    <Route
                        path="media/channel-group/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddChannelGroupWrapper />}
                                moduleName={UserModuleNameTypes.channelGroup}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/channel-group/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditChannelGroupWrapper />}
                                moduleName={UserModuleNameTypes.channelGroup}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/channel"
                        element={
                            <AuthHOC
                                Component={<ChannelManagementListingWrapper />}
                                moduleName={UserModuleNameTypes.channelManagement}
                            />
                        }
                    />
                    <Route
                        path="media/channel/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddChannelManagementWrapper />}
                                moduleName={UserModuleNameTypes.channelManagement}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/channel/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditChannelManagementWrapper />}
                                moduleName={UserModuleNameTypes.channelManagement}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="media/tape"
                        element={
                            <AuthHOC
                                Component={<TapeManagementListingWrapper />}
                                moduleName={UserModuleNameTypes.tapeManangement}
                            />
                        }
                    />
                    <Route
                        path="media/tape/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddTapeManagementWrapper />}
                                moduleName={UserModuleNameTypes.tapeManangement}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/tape/edit/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditTapeManagementWrapper />}
                                moduleName={UserModuleNameTypes.tapeManangement}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/slot"
                        element={
                            <AuthHOC
                                Component={<SlotManagementListingWrapper />}
                                moduleName={UserModuleNameTypes.slotManagement}
                            />
                        }
                    />
                    <Route
                        path="media/slot/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddSlotManagementWrapper />}
                                moduleName={UserModuleNameTypes.slotManagement}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/slot/edit/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditSlotManagementWrapper />}
                                moduleName={UserModuleNameTypes.slotManagement}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/competitor"
                        element={
                            <AuthHOC
                                Component={<CompetitorManagementListingWrapper />}
                                moduleName={UserModuleNameTypes.competitor}
                            />
                        }
                    />
                    <Route
                        path="media/competitor/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddCompetitorWrapper />}
                                moduleName={UserModuleNameTypes.competitor}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/competitor/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditCompetitorWraper />}
                                moduleName={UserModuleNameTypes.competitor}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/channel-category"
                        element={
                            <AuthHOC
                                Component={<ChannelCategoryListingWrapper />}
                                moduleName={UserModuleNameTypes.channelCategory}
                            />
                        }
                    />                    
                    <Route
                        path="media/channel-category/edit/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditChannelCategoryWrapper />}
                                moduleName={UserModuleNameTypes.channelCategory}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/channel-category/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddChannelCategoryWrapper/>}
                                moduleName={UserModuleNameTypes.channelCategory}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    {/* <AddCompetitorWrapper /> */}
                    <Route
                        path="media/artist"
                        element={
                            <ActionAuthHOC
                                Component={<ArtistListingWrapper />}
                                moduleName={UserModuleNameTypes.artist}
                            />
                        }
                    />
                    <Route
                        path="media/artist/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditArtistWrapper />}
                                moduleName={UserModuleNameTypes.artist}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/artist/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddArtistWrapper />}
                                moduleName={UserModuleNameTypes.artist}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/inbound/"
                        element={<InbouundWrapper />}
                    />
                    {/* disposition route */}
                    {/* Website route */}

                    {/* start Assets mangement */}
                    <Route
                        path="assets/assets-management"
                        element={
                            <AuthHOC
                                Component={<AssetsRequestWrapper />}
                                moduleName={UserModuleNameTypes.assetRequest}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-management/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditAssetsRequestwrapper />}
                                moduleName={UserModuleNameTypes.assetRequest}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="assets/assets-management/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddAssetsRequestWrapper />}
                                moduleName={UserModuleNameTypes.assetRequest}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/assets/assets-location"
                        element={
                            <AuthHOC
                                Component={<AssetsLocationWrapper />}
                                moduleName={UserModuleNameTypes.assetLocation}
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-location/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditAssetsLocatonWrapper />}
                                moduleName={UserModuleNameTypes.assetLocation}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-category"
                        element={
                            <AuthHOC
                                Component={<AssetsCategoryWrapper />}
                                moduleName={UserModuleNameTypes.assetCategory}
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-category/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddAssetsCategoryWrapper />}
                                moduleName={UserModuleNameTypes.assetCategory}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-category/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditAssetsCategoryWrapper />}
                                moduleName={UserModuleNameTypes.assetCategory}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-location/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddAssetsLocationWrapper />}
                                moduleName={UserModuleNameTypes.assetLocation}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="assets/assets-relocation"
                        element={
                            <AuthHOC
                                Component={<AssetsRelocationWrapper />}
                                moduleName={UserModuleNameTypes.assetRelocation}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-allocation"
                        element={
                            <AuthHOC
                                Component={<AssetsAllocationWrapper />}
                                moduleName={UserModuleNameTypes.assetAllocation}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-relocation/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddAssetsRelocationWrapper />}
                                moduleName={UserModuleNameTypes.assetRelocation}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="assets/assets-allocation/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddAssetsAllocationWrapper />}
                                moduleName={UserModuleNameTypes.assetAllocation}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    {/* end Assets mangement */}

                    <Route
                        path="all-websites/website"
                        element={
                            <AuthHOC
                                Component={<WebstieListingWrapper />}
                                moduleName={UserModuleNameTypes.website}
                            />
                        }
                    />

                    <Route
                        path="all-websites/website/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddWebsiteWrapper />}
                                moduleName={UserModuleNameTypes.website}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-page"
                        element={
                            <AuthHOC
                                Component={<WebsitePageListingWrapper />}
                                moduleName={UserModuleNameTypes.websitePage}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-page/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddWebsitePageWrapper />}
                                moduleName={UserModuleNameTypes.websitePage}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-page/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditWebsitePageWrapper />}
                                moduleName={UserModuleNameTypes.websitePage}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-page/view/:id"
                        element={
                            <ActionAuthHOC
                                Component={<ViewWebsitePageWrapper />}
                                moduleName={UserModuleNameTypes.websitePage}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="all-websites/website/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditWebsiteWrapper />}
                                moduleName={UserModuleNameTypes.website}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* disposition */}
                    <Route
                        path="dispositions/disposition-one"
                        element={
                            <AuthHOC
                                Component={<DispositionOneListingWrapper />}
                                moduleName={UserModuleNameTypes.dispositionOne}
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-one"
                        element={
                            <AuthHOC
                                Component={<InitialCallOneListingWrapper />}
                                moduleName={UserModuleNameTypes.initialCallerOne}
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-one/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddInitialCallOneWrapper />}
                                moduleName={UserModuleNameTypes.initialCallerOne}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-one/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditInitialCallOneWrapper />}
                                moduleName={UserModuleNameTypes.initialCallerOne}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-two"
                        element={
                            <AuthHOC
                                Component={<InitialCallTwoListingWrapper />}
                                moduleName={UserModuleNameTypes.initialCallerTwo}
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-two/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddInitialCallTwoWrapper />}
                                moduleName={UserModuleNameTypes.initialCallerTwo}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-two/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditInitialCallTwoWrapper />}
                                moduleName={UserModuleNameTypes.initialCallerTwo}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-three"
                        element={
                            <AuthHOC
                                Component={<InitialCallThreeListingWrapper />}
                                moduleName={UserModuleNameTypes.initialCallerThree}
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-three/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditInitialCallThreeWrapper />}
                                moduleName={UserModuleNameTypes.initialCallerThree}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-three/view/:id"
                        element={
                            <ActionAuthHOC
                                Component={<ViewInitialCallThreeWrappper />}
                                moduleName={UserModuleNameTypes.initialCallerThree}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-three/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddInitialCallThreeWrappper />}
                                moduleName={UserModuleNameTypes.initialCallerThree}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-one/add"
                        element={<ActionAuthHOC
                                Component={<AddDispositionOneWrappper />}
                                moduleName={UserModuleNameTypes.dispositionOne}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-one/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditDispositionOneWrappper />}
                                moduleName={UserModuleNameTypes.dispositionOne}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-two"
                        element={
                            <AuthHOC
                                Component={<DispositionTwoListingWrapper />}
                                moduleName={UserModuleNameTypes.dispositionTwo}                                
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-three"
                        element={
                            <AuthHOC
                                Component={<DispositionThreeListingWrapper />}
                                moduleName={UserModuleNameTypes.dispositionThree}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-three/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddDispositionThreeWrappper />}
                                moduleName={UserModuleNameTypes.dispositionThree}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-three/edit/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditDispositionThreeWrapper />}
                                moduleName={UserModuleNameTypes.dispositionThree}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-three/:id"
                        element={
                            <ActionAuthHOC
                                Component={<ViewDispositionThreeWrappper />}
                                moduleName={UserModuleNameTypes.dispositionThree}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-two/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddDispositionTwoWrapper />}
                                moduleName={UserModuleNameTypes.dispositionTwo}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-two/edit/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditDispositionTwoWrapper />}
                                moduleName={UserModuleNameTypes.dispositionTwo}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-complaint"
                        element={
                            <AuthHOC
                                Component={<DispositionComplaintListingWrapper />}
                                moduleName={UserModuleNameTypes.dispositionComplaint}                                
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-complaint/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddDispositionComplaintWrappper />}
                                moduleName={UserModuleNameTypes.dispositionComplaint}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-complaint/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditDispositionComplaintWrappper />}
                                moduleName={UserModuleNameTypes.dispositionComplaint}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Website Blog route */}
                    <Route
                        path="all-websites/website-blog"
                        element={
                            <AuthHOC
                                Component={<ListWebstieBlogWrapper />}
                                moduleName={UserModuleNameTypes.websiteBlog}                                
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-blog/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddWebsiteBlogWrapper />}
                                moduleName={UserModuleNameTypes.websiteBlog}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-blog/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditWebsiteBlogWrapper />}
                                moduleName={UserModuleNameTypes.websiteBlog}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-blog/view/:id"
                        element={
                            <ActionAuthHOC
                                Component={<WebsiteBlogViewWrapper />}
                                moduleName={UserModuleNameTypes.websiteBlog}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />}
                    />
                    {/* Website Blog route */}

                    {/* start Influencer routing */}
                    <Route
                        path="all-websites/influencers-management"
                        element={<InfluencerListingWrapper />}
                    />
                    <Route
                        path="all-websites/influencers-management/add"
                        element={<AddInfluencerWrapper />}
                    />
                    {/*end  Influencer routing */}

                    {/* start call routing */}
                    <Route path="/call" element={<CallListingWrapper />} />
                    {/* end call routing */}
                    {/* <Route path="batch" element={<BatchListingWrapper />} /> */}
                    <Route
                        path="/all-websites/website-tags"
                        element={
                            <ActionAuthHOC
                                Component={<WebsiteTagListingWrapper />}
                                moduleName={UserModuleNameTypes.websiteTags}                                
                            />
                        }
                    />
                    <Route
                        path="/all-websites/website-tags/add"
                        element={
                            <ActionAuthHOC
                                Component={<AddWebsiteTagsWrapper />}
                                moduleName={UserModuleNameTypes.websiteTags}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/all-websites/website-tags/edit/:id"
                        element={
                            <ActionAuthHOC
                                Component={<EditWebsiteTagWrapper />}
                                moduleName={UserModuleNameTypes.websiteTags}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/all-websites/website-tags/:id"
                        element={
                            <ActionAuthHOC
                                Component={<ViewWebsiteTagsWrapper />}
                                moduleName={UserModuleNameTypes.websiteTags}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/inquiry"
                        element={
                            <AuthHOC
                                Component={<InquiryListingWrapper />}
                                moduleName={UserModuleNameTypes.inquiry}                                
                            />
                        }
                    />

                    <Route
                        path="/inquiry/view/:id"
                        element={
                            <ActionAuthHOC
                                Component={<InquiryViewWrapper />}
                                moduleName={UserModuleNameTypes.inquiry}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="configurations/user-access"
                        element={<UserAccessWrapper />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default PageRoutes
