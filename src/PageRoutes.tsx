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
import ActionAuthHOC from './ActionAuthHoc'
import AuthHOC from './AuthHOC'
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
    EditVendorWarehouseWrapper,
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
    VendorWarehouseTabWrapper,
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
import InwardsTabs from './pages/inventories/inward'
import InwardCompanyTabsListingWrapper from './pages/inventories/inward/Company/InwardCompanyTabsListingWrapper'
import InwardCustomerTabsListingWrapper from './pages/inventories/inward/Customer/InwardCustomerTabsListingWrapper'
import InwardDealerTabsListingWrapper from './pages/inventories/inward/Dealer/InwardDealerTabsListingWrapper'
import InwardEcomTabsListingWrapper from './pages/inventories/inward/Ecom/InwardEcomTabsListingWrapper'
import InwardReplacementTabsListingWrapper from './pages/inventories/inward/Replacement/InwardReplacementTabsListingWrapper'
import InwardSampleTabsListingWrapper from './pages/inventories/inward/Sample/InwardSampleTabsListingWrapper'
import InwardWarehouseTabsListingWrapper from './pages/inventories/inward/Warehouse/InwardWarehouseTabsListingWrapper'
import OutwardTabs from './pages/inventories/outward'
import OutwardWarehouseToComapnyListingWrapper from './pages/inventories/outward/Company/list/OutwardWarehouseToComapnyListingWrapper'
import OutwardCustomerTabsListingWrapper from './pages/inventories/outward/Customer/OutwardCustomerTabsListingWrapper'
import OutwardDealerTabsListingWrapper from './pages/inventories/outward/Dealer/OutwardDealerTabsListingWrapper'
import DispatchedInvoice from './pages/inventories/outward/Dealer/components/DispatchedInvoice'
import OutwardEcomTabsListingWrapper from './pages/inventories/outward/Ecom/OutwardEcomTabsListingWrapper'
import OutwardReplacementTabsListingWrapper from './pages/inventories/outward/Replacement/OutwardReplacementTabsListingWrapper'
import OutwardRTVTabsListingWrapper from './pages/inventories/outward/Rtv/list/OutwardRTVTabsListingWrapper'
import OutwardSampleTabsListingWrapper from './pages/inventories/outward/Sample/OutwardSampleTabsListingWrapper'
import OutwardWarehouseTransferListingWrapper from './pages/inventories/outward/Warehouse/list/OutwardWarehouseTransferListingWrapper'
import InventorisTabsLayout from './pages/inventories/tabs'
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
                    {/* Login */}
                    <Route path="/" element={<Auth />} />
                    {/* Page not found */}
                    <Route path="*" element={<PageNotFound />} />
                    {/* Dashboard */}
                    <Route path="/dashboard" element={<DashboardWrappper />} />
                    {/* Profile */}
                    <Route path="/profile" element={<ProfileWrappper />} />

                    {/* Vendor */}
                    <Route
                        path="/vendors"
                        element={
                            <AuthHOC
                                component={<VendorsListingWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                            />
                        }
                    />
                    <Route
                        path="warehouse/so-order/dispatched-invoice"
                        element={
                            <AuthHOC
                                component={<DispatchedInvoice />}
                                moduleName={UserModuleNameTypes.vendor}
                            />
                        }
                    />
                    <Route
                        path="/vendors/add-vendor"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
                                    component={<AddPurchaseOrderTabWrapper />}
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={
                                        UserModuleAddActionTypes.vendorPoAdd
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="warehouse"
                            element={
                                <ActionAuthHOC
                                    component={<VendorWarehouseTabWrapper />}
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={
                                        UserModuleTabsTypes.vendoreWarehouse
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="warehouse/add"
                            element={
                                <ActionAuthHOC
                                    component={<AddVendorWarehouseWrapper />}
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={
                                        UserModuleAddActionTypes.vendorWarehouseAdd
                                    }
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="warehouse/:id"
                            element={
                                <ActionAuthHOC
                                    component={<EditVendorWarehouseWrapper />}
                                    moduleName={UserModuleNameTypes.vendor}
                                    actionName={UserModuleActionTypes.Edit}
                                    isRedirect
                                />
                            }
                        />
                        <Route
                            path="return-to-vendor"
                            element={
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                            <AuthHOC
                                component={<DealersListingWrapper />}
                                moduleName={'DEALER'}
                            />
                        }
                    />
                    <Route
                        path="/dealers/add-dealer"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                            <AuthHOC
                                component={<DealersRatioListingWrapper />}
                                moduleName={UserModuleNameTypes.dealer}
                            />
                        }
                    />

                    {/* Users */}
                    <Route
                        path="users"
                        element={
                            <AuthHOC
                                component={<UsersListingWrapper />}
                                moduleName={UserModuleNameTypes.user}
                            />
                        }
                    />
                    <Route
                        path="/users/add-user"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<WarehousesListingWrapper />}
                                moduleName={UserModuleNameTypes.wareHouse}
                            />
                        }
                    />
                    <Route
                        path="/warehouse/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
                                        component={
                                            <OutwardWarehouseTransferListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.WarehouseTransfer
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
                                        component={
                                            <OutwardWarehouseToComapnyListingWrapper />
                                        }
                                        moduleName={
                                            UserModuleNameTypes.warehouseToComapny
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
                                <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                    <ActionAuthHOC
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
                                <ActionAuthHOC
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
                        element={<InventoryFlowListingWrapper />}
                    />

                    {/* Sale Order */}
                    <Route
                        path="/sale-order"
                        element={
                            <AuthHOC
                                component={<SaleOrderListingWrapper />}
                                moduleName={UserModuleNameTypes.saleOrder}
                            />
                        }
                    />
                    <Route
                        path="/sale-order/add-sale-order"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
                                component={<EditSaleOrderWrapper />}
                                moduleName={UserModuleNameTypes.saleOrder}
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/warehouse-transfer"
                        element={
                            <AuthHOC
                                component={<WarehouseTransferListingWrapper />}
                                moduleName={
                                    UserModuleNameTypes.WarehouseTransfer
                                }
                            />
                        }
                    ></Route>
                    <Route
                        path="warehouse-transfer/add"
                        element={
                            <ActionAuthHOC
                                component={<AddWarehouseTransferWrapper />}
                                moduleName={
                                    UserModuleNameTypes.WarehouseTransfer
                                }
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="warehouse-transfer/edit/:id"
                        element={
                            <ActionAuthHOC
                                component={<EditWarehouseTransferWrapper />}
                                moduleName={
                                    UserModuleNameTypes.WarehouseTransfer
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    <Route
                        path="/warehouse-to-company"
                        element={
                            <AuthHOC
                                component={<WarehouseToComapnyListingWrapper />}
                                moduleName={
                                    UserModuleNameTypes.warehouseToComapny
                                }
                            />
                        }
                    ></Route>
                    <Route
                        path="warehouse-to-company/add"
                        element={
                            <ActionAuthHOC
                                component={
                                    <AddWarehouseToComapnyTransferWrapper />
                                }
                                moduleName={
                                    UserModuleNameTypes.warehouseToComapny
                                }
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="warehouse-to-company/edit/:id"
                        element={
                            <ActionAuthHOC
                                component={<EditWarehouseToComapnyWrapper />}
                                moduleName={
                                    UserModuleNameTypes.warehouseToComapny
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />
                    {/* RETURN TO VENDOR */}
                    <Route
                        path="/return-to-vendor"
                        element={
                            <ActionAuthHOC
                                component={<RTVListingWrapper />}
                                moduleName={UserModuleNameTypes.wareHouse}
                                actionName={
                                    UserModuleWarehouseTabsTypes.outwardInventoriesRTV
                                }
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/return-to-vendor/add"
                        element={
                            <ActionAuthHOC
                                component={<AddRTVendorWrapper />}
                                moduleName={UserModuleNameTypes.wareHouse}
                                actionName={
                                    UserModuleWarehouseTabsTypes.outwardInventoriesRTV
                                }
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/return-to-vendor/edit/:id"
                        element={
                            <ActionAuthHOC
                                component={<EditRTVendorWrapper />}
                                moduleName={UserModuleNameTypes.wareHouse}
                                actionName={
                                    UserModuleWarehouseTabsTypes.outwardInventoriesRTV
                                }
                                isRedirect
                            />
                        }
                    />

                    {/* WAREHOUSE TO SAMPLE */}
                    <Route
                        path="/warehouse-to-sample"
                        element={
                            <ActionAuthHOC
                                component={<WarehouseToSampleListingWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleTabsTypes.vendorLedger}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/warehouse-to-sample/add"
                        element={
                            <ActionAuthHOC
                                component={<AddWarehouseToSampleWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleTabsTypes.vendorLedger}
                                isRedirect
                            />
                        }
                    />
                    <Route
                        path="/warehouse-to-sample/edit/:id"
                        element={
                            <ActionAuthHOC
                                component={<EditWarehouseToSampleWrapper />}
                                moduleName={UserModuleNameTypes.vendor}
                                actionName={UserModuleTabsTypes.vendorLedger}
                                isRedirect
                            />
                        }
                    />

                    {/* ASR */}
                    <Route
                        path="/asr"
                        element={
                            <AuthHOC
                                component={<ASRListingWrapper />}
                                moduleName={UserModuleNameTypes.asr}
                            />
                        }
                    />
                    <Route
                        path="/asr/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<PurchaseOrderListingWrapper />}
                                moduleName={UserModuleNameTypes.purchaseOrder}
                            />
                        }
                    />
                    <Route
                        path="/purchase-order/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<GRNListingWrapper />}
                                moduleName={UserModuleNameTypes.grn}
                            />
                        }
                    />

                    <Route
                        path="/grn/add"
                        element={
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<InquiryListingWrapper />}
                                moduleName={UserModuleNameTypes.inquiry}
                            />
                        }
                    />

                    <Route
                        path="/inquiry/view/:id"
                        element={
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<Order />}
                                moduleName={UserModuleNameTypes.order}
                            />
                        }
                    ></Route>

                    {/* Call */}
                    <Route
                        path="/call"
                        element={
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<AttributesListingWrapper />}
                                moduleName={UserModuleNameTypes.attribute}
                            />
                        }
                    />
                    <Route
                        path="/configurations/attributes/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<AttributesGroupListingWrapper />}
                                moduleName={UserModuleNameTypes.attributeGroup}
                            />
                        }
                    />

                    <Route
                        path="/configurations/attributes-group/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<ProductCategoryListingWrapper />}
                                moduleName={UserModuleNameTypes.productCategory}
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-category/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<ProductGroupListingWrapper />}
                                moduleName={UserModuleNameTypes.productGroup}
                            />
                        }
                    />

                    <Route
                        path="/configurations/product-group/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<SchemeListingWrapper />}
                                moduleName={UserModuleNameTypes.scheme}
                            />
                        }
                    />
                    <Route
                        path="/configurations/scheme/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<ItemListingWrapper />}
                                moduleName={UserModuleNameTypes.item}
                            />
                        }
                    />
                    <Route
                        path="/configurations/item/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<ProductsListingWrapper />}
                                moduleName={UserModuleNameTypes.product}
                            />
                        }
                    />

                    <Route
                        path="/configurations/products/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<CartonBoxListingWrapper />}
                                moduleName={UserModuleNameTypes.cartonBox}
                            />
                        }
                    />
                    <Route
                        path="/configurations/carton-box/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<CompanyBranchListingWrapper />}
                                moduleName={UserModuleNameTypes.companyBranch}
                            />
                        }
                    />
                    <Route
                        path="/configurations/company-branch/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<BarcodeListingWrapper />}
                                moduleName={UserModuleNameTypes.barcode}
                            />
                        }
                    />
                    <Route
                        path="/configurations/barcode/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<LanguageListingWrapper />}
                                moduleName={UserModuleNameTypes.language}
                            />
                        }
                    />
                    <Route
                        path="/configurations/language/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<DealersCategoryListingWrapper />}
                                moduleName={UserModuleNameTypes.dealerCategory}
                            />
                        }
                    />
                    <Route
                        path="/configurations/dealers-category/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
                                component={<EditDealersCategoryWrapper />}
                                moduleName={UserModuleNameTypes.dealerCategory}
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
                            <AuthHOC
                                component={<ChannelGroupListingWrapper />}
                                moduleName={UserModuleNameTypes.channelGroup}
                            />
                        }
                    />
                    <Route
                        path="media/channel-group/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<ChannelCategoryListingWrapper />}
                                moduleName={UserModuleNameTypes.channelCategory}
                            />
                        }
                    />
                    <Route
                        path="media/channel-category/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<DidManagementListingWrapper />}
                                moduleName={UserModuleNameTypes.didManagement}
                            />
                        }
                    />
                    <Route
                        path="media/did/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
                                component={<ArtistListingWrapper />}
                                moduleName={UserModuleNameTypes.artist}
                                actionName={UserModuleActionTypes.List}
                            />
                        }
                    />
                    <Route
                        path="media/artist/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<TapeManagementListingWrapper />}
                                moduleName={UserModuleNameTypes.tapeManangement}
                            />
                        }
                    />
                    <Route
                        path="media/tape/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            // <ActionAuthHOC
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
                                <ActionAuthHOC
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
                                <ActionAuthHOC
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
                            <AuthHOC
                                component={<SlotManagementListingWrapper />}
                                moduleName={UserModuleNameTypes.slotManagement}
                            />
                        }
                    /> */}
                    {/* <Route
                        path="media/slot/add"
                        element={
                            <ActionAuthHOC
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

                    {/* Assets -> Assets Management */}
                    <Route
                        path="assets/assets-management"
                        element={
                            <AuthHOC
                                component={<AssetsRequestWrapper />}
                                moduleName={UserModuleNameTypes.assetRequest}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-management/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<AssetsCategoryWrapper />}
                                moduleName={UserModuleNameTypes.assetCategory}
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-category/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<AssetsLocationWrapper />}
                                moduleName={UserModuleNameTypes.assetLocation}
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-location/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<AssetsRelocationWrapper />}
                                moduleName={UserModuleNameTypes.assetRelocation}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-relocation/add"
                        element={
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<AssetsAllocationWrapper />}
                                moduleName={UserModuleNameTypes.assetAllocation}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-allocation/add"
                        element={
                            <ActionAuthHOC
                                component={<AddAssetsAllocationWrapper />}
                                moduleName={UserModuleNameTypes.assetAllocation}
                                actionName={UserModuleActionTypes.Add}
                                isRedirect
                            />
                        }
                    />

                    {/* Dispositions -> Disposition One */}
                    <Route
                        path="dispositions/disposition-one"
                        element={
                            <AuthHOC
                                component={<DispositionOneListingWrapper />}
                                moduleName={UserModuleNameTypes.dispositionOne}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-one/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<DispositionTwoListingWrapper />}
                                moduleName={UserModuleNameTypes.dispositionTwo}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-two/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
                                component={<EditDispositionComplaintWrappper />}
                                moduleName={
                                    UserModuleNameTypes.dispositionComplaint
                                }
                                actionName={UserModuleActionTypes.Edit}
                                isRedirect
                            />
                        }
                    />

                    {/* All Websites -> Websites */}
                    <Route
                        path="all-websites/website"
                        element={
                            <AuthHOC
                                component={<WebstieListingWrapper />}
                                moduleName={UserModuleNameTypes.website}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<ListWebstieBlogWrapper />}
                                moduleName={UserModuleNameTypes.websiteBlog}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-blog/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <AuthHOC
                                component={<WebsitePageListingWrapper />}
                                moduleName={UserModuleNameTypes.websitePage}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-page/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
                                component={<WebsiteTagListingWrapper />}
                                moduleName={UserModuleNameTypes.websiteTags}
                                actionName={UserModuleActionTypes.List}
                            />
                        }
                    />
                    <Route
                        path="/all-websites/website-tags/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
                            <ActionAuthHOC
                                component={<ViewWebsiteTagsWrapper />}
                                moduleName={UserModuleNameTypes.websiteTags}
                                actionName={UserModuleActionTypes.View}
                                isRedirect
                            />
                        }
                    />

                    {/* ############# NOT FOR USE ############# */}
                    {/* <Route
                        path="/approved-orders/view/:id"
                        element={<ApprovedOrderViewWrapper />}
                    /> */}
                    <Route
                        path="/vendors/:vendorId/warehouse/add"
                        element={
                            <ActionAuthHOC
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
                            <ActionAuthHOC
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
