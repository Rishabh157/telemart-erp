import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
    AddArtistWrapper,
    AddASRWrapper,
    AddCompetitorWrapper,
    AddDidManagementWrapper,
    ArtistListingWrapper,
    ASRListingWrapper,
    BarcodeGenerator,
    CompetitorManagementListingWrapper,
    EditArtistWrapper,
    EditCompetitorWraper,
    EditDidManagementWrapper,
    EditPurchaseOrderWrapper,
} from './pages/index'
import { AddAttributeWrapper, AttributesListingWrapper } from './pages/index'
import {
    AddAttributeGroupWrapper,
    AttributesGroupListingWrapper,
} from './pages/index'
import { AddBarcodeWrapper, BarcodeListingWrapper } from './pages/index'
import {
    ViewBarcodeWrapper,
    AddCartonBoxWrapper,
    CartonBoxListingWrapper,
} from './pages/index'
import {
    AddCompanyWrapper,
    ConfigurationCompanyListingWrapper,
    AddDealersCategoryWrapper,
    DealersCategoryListingWrapper,
} from './pages/index'
import {
    AddGRNWrapper,
    GRNListingWrapper,
    AddItemWrapper,
    ItemListingWrapper,
    AddLanguageWrapper,
} from './pages/index'
import {
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
} from './pages/index'
import {
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
    DealerSalesOrderTabWrapper,
    AddDealerPinCodeTabWrapper,
    AddDealerSchemeTabWrapper,
    ListDealerPincodeTabWrapper,
    ListDealerSchemeTabWrapper,
} from './pages/index'
import {
    InwardInventoryWrapper,
    InventoryListingWrapper,
    AddOrder,
    OrderListing,
    OutwardRequestListingWrapper,
    AddSaleOrderWrapper,
    EditSaleOrderWrapper,
    SaleOrderListingWrapper,
    Test,
    UsersListingWrapper,
    AddUserWrapper,
    AddVendorWrapper,
    VendorsListingWrapper,
    ViewVendor,
    VendorActivityTabWrapper,
    VendorGeneralInformationTabWrapper,
    VendorWarehouseTabWrapper,
    VendorPurchaseOrderTabWrapper,
    AddWarehouseWrapper,
    WarehousesListingWrapper,
    ViewWarehouseWrapper,
} from './pages/index'

import { useDispatch } from 'react-redux'
import {
    setAccessToken,
    setDeviceId,
    setRefreshToken,
    setUserData,
} from './redux/slices/authSlice'
import { v4 as uuidv4 } from 'uuid'
import {
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
    DispositionOneListingWrapper,
    EditChannelManagement,
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
} from './pages/index'
import Auth from './pages/login/Auth'
import AddDispositionOneWrapper from './pages/configuration/Configuration Screens/dispositionOne/add/AddDispositionOneWrapper'
import DispositionTwoListingWrapper from './pages/configuration/Configuration Screens/dispositionTwo/list/DispositionTwoListingWrapper'
import AddDispositionTwoWrapper from './pages/configuration/Configuration Screens/dispositionTwo/add/AddDispositionTwoWrapper'
import EditDispositionTwoWrapper from './pages/configuration/Configuration Screens/dispositionTwo/edit/EditDispositionTwoWrapper'
import EditDispositionOneWrapper from './pages/configuration/Configuration Screens/dispositionOne/edit/EditDispositionOneWrapper'
import AddSlotManagementWrapper from './pages/media/slotManagement/add/AddSlotManagementWrapper'
import EditSlotManagementWrapper from './pages/media/slotManagement/edit/EditSlotManagementWrapper'


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
        window.location.replace('/')
        return null
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/dashboard" element={<DashboardWrappper />} />
                    <Route path="/profile" element={<ProfileWrappper />} />
                    <Route path="/orders" element={<OrderListing />} />
                    <Route path="/orders/add-order" element={<AddOrder />} />
                    <Route
                        path="/dealers"
                        element={<DealersListingWrapper />}
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
                            path="warehouse"
                            element={<VendorWarehouseTabWrapper />}
                        />
                        <Route
                            path="return-to-vendor"
                            element={'Return To Vendor'}
                        />
                        <Route path="ledger" element={'Ledger'} />
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
                        path="/warehouse/view/:id"
                        element={<ViewWarehouseWrapper />}
                    />

                    <Route
                        path="/warehouse/add-warehouse"
                        element={<AddWarehouseWrapper />}
                    />
                    <Route
                        path="/inventories"
                        element={<InventoryListingWrapper />}
                    />
                    <Route
                        path="/inventories/inward-inventory"
                        element={<InwardInventoryWrapper />}
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
                        path="/sale-order/edit-sale-order/:id"
                        element={<EditSaleOrderWrapper />}
                    />

                    <Route
                        path="/outward-request"
                        element={<OutwardRequestListingWrapper />}
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
                        <Route path="ledger" element={'Ledger'} />
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
                            path="pincode"
                            element={<ListDealerPincodeTabWrapper />}
                        />
                        <Route
                            path="scheme"
                            element={<ListDealerSchemeTabWrapper />}
                        />
                    </Route>
                    <Route path="users" element={<UsersListingWrapper />} />
                    <Route
                        path="/users/add-user"
                        element={<AddUserWrapper />}
                    />
                    <Route path="test" element={<Test />} />

                    <Route path="/asr" element={<ASRListingWrapper />} />
                    <Route path="/asr/add" element={<AddASRWrapper />} />
                    <Route path="/asr/:id" element={<EditASRWrapper />} />

                    <Route path="/grn" element={<GRNListingWrapper />} />
                    <Route path="/grn/add" element={<AddGRNWrapper />} />

                    <Route path="/scheme" element={<SchemeListingWrapper />} />
                    <Route path="/scheme/add" element={<AddSchemeWrapper />} />
                    <Route path="/scheme/:id" element={<EditSchemeWrapper />} />

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
                    <Route
                        path="/configurations/dealers-category"
                        element={<DealersCategoryListingWrapper />}
                    />
                    <Route
                        path="/configurations/language"
                        element={<LanguageListingWrapper />}
                    />
                    <Route
                        path="/configurations/disposition-one"
                        element={<DispositionOneListingWrapper />}
                    />

                    <Route
                        path="/configurations/disposition-one/add"
                        element={<AddDispositionOneWrapper />}
                    />
                    <Route
                        path="/configurations/disposition-one/:id"
                        element={<EditDispositionOneWrapper />}
                    />
                    <Route
                        path="/configurations/disposition-two"
                        element={<DispositionTwoListingWrapper />}
                    />
                    <Route
                        path="/configurations/disposition-two/add"
                        element={<AddDispositionTwoWrapper />}
                    />
                    <Route
                        path="/configurations/disposition-two/:id"
                        element={<EditDispositionTwoWrapper />}
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
                        path="media/channel/edit"
                        element={<EditChannelManagement />}
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
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default PageRoutes
