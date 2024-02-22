/// ==============================================
// Filename:PageRoutes.tsx
// Type: Route component
// Last Updated: JULY 30, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// |-- Internal Dependencies --|
import { useDispatch } from 'react-redux'
import {
    UserModuleActionTypes,
    UserModuleAddActionTypes,
    UserModuleNameTypes,
    UserModuleTabsTypes,
    UserModuleWarehouseTabsTypes,
} from 'src/models/userAccess/UserAccess.model'
import { v4 as uuidv4 } from 'uuid'
import AuthenticationHOC from './AuthenticationHOC'
// import AuthenticationHOC from './AuthenticationHOC'
import DealersRatioListingWrapper from './pages/DealerRatioMapping/list/DealersRatioListingWrapper'
import CallerPageWrapper from './pages/callerpage/CallerPageWrapper'
import AddCompanyBranchWrapper from './pages/configuration/ConfigurationScreens/companyBranch/add/AddCompanyBranchWrapper'
import EditCompanyBranchWrapper from './pages/configuration/ConfigurationScreens/companyBranch/edit/EditCompanyBranchWrapper'
import CompanyBranchListingWrapper from './pages/configuration/ConfigurationScreens/companyBranch/list/CompanyBranchListingWrapper'
import {
    ASRListingWrapper,
    AddASRWrapper,
    AddArtistWrapper,
    AddAssetsAllocationWrapper,
    AddAssetsCategoryWrapper,
    AddAssetsLocationWrapper,
    AddAssetsRelocationWrapper,
    AddAssetsRequestWrapper,
    AddAttributeGroupWrapper,
    AddAttributeWrapper,
    AddBarcodeWrapper,
    AddCartonBoxWrapper,
    AddCbBarcodeWrapper,
    AddChannelCategoryWrapper,
    AddChannelGroupWrapper,
    AddChannelManagementWrapper,
    AddCompanyWrapper,
    AddCompetitorWrapper,
    AddDealerPinCodeTabWrapper,
    AddDealerSchemeTabWrapper,
    AddDealerWarehouseWarpper,
    AddDealerWrapper,
    AddDealersCategoryWrapper,
    AddDidManagementWrapper,
    AddDispositionComplaintWrappper,
    AddDispositionOneWrappper,
    AddDispositionThreeWrappper,
    AddDispositionTwoWrapper,
    AddGRNWrapper,
    AddInfluencerWrapper,
    AddInitialCallOneWrapper,
    AddInitialCallThreeWrappper,
    AddInitialCallTwoWrapper,
    // AddInventoryManagementWrapper,
    AddItemWrapper,
    AddLanguageWrapper,
    AddProductCategoryWrapper,
    AddProductGroupWrapper,
    AddProductSubCategoryWrapper,
    AddProductWrapper,
    AddPurchaseOrderTabWrapper,
    AddPurchaseOrderWrapper,
    // OrderListing,
    AddSaleOrderWrapper,
    AddSchemeWrapper,
    AddSlotManagementWrapper,
    AddTapeManagementWrapper,
    AddUserWrapper,
    AddVendorWarehouseWrapper,
    AddVendorWrapper,
    AddWarehouseWrapper,
    AddWebsiteBlogWrapper,
    AddWebsitePageWrapper,
    AddWebsiteTagsWrapper,
    AddWebsiteWrapper,
    ArtistListingWrapper,
    AssetsAllocationWrapper,
    AssetsCategoryWrapper,
    AssetsLocationWrapper,
    AssetsRelocationWrapper,
    AssetsRequestWrapper,
    AttributesGroupListingWrapper,
    AttributesListingWrapper,
    Auth,
    BarcodeGenerator,
    BarcodeListingWrapper,
    CallListingWrapper,
    CartonBoxListingWrapper,
    ChannelCategoryListingWrapper,
    ChannelGroupListingWrapper,
    ChannelManagementListingWrapper,
    CompetitorManagementListingWrapper,
    ConfigurationCompanyListingWrapper,
    // AddTaxesWrapper,
    // TaxesListingWrapper,
    // ConfigurationLayout,
    DashboardWrappper,
    DealerActivityTabWrapper,
    DealerGeneralInformationTabWrapper,
    DealerListLedgerTabWrapper,
    DealerOrderLedgerListTabWrapper,
    DealerSalesOrderTabWrapper,
    DealerWarehouseTabWrapper,
    DealersCategoryListingWrapper,
    DealersListingWrapper,
    DidManagementListingWrapper,
    DispositionComplaintListingWrapper,
    DispositionOneListingWrapper,
    DispositionThreeListingWrapper,
    DispositionTwoListingWrapper,
    EditASRWrapper,
    EditArtistWrapper,
    EditAssetsCategoryWrapper,
    EditAssetsLocatonWrapper,
    EditAssetsRequestwrapper,
    EditAttributeGroupWrapper,
    EditAttributeWrapper,
    EditCartonBoxWrapper,
    EditChannelCategoryWrapper,
    EditChannelGroupWrapper,
    EditChannelManagementWrapper,
    EditCompanyWrapper,
    EditCompetitorWraper,
    // ApprovedOrderListing,
    // ApprovedOrderViewWrapper,
    EditDealerSchemeWrapper,
    EditDealerWarehouseWrapper,
    EditDealerWrapper,
    EditDealersCategoryWrapper,
    EditDidManagementWrapper,
    EditDispositionComplaintWrappper,
    EditDispositionOneWrappper,
    EditDispositionThreeWrapper,
    EditDispositionTwoWrapper,
    EditInitialCallOneWrapper,
    EditInitialCallThreeWrapper,
    EditInitialCallTwoWrapper,
    // EditInventoryManagementWrapper,
    EditItemWrapper,
    EditLanguageWrapper,
    EditProductCategoryWrapper,
    EditProductGroupWrapper,
    EditProductSubCategoryWrapper,
    EditProductWrapper,
    EditPurchaseOrderWrapper,
    EditSaleOrderWrapper,
    EditSchemeWrapper,
    EditSlotManagementWrapper,
    EditTapeManagementWrapper,
    EditUserWrapper,
    // EditVendorWarehouseWrapper,
    EditVendorWrapper,
    EditWarehouseWrapper,
    EditWebsiteBlogWrapper,
    EditWebsitePageWrapper,
    EditWebsiteTagWrapper,
    EditWebsiteWrapper,
    GRNListingWrapper,
    InfluencerListingWrapper,
    InitialCallOneListingWrapper,
    InitialCallThreeListingWrapper,
    InitialCallTwoListingWrapper,
    InquiryListingWrapper,
    InquiryViewWrapper,
    InventoryListingWrapper,
    // InventoryManagementListingWrapper,
    InwardInventoryWrapper,
    ItemListingWrapper,
    LanguageListingWrapper,
    ListDealerPincodeTabWrapper,
    ListDealerSchemeTabWrapper,
    ListWebstieBlogWrapper,
    Locations,
    Order,
    OrderViewWrapper,
    OrganisationHierarchy,
    PageNotFound,
    ProductCategoryListingWrapper,
    ProductGroupListingWrapper,
    ProductSubCategoryListingWrapper,
    ProductsListingWrapper,
    ProfileWrappper,
    PurchaseOrderListingWrapper,
    SaleOrderListingWrapper,
    SchemeListingWrapper,
    SlotManagementListingWrapper,
    TapeManagementListingWrapper,
    // ListDealerSupervisorTabWrapper,
    // DealerSupervisorTabWrapper,
    UserAccessWrapper,
    UsersListingWrapper,
    VendorActivityTabWrapper,
    VendorGeneralInformationTabWrapper,
    VendorListLedgerTabWrapper,
    VendorPurchaseOrderTabWrapper,
    // VendorWarehouseTabWrapper,
    VendorsListingWrapper,
    ViewBarcodeWrapper,
    ViewDealer,
    ViewDispositionThreeWrappper,
    ViewInitialCallThreeWrappper,
    ViewPurchaseOrderWrapper,
    ViewVendor,
    ViewWarehouseWrapper,
    ViewWebsitePageWrapper,
    ViewWebsiteTagsWrapper,
    WarehousesListingWrapper,
    WebsiteBlogViewWrapper,
    WebsitePageListingWrapper,
    WebsiteTagListingWrapper,
    WebstieListingWrapper,
} from './pages/index'
import InwardsTabs from './pages/warehouses/view/inventories/inward'
import InwardCompanyTabsListingWrapper from './pages/warehouses/view/inventories/inward/Company/InwardCompanyTabsListingWrapper'
import InwardCustomerTabsListingWrapper from './pages/warehouses/view/inventories/inward/Customer/InwardCustomerTabsListingWrapper'
import InwardDealerTabsListingWrapper from './pages/warehouses/view/inventories/inward/Dealer/InwardDealerTabsListingWrapper'
import InwardEcomTabsListingWrapper from './pages/warehouses/view/inventories/inward/Ecom/InwardEcomTabsListingWrapper'
import InwardReplacementTabsListingWrapper from './pages/warehouses/view/inventories/inward/Replacement/InwardReplacementTabsListingWrapper'
import InwardSampleTabsListingWrapper from './pages/warehouses/view/inventories/inward/Sample/InwardSampleTabsListingWrapper'
import InwardWarehouseTabsListingWrapper from './pages/warehouses/view/inventories/inward/Warehouse/InwardWarehouseTabsListingWrapper'
import OutwardTabs from './pages/warehouses/view/inventories/outward'
import OutwardWarehouseToComapnyListingWrapper from './pages/warehouses/view/inventories/outward/Company/list/OutwardWarehouseToComapnyListingWrapper'
import OutwardCustomerTabsListingWrapper from './pages/warehouses/view/inventories/outward/Customer/OutwardCustomerTabsListingWrapper'
import OutwardDealerTabsListingWrapper from './pages/warehouses/view/inventories/outward/Dealer/OutwardDealerTabsListingWrapper'
import DispatchedInvoice from './pages/saleOrder/list/components/DispatchedInvoiceWrapper'
import OutwardEcomTabsListingWrapper from './pages/warehouses/view/inventories/outward/Ecom/OutwardEcomTabsListingWrapper'
import OutwardReplacementTabsListingWrapper from './pages/warehouses/view/inventories/outward/Replacement/OutwardReplacementTabsListingWrapper'
import OutwardRTVTabsListingWrapper from './pages/warehouses/view/inventories/outward/Rtv/list/OutwardRTVTabsListingWrapper'
import OutwardSampleTabsListingWrapper from './pages/warehouses/view/inventories/outward/Sample/OutwardSampleTabsListingWrapper'
import OutwardWarehouseTransferListingWrapper from './pages/warehouses/view/inventories/outward/Warehouse/list/OutwardWarehouseTransferListingWrapper'
import InventorisTabsLayout from './pages/warehouses/view/inventories/tabs'
import ViewSlot from './pages/media/slotManagement'
import SlotRunViewsListingWrapper from './pages/media/slotManagement/slotRunView/SlotRunViewsListingWrapper'
import AddRTVendorWrapper from './pages/returnToVendor/add/AddRTVendorWrapper'
import EditRTVendorWrapper from './pages/returnToVendor/edit/EditRTVendorWrapper'
import RTVListingWrapper from './pages/returnToVendor/list/RTVListingWrapper'
import AddWarehouseTransferWrapper from './pages/transferToWarehouse/add/AddWarehouseTransferWrapper'
import EditWarehouseTransferWrapper from './pages/transferToWarehouse/edit/EditWarehouseTransferWrapper'
import WarehouseTransferListingWrapper from './pages/transferToWarehouse/list/WarehouseTransferListingWrapper'
import AddWarehouseToComapnyTransferWrapper from './pages/warehouseToCompany/add/AddWarehouseToComapnyTransferWrapper'
import EditWarehouseToComapnyWrapper from './pages/warehouseToCompany/edit/EditWarehouseToComapnyWrapper'
import WarehouseToComapnyListingWrapper from './pages/warehouseToCompany/list/WarehouseToComapnyListingWrapper'
import {
    setAccessToken,
    setDeviceId,
    setRefreshToken,
    setUserData,
} from './redux/slices/authSlice'
import WarehouseToSampleListingWrapper from './pages/warehouseToSample/list/WarehouseToSampleListingWrapper'
import AddWarehouseToSampleWrapper from './pages/warehouseToSample/add/AddWarehouseToSampleWrapper'
import EditWarehouseToSampleWrapper from './pages/warehouseToSample/edit/EditWarehouseToSampleWrapper'
import VendorRtvListingWrapper from './pages/vendors/view/tabs/ReturnToVendorTab/list/VendorRtvListingWrapper'
import InventoryFlowListingWrapper from './pages/inventoryFlow/list/InventoryFlowListingWrapper'
import CallCenterMasterListingWrapper from './pages/configuration/ConfigurationScreens/callcenterMaster/list/CallCenterMasterListingWrapper'
import AddCallCenterMasterWrapper from './pages/configuration/ConfigurationScreens/callcenterMaster/add/AddCallCenterMasterWrapper'
import EditCallCenterMasterWrapper from './pages/configuration/ConfigurationScreens/callcenterMaster/edit/EditCallCenterMasterWrapper'
import CustomerPageWrapper from './pages/media/callerpage/CustomerPageWrapper'
import VenderInvoice from './pages/saleOrder/VenderInvoice'
import CustomerComplainWrapper from './pages/CustomerComplain/CustomerComplainWrapper'
import NdrDispositionListingWrapper from './pages/disposition/ndrDisposition/list/NdrDispositionListingWrapper'
import AddNdrDispositionWrapper from './pages/disposition/ndrDisposition/add/AddNdrDispositionWrapper'
import EditNdrDispositionWrapper from './pages/disposition/ndrDisposition/edit/EditNdrDispositionWrapper'
import WelcomePage from './pages/welcome/WelcomePage'

