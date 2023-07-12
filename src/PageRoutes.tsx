/// ==============================================
// Filename:PageRoutes.tsx
// Type: Route Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// |-- Internal Dependencies --|
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
} from './pages/index'
import CallerPageWrapper from './pages/callerpage/CallerPageWrapper'

import { useDispatch } from 'react-redux'
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
                            element={<ViewWarehouseWrapper />}
                        />
                    </Route>

                    <Route path="/" element={<Auth />} />
                    <Route path="/dashboard" element={<DashboardWrappper />} />
                    <Route path="/profile" element={<ProfileWrappper />} />
                    <Route
                        path="media/caller-page"
                        element={<CallerPageWrapper />}
                    />
                    <Route path="/orders" element={<OrderListing />} />

                    <Route path="/orders" element={<Order />}>
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
                        element={<DealersListingWrapper />}
                    />
                    <Route
                        path="/dealers-ratio"
                        element={<DealersRatioListingWrapper />}
                    />
                    <Route
                        path="/dealers/add-dealer"
                        element={<AddDealerWrapper />}
                    />
                    <Route
                        path="/dealers/edit-dealer/:id"
                        element={<EditDealerWrapper />}
                    />

                    <Route
                        path="/vendors"
                        element={<VendorsListingWrapper />}
                    />
                    <Route
                        path="/vendors/add-vendor"
                        element={<AddVendorWrapper />}
                    />
                    <Route
                        path="/vendors/edit-vendor/:id"
                        element={<EditVendorWrapper />}
                    />

                    <Route path="/vendors/:vendorId" element={<ViewVendor />}>
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
                        element={<WarehousesListingWrapper />}
                    />
                    <Route
                        path="/warehouse/:id"
                        element={<EditWarehouseWrapper />}
                    />
                    <Route
                        path="/warehouse/add"
                        element={<AddWarehouseWrapper />}
                    />
                    {/* <Route
                        path="/warehouse/view/:id"
                        element={<ViewWarehouseWrapper />}
                    /> */}

                    <Route
                        path="/vendors/:vendorId/warehouse/add"
                        element={<AddVendorWarehouseWrapper />}
                    />
                    <Route
                        path="/vendors/:vendorId/warehouse/:id"
                        element={<EditVendorWarehouseWrapper />}
                    />

                    <Route
                        path="/sale-order"
                        element={<SaleOrderListingWrapper />}
                    />
                    <Route
                        path="/sale-order/add-sale-order"
                        element={<AddSaleOrderWrapper />}
                    />
                    <Route
                        path="/dealers/:dealerId/sale-order/add-sale-order"
                        element={<AddSaleOrderWrapper />}
                    />

                    <Route
                        path="/sale-order/edit-sale-order/:id"
                        element={<EditSaleOrderWrapper />}
                    />

                    <Route
                        path="vendors/:dealerId/warehouse/add-warehouse"
                        element={<AddWarehouseWrapper />}
                    />
                    <Route
                        path="dealers/:dealerId/warehouse/add-warehouse"
                        element={<AddDealerWarehouseWarpper />}
                    />

                    <Route
                        path="dealers/:dealerId/warehouse/:id"
                        element={<EditDealerWarehouseWrapper />}
                    />

                    <Route path="/dealers/:dealerId" element={<ViewDealer />}>
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

                    <Route path="users" element={<UsersListingWrapper />} />
                    <Route
                        path="/users/add-user"
                        element={<AddUserWrapper />}
                    />
                    <Route path="/users/:id" element={<EditUserWrapper />} />
                    <Route path="test" element={<Test />} />

                    <Route path="/asr" element={<ASRListingWrapper />} />
                    <Route path="/asr/add" element={<AddASRWrapper />} />
                    <Route path="/asr/:id" element={<EditASRWrapper />} />

                    <Route path="/grn" element={<GRNListingWrapper />} />
                    <Route path="/grn/add" element={<AddGRNWrapper />} />

                    <Route
                        path="/configurations/scheme"
                        element={<SchemeListingWrapper />}
                    />
                    <Route
                        path="/configurations/scheme/add"
                        element={<AddSchemeWrapper />}
                    />
                    <Route
                        path="/configurations/scheme/:id"
                        element={<EditSchemeWrapper />}
                    />

                    <Route
                        path="/purchase-order"
                        element={<PurchaseOrderListingWrapper />}
                    />
                    <Route
                        path="/purchase-order/view/:id"
                        element={<ViewPurchaseOrderWrapper />}
                    />
                    <Route
                        path="/purchase-order/edit/:id"
                        element={<EditPurchaseOrderWrapper />}
                    />
                    <Route
                        path="/purchase-order/add"
                        element={<AddPurchaseOrderWrapper />}
                    />

                    <Route
                        path="/configurations"
                        element={<ConfigurationLayout />}
                    />

                    <Route
                        path="/configurations/attributes"
                        element={<AttributesListingWrapper />}
                    />

                    <Route
                        path="/configurations/attributes/add"
                        element={<AddAttributeWrapper />}
                    />
                    <Route
                        path="/configurations/attributes/:id"
                        element={<EditAttributeWrapper />}
                    />

                    <Route
                        path="/configurations/product-group"
                        element={<ProductGroupListingWrapper />}
                    />

                    <Route
                        path="/configurations/product-group/add"
                        element={<AddProductGroupWrapper />}
                    />

                    <Route
                        path="/configurations/product-group/:id"
                        element={<EditProductGroupWrapper />}
                    />
                    <Route
                        path="/configurations/attributes-group"
                        element={<AttributesGroupListingWrapper />}
                    />

                    <Route
                        path="/configurations/attributes-group/add"
                        element={<AddAttributeGroupWrapper />}
                    />
                    <Route
                        path="/configurations/attributes-group/:id"
                        element={<EditAttributeGroupWrapper />}
                    />
                    <Route
                        path="/configurations/product-category"
                        element={<ProductCategoryListingWrapper />}
                    />
                    <Route
                        path="/configurations/product-category/add"
                        element={<AddProductCategoryWrapper />}
                    />
                    <Route
                        path="/configurations/product-category/:id"
                        element={<EditProductCategoryWrapper />}
                    />

                    <Route
                        path="/configurations/product-sub-category"
                        element={<ProductSubCategoryListingWrapper />}
                    />
                    <Route
                        path="/configurations/product-sub-category/add"
                        element={<AddProductSubCategoryWrapper />}
                    />
                    <Route
                        path="/configurations/product-sub-category/:id"
                        element={<EditProductSubCategoryWrapper />}
                    />

                    <Route
                        path="/configurations/item"
                        element={<ItemListingWrapper />}
                    />
                    <Route
                        path="/configurations/item/add"
                        element={<AddItemWrapper />}
                    />
                    <Route
                        path="/configurations/item/:id"
                        element={<EditItemWrapper />}
                    />

                    <Route
                        path="/configurations/products"
                        element={<ProductsListingWrapper />}
                    />

                    <Route
                        path="/configurations/products/add"
                        element={<AddProductWrapper />}
                    />
                    <Route
                        path="/configurations/product/:id"
                        element={<EditProductWrapper />}
                    />
                    <Route
                        path="/configurations/carton-box"
                        element={<CartonBoxListingWrapper />}
                    />
                    <Route
                        path="/configurations/carton-box/add"
                        element={<AddCartonBoxWrapper />}
                    />
                    <Route
                        path="/configurations/barcode/carton-box-items/:cartonboxcode"
                        element={<ViewBarcodeWrapper />}
                    />

                    <Route
                        path="/configurations/carton-box/:id"
                        element={<EditCartonBoxWrapper />}
                    />

                    <Route
                        path="/configurations/taxes/add"
                        element={<AddTaxesWrapper />}
                    />

                    <Route
                        path="/configurations/taxes"
                        element={<TaxesListingWrapper />}
                    />

                    <Route
                        path="/configurations/taxes/:id"
                        element={<EditTaxesWrapper />}
                    />

                    <Route
                        path="/configurations/barcode"
                        element={<BarcodeListingWrapper />}
                    />

                    <Route
                        path="/configurations/barcode/add"
                        element={<AddBarcodeWrapper />}
                    />
                    <Route
                        path="/configurations/barcode/carton-box/add"
                        element={<AddCbBarcodeWrapper />}
                    />

                    <Route
                        path="/configurations/barcode/:barcodeId"
                        element={<ViewBarcodeWrapper />}
                    />
                    <Route
                        path="/configurations/company"
                        element={<ConfigurationCompanyListingWrapper />}
                    />
                    <Route
                        path="/configurations/dealers-category/add"
                        element={<AddDealersCategoryWrapper />}
                    />
                    <Route
                        path="/configurations/dealers-category/:id"
                        element={<EditDealersCategoryWrapper />}
                    />

                    <Route
                        path="/configurations/company/add"
                        element={<AddCompanyWrapper />}
                    />
                    <Route
                        path="/configurations/company/:id"
                        element={<EditCompanyWrapper />}
                    />
                    <Route
                        path="/configurations/language/add"
                        element={<AddLanguageWrapper />}
                    />
                    <Route
                        path="/configurations/language/:id"
                        element={<EditLanguageWrapper />}
                    />

                    <Route
                        path="/configurations/location"
                        element={<Locations />}
                    />
                    {/* <Route path="/disposition" element={<Disposition />} /> */}
                    <Route
                        path="/configurations/dealers-category"
                        element={<DealersCategoryListingWrapper />}
                    />
                    <Route
                        path="/configurations/language"
                        element={<LanguageListingWrapper />}
                    />

                    <Route
                        path="configurations/hierarchy"
                        element={<OrganisationHierarchy />}
                    />
                    <Route path="/barcodes" element={<BarcodeGenerator />} />

                    {/* Media Module Routes */}
                    <Route
                        path="media/did"
                        element={<DidManagementListingWrapper />}
                    />
                    <Route
                        path="media/did/add"
                        element={<AddDidManagementWrapper />}
                    />
                    <Route
                        path="media/did/:id"
                        element={<EditDidManagementWrapper />}
                    />
                    <Route
                        path="media/channel-group"
                        element={<ChannelGroupListingWrapper />}
                    />
                    <Route
                        path="media/channel-group/add"
                        element={<AddChannelGroupWrapper />}
                    />
                    <Route
                        path="media/channel-group/:id"
                        element={<EditChannelGroupWrapper />}
                    />
                    <Route
                        path="media/channel"
                        element={<ChannelManagementListingWrapper />}
                    />
                    <Route
                        path="media/channel/add"
                        element={<AddChannelManagementWrapper />}
                    />
                    <Route
                        path="media/channel/:id"
                        element={<EditChannelManagementWrapper />}
                    />

                    <Route
                        path="media/tape"
                        element={<TapeManagementListingWrapper />}
                    />
                    <Route
                        path="media/tape/add"
                        element={<AddTapeManagementWrapper />}
                    />
                    <Route
                        path="media/tape/edit/:id"
                        element={<EditTapeManagementWrapper />}
                    />
                    <Route
                        path="media/slot"
                        element={<SlotManagementListingWrapper />}
                    />
                    <Route
                        path="media/slot/add"
                        element={<AddSlotManagementWrapper />}
                    />
                    <Route
                        path="media/slot/edit/:id"
                        element={<EditSlotManagementWrapper />}
                    />
                    <Route
                        path="media/competitor"
                        element={<CompetitorManagementListingWrapper />}
                    />
                    <Route
                        path="media/competitor/add"
                        element={<AddCompetitorWrapper />}
                    />
                    <Route
                        path="media/competitor/:id"
                        element={<EditCompetitorWraper />}
                    />
                    <Route
                        path="media/channel-category"
                        element={<ChannelCategoryListingWrapper />}
                    />
                    <Route
                        path="media/channel-category/add"
                        element={<AddChannelCategoryWrapper />}
                    />
                    <Route
                        path="media/channel-category/edit/:id"
                        element={<EditChannelCategoryWrapper />}
                    />
                    <Route
                        path="media/channel-category/add"
                        element={<AddCompetitorWrapper />}
                    />
                    <Route
                        path="media/artist"
                        element={<ArtistListingWrapper />}
                    />
                    <Route
                        path="media/artist/:id"
                        element={<EditArtistWrapper />}
                    />
                    <Route
                        path="media/artist/add"
                        element={<AddArtistWrapper />}
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
                        element={<AssetsRequestWrapper />}
                    />
                    <Route
                        path="assets/assets-management/:id"
                        element={<EditAssetsRequestwrapper />}
                    />
                    <Route
                        path="assets/assets-management/add"
                        element={<AddAssetsRequestWrapper />}
                    />

                    <Route
                        path="/assets/assets-location"
                        element={<AssetsLocationWrapper />}
                    />
                    <Route
                        path="/assets/assets-location/:id"
                        element={<EditAssetsLocatonWrapper />}
                    />
                    <Route
                        path="/assets/assets-category"
                        element={<AssetsCategoryWrapper />}
                    />
                    <Route
                        path="/assets/assets-category/add"
                        element={<AddAssetsCategoryWrapper />}
                    />
                    <Route
                        path="/assets/assets-category/:id"
                        element={<EditAssetsCategoryWrapper />}
                    />
                    <Route
                        path="/assets/assets-location/add"
                        element={<AddAssetsLocationWrapper />}
                    />

                    <Route
                        path="assets/assets-relocation"
                        element={<AssetsRelocationWrapper />}
                    />
                    <Route
                        path="assets/assets-allocation"
                        element={<AssetsAllocationWrapper />}
                    />
                    <Route
                        path="assets/assets-relocation/add"
                        element={<AddAssetsRelocationWrapper />}
                    />
                    <Route
                        path="assets/assets-allocation/add"
                        element={<AddAssetsAllocationWrapper />}
                    />

                    {/* end Assets mangement */}

                    <Route
                        path="all-websites/website"
                        element={<WebstieListingWrapper />}
                    />

                    <Route
                        path="all-websites/website/add"
                        element={<AddWebsiteWrapper />}
                    />
                    <Route
                        path="all-websites/website-page"
                        element={<WebsitePageListingWrapper />}
                    />
                    <Route
                        path="all-websites/website-page/add"
                        element={<AddWebsitePageWrapper />}
                    />
                    <Route
                        path="all-websites/website-page/:id"
                        element={<EditWebsitePageWrapper />}
                    />
                    <Route
                        path="all-websites/website-page/view/:id"
                        element={<ViewWebsitePageWrapper />}
                    />

                    <Route
                        path="all-websites/website/:id"
                        element={<EditWebsiteWrapper />}
                    />

                    {/* disposition */}
                    <Route
                        path="dispositions/disposition-one"
                        element={<DispositionOneListingWrapper />}
                    />
                    <Route
                        path="dispositions/initialcall-one"
                        element={<InitialCallOneListingWrapper />}
                    />
                    <Route
                        path="dispositions/initialcall-one/add"
                        element={<AddInitialCallOneWrapper />}
                    />
                    <Route
                        path="dispositions/initialcall-one/:id"
                        element={<EditInitialCallOneWrapper />}
                    />
                    <Route
                        path="dispositions/initialcall-two"
                        element={<InitialCallTwoListingWrapper />}
                    />
                    <Route
                        path="dispositions/initialcall-two/add"
                        element={<AddInitialCallTwoWrapper />}
                    />
                    <Route
                        path="dispositions/initialcall-two/:id"
                        element={<EditInitialCallTwoWrapper />}
                    />
                    <Route
                        path="dispositions/initialcall-three"
                        element={<InitialCallThreeListingWrapper />}
                    />
                    <Route
                        path="dispositions/initialcall-three/:id"
                        element={<EditInitialCallThreeWrapper />}
                    />
                    <Route
                        path="dispositions/initialcall-three/view/:id"
                        element={<ViewInitialCallThreeWrappper />}
                    />
                    <Route
                        path="dispositions/initialcall-three/add"
                        element={<AddInitialCallThreeWrappper />}
                    />
                    <Route
                        path="dispositions/disposition-one/add"
                        element={<AddDispositionOneWrappper />}
                    />
                    <Route
                        path="dispositions/disposition-one/:id"
                        element={<EditDispositionOneWrappper />}
                    />
                    <Route
                        path="dispositions/disposition-two"
                        element={<DispositionTwoListingWrapper />}
                    />
                    <Route
                        path="dispositions/disposition-three"
                        element={<DispositionThreeListingWrapper />}
                    />
                    <Route
                        path="dispositions/disposition-three/add"
                        element={<AddDispositionThreeWrappper />}
                    />
                    <Route
                        path="dispositions/disposition-three/edit/:id"
                        element={<EditDispositionThreeWrapper />}
                    />
                    <Route
                        path="dispositions/disposition-three/:id"
                        element={<ViewDispositionThreeWrappper />}
                    />
                    <Route
                        path="dispositions/disposition-two/add"
                        element={<AddDispositionTwoWrapper />}
                    />
                    <Route
                        path="dispositions/disposition-two/edit/:id"
                        element={<EditDispositionTwoWrapper />}
                    />
                    <Route
                        path="dispositions/disposition-complaint"
                        element={<DispositionComplaintListingWrapper />}
                    />
                    <Route
                        path="dispositions/disposition-complaint/add"
                        element={<AddDispositionComplaintWrappper />}
                    />
                    <Route
                        path="dispositions/disposition-complaint/:id"
                        element={<EditDispositionComplaintWrappper />}
                    />

                    {/* Website Blog route */}
                    <Route
                        path="all-websites/website-blog"
                        element={<ListWebstieBlogWrapper />}
                    />
                    <Route
                        path="all-websites/website-blog/add"
                        element={<AddWebsiteBlogWrapper />}
                    />
                    <Route
                        path="all-websites/website-blog/:id"
                        element={<EditWebsiteBlogWrapper />}
                    />
                    <Route
                        path="all-websites/website-blog/view/:id"
                        element={<WebsiteBlogViewWrapper />}
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
                        element={<WebsiteTagListingWrapper />}
                    />
                    <Route
                        path="/all-websites/website-tags/add"
                        element={<AddWebsiteTagsWrapper />}
                    />
                    <Route
                        path="/all-websites/website-tags/edit/:id"
                        element={<EditWebsiteTagWrapper />}
                    />
                    <Route
                        path="/all-websites/website-tags/:id"
                        element={<ViewWebsiteTagsWrapper />}
                    />
                    <Route
                        path="/inquiry"
                        element={<InquiryListingWrapper />}
                    />

                    <Route
                        path="/inquiry/view/:id"
                        element={<InquiryViewWrapper />}
                    />
                    <Route path="configurations/user-access" element={<UserAccessWrapper />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default PageRoutes
