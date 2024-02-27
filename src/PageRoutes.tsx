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

import { v4 as uuidv4 } from 'uuid'
import Authorization from './Authorization'
// import Authorization from './Authorization'
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
// import InwardReplacementTabsListingWrapper from './pages/warehouses/view/inventories/inward/Replacement/InwardReplacementTabsListingWrapper'
import InwardSampleTabsListingWrapper from './pages/warehouses/view/inventories/inward/Sample/InwardSampleTabsListingWrapper'
import InwardWarehouseTabsListingWrapper from './pages/warehouses/view/inventories/inward/Warehouse/InwardWarehouseTabsListingWrapper'
import OutwardTabs from './pages/warehouses/view/inventories/outward'
import OutwardWarehouseToComapnyListingWrapper from './pages/warehouses/view/inventories/outward/Company/list/OutwardWarehouseToComapnyListingWrapper'
import OutwardCustomerTabsListingWrapper from './pages/warehouses/view/inventories/outward/Customer/OutwardCustomerTabsListingWrapper'
import OutwardDealerTabsListingWrapper from './pages/warehouses/view/inventories/outward/Dealer/OutwardDealerTabsListingWrapper'
import DispatchedInvoice from './pages/saleOrder/list/components/DispatchedInvoiceWrapper'
import OutwardEcomTabsListingWrapper from './pages/warehouses/view/inventories/outward/Ecom/OutwardEcomTabsListingWrapper'
// import OutwardReplacementTabsListingWrapper from './pages/warehouses/view/inventories/outward/Replacement/OutwardReplacementTabsListingWrapper'
import OutwardRTVTabsListingWrapper from './pages/warehouses/view/inventories/outward/Rtv/list/OutwardRTVTabsListingWrapper'
import OutwardSampleTabsListingWrapper from './pages/warehouses/view/inventories/outward/Sample/OutwardSampleTabsListingWrapper'
import OutwardWarehouseTransferListingWrapper from './pages/warehouses/view/inventories/outward/Warehouse/list/OutwardWarehouseTransferListingWrapper'
import InventorisTabsLayout from './pages/warehouses/view/inventories/tabs'
// import ViewSlot from './pages/media/slotManagement'
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
import { UserModuleNameTypes } from './utils/mediaJson/userAccess'

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
                    <Route path="/dashboard" element={<DashboardWrappper />} />
                    {/* Profile */}
                    <Route path="/profile" element={<ProfileWrappper />} />

                    {/* Vendor */}
                    <Route
                        path="/vendors"
                        element={
                            <Authorization
                                children={<VendorsListingWrapper />}
                                permission={UserModuleNameTypes.NAV_VENDOR}
                            />
                        }
                    />
                    {/* <Route
                        path="warehouse/so-order/dispatched-invoice"
                        element={
                            <Authorization
                                children={<DispatchedInvoice />}
                                permission={UserModuleNameTypes.vendor}
                            />
                        }
                    /> */}
                    <Route
                        path="/vendors/add-vendor"
                        element={
                            <Authorization
                                children={<AddVendorWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_VENDOR_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="/vendors/edit-vendor/:id"
                        element={
                            <Authorization
                                children={<EditVendorWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_VENDOR_EDIT
                                }
                            />
                        }
                    />
                    {/* vendor view  */}
                    <Route
                        path="/vendors/:vendorId"
                        element={
                            <Authorization
                                children={<ViewVendor />}
                                permission={UserModuleNameTypes.NAV_VENDOR}
                            />
                        }
                    >
                        <Route
                            path="general-information"
                            element={
                                <Authorization
                                    children={
                                        <VendorGeneralInformationTabWrapper />
                                    }
                                    permission={
                                        UserModuleNameTypes.ACTION_VENDOR_VIEW_GENERAL_INFORMATION
                                    }
                                />
                            }
                        />
                        <Route
                            path="purchase-order"
                            element={
                                <Authorization
                                    children={<VendorPurchaseOrderTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_VENDOR_VIEW_PURCHASE_ORDER
                                    }
                                />
                            }
                        />
                        <Route
                            path="purchase-order/add"
                            element={
                                <Authorization
                                    children={<AddPurchaseOrderTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_VENDOR_VIEW_PURCHASE_ORDER_ADD
                                    }
                                />
                            }
                        />
                        {/* <Route
                            path="warehouse"
                            element={
                                <Authorization
                                    children={<VendorWarehouseTabWrapper />}
                                    permission={UserModuleNameTypes.vendor}
                                        UserModuleTabsTypes.vendoreWarehouse
                                    }
                                    
                                />
                            }
                        /> */}
                        {/* <Route
                            path="warehouse/add"
                            element={
                                <Authorization
                                    children={<AddVendorWarehouseWrapper />}
                                    permission={UserModuleNameTypes.vendor}
                                        UserModuleAddActionTypes.vendorWarehouseAdd
                                    }
                                    
                                />
                            }
                        /> */}
                        {/* <Route
                            path="warehouse/:id"
                            element={
                                <Authorization
                                    children={<EditVendorWarehouseWrapper />}
                                    permission={UserModuleNameTypes.vendor}
                                    
                                />
                            }
                        /> */}
                        <Route
                            path="return-to-vendor"
                            element={
                                <Authorization
                                    children={<VendorRtvListingWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_VENDOR_VIEW_RETURN_TO_VENDOR
                                    }
                                />
                            }
                        />
                        <Route
                            path="ledger"
                            element={
                                <Authorization
                                    children={<VendorListLedgerTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_VENDOR_VIEW_VENDOR_LEDGER
                                    }
                                />
                            }
                        />
                        <Route
                            path="activities"
                            element={
                                <Authorization
                                    children={<VendorActivityTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_VENDOR_VIEW_ACTIVITY
                                    }
                                />
                            }
                        />
                    </Route>

                    {/* Dealer */}
                    <Route
                        path="/dealers"
                        element={
                            <Authorization
                                children={<DealersListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DEALER}
                            />
                        }
                    />
                    <Route
                        path="/dealers/add-dealer"
                        element={
                            <Authorization
                                children={<AddDealerWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DEALER_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="/dealers/edit-dealer/:id"
                        element={
                            <Authorization
                                children={<EditDealerWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DEALER_EDIT
                                }
                            />
                        }
                    />
                    {/* dealer view */}
                    <Route
                        path="/dealers/:dealerId"
                        element={
                            <Authorization
                                children={<ViewDealer />}
                                permission={
                                    UserModuleNameTypes.ACTION_DEALER_VIEW
                                }
                            />
                        }
                    >
                        <Route
                            path="general-information"
                            element={
                                <Authorization
                                    children={
                                        <DealerGeneralInformationTabWrapper />
                                    }
                                    permission={
                                        UserModuleNameTypes.ACTION_DEALER_GENERAL_INFORMATION
                                    }
                                />
                            }
                        />
                        <Route
                            path="warehouse"
                            element={
                                <Authorization
                                    children={<DealerWarehouseTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_DEALER_DEALER_WAREHOUSE
                                    }
                                />
                            }
                        />
                        <Route
                            path="warehouse/add-warehouse"
                            element={
                                <Authorization
                                    children={<AddDealerWarehouseWarpper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_DEALER_DEALER_WAREHOUSE_ADD
                                    }
                                />
                            }
                        />
                        <Route
                            path="warehouse/:id"
                            element={
                                <Authorization
                                    children={<EditDealerWarehouseWrapper />}
                                    permission={
                                        UserModuleNameTypes.NAV_DASHBOARD
                                    }
                                />
                            }
                        />
                        <Route
                            path="sale-order"
                            element={
                                <Authorization
                                    children={<DealerSalesOrderTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_DEALER_DEALER_SALE_ORDER
                                    }
                                />
                            }
                        />

                        {/* #######  should add sale order ####### */}

                        <Route
                            path="ledger"
                            element={
                                <Authorization
                                    children={<DealerListLedgerTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_DEALER_DEALER_LEDGER
                                    }
                                />
                            }
                        />
                        <Route
                            path="order-ledger"
                            element={
                                <Authorization
                                    children={
                                        <DealerOrderLedgerListTabWrapper />
                                    }
                                    permission={
                                        UserModuleNameTypes.ACTION_DEALER_DEALER_ORDER_LEDGER
                                    }
                                />
                            }
                        />

                        <Route
                            path="activities"
                            element={
                                <Authorization
                                    children={<DealerActivityTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_DEALER_DEALER_ACTIVITY
                                    }
                                />
                            }
                        />
                        <Route
                            path="pincode"
                            element={
                                <Authorization
                                    children={<ListDealerPincodeTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_DEALER_DEALER_PINCODE
                                    }
                                />
                            }
                        />
                        <Route
                            path="pincode/add"
                            element={
                                <Authorization
                                    children={<AddDealerPinCodeTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_DEALER_DEALER_PINCODE_ADD
                                    }
                                />
                            }
                        />
                        <Route
                            path="scheme"
                            element={
                                <Authorization
                                    children={<ListDealerSchemeTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_DEALER_DEALER_SCHEME
                                    }
                                />
                            }
                        />
                        <Route
                            path="scheme/add"
                            element={
                                <Authorization
                                    children={<AddDealerSchemeTabWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_DEALER_DEALER_SCHEME_ADD
                                    }
                                />
                            }
                        />
                        <Route
                            path="scheme/edit/:schemeId"
                            element={
                                <Authorization
                                    children={<EditDealerSchemeWrapper />}
                                    permission={
                                        UserModuleNameTypes.NAV_DASHBOARD
                                    }
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
                            <Authorization
                                children={<DealersRatioListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_DELEAR_RATIO
                                }
                            />
                        }
                    />

                    {/* Users */}
                    <Route
                        path="users"
                        element={
                            // <UsersListingWrapper />
                            <Authorization
                                children={<UsersListingWrapper />}
                                permission={UserModuleNameTypes.NAV_USER}
                            />
                        }
                    />
                    <Route
                        path="/users/add-user"
                        element={
                            <Authorization
                                children={<AddUserWrapper />}
                                permission={UserModuleNameTypes.ACTION_USER_ADD}
                            />
                        }
                    />
                    <Route
                        path="/users/:id"
                        element={
                            <Authorization
                                children={<EditUserWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_USER_EDIT
                                }
                            />
                        }
                    />

                    {/* Warehouse */}
                    <Route
                        path="/warehouse"
                        element={
                            <Authorization
                                children={<WarehousesListingWrapper />}
                                permission={UserModuleNameTypes.NAV_WAREHOUSE}
                            />
                        }
                    />
                    <Route
                        path="/warehouse/add"
                        element={
                            <Authorization
                                children={<AddWarehouseWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_WAREHOUSE_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="/warehouse/:id"
                        element={
                            <Authorization
                                children={<EditWarehouseWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_WAREHOUSE_EDIT
                                }
                            />
                        }
                    />
                    {/* warehouse view */}
                    <Route
                        path="warehouse/view/:id"
                        element={
                            <Authorization
                                children={<InventorisTabsLayout />}
                                permission={
                                    UserModuleNameTypes.ACTION_WAREHOUSE_VIEW
                                }
                            />
                        }
                    >
                        <Route
                            path="inventories"
                            element={
                                <Authorization
                                    children={<InventoryListingWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INVENTORIES
                                    }
                                />
                            }
                        />
                        <Route
                            path="inventories/inward-inventory/add"
                            element={
                                <Authorization
                                    children={<InwardInventoryWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_ADD
                                    }
                                />
                            }
                        />

                        <Route
                            path="outward-inventories"
                            element={
                                <Authorization
                                    children={<OutwardTabs />}
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES
                                    }
                                />
                            }
                        >
                            <Route
                                path="dealer"
                                element={
                                    <Authorization
                                        children={
                                            <OutwardDealerTabsListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_DEALER
                                        }
                                    />
                                }
                            />
                            <Route
                                path="customer"
                                element={
                                    <Authorization
                                        children={
                                            <OutwardCustomerTabsListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER
                                        }
                                    />
                                }
                            />
                            <Route
                                path="rtv"
                                element={
                                    <Authorization
                                        children={
                                            <OutwardRTVTabsListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_RTV
                                        }
                                    />
                                }
                            ></Route>

                            <Route
                                path="warehoue"
                                element={
                                    <Authorization
                                        children={
                                            <OutwardWarehouseTransferListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_WAREHOUSE
                                        }
                                    />
                                }
                            />
                            <Route
                                path="sample"
                                element={
                                    <Authorization
                                        children={
                                            <OutwardSampleTabsListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_SAMPLE
                                        }
                                    />
                                }
                            />
                            <Route
                                path="ecom"
                                element={
                                    <Authorization
                                        children={
                                            <OutwardEcomTabsListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE
                                        }
                                    />
                                }
                            />
                            {/* <Route
                                path="replacement"
                                element={
                                    <Authorization
                                        children={
                                            <OutwardReplacementTabsListingWrapper />
}
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE
                                        }
                                  
                                    />
                                }
                            /> */}
                            <Route
                                path="company"
                                element={
                                    <Authorization
                                        children={
                                            <OutwardWarehouseToComapnyListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_COMPANY
                                        }
                                    />
                                }
                            />
                        </Route>
                        <Route
                            path="inward-inventories"
                            element={
                                <Authorization
                                    children={<InwardsTabs />}
                                    permission={
                                        UserModuleNameTypes.NAV_DASHBOARD
                                    }
                                />
                            }
                        >
                            <Route
                                path="dealer"
                                element={
                                    <Authorization
                                        children={
                                            <InwardDealerTabsListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_DEALER
                                        }
                                    />
                                }
                            />
                            <Route
                                path="customer"
                                element={
                                    <Authorization
                                        children={
                                            <InwardCustomerTabsListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_CUSTOMER
                                        }
                                    />
                                }
                            />

                            <Route
                                path="warehoue"
                                element={
                                    <Authorization
                                        children={
                                            <InwardWarehouseTabsListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_WAREHOUSE
                                        }
                                    />
                                }
                            />
                            <Route
                                path="sample"
                                element={
                                    <Authorization
                                        children={
                                            <InwardSampleTabsListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_SAMPLE
                                        }
                                    />
                                }
                            />
                            <Route
                                path="ecom"
                                element={
                                    <Authorization
                                        children={
                                            <InwardEcomTabsListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_WAREHOUSE
                                        }
                                    />
                                }
                            />
                            {/* <Route
                                path="replacement"
                                element={
                                    <Authorization
                                    children={
                                            <InwardReplacementTabsListingWrapper />
}
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_WAREHOUSE
                                        }
                                      
                                    />
                                }
                            /> */}
                            <Route
                                path="company"
                                element={
                                    <Authorization
                                        children={
                                            <InwardCompanyTabsListingWrapper />
                                        }
                                        permission={
                                            UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_COMPANY
                                        }
                                    />
                                }
                            />
                        </Route>

                        <Route
                            path="warehouse-details"
                            element={
                                <Authorization
                                    children={<ViewWarehouseWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_DETAILS
                                    }
                                />
                            }
                        />
                    </Route>

                    {/* Inventory Flow */}
                    <Route
                        path="/inventory-flow"
                        element={
                            <Authorization
                                children={<InventoryFlowListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_INVENTORY_FLOW
                                }
                            />
                        }
                    />

                    {/* Sale Order */}
                    <Route
                        path="/sale-order"
                        element={
                            <Authorization
                                children={<SaleOrderListingWrapper />}
                                permission={UserModuleNameTypes.NAV_SALE_ORDER}
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
                            <Authorization
                                children={<AddSaleOrderWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_SALE_ORDER_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="/sale-order/edit-sale-order/:id"
                        element={
                            <Authorization
                                children={<EditSaleOrderWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_SALE_ORDER_EDIT
                                }
                            />
                        }
                    />

                    {/* RETURN TO VENDOR */}
                    <Route
                        path="/return-to-vendor"
                        element={
                            <Authorization
                                children={<RTVListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_RETURN_TO_VENDOR
                                }
                            />
                        }
                    />
                    <Route
                        path="/return-to-vendor/add"
                        element={
                            <Authorization
                                children={<AddRTVendorWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_RETURN_TO_VENDOR_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="/return-to-vendor/edit/:id"
                        element={
                            <Authorization
                                children={<EditRTVendorWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_RETURN_TO_VENDOR_EDIT
                                }
                            />
                        }
                    />

                    {/* Warehouse To Warehouse Transfer */}
                    <Route
                        path="/warehouse-transfer"
                        element={
                            <Authorization
                                children={<WarehouseTransferListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_WAREHOUSE_TO_COMPANY_TRANSFER
                                }
                            />
                        }
                    ></Route>
                    <Route
                        path="warehouse-transfer/add"
                        element={
                            <Authorization
                                children={<AddWarehouseTransferWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_WAREHOUSE_TO_COMPANY_TRANSFER
                                }
                            />
                        }
                    />
                    <Route
                        path="warehouse-transfer/edit/:id"
                        element={
                            <Authorization
                                children={<EditWarehouseTransferWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_WAREHOUSE_TO_COMPANY_TRANSFER
                                }
                            />
                        }
                    />

                    {/* Warehouse To Company Warehouse Transfer */}
                    <Route
                        path="/warehouse-to-company"
                        element={
                            <Authorization
                                children={<WarehouseToComapnyListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_WAREHOUSE_TO_COMPANY_TRANSFER
                                }
                            />
                        }
                    ></Route>
                    <Route
                        path="warehouse-to-company/add"
                        element={
                            <Authorization
                                children={
                                    <AddWarehouseToComapnyTransferWrapper />
                                }
                                permission={
                                    UserModuleNameTypes.NAV_WAREHOUSE_TO_COMPANY_TRANSFER
                                }
                            />
                        }
                    />
                    <Route
                        path="warehouse-to-company/edit/:id"
                        element={
                            <Authorization
                                children={<EditWarehouseToComapnyWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* WAREHOUSE TO SAMPLE Transfer */}
                    <Route
                        path="/warehouse-to-sample"
                        element={
                            <Authorization
                                children={<WarehouseToSampleListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/warehouse-to-sample/add"
                        element={
                            <Authorization
                                children={<AddWarehouseToSampleWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/warehouse-to-sample/edit/:id"
                        element={
                            <Authorization
                                children={<EditWarehouseToSampleWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* ASR */}
                    <Route
                        path="/asr"
                        element={
                            <Authorization
                                children={<ASRListingWrapper />}
                                permission={UserModuleNameTypes.NAV_ASR}
                            />
                        }
                    />
                    <Route
                        path="/asr/add"
                        element={
                            <Authorization
                                children={<AddASRWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/asr/:id"
                        element={
                            <Authorization
                                children={<EditASRWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Purchase Order */}
                    <Route
                        path="/purchase-order"
                        element={
                            <Authorization
                                children={<PurchaseOrderListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/purchase-order/add"
                        element={
                            <Authorization
                                children={<AddPurchaseOrderWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/purchase-order/view/:id"
                        element={
                            <Authorization
                                children={<ViewPurchaseOrderWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/purchase-order/edit/:id"
                        element={
                            <Authorization
                                children={<EditPurchaseOrderWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* GRN */}
                    <Route
                        path="/grn"
                        element={
                            <Authorization
                                children={<GRNListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    <Route
                        path="/grn/add"
                        element={
                            <Authorization
                                children={<AddGRNWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Inquiry */}
                    <Route
                        path="/inquiry"
                        element={
                            <Authorization
                                children={<InquiryListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    <Route
                        path="/inquiry/view/:id"
                        element={
                            <Authorization
                                children={<InquiryViewWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Orders */}
                    <Route
                        path="/orders"
                        element={
                            <Authorization
                                children={<Order />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
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
                            <Authorization
                                children={<CallListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
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
                            <Authorization
                                children={<AttributesListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/attributes/add"
                        element={
                            <Authorization
                                children={<AddAttributeWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/attributes/:id"
                        element={
                            <Authorization
                                children={<EditAttributeWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    {/* Configurations -> Attributes Group */}
                    <Route
                        path="/configurations/attributes-group"
                        element={
                            <Authorization
                                children={<AttributesGroupListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    <Route
                        path="/configurations/attributes-group/add"
                        element={
                            <Authorization
                                children={<AddAttributeGroupWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/attributes-group/:id"
                        element={
                            <Authorization
                                children={<EditAttributeGroupWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Configurations -> Product Category */}
                    <Route
                        path="/configurations/product-category"
                        element={
                            <Authorization
                                children={<ProductCategoryListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-category/add"
                        element={
                            <Authorization
                                children={<AddProductCategoryWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-category/:id"
                        element={
                            <Authorization
                                children={<EditProductCategoryWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Configurations -> Product Sub Category */}
                    <Route
                        path="/configurations/product-sub-category"
                        element={
                            <Authorization
                                children={<ProductSubCategoryListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-sub-category/add"
                        element={
                            <Authorization
                                children={<AddProductSubCategoryWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/product-sub-category/:id"
                        element={
                            <Authorization
                                children={<EditProductSubCategoryWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Configurations -> Product Group */}
                    <Route
                        path="/configurations/product-group"
                        element={
                            <Authorization
                                children={<ProductGroupListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    <Route
                        path="/configurations/product-group/add"
                        element={
                            <Authorization
                                children={<AddProductGroupWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    <Route
                        path="/configurations/product-group/:id"
                        element={
                            <Authorization
                                children={<EditProductGroupWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Configurations -> Scheme */}
                    <Route
                        path="/configurations/scheme"
                        element={
                            <Authorization
                                children={<SchemeListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/scheme/add"
                        element={
                            <Authorization
                                children={<AddSchemeWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/scheme/:id"
                        element={
                            <Authorization
                                children={<EditSchemeWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Configurations -> Item */}
                    <Route
                        path="/configurations/item"
                        element={
                            <Authorization
                                children={<ItemListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/item/add"
                        element={
                            <Authorization
                                children={<AddItemWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/item/:id"
                        element={
                            <Authorization
                                children={<EditItemWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Configurations -> Products */}
                    <Route
                        path="/configurations/products"
                        element={
                            <Authorization
                                children={<ProductsListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    <Route
                        path="/configurations/products/add"
                        element={
                            <Authorization
                                children={<AddProductWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/product/:id"
                        element={
                            <Authorization
                                children={<EditProductWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Configurations -> Carton Box */}
                    <Route
                        path="/configurations/carton-box"
                        element={
                            <Authorization
                                children={<CartonBoxListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/carton-box/add"
                        element={
                            <Authorization
                                children={<AddCartonBoxWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    <Route
                        path="/configurations/carton-box/:id"
                        element={
                            <Authorization
                                children={<EditCartonBoxWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Configurations -> Company */}
                    <Route
                        path="/configurations/company"
                        element={
                            <Authorization
                                children={
                                    <ConfigurationCompanyListingWrapper />
                                }
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/company/add"
                        element={
                            <Authorization
                                children={<AddCompanyWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/company/:id"
                        element={
                            <Authorization
                                children={<EditCompanyWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Configurations -> CompanyBranch */}
                    <Route
                        path="/configurations/company-branch"
                        element={
                            <Authorization
                                children={<CompanyBranchListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/company-branch/add"
                        element={
                            <Authorization
                                children={<AddCompanyBranchWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/company-branch/:id"
                        element={
                            <Authorization
                                children={<EditCompanyBranchWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Configurations -> Barcode */}
                    <Route
                        path="/configurations/barcode"
                        element={
                            <Authorization
                                children={<BarcodeListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/barcode/add"
                        element={
                            <Authorization
                                children={<AddBarcodeWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/barcode/carton-box-items/:cartonboxcode"
                        element={
                            <Authorization
                                children={<ViewBarcodeWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    <Route
                        path="/configurations/barcode/carton-box/add"
                        element={
                            <Authorization
                                children={<AddCbBarcodeWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    <Route
                        path="/configurations/barcode/:barcodeId"
                        element={
                            <Authorization
                                children={<ViewBarcodeWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
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
                            <Authorization
                                children={<LanguageListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/language/add"
                        element={
                            <Authorization
                                children={<AddLanguageWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/language/:id"
                        element={
                            <Authorization
                                children={<EditLanguageWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Configurations -> Dealers Category */}
                    <Route
                        path="/configurations/dealers-category"
                        element={
                            <Authorization
                                children={<DealersCategoryListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/dealers-category/add"
                        element={
                            <Authorization
                                children={<AddDealersCategoryWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/dealers-category/:id"
                        element={
                            <Authorization
                                children={<EditDealersCategoryWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    {/* Configurations -> call center master */}
                    <Route
                        path="/configurations/callcenter-master"
                        element={
                            <Authorization
                                children={<CallCenterMasterListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/callcenter-master/add"
                        element={
                            <Authorization
                                children={<AddCallCenterMasterWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/configurations/callcenter-master/:id"
                        element={
                            <Authorization
                                children={<EditCallCenterMasterWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
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
                            <Authorization
                                children={<ChannelGroupListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/channel-group/add"
                        element={
                            <Authorization
                                children={<AddChannelGroupWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/channel-group/:id"
                        element={
                            <Authorization
                                children={<EditChannelGroupWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Media -> Channel Category */}
                    <Route
                        path="media/channel-category"
                        element={
                            <Authorization
                                children={<ChannelCategoryListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/channel-category/add"
                        element={
                            <Authorization
                                children={<AddChannelCategoryWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/channel-category/edit/:id"
                        element={
                            <Authorization
                                children={<EditChannelCategoryWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Media -> Channel */}
                    <Route
                        path="media/channel"
                        element={
                            <Authorization
                                children={<ChannelManagementListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/channel/add"
                        element={
                            <Authorization
                                children={<AddChannelManagementWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/channel/:id"
                        element={
                            <Authorization
                                children={<EditChannelManagementWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Media -> Did Management */}
                    <Route
                        path="media/did"
                        element={
                            <Authorization
                                children={<DidManagementListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/did/add"
                        element={
                            <Authorization
                                children={<AddDidManagementWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/did/:id"
                        element={
                            <Authorization
                                children={<EditDidManagementWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Media -> Artist */}
                    <Route
                        path="media/artist"
                        element={
                            <Authorization
                                children={<ArtistListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/artist/add"
                        element={
                            <Authorization
                                children={<AddArtistWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/artist/:id"
                        element={
                            <Authorization
                                children={<EditArtistWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Media -> Tap Management */}

                    <Route
                        path="media/tape"
                        element={
                            <Authorization
                                children={<TapeManagementListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/tape/add"
                        element={
                            <Authorization
                                children={<AddTapeManagementWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/tape/edit/:id"
                        element={
                            <Authorization
                                children={<EditTapeManagementWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Media -> Competitor */}
                    <Route
                        path="media/competitor"
                        element={
                            <Authorization
                                children={
                                    <CompetitorManagementListingWrapper />
                                }
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/competitor/add"
                        element={
                            <Authorization
                                children={<AddCompetitorWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="media/competitor/:id"
                        element={
                            <Authorization
                                children={<EditCompetitorWraper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Media -> Slot */}
                    {/* Orders
                    <Route
                        path="media/slot"
                        element={
                            // <Authorization
                            //     children={
                            <ViewSlot />
                            }
                            //     permission={UserModuleNameTypes.NAV_DASHBOARD}
                            // />
                        }
                    > */}
                    <Route index element={<SlotManagementListingWrapper />} />
                    <Route
                        path="add"
                        element={
                            <Authorization
                                children={<AddSlotManagementWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="edit/:id"
                        element={
                            <Authorization
                                children={<EditSlotManagementWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
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
                    {/* </Route> */}
                    {/* <Route
                        path="media/slot"
                        element={
                            <Authorization
                                children={<SlotManagementListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    /> */}
                    {/* <Route
                        path="media/slot/add"
                        element={
                            <Authorization
                                children={<AddSlotManagementWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                                
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
                            <Authorization
                                children={<AssetsRequestWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-management/add"
                        element={
                            <Authorization
                                children={<AddAssetsRequestWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-management/:id"
                        element={
                            <Authorization
                                children={<EditAssetsRequestwrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Assets -> Assets Category */}
                    <Route
                        path="/assets/assets-category"
                        element={
                            <Authorization
                                children={<AssetsCategoryWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-category/add"
                        element={
                            <Authorization
                                children={<AddAssetsCategoryWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-category/:id"
                        element={
                            <Authorization
                                children={<EditAssetsCategoryWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Assets -> Assets Location */}
                    <Route
                        path="/assets/assets-location"
                        element={
                            <Authorization
                                children={<AssetsLocationWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-location/add"
                        element={
                            <Authorization
                                children={<AddAssetsLocationWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/assets/assets-location/:id"
                        element={
                            <Authorization
                                children={<EditAssetsLocatonWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Assets -> Assets Relocation */}
                    <Route
                        path="assets/assets-relocation"
                        element={
                            <Authorization
                                children={<AssetsRelocationWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-relocation/add"
                        element={
                            <Authorization
                                children={<AddAssetsRelocationWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Assets -> Assets Allocation */}
                    <Route
                        path="assets/assets-allocation"
                        element={
                            <Authorization
                                children={<AssetsAllocationWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="assets/assets-allocation/add"
                        element={
                            <Authorization
                                children={<AddAssetsAllocationWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
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
                            <Authorization
                                children={<DispositionOneListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DISPOSITION_ONE}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-one/add"
                        element={
                            <Authorization
                                children={<AddDispositionOneWrappper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-one/:id"
                        element={
                            <Authorization
                                children={<EditDispositionOneWrappper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Dispositions -> Disposition Two */}
                    <Route
                        path="dispositions/disposition-two"
                        element={
                            <Authorization
                                children={<DispositionTwoListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-two/add"
                        element={
                            <Authorization
                                children={<AddDispositionTwoWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-two/edit/:id"
                        element={
                            <Authorization
                                children={<EditDispositionTwoWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Dispositions -> Disposition Three */}
                    <Route
                        path="dispositions/disposition-three"
                        element={
                            <Authorization
                                children={<DispositionThreeListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-three/add"
                        element={
                            <Authorization
                                children={<AddDispositionThreeWrappper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-three/edit/:id"
                        element={
                            <Authorization
                                children={<EditDispositionThreeWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-three/:id"
                        element={
                            <Authorization
                                children={<ViewDispositionThreeWrappper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Dispositions -> Initialcall One */}
                    <Route
                        path="dispositions/initialcall-one"
                        element={
                            <Authorization
                                children={<InitialCallOneListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-one/add"
                        element={
                            <Authorization
                                children={<AddInitialCallOneWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-one/:id"
                        element={
                            <Authorization
                                children={<EditInitialCallOneWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Dispositions -> Initialcall Two */}
                    <Route
                        path="dispositions/initialcall-two"
                        element={
                            <Authorization
                                children={<InitialCallTwoListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-two/add"
                        element={
                            <Authorization
                                children={<AddInitialCallTwoWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-two/:id"
                        element={
                            <Authorization
                                children={<EditInitialCallTwoWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Dispositions -> Initialcall Three */}
                    <Route
                        path="dispositions/initialcall-three"
                        element={
                            <Authorization
                                children={<InitialCallThreeListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-three/add"
                        element={
                            <Authorization
                                children={<AddInitialCallThreeWrappper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-three/:id"
                        element={
                            <Authorization
                                children={<EditInitialCallThreeWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/initialcall-three/view/:id"
                        element={
                            <Authorization
                                children={<ViewInitialCallThreeWrappper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Dispositions -> Disposition Complaint */}
                    <Route
                        path="dispositions/disposition-complaint"
                        element={
                            <Authorization
                                children={
                                    <DispositionComplaintListingWrapper />
                                }
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-complaint/add"
                        element={
                            <Authorization
                                children={<AddDispositionComplaintWrappper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/disposition-complaint/:id"
                        element={
                            <Authorization
                                children={<EditDispositionComplaintWrappper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    {/* Dispositions ->NDR Disposition One */}
                    <Route
                        path="dispositions/ndr-disposition"
                        element={
                            <Authorization
                                children={<NdrDispositionListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* Dispositions ->NDR Disposition Add */}

                    <Route
                        path="dispositions/ndr-disposition/add"
                        element={
                            <Authorization
                                children={<AddNdrDispositionWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="dispositions/ndr-disposition/:id"
                        element={
                            <Authorization
                                children={<EditNdrDispositionWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* All Websites -> Websites */}
                    <Route
                        path="all-websites/website"
                        element={
                            <Authorization
                                children={<WebstieListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website/add"
                        element={
                            <Authorization
                                children={<AddWebsiteWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website/:id"
                        element={
                            <Authorization
                                children={<EditWebsiteWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* All Websites -> Websites Blog */}
                    <Route
                        path="all-websites/website-blog"
                        element={
                            <Authorization
                                children={<ListWebstieBlogWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-blog/add"
                        element={
                            <Authorization
                                children={<AddWebsiteBlogWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-blog/:id"
                        element={
                            <Authorization
                                children={<EditWebsiteBlogWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-blog/view/:id"
                        element={
                            <Authorization
                                children={<WebsiteBlogViewWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* All Websites -> Websites Page */}
                    <Route
                        path="all-websites/website-page"
                        element={
                            <Authorization
                                children={<WebsitePageListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-page/add"
                        element={
                            <Authorization
                                children={<AddWebsitePageWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-page/:id"
                        element={
                            <Authorization
                                children={<EditWebsitePageWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="all-websites/website-page/view/:id"
                        element={
                            <Authorization
                                children={<ViewWebsitePageWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />

                    {/* All Websites -> Websites Tags */}
                    <Route
                        path="/all-websites/website-tags"
                        element={
                            <Authorization
                                children={<WebsiteTagListingWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/all-websites/website-tags/add"
                        element={
                            <Authorization
                                children={<AddWebsiteTagsWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/all-websites/website-tags/edit/:id"
                        element={
                            <Authorization
                                children={<EditWebsiteTagWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/all-websites/website-tags/:id"
                        element={
                            <Authorization
                                children={<ViewWebsiteTagsWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
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
                            <Authorization
                                children={<AddVendorWarehouseWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
                            />
                        }
                    />
                    <Route
                        path="/dealers/:dealerId/sale-order/add-sale-order"
                        element={
                            <Authorization
                                children={<AddSaleOrderWrapper />}
                                permission={UserModuleNameTypes.NAV_DASHBOARD}
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