const PageRoutes = () => {
    const deviceId = localStorage.getItem('device-id') || ''
    if (deviceId === '') {
        const uniqueId = uuidv4()
        localStorage.setItem('device-id', uniqueId)
    }
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem('authToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const userDataLs = localStorage.getItem('userData')
    const userData = JSON?.parse(userDataLs as string)
    dispatch(setAccessToken(accessToken))
    dispatch(setRefreshToken(refreshToken))
    dispatch(setDeviceId(deviceId))
    dispatch(setUserData(userData ? userData : null))

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/vender-invoice" element={<VenderInvoice />} />
                    {/* Login */}
                    <Route path="/" element={<Auth />} />
                    {/* Page not found */}
                    <Route path="*" element={<PageNotFound />} />
                    {/* Dashboard */}
                    <Route
                        path="/dashboard"
                        element={
                            <AuthenticationHOC
                                component={<DashboardWrappper />}
                                moduleName={UserModuleNameTypes.dashboard}
                            />
                        }
                    />
                    {/* Profile */}
                    <Route path="/profile" element={<ProfileWrappper />} />

                    {/* Vendor */}
                    <Route
                        path="/vendors"
                        element={
                            <AuthenticationHOC
                                component={<VendorsListingWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                            />
                        }
                    />
                    {/* <Route
                        path="warehouse/so-order/dispatched-invoice"
                        element={
                            <AuthenticationHOC
                                component={<DispatchedInvoice />}
                                moduleName={UserModuleNameTypes.vendor}
                            />
                        }
                    /> */}
                    <Route
                        path="/vendors/add-vendor"
                        element={
                            <AuthenticationHOC
                                component={<AddVendorWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/vendors/edit-vendor/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditVendorWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    {/* vendor view  */}
                    <Route
                        path="/vendors/:vendorId"
                        element={
                            <AuthenticationHOC
                                component={<ViewVendor />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    >
                        <Route
                            path="general-information"
                            element={
                                <AuthenticationHOC
                                    component={
                                        <VendorGeneralInformationTabWrapper />
                                    }
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={
                                        UserModuleTabsTypes.generalInformation
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="purchase-order"
                            element={
                                <AuthenticationHOC
                                    component={
                                        <VendorPurchaseOrderTabWrapper />
                                    }
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={
                                        UserModuleTabsTypes.purchaseOrder
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="purchase-order/add"
                            element={
                                <AuthenticationHOC
                                    component={<AddPurchaseOrderTabWrapper />}
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={
                                        UserModuleAddActionTypes.vendorPoAdd
                                    }
                                    isRedirect
                                />
                            }
                        />
                        {/* <Route
                            path="warehouse"
                            element={
                                <AuthenticationHOC
                                    component={<VendorWarehouseTabWrapper />}
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={
                                        UserModuleTabsTypes.vendoreWarehouse
                                    }
                                    isRedirect
                                />
                            }
                        /> */}
                        {/* <Route
                            path="warehouse/add"
                            element={
                                <AuthenticationHOC
                                    component={<AddVendorWarehouseWrapper />}
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={
                                        UserModuleAddActionTypes.vendorWarehouseAdd
                                    }
                                    isRedirect
                                />
                            }
                        /> */}
                        {/* <Route
                            path="warehouse/:id"
                            element={
                                <AuthenticationHOC
                                    component={<EditVendorWarehouseWrapper />}
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={UserModuleActionTypes.Edit}
                                    isRedirect
                                />
                            }
                        /> */}
                        <Route
                            path="return-to-vendor"
                            element={
                                <AuthenticationHOC
                                    component={<VendorRtvListingWrapper />}
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={
                                        UserModuleTabsTypes.returnToVendor
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="ledger"
                            element={
                                <AuthenticationHOC
                                    component={<VendorListLedgerTabWrapper />}
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={
                                        UserModuleTabsTypes.vendorLedger
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="activities"
                            element={
                                <AuthenticationHOC
                                    component={<VendorActivityTabWrapper />}
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={
                                        UserModuleTabsTypes.vendorActivity
                                    }
                                    isRedirect
                                />
                            }
                        />
                    </Route>

                    {/* Dealer */}
                    <Route
                        path="/dealers"
                        element={
                            <AuthenticationHOC
                                component={<DealersListingWrapper />}
                                moduleName={'DEALER'}
                            />
                        }
                    />
                    <Route
                        path="/dealers/add-dealer"
                        element={
                            <AuthenticationHOC
                                component={<AddDealerWrapper />}
                                moduleName={UserModuleNameTypes.dealer}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/dealers/edit-dealer/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditDealerWrapper />}
                                moduleName={UserModuleNameTypes.dealer}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    {/* dealer view */}
                    <Route
                        path="/dealers/:dealerId"
                        element={
                            <AuthenticationHOC
                                component={<ViewDealer />}
                                moduleName={UserModuleNameTypes.dealer}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    >
                        <Route
                            path="general-information"
                            element={
                                <AuthenticationHOC
                                    component={
                                        <DealerGeneralInformationTabWrapper />
                                    }
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={
                                        UserModuleTabsTypes.generalInformation
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="warehouse"
                            element={
                                <AuthenticationHOC
                                    component={<DealerWarehouseTabWrapper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={
                                        UserModuleTabsTypes.dealerWarehouse
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="warehouse/add-warehouse"
                            element={
                                <AuthenticationHOC
                                    component={<AddDealerWarehouseWarpper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={
                                        UserModuleTabsTypes.dealerWarehouseAdd
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="warehouse/:id"
                            element={
                                <AuthenticationHOC
                                    component={<EditDealerWarehouseWrapper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={UserModuleActionTypes.Edit}
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="sale-order"
                            element={
                                <AuthenticationHOC
                                    component={<DealerSalesOrderTabWrapper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={
                                        UserModuleTabsTypes.dealerSaleOrder
                                    }
                                    isRedirect
                                />
                            }
                        />

                        {/* #######  should add sale order ####### */}

                        <Route
                            path="ledger"
                            element={
                                <AuthenticationHOC
                                    component={<DealerListLedgerTabWrapper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={
                                        UserModuleTabsTypes.dealerLedger
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="order-ledger"
                            element={
                                <AuthenticationHOC
                                    component={
                                        <DealerOrderLedgerListTabWrapper />
                                    }
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={
                                        UserModuleTabsTypes.dealerOrderLedger
                                    }
                                    isRedirect
                                />
                            }
                        />

                        <Route
                            path="activities"
                            element={
                                <AuthenticationHOC
                                    component={<DealerActivityTabWrapper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={
                                        UserModuleTabsTypes.dealerActivity
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="pincode"
                            element={
                                <AuthenticationHOC
                                    component={<ListDealerPincodeTabWrapper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={
                                        UserModuleTabsTypes.dealerPincode
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="pincode/add"
                            element={
                                <AuthenticationHOC
                                    component={<AddDealerPinCodeTabWrapper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={
                                        UserModuleTabsTypes.dealerPincodeAdd
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="scheme"
                            element={
                                <AuthenticationHOC
                                    component={<ListDealerSchemeTabWrapper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={
                                        UserModuleTabsTypes.dealerScheme
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="scheme/add"
                            element={
                                <AuthenticationHOC
                                    component={<AddDealerSchemeTabWrapper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={
                                        UserModuleTabsTypes.dealerSchemeAdd
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="scheme/edit/:schemeId"
                            element={
                                <AuthenticationHOC
                                    component={<EditDealerSchemeWrapper />}
                                    moduleName={UserModuleNameTypes.dealer}
                                    actionName={UserModuleActionTypes.Edit}
                                    isRedirect
                                />
                            }
                        />
                        {/* not use */}
                        {/* <Route
                            path="supervisor"
                            element={<ListDealerSupervisorTabWrapper />}
                        />
                        <Route
                            path="supervisor/add"
                            element={<DealerSupervisorTabWrapper />}
                        /> */}
                    </Route>

                    {/* Dealer-Ratio */}
                    <Route
                        path="/dealers-ratio"
                        element={
                            <AuthenticationHOC
                                component={<DealersRatioListingWrapper />}
                                moduleName={UserModuleNameTypes.dealer}
                            />
                        }
                    />

                    {/* Users */}
                    <Route
                        path="users"
                        element={
                            <AuthenticationHOC
                                component={<UsersListingWrapper />}
                                moduleName={UserModuleNameTypes.user}
                            />
                        }
                    />
                    <Route
                        path="/users/add-user"
                        element={
                            <AuthenticationHOC
                                component={<AddUserWrapper />}
                                moduleName={UserModuleNameTypes.user}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/users/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditUserWrapper />}
                                moduleName={UserModuleNameTypes.user}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Warehouse */}
                    <Route
                        path="/warehouse"
                        element={
                            <AuthenticationHOC
                                component={<WarehousesListingWrapper />}
                                moduleName={UserModuleNameTypes.wareHouse}
                            />
                        }
                    />
                    <Route
                        path="/warehouse/add"
                        element={
                            <AuthenticationHOC
                                component={<AddWarehouseWrapper />}
                                moduleName={UserModuleNameTypes.wareHouse}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/warehouse/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditWarehouseWrapper />}
                                moduleName={UserModuleNameTypes.wareHouse}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    {/* warehouse view */}
                    <Route
                        path="warehouse/view/:id"
                        element={
                            <AuthenticationHOC
                                component={<InventorisTabsLayout />}
                                moduleName={UserModuleNameTypes.wareHouse}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    >
                        <Route
                            path="inventories"
                            element={
                                <AuthenticationHOC
                                    component={<InventoryListingWrapper />}
                                    moduleName={UserModuleNameTypes.wareHouse}
                                    actionName={
                                        UserModuleWarehouseTabsTypes.inventories
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="inventories/inward-inventory/add"
                            element={
                                <AuthenticationHOC
                                    component={<InwardInventoryWrapper />}
                                    moduleName={UserModuleNameTypes.wareHouse}
                                    actionName={
                                        UserModuleAddActionTypes.tabWarehouseInventoryAdd
                                    }
                                    isRedirect
                                />
                            }
                        />

                        <Route
                            path="outward-inventories"
                            element={
                                <AuthenticationHOC
                                    component={<OutwardTabs />}
                                    moduleName={UserModuleNameTypes.wareHouse}
                                    actionName={
                                        UserModuleWarehouseTabsTypes.outwardInventories
                                    }
                                    isRedirect
                                />
                            }
                        >
                            <Route
                                path="dealer"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <OutwardDealerTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.outwardInventoriesDealer
                                        }
                                        isRedirect
                                    />
                                }
                            />
                            <Route
                                path="customer"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <OutwardCustomerTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.outwardInventoriesCustomer
                                        }
                                        isRedirect
                                    />
                                }
                            />
                            <Route
                                path="rtv"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <OutwardRTVTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.outwardInventoriesRTV
                                        }
                                        isRedirect
                                    />
                                }
                            ></Route>

                            <Route
                                path="warehoue"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <OutwardWarehouseTransferListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.outwardInventoriesWareHouse
                                        }
                                        isRedirect
                                    />
                                }
                            />
                            <Route
                                path="sample"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <OutwardSampleTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.outwardInventoriesSample
                                        }
                                        isRedirect
                                    />
                                }
                            />
                            <Route
                                path="ecom"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <OutwardEcomTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.outwardInventoriesECommerce
                                        }
                                        isRedirect
                                    />
                                }
                            />
                            <Route
                                path="replacement"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <OutwardReplacementTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.outwardInventoriesReplaceMents
                                        }
                                        isRedirect
                                    />
                                }
                            />
                            <Route
                                path="company"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <OutwardWarehouseToComapnyListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.outwardInventoriesCompany
                                        }
                                        isRedirect
                                    />
                                }
                            />
                        </Route>
                        <Route
                            path="inward-inventories"
                            element={
                                <AuthenticationHOC
                                    component={<InwardsTabs />}
                                    moduleName={UserModuleNameTypes.wareHouse}
                                    actionName={
                                        UserModuleWarehouseTabsTypes.inwardInventories
                                    }
                                    isRedirect
                                />
                            }
                        >
                            <Route
                                path="dealer"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <InwardDealerTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.inwardInventoriesDealer
                                        }
                                        isRedirect
                                    />
                                }
                            />
                            <Route
                                path="customer"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <InwardCustomerTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.inwardInventoriesCustomer
                                        }
                                        isRedirect
                                    />
                                }
                            />

                            <Route
                                path="warehoue"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <InwardWarehouseTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.inwardInventoriesWareHouse
                                        }
                                        isRedirect
                                    />
                                }
                            />
                            <Route
                                path="sample"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <InwardSampleTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.inwardInventoriesSample
                                        }
                                        isRedirect
                                    />
                                }
                            />
                            <Route
                                path="ecom"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <InwardEcomTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.inwardInventoriesECommerce
                                        }
                                        isRedirect
                                    />
                                }
                            />
                            <Route
                                path="replacement"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <InwardReplacementTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.inwardInventoriesReplaceMents
                                        }
                                        isRedirect
                                    />
                                }
                            />
                            <Route
                                path="company"
                                element={
                                    <AuthenticationHOC
                                        component={
                                            <InwardCompanyTabsListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.wareHouse
                                        }
                                        actionName={
                                            UserModuleWarehouseTabsTypes.inwardInventoriesCompany
                                        }
                                        isRedirect
                                    />
                                }
                            />
                        </Route>

                        <Route
                            path="warehouse-details"
                            element={
                                <AuthenticationHOC
                                    component={<ViewWarehouseWrapper />}
                                    moduleName={UserModuleNameTypes.wareHouse}
                                    actionName={UserModuleActionTypes.View}
                                    isRedirect
                                />
                            }
                        />
                    </Route>

                    {/* Inventory Flow */}
                    <Route
                        path="/inventory-flow"
                        element={
                            <AuthenticationHOC
                                component={<InventoryFlowListingWrapper />}
                                moduleName={UserModuleNameTypes.inventoryFlow}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    {/* Sale Order */}
                    <Route
                        path="/sale-order"
                        element={
                            <AuthenticationHOC
                                component={<SaleOrderListingWrapper />}
                                moduleName={UserModuleNameTypes.saleOrder}
                            />
                        }
                    />
                    <Route
                        path="/sale-order/:id/invoice"
                        element={<DispatchedInvoice />}
                    />
                    <Route
                        path="/sale-order/add-sale-order"
                        element={
                            <AuthenticationHOC
                                component={<AddSaleOrderWrapper />}
                                moduleName={UserModuleNameTypes.saleOrder}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/sale-order/edit-sale-order/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditSaleOrderWrapper />}
                                moduleName={UserModuleNameTypes.saleOrder}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* RETURN TO VENDOR */}
                    <Route
                        path="/return-to-vendor"
                        element={
                            <AuthenticationHOC
                                component={<RTVListingWrapper />}
                                moduleName={UserModuleNameTypes.rtvTransfer}
                            />
                        }
                    />
                    <Route
                        path="/return-to-vendor/add"
                        element={
                            <AuthenticationHOC
                                component={<AddRTVendorWrapper />}
                                moduleName={UserModuleNameTypes.rtvTransfer}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/return-to-vendor/edit/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditRTVendorWrapper />}
                                moduleName={UserModuleNameTypes.rtvTransfer}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Warehouse To Warehouse Transfer */}
                    <Route
                        path="/warehouse-transfer"
                        element={
                            <AuthenticationHOC
                                component={<WarehouseTransferListingWrapper />}
                                moduleName={UserModuleNameTypes.wtsTransfer}
                            />
                        }
                    ></Route>
                    <Route
                        path="warehouse-transfer/add"
                        element={
                            <AuthenticationHOC
                                component={<AddWarehouseTransferWrapper />}
                                moduleName={UserModuleNameTypes.wtsTransfer}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="warehouse-transfer/edit/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditWarehouseTransferWrapper />}
                                moduleName={UserModuleNameTypes.wtsTransfer}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Warehouse To Company Warehouse Transfer */}
                    <Route
                        path="/warehouse-to-company"
                        element={
                            <AuthenticationHOC
                                component={<WarehouseToComapnyListingWrapper />}
                                moduleName={
                                    UserModuleNameTypes.warehouseToCompanyTransfer
                                }
                            />
                        }
                    ></Route>
                    <Route
                        path="warehouse-to-company/add"
                        element={
                            <AuthenticationHOC
                                component={
                                    <AddWarehouseToComapnyTransferWrapper />
                                }
                                moduleName={
                                    UserModuleNameTypes.warehouseToCompanyTransfer
                                }
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="warehouse-to-company/edit/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditWarehouseToComapnyWrapper />}
                                moduleName={
                                    UserModuleNameTypes.warehouseToCompanyTransfer
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* WAREHOUSE TO SAMPLE Transfer */}
                    <Route
                        path="/warehouse-to-sample"
                        element={
                            <AuthenticationHOC
                                component={<WarehouseToSampleListingWrapper />}
                                moduleName={
                                    UserModuleNameTypes.warehouseToSampleTransfer
                                }
                            />
                        }
                    />
                    <Route
                        path="/warehouse-to-sample/add"
                        element={
                            <AuthenticationHOC
                                component={<AddWarehouseToSampleWrapper />}
                                moduleName={
                                    UserModuleNameTypes.warehouseToSampleTransfer
                                }
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/warehouse-to-sample/edit/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditWarehouseToSampleWrapper />}
                                moduleName={
                                    UserModuleNameTypes.warehouseToSampleTransfer
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* ASR */}
                    <Route
                        path="/asr"
                        element={
                            <AuthenticationHOC
                                component={<ASRListingWrapper />}
                                moduleName={UserModuleNameTypes.asr}
                            />
                        }
                    />
                    <Route
                        path="/asr/add"
                        element={
                            <AuthenticationHOC
                                component={<AddASRWrapper />}
                                moduleName={UserModuleNameTypes.asr}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/asr/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditASRWrapper />}
                                moduleName={UserModuleNameTypes.asr}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Purchase Order */}
                    <Route
                        path="/purchase-order"
                        element={
                            <AuthenticationHOC
                                component={<PurchaseOrderListingWrapper />}
                                moduleName={UserModuleNameTypes.purchaseOrder}
                            />
                        }
                    />
                    <Route
                        path="/purchase-order/add"
                        element={
                            <AuthenticationHOC
                                component={<AddPurchaseOrderWrapper />}
                                moduleName={UserModuleNameTypes.purchaseOrder}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/purchase-order/view/:id"
                        element={
                            <AuthenticationHOC
                                component={<ViewPurchaseOrderWrapper />}
                                moduleName={UserModuleNameTypes.purchaseOrder}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/purchase-order/edit/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditPurchaseOrderWrapper />}
                                moduleName={UserModuleNameTypes.purchaseOrder}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* GRN */}
                    <Route
                        path="/grn"
                        element={
                            <AuthenticationHOC
                                component={<GRNListingWrapper />}
                                moduleName={UserModuleNameTypes.grn}
                            />
                        }
                    />

                    <Route
                        path="/grn/add"
                        element={
                            <AuthenticationHOC
                                component={<AddGRNWrapper />}
                                moduleName={UserModuleNameTypes.purchaseOrder}
                                actionName={UserModuleActionTypes.genrateGrn}
                                isRedirect
                            />
                        }
                    />

                    {/* Inquiry */}
                    <Route
                        path="/inquiry"
                        element={
                            <AuthenticationHOC
                                component={<InquiryListingWrapper />}
                                moduleName={UserModuleNameTypes.inquiry}
                            />
                        }
                    />

                    <Route
                        path="/inquiry/view/:id"
                        element={
                            <AuthenticationHOC
                                component={<InquiryViewWrapper />}
                                moduleName={UserModuleNameTypes.inquiry}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    {/* Orders */}
                    <Route
                        path="/orders"
                        element={
                            <AuthenticationHOC
                                component={<Order />}
                                moduleName={UserModuleNameTypes.order}
                            />
                        }
                    ></Route>
                    <Route
                        path="/orders/view/:id"
                        element={<OrderViewWrapper />}
                    />

                    {/* Call */}
                    <Route
                        path="/call"
                        element={
                            <AuthenticationHOC
                                component={<CallListingWrapper />}
                                moduleName={UserModuleNameTypes.callerPage}
                                actionName={UserModuleActionTypes.List}
                                isRedirect
                            />
                        }
                    />

                    {/* CONFIGURATIONS
                    <Route
                        path="/configurations"
                        element={<ConfigurationLayout />}
                    /> */}

                    {/* Configurations -> Attributes */}
                    <Route
                        path="/configurations/attributes"
                        element={
                            <AuthenticationHOC
                                component={<AttributesListingWrapper />}
                                moduleName={UserModuleNameTypes.attribute}
                            />
                        }
                    />
                    <Route
                        path="/configurations/attributes/add"
                        element={
                            <AuthenticationHOC
                                component={<AddAttributeWrapper />}
                                moduleName={UserModuleNameTypes.attribute}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/attributes/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditAttributeWrapper />}
                                moduleName={UserModuleNameTypes.attribute}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    {/* Configurations -> Attributes Group */}
                    <Route
                        path="/configurations/attributes-group"
                        element={
                            <AuthenticationHOC
                                component={<AttributesGroupListingWrapper />}
                                moduleName={UserModuleNameTypes.attributeGroup}
                            />
                        }
                    />

                    <Route
                        path="/configurations/attributes-group/add"
                        element={
                            <AuthenticationHOC
                                component={<AddAttributeGroupWrapper />}
                                moduleName={UserModuleNameTypes.attributeGroup}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/attributes-group/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditAttributeGroupWrapper />}
                                moduleName={UserModuleNameTypes.attributeGroup}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Product Category */}
                    <Route
                        path="/configurations/product-category"
                        element={
                            <AuthenticationHOC
                                component={<ProductCategoryListingWrapper />}
                                moduleName={UserModuleNameTypes.productCategory}
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-category/add"
                        element={
                            <AuthenticationHOC
                                component={<AddProductCategoryWrapper />}
                                moduleName={UserModuleNameTypes.productCategory}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-category/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditProductCategoryWrapper />}
                                moduleName={UserModuleNameTypes.productCategory}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Product Sub Category */}
                    <Route
                        path="/configurations/product-sub-category"
                        element={
                            <AuthenticationHOC
                                component={<ProductSubCategoryListingWrapper />}
                                moduleName={
                                    UserModuleNameTypes.productSubCategory
                                }
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-sub-category/add"
                        element={
                            <AuthenticationHOC
                                component={<AddProductSubCategoryWrapper />}
                                moduleName={
                                    UserModuleNameTypes.productSubCategory
                                }
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-sub-category/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditProductSubCategoryWrapper />}
                                moduleName={
                                    UserModuleNameTypes.productSubCategory
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Product Group */}
                    <Route
                        path="/configurations/product-group"
                        element={
                            <AuthenticationHOC
                                component={<ProductGroupListingWrapper />}
                                moduleName={UserModuleNameTypes.productGroup}
                            />
                        }
                    />

                    <Route
                        path="/configurations/product-group/add"
                        element={
                            <AuthenticationHOC
                                component={<AddProductGroupWrapper />}
                                moduleName={UserModuleNameTypes.productGroup}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/product-group/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditProductGroupWrapper />}
                                moduleName={UserModuleNameTypes.productGroup}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Scheme */}
                    <Route
                        path="/configurations/scheme"
                        element={
                            <AuthenticationHOC
                                component={<SchemeListingWrapper />}
                                moduleName={UserModuleNameTypes.scheme}
                            />
                        }
                    />
                    <Route
                        path="/configurations/scheme/add"
                        element={
                            <AuthenticationHOC
                                component={<AddSchemeWrapper />}
                                moduleName={UserModuleNameTypes.scheme}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/scheme/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditSchemeWrapper />}
                                moduleName={UserModuleNameTypes.scheme}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Item */}
                    <Route
                        path="/configurations/item"
                        element={
                            <AuthenticationHOC
                                component={<ItemListingWrapper />}
                                moduleName={UserModuleNameTypes.item}
                            />
                        }
                    />
                    <Route
                        path="/configurations/item/add"
                        element={
                            <AuthenticationHOC
                                component={<AddItemWrapper />}
                                moduleName={UserModuleNameTypes.item}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/item/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditItemWrapper />}
                                moduleName={UserModuleNameTypes.attributeGroup}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Products */}
                    <Route
                        path="/configurations/products"
                        element={
                            <AuthenticationHOC
                                component={<ProductsListingWrapper />}
                                moduleName={UserModuleNameTypes.product}
                            />
                        }
                    />

                    <Route
                        path="/configurations/products/add"
                        element={
                            <AuthenticationHOC
                                component={<AddProductWrapper />}
                                moduleName={UserModuleNameTypes.product}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/product/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditProductWrapper />}
                                moduleName={UserModuleNameTypes.product}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Carton Box */}
                    <Route
                        path="/configurations/carton-box"
                        element={
                            <AuthenticationHOC
                                component={<CartonBoxListingWrapper />}
                                moduleName={UserModuleNameTypes.cartonBox}
                            />
                        }
                    />
                    <Route
                        path="/configurations/carton-box/add"
                        element={
                            <AuthenticationHOC
                                component={<AddCartonBoxWrapper />}
                                moduleName={UserModuleNameTypes.cartonBox}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/carton-box/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditCartonBoxWrapper />}
                                moduleName={UserModuleNameTypes.cartonBox}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Company */}
                    <Route
                        path="/configurations/company"
                        element={
                            <AuthenticationHOC
                                component={
                                    <ConfigurationCompanyListingWrapper />
                                }
                                moduleName={UserModuleNameTypes.company}
                            />
                        }
                    />
                    <Route
                        path="/configurations/company/add"
                        element={
                            <AuthenticationHOC
                                component={<AddCompanyWrapper />}
                                moduleName={UserModuleNameTypes.company}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/company/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditCompanyWrapper />}
                                moduleName={UserModuleNameTypes.company}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> CompanyBranch */}
                    <Route
                        path="/configurations/company-branch"
                        element={
                            <AuthenticationHOC
                                component={<CompanyBranchListingWrapper />}
                                moduleName={UserModuleNameTypes.companyBranch}
                            />
                        }
                    />
                    <Route
                        path="/configurations/company-branch/add"
                        element={
                            <AuthenticationHOC
                                component={<AddCompanyBranchWrapper />}
                                moduleName={UserModuleNameTypes.companyBranch}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/company-branch/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditCompanyBranchWrapper />}
                                moduleName={UserModuleNameTypes.companyBranch}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Barcode */}
                    <Route
                        path="/configurations/barcode"
                        element={
                            <AuthenticationHOC
                                component={<BarcodeListingWrapper />}
                                moduleName={UserModuleNameTypes.barcode}
                            />
                        }
                    />
                    <Route
                        path="/configurations/barcode/add"
                        element={
                            <AuthenticationHOC
                                component={<AddBarcodeWrapper />}
                                moduleName={UserModuleNameTypes.barcode}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/barcode/carton-box-items/:cartonboxcode"
                        element={
                            <AuthenticationHOC
                                component={<ViewBarcodeWrapper />}
                                moduleName={UserModuleNameTypes.barcode}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/barcode/carton-box/add"
                        element={
                            <AuthenticationHOC
                                component={<AddCbBarcodeWrapper />}
                                moduleName={UserModuleNameTypes.barcode}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/configurations/barcode/:barcodeId"
                        element={
                            <AuthenticationHOC
                                component={<ViewBarcodeWrapper />}
                                moduleName={UserModuleNameTypes.barcode}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Location */}
                    <Route
                        path="/configurations/location"
                        element={<Locations />}
                    />

                    {/* Configurations -> Language */}
                    <Route
                        path="/configurations/language"
                        element={
                            <AuthenticationHOC
                                component={<LanguageListingWrapper />}
                                moduleName={UserModuleNameTypes.language}
                            />
                        }
                    />
                    <Route
                        path="/configurations/language/add"
                        element={
                            <AuthenticationHOC
                                component={<AddLanguageWrapper />}
                                moduleName={UserModuleNameTypes.language}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/language/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditLanguageWrapper />}
                                moduleName={UserModuleNameTypes.language}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Dealers Category */}
                    <Route
                        path="/configurations/dealers-category"
                        element={
                            <AuthenticationHOC
                                component={<DealersCategoryListingWrapper />}
                                moduleName={UserModuleNameTypes.dealerCategory}
                            />
                        }
                    />
                    <Route
                        path="/configurations/dealers-category/add"
                        element={
                            <AuthenticationHOC
                                component={<AddDealersCategoryWrapper />}
                                moduleName={UserModuleNameTypes.dealerCategory}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/dealers-category/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditDealersCategoryWrapper />}
                                moduleName={UserModuleNameTypes.dealerCategory}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    {/* Configurations -> call center master */}
                    <Route
                        path="/configurations/callcenter-master"
                        element={
                            <AuthenticationHOC
                                component={<CallCenterMasterListingWrapper />}
                                moduleName={
                                    UserModuleNameTypes.callCenterMaster
                                }
                            />
                        }
                    />
                    <Route
                        path="/configurations/callcenter-master/add"
                        element={
                            <AuthenticationHOC
                                component={<AddCallCenterMasterWrapper />}
                                moduleName={
                                    UserModuleNameTypes.callCenterMaster
                                }
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/configurations/callcenter-master/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditCallCenterMasterWrapper />}
                                moduleName={
                                    UserModuleNameTypes.callCenterMaster
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Configurations -> Hierarchy */}
                    <Route
                        path="configurations/hierarchy"
                        element={<OrganisationHierarchy />}
                    />

                    {/* Media -> Channel Group */}
                    <Route
                        path="media/channel-group"
                        element={
                            <AuthenticationHOC
                                component={<ChannelGroupListingWrapper />}
                                moduleName={UserModuleNameTypes.channelGroup}
                            />
                        }
                    />
                    <Route
                        path="media/channel-group/add"
                        element={
                            <AuthenticationHOC
                                component={<AddChannelGroupWrapper />}
                                moduleName={UserModuleNameTypes.channelGroup}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/channel-group/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditChannelGroupWrapper />}
                                moduleName={UserModuleNameTypes.channelGroup}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Media -> Channel Category */}
                    <Route
                        path="media/channel-category"
                        element={
                            <AuthenticationHOC
                                component={<ChannelCategoryListingWrapper />}
                                moduleName={UserModuleNameTypes.channelCategory}
                            />
                        }
                    />
                    <Route
                        path="media/channel-category/add"
                        element={
                            <AuthenticationHOC
                                component={<AddChannelCategoryWrapper />}
                                moduleName={UserModuleNameTypes.channelCategory}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/channel-category/edit/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditChannelCategoryWrapper />}
                                moduleName={UserModuleNameTypes.channelCategory}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Media -> Channel */}
                    <Route
                        path="media/channel"
                        element={
                            <AuthenticationHOC
                                component={<ChannelManagementListingWrapper />}
                                moduleName={
                                    UserModuleNameTypes.channelManagement
                                }
                            />
                        }
                    />
                    <Route
                        path="media/channel/add"
                        element={
                            <AuthenticationHOC
                                component={<AddChannelManagementWrapper />}
                                moduleName={
                                    UserModuleNameTypes.channelManagement
                                }
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/channel/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditChannelManagementWrapper />}
                                moduleName={
                                    UserModuleNameTypes.channelManagement
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Media -> Did Management */}
                    <Route
                        path="media/did"
                        element={
                            <AuthenticationHOC
                                component={<DidManagementListingWrapper />}
                                moduleName={UserModuleNameTypes.didManagement}
                            />
                        }
                    />
                    <Route
                        path="media/did/add"
                        element={
                            <AuthenticationHOC
                                component={<AddDidManagementWrapper />}
                                moduleName={UserModuleNameTypes.didManagement}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/did/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditDidManagementWrapper />}
                                moduleName={UserModuleNameTypes.didManagement}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Media -> Artist */}
                    <Route
                        path="media/artist"
                        element={
                            <AuthenticationHOC
                                component={<ArtistListingWrapper />}
                                moduleName={UserModuleNameTypes.artist}
                                actionName={UserModuleActionTypes.List}
                            />
                        }
                    />
                    <Route
                        path="media/artist/add"
                        element={
                            <AuthenticationHOC
                                component={<AddArtistWrapper />}
                                moduleName={UserModuleNameTypes.artist}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/artist/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditArtistWrapper />}
                                moduleName={UserModuleNameTypes.artist}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Media -> Tap Management */}

                    <Route
                        path="media/tape"
                        element={
                            <AuthenticationHOC
                                component={<TapeManagementListingWrapper />}
                                moduleName={UserModuleNameTypes.tapeManangement}
                            />
                        }
                    />
                    <Route
                        path="media/tape/add"
                        element={
                            <AuthenticationHOC
                                component={<AddTapeManagementWrapper />}
                                moduleName={UserModuleNameTypes.tapeManangement}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/tape/edit/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditTapeManagementWrapper />}
                                moduleName={UserModuleNameTypes.tapeManangement}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Media -> Competitor */}
                    <Route
                        path="media/competitor"
                        element={
                            <AuthenticationHOC
                                component={
                                    <CompetitorManagementListingWrapper />
                                }
                                moduleName={UserModuleNameTypes.competitor}
                            />
                        }
                    />
                    <Route
                        path="media/competitor/add"
                        element={
                            <AuthenticationHOC
                                component={<AddCompetitorWrapper />}
                                moduleName={UserModuleNameTypes.competitor}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="media/competitor/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditCompetitorWraper />}
                                moduleName={UserModuleNameTypes.competitor}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Media -> Slot */}
                    {/* Orders */}
                    <Route
                        path="media/slot"
                        element={
                            // <AuthenticationHOC
                            //     component={
                            <ViewSlot />
                            // }
                            //     moduleName={UserModuleNameTypes.slotManagement}
                            // />
                        }
                    >
                        <Route
                            index
                            element={<SlotManagementListingWrapper />}
                        />
                        <Route
                            path="add"
                            element={
                                <AuthenticationHOC
                                    component={<AddSlotManagementWrapper />}
                                    moduleName={
                                        UserModuleNameTypes.slotManagement
                                    }
                                    actionName={UserModuleActionTypes.Add}
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="edit/:id"
                            element={
                                <AuthenticationHOC
                                    component={<EditSlotManagementWrapper />}
                                    moduleName={
                                        UserModuleNameTypes.slotManagement
                                    }
                                    actionName={UserModuleActionTypes.Edit}
                                    isRedirect
                                />
                            }
                        />
                        <Route path="view/:id" element={<OrderViewWrapper />} />
                        <Route
                            path="run-slots"
                            element={<SlotRunViewsListingWrapper />}
                        />
                        {/* <Route
                            path="approved-orders"
                            element={<ApprovedOrderListing />}
                        /> */}
                    </Route>
                    {/* <Route
                        path="media/slot"
                        element={
                            <AuthenticationHOC
                                component={<SlotManagementListingWrapper />}
                                moduleName={UserModuleNameTypes.slotManagement}
                            />
                        }
                    /> */}
                    {/* <Route
                        path="media/slot/add"
                        element={
                            <AuthenticationHOC
                                component={<AddSlotManagementWrapper />}
                                moduleName={UserModuleNameTypes.slotManagement}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    /> */}

                    {/* Media -> Inbound Or Caller Page */}
                    <Route
                        path="media/caller-page"
                        element={<CallerPageWrapper />}
                    />
                    <Route
                        path="media/customer-page"
                        element={<CustomerPageWrapper />}
                    />

                    {/* Assets -> Assets Management */}
                    <Route
                        path="assets/assets-management"
                        element={
                            <AuthenticationHOC
                                component={<AssetsRequestWrapper />}
                                moduleName={UserModuleNameTypes.assetRequest}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-management/add"
                        element={
                            <AuthenticationHOC
                                component={<AddAssetsRequestWrapper />}
                                moduleName={UserModuleNameTypes.assetRequest}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="assets/assets-management/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditAssetsRequestwrapper />}
                                moduleName={UserModuleNameTypes.assetRequest}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Assets -> Assets Category */}
                    <Route
                        path="/assets/assets-category"
                        element={
                            <AuthenticationHOC
                                component={<AssetsCategoryWrapper />}
                                moduleName={UserModuleNameTypes.assetCategory}
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-category/add"
                        element={
                            <AuthenticationHOC
                                component={<AddAssetsCategoryWrapper />}
                                moduleName={UserModuleNameTypes.assetCategory}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-category/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditAssetsCategoryWrapper />}
                                moduleName={UserModuleNameTypes.assetCategory}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Assets -> Assets Location */}
                    <Route
                        path="/assets/assets-location"
                        element={
                            <AuthenticationHOC
                                component={<AssetsLocationWrapper />}
                                moduleName={UserModuleNameTypes.assetLocation}
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-location/add"
                        element={
                            <AuthenticationHOC
                                component={<AddAssetsLocationWrapper />}
                                moduleName={UserModuleNameTypes.assetLocation}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-location/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditAssetsLocatonWrapper />}
                                moduleName={UserModuleNameTypes.assetLocation}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Assets -> Assets Relocation */}
                    <Route
                        path="assets/assets-relocation"
                        element={
                            <AuthenticationHOC
                                component={<AssetsRelocationWrapper />}
                                moduleName={UserModuleNameTypes.assetRelocation}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-relocation/add"
                        element={
                            <AuthenticationHOC
                                component={<AddAssetsRelocationWrapper />}
                                moduleName={UserModuleNameTypes.assetRelocation}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    {/* Assets -> Assets Allocation */}
                    <Route
                        path="assets/assets-allocation"
                        element={
                            <AuthenticationHOC
                                component={<AssetsAllocationWrapper />}
                                moduleName={UserModuleNameTypes.assetAllocation}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-allocation/add"
                        element={
                            <AuthenticationHOC
                                component={<AddAssetsAllocationWrapper />}
                                moduleName={UserModuleNameTypes.assetAllocation}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    {/* Customer Complain */}
                    <Route
                        path="/customer-complain"
                        element={<CustomerComplainWrapper />}
                    />

                    {/* Dispositions -> Disposition One */}
                    <Route
                        path="dispositions/disposition-one"
                        element={
                            <AuthenticationHOC
                                component={<DispositionOneListingWrapper />}
                                moduleName={UserModuleNameTypes.dispositionOne}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-one/add"
                        element={
                            <AuthenticationHOC
                                component={<AddDispositionOneWrappper />}
                                moduleName={UserModuleNameTypes.dispositionOne}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-one/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditDispositionOneWrappper />}
                                moduleName={UserModuleNameTypes.dispositionOne}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Dispositions -> Disposition Two */}
                    <Route
                        path="dispositions/disposition-two"
                        element={
                            <AuthenticationHOC
                                component={<DispositionTwoListingWrapper />}
                                moduleName={UserModuleNameTypes.dispositionTwo}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-two/add"
                        element={
                            <AuthenticationHOC
                                component={<AddDispositionTwoWrapper />}
                                moduleName={UserModuleNameTypes.dispositionTwo}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-two/edit/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditDispositionTwoWrapper />}
                                moduleName={UserModuleNameTypes.dispositionTwo}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Dispositions -> Disposition Three */}
                    <Route
                        path="dispositions/disposition-three"
                        element={
                            <AuthenticationHOC
                                component={<DispositionThreeListingWrapper />}
                                moduleName={
                                    UserModuleNameTypes.dispositionThree
                                }
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-three/add"
                        element={
                            <AuthenticationHOC
                                component={<AddDispositionThreeWrappper />}
                                moduleName={
                                    UserModuleNameTypes.dispositionThree
                                }
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-three/edit/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditDispositionThreeWrapper />}
                                moduleName={
                                    UserModuleNameTypes.dispositionThree
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-three/:id"
                        element={
                            <AuthenticationHOC
                                component={<ViewDispositionThreeWrappper />}
                                moduleName={
                                    UserModuleNameTypes.dispositionThree
                                }
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    {/* Dispositions -> Initialcall One */}
                    <Route
                        path="dispositions/initialcall-one"
                        element={
                            <AuthenticationHOC
                                component={<InitialCallOneListingWrapper />}
                                moduleName={
                                    UserModuleNameTypes.initialCallerOne
                                }
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-one/add"
                        element={
                            <AuthenticationHOC
                                component={<AddInitialCallOneWrapper />}
                                moduleName={
                                    UserModuleNameTypes.initialCallerOne
                                }
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-one/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditInitialCallOneWrapper />}
                                moduleName={
                                    UserModuleNameTypes.initialCallerOne
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Dispositions -> Initialcall Two */}
                    <Route
                        path="dispositions/initialcall-two"
                        element={
                            <AuthenticationHOC
                                component={<InitialCallTwoListingWrapper />}
                                moduleName={
                                    UserModuleNameTypes.initialCallerTwo
                                }
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-two/add"
                        element={
                            <AuthenticationHOC
                                component={<AddInitialCallTwoWrapper />}
                                moduleName={
                                    UserModuleNameTypes.initialCallerTwo
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-two/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditInitialCallTwoWrapper />}
                                moduleName={
                                    UserModuleNameTypes.initialCallerTwo
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* Dispositions -> Initialcall Three */}
                    <Route
                        path="dispositions/initialcall-three"
                        element={
                            <AuthenticationHOC
                                component={<InitialCallThreeListingWrapper />}
                                moduleName={
                                    UserModuleNameTypes.initialCallerThree
                                }
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-three/add"
                        element={
                            <AuthenticationHOC
                                component={<AddInitialCallThreeWrappper />}
                                moduleName={
                                    UserModuleNameTypes.initialCallerThree
                                }
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-three/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditInitialCallThreeWrapper />}
                                moduleName={
                                    UserModuleNameTypes.initialCallerThree
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-three/view/:id"
                        element={
                            <AuthenticationHOC
                                component={<ViewInitialCallThreeWrappper />}
                                moduleName={
                                    UserModuleNameTypes.initialCallerThree
                                }
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    {/* Dispositions -> Disposition Complaint */}
                    <Route
                        path="dispositions/disposition-complaint"
                        element={
                            <AuthenticationHOC
                                component={
                                    <DispositionComplaintListingWrapper />
                                }
                                moduleName={
                                    UserModuleNameTypes.dispositionComplaint
                                }
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-complaint/add"
                        element={
                            <AuthenticationHOC
                                component={<AddDispositionComplaintWrappper />}
                                moduleName={
                                    UserModuleNameTypes.dispositionComplaint
                                }
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-complaint/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditDispositionComplaintWrappper />}
                                moduleName={
                                    UserModuleNameTypes.dispositionComplaint
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    {/* Dispositions ->NDR Disposition One */}
                    <Route
                        path="dispositions/ndr-disposition"
                        element={
                            <AuthenticationHOC
                                component={<NdrDispositionListingWrapper />}
                                moduleName={UserModuleNameTypes.ndrDisposition}
                            />
                        }
                    />

                    {/* Dispositions ->NDR Disposition Add */}

                    <Route
                        path="dispositions/ndr-disposition/add"
                        element={
                            <AuthenticationHOC
                                component={<AddNdrDispositionWrapper />}
                                moduleName={UserModuleNameTypes.ndrDisposition}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="dispositions/ndr-disposition/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditNdrDispositionWrapper />}
                                moduleName={UserModuleNameTypes.ndrDisposition}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* All Websites -> Websites */}
                    <Route
                        path="all-websites/website"
                        element={
                            <AuthenticationHOC
                                component={<WebstieListingWrapper />}
                                moduleName={UserModuleNameTypes.website}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website/add"
                        element={
                            <AuthenticationHOC
                                component={<AddWebsiteWrapper />}
                                moduleName={UserModuleNameTypes.website}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="all-websites/website/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditWebsiteWrapper />}
                                moduleName={UserModuleNameTypes.website}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* All Websites -> Websites Blog */}
                    <Route
                        path="all-websites/website-blog"
                        element={
                            <AuthenticationHOC
                                component={<ListWebstieBlogWrapper />}
                                moduleName={UserModuleNameTypes.websiteBlog}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-blog/add"
                        element={
                            <AuthenticationHOC
                                component={<AddWebsiteBlogWrapper />}
                                moduleName={UserModuleNameTypes.websiteBlog}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-blog/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditWebsiteBlogWrapper />}
                                moduleName={UserModuleNameTypes.websiteBlog}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-blog/view/:id"
                        element={
                            <AuthenticationHOC
                                component={<WebsiteBlogViewWrapper />}
                                moduleName={UserModuleNameTypes.websiteBlog}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    {/* All Websites -> Websites Page */}
                    <Route
                        path="all-websites/website-page"
                        element={
                            <AuthenticationHOC
                                component={<WebsitePageListingWrapper />}
                                moduleName={UserModuleNameTypes.websitePage}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-page/add"
                        element={
                            <AuthenticationHOC
                                component={<AddWebsitePageWrapper />}
                                moduleName={UserModuleNameTypes.websitePage}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-page/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditWebsitePageWrapper />}
                                moduleName={UserModuleNameTypes.websitePage}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-page/view/:id"
                        element={
                            <AuthenticationHOC
                                component={<ViewWebsitePageWrapper />}
                                moduleName={UserModuleNameTypes.websitePage}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    {/* All Websites -> Websites Tags */}
                    <Route
                        path="/all-websites/website-tags"
                        element={
                            <AuthenticationHOC
                                component={<WebsiteTagListingWrapper />}
                                moduleName={UserModuleNameTypes.websiteTags}
                                actionName={UserModuleActionTypes.List}
                            />
                        }
                    />
                    <Route
                        path="/all-websites/website-tags/add"
                        element={
                            <AuthenticationHOC
                                component={<AddWebsiteTagsWrapper />}
                                moduleName={UserModuleNameTypes.websiteTags}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/all-websites/website-tags/edit/:id"
                        element={
                            <AuthenticationHOC
                                component={<EditWebsiteTagWrapper />}
                                moduleName={UserModuleNameTypes.websiteTags}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/all-websites/website-tags/:id"
                        element={
                            <AuthenticationHOC
                                component={<ViewWebsiteTagsWrapper />}
                                moduleName={UserModuleNameTypes.websiteTags}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    <Route path="/welcome" element={<WelcomePage />} />
                    {/* ############# NOT FOR USE ############# */}
                    {/* <Route
                        path="/approved-orders/view/:id"
                        element={<ApprovedOrderViewWrapper />}
                    /> */}
                    <Route
                        path="/vendors/:vendorId/warehouse/add"
                        element={
                            <AuthenticationHOC
                                component={<AddVendorWarehouseWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/dealers/:dealerId/sale-order/add-sale-order"
                        element={
                            <AuthenticationHOC
                                component={<AddSaleOrderWrapper />}
                                moduleName={UserModuleNameTypes.dealer}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    {/* INVENTORY MENAGEMENT */}
                    {/* <Route
                        path="/inventory-management"
                        element={<InventoryManagementListingWrapper />}
                    /> */}
                    {/* <Route
                        path="/inventory-management/add"
                        element={<AddInventoryManagementWrapper />}
                    /> */}
                    {/* <Route
                        path="/inventory-management/edit/:id"
                        element={<EditInventoryManagementWrapper />}
                    /> */}

                    <Route path="/barcodes" element={<BarcodeGenerator />} />

                    {/* <AddCompetitorWrapper /> */}
                    {/* <Route
                        path="media/inbound/"
                        element={<InbouundWrapper />}
                    /> */}
                    {/* start Influencer routing */}
                    <Route
                        path="all-websites/influencers-management"
                        element={<InfluencerListingWrapper />}
                    />
                    <Route
                        path="all-websites/influencers-management/add"
                        element={<AddInfluencerWrapper />}
                    />

                    <Route
                        path="configurations/user-access"
                        element={<UserAccessWrapper />}
                    />

                    {/* ############# NOT FOR USE ############# */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default PageRoutes
