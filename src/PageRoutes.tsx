// |-- External Dependencies --|
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// |-- Internal Dependencies --|
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Authorization from './Authorization'
import ComplainListingWrapper from './pages/Complain/List/ComplainListingWrapper'
import CustomerComplainWrapper from './pages/CustomerComplain/CustomerComplainWrapper'
import DealersRatioListingWrapper from './pages/DealerRatioMapping/list/DealersRatioListingWrapper'
import AsstesLayout from './pages/assets/AssetsLayout'
import BatchOrderView from './pages/batchOrder'
import AssigneBatchesListingWrapper from './pages/batchOrder/all/assignBatches/AssigneBatchesListingWrapper'
import AssigneBatchesViewListingWrapper from './pages/batchOrder/all/assignBatches/view/AssigneBatchesViewListingWrapper'
import CreateBatchOrderListingWrapper from './pages/batchOrder/all/createBatches/CreateBatchOrderListingWrapper'
import AddDealerNDRDetailsWrapper from './pages/callerpage/DealerNdr/AddDealerNDRDetailsWrapper'
import CourierNdrDialerPageWrapper from './pages/callerpage/courierNdrDialer/CourierNdrDialerPageWrapper'
import CustomerCarePageWrapper from './pages/callerpage/customerInbound/CustomerCarePageWrapper'
import CallerPageWrapper from './pages/callerpage/salesInbound/SalesPageWrapper'
import AddCallCenterMasterWrapper from './pages/configuration/ConfigurationScreens/callcenterMaster/add/AddCallCenterMasterWrapper'
import EditCallCenterMasterWrapper from './pages/configuration/ConfigurationScreens/callcenterMaster/edit/EditCallCenterMasterWrapper'
import CallCenterMasterListingWrapper from './pages/configuration/ConfigurationScreens/callcenterMaster/list/CallCenterMasterListingWrapper'
import AddCompanyBranchWrapper from './pages/configuration/ConfigurationScreens/companyBranch/add/AddCompanyBranchWrapper'
import EditCompanyBranchWrapper from './pages/configuration/ConfigurationScreens/companyBranch/edit/EditCompanyBranchWrapper'
import CompanyBranchListingWrapper from './pages/configuration/ConfigurationScreens/companyBranch/list/CompanyBranchListingWrapper'
import AddCourierPreferenceWrapper from './pages/configuration/ConfigurationScreens/preferenceCourier/add/AddCourierPreferenceWrapper'
import CourierPreferenceListingWrapper from './pages/configuration/ConfigurationScreens/preferenceCourier/list/CourierPreferenceListingWrapper'
import AddTransportWrapper from './pages/configuration/ConfigurationScreens/transport/add/AddTransportWrapper'
import EditTransportWrapper from './pages/configuration/ConfigurationScreens/transport/edit/EditTransportWrapper'
import TransportListingWrapper from './pages/configuration/ConfigurationScreens/transport/list/TransportListingWrapper'
import DealerInventoryListingWrapper from './pages/dealerInventory/list/DealerInventoryListingWrapper'
import DealerToDealerOrderListingWrapper from './pages/dealerTodealer/list/DealerToDealerOrderListingWrapper'
import DispositionLayout from './pages/disposition/DispositionLayout'
import AddNdrDispositionWrapper from './pages/disposition/ndrDisposition/add/AddNdrDispositionWrapper'
import EditNdrDispositionWrapper from './pages/disposition/ndrDisposition/edit/EditNdrDispositionWrapper'
import NdrDispositionListingWrapper from './pages/disposition/ndrDisposition/list/NdrDispositionListingWrapper'
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
    AddItemWrapper,
    AddLanguageWrapper,
    AddProductCategoryWrapper,
    AddProductGroupWrapper,
    AddProductSubCategoryWrapper,
    AddProductWrapper,
    AddPurchaseOrderTabWrapper,
    AddPurchaseOrderWrapper,
    AddSaleOrderWrapper,
    AddSchemeWrapper,
    AddSlotManagementWrapper,
    AddTapeManagementWrapper,
    AddUserWrapper,
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
    ConfigurationLayout,
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
    InventoryListingWrapper,
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
    UserAccessWrapper,
    UsersListingWrapper,
    VendorActivityTabWrapper,
    VendorGeneralInformationTabWrapper,
    VendorListLedgerTabWrapper,
    VendorPurchaseOrderTabWrapper,
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
import InventoryFlowListingWrapper from './pages/inventoryFlow/list/InventoryFlowListingWrapper'
import MappingTabsLayout from './pages/mapping/MappingTabsLayout'
import AddDealerToSchemeMappingWrapper from './pages/mapping/addDealerToScheme/AddDealerToSchemeMappingWrapper'
import AddSchemeToDealerMappingWrapper from './pages/mapping/addSchemeToDealer/AddSchemeToDealerMappingWrapper'
import MediaLayout from './pages/media/MediaLayout'
import ViewSlot from './pages/media/slotManagement'
import SlotRunViewsListingWrapper from './pages/media/slotManagement/slotRunView/SlotRunViewsListingWrapper'
import MultiOrderSearchListingWrapper from './pages/multiOrderSearch/list/MultiOrderSearchListingWrapper'
import OfferAppliedNdrListingWrapper from './pages/offerAppliedNdr/list/OfferAppliedNdrListingWrapper'
import ViewRequest from './pages/request'
import HouseArrestListingWrapper from './pages/request/all/houseArrest/HouseArrestListingWrapper'
import AddHouseArrestFormWrapper from './pages/request/all/houseArrest/add/AddHouseArrestFormWrapper'
import HouseArrestLogsListingWrapper from './pages/request/all/houseArrest/logs/HouseArrestLogsListingWrapper'
import HouseArrestViewWrapper from './pages/request/all/houseArrest/view/HouseArrestViewWrapper'
import MoneybackListingWrapper from './pages/request/all/moneybackTab/MoneybackListingWrapper'
import MoneybackLogsListingWrapper from './pages/request/all/moneybackTab/logs/MoneybackLogsListingWrapper'
import MoneyViewWrapper from './pages/request/all/moneybackTab/view/MoneyViewWrapper'
import ProductReplacementListingWrapper from './pages/request/all/productReplacement/ProductReplacementListingWrapper'
import ProductReplacementLogsListingWrapper from './pages/request/all/productReplacement/logs/ProductReplacementLogsListingWrapper'
import ProductReplacementViewWrapper from './pages/request/all/productReplacement/view/ProductReplacementViewWrapper'
import AddRTVendorWrapper from './pages/returnToVendor/add/AddRTVendorWrapper'
import EditRTVendorWrapper from './pages/returnToVendor/edit/EditRTVendorWrapper'
import RTVListingWrapper from './pages/returnToVendor/list/RTVListingWrapper'
import VenderInvoice from './pages/saleOrder/VenderInvoice'
import DispatchedInvoiceWrapper from './pages/saleOrder/list/components/DispatchedInvoiceWrapper'
import AddWarehouseTransferWrapper from './pages/transferToWarehouse/add/AddWarehouseTransferWrapper'
import EditWarehouseTransferWrapper from './pages/transferToWarehouse/edit/EditWarehouseTransferWrapper'
import WarehouseTransferListingWrapper from './pages/transferToWarehouse/list/WarehouseTransferListingWrapper'
import VendorRtvListingWrapper from './pages/vendors/view/tabs/ReturnToVendorTab/list/VendorRtvListingWrapper'
import WarehouseFirstCallDialerPageWrapper from './pages/warehouseFirstCallDialerPage/WarehouseFirstCallDialerPageWrapper'
import WarehouseAssignedOrderListingWrapper from './pages/warehouseFirstCallOrders/list/WarehouseAssignedOrderWrapper'
import WarehouseFirstCallPageWrapper from './pages/warehouseFirstCallOrders/warehouseFirstCall/WarehouseFirstCallPageWrapper'
import AddWarehouseToComapnyTransferWrapper from './pages/warehouseToCompany/add/AddWarehouseToComapnyTransferWrapper'
import EditWarehouseToComapnyWrapper from './pages/warehouseToCompany/edit/EditWarehouseToComapnyWrapper'
import WarehouseToComapnyListingWrapper from './pages/warehouseToCompany/list/WarehouseToComapnyListingWrapper'
import AddWarehouseToSampleWrapper from './pages/warehouseToSample/add/AddWarehouseToSampleWrapper'
import EditWarehouseToSampleWrapper from './pages/warehouseToSample/edit/EditWarehouseToSampleWrapper'
import WarehouseToSampleListingWrapper from './pages/warehouseToSample/list/WarehouseToSampleListingWrapper'
import FillCartonBoxInventoryWrapper from './pages/warehouses/view/inventories/cartonBox/FillCartonBoxInventoryWrapper'
import InwardsTabs from './pages/warehouses/view/inventories/inward'
import InwardCompanyTabsListingWrapper from './pages/warehouses/view/inventories/inward/Company/InwardCompanyTabsListingWrapper'
import InwardCustomerTabsListingWrapper from './pages/warehouses/view/inventories/inward/Customer/InwardCustomerTabsListingWrapper'
import InwardDealerTabsListingWrapper from './pages/warehouses/view/inventories/inward/Dealer/InwardDealerTabsListingWrapper'
import InwardEcomTabsListingWrapper from './pages/warehouses/view/inventories/inward/Ecom/InwardEcomTabsListingWrapper'
import InwardSampleTabsListingWrapper from './pages/warehouses/view/inventories/inward/Sample/InwardSampleTabsListingWrapper'
import InwardWarehouseTabsListingWrapper from './pages/warehouses/view/inventories/inward/Warehouse/InwardWarehouseTabsListingWrapper'
import OutwardTabs from './pages/warehouses/view/inventories/outward'
import OutwardWarehouseToComapnyListingWrapper from './pages/warehouses/view/inventories/outward/Company/list/OutwardWarehouseToComapnyListingWrapper'
import OutwardCustomerTabsListingWrapper from './pages/warehouses/view/inventories/outward/Customer/OutwardCustomerTabsListingWrapper'
import OutwardDealerTabsListingWrapper from './pages/warehouses/view/inventories/outward/Dealer/OutwardDealerTabsListingWrapper'
import OutwardEcomTabsListingWrapper from './pages/warehouses/view/inventories/outward/Ecom/OutwardEcomTabsListingWrapper'
import OutwardGpoOrdersTabListingWrapper from './pages/warehouses/view/inventories/outward/GpoOrders/OutwardGpoOrdersTabListingWrapper'
import OutwardRTVTabsListingWrapper from './pages/warehouses/view/inventories/outward/Rtv/list/OutwardRTVTabsListingWrapper'
import OutwardSampleTabsListingWrapper from './pages/warehouses/view/inventories/outward/Sample/OutwardSampleTabsListingWrapper'
import OutwardShipyaariOrdersTabListingWrapper from './pages/warehouses/view/inventories/outward/ShipyaariOrders/OutwardShipyaariOrdersTabListingWrapper'
import OutwardWarehouseTransferListingWrapper from './pages/warehouses/view/inventories/outward/Warehouse/list/OutwardWarehouseTransferListingWrapper'
import InventorisTabsLayout from './pages/warehouses/view/inventories/tabs'
import WebsitesLayout from './pages/websites/WebsiteLayout'
import Successfully from './pages/welcome/Successfully'
import Welcome from './pages/welcome/Welcome'
import {
    setAccessToken,
    setDeviceId,
    setRefreshToken,
    setUserData,
} from './redux/slices/authSlice'
import { UserModuleNameTypes } from './utils/mediaJson/userAccess'
import OrderCancelRequestListingWrapper from './pages/orderCancelRequest/list/OrderCancelRequestListingWrapper'
import AddOrderCancelRequestWrapper from './pages/orderCancelRequest/add/AddOrderCancelRequestWrapper'
import EditOrderCancelRequestWrapper from './pages/orderCancelRequest/edit/EditOrderCancelRequestWrapper'
import WarehouseOrderStatusOverviewWrapper from './pages/warehouses/view/inventories/outward/warehouseStatus/WarehouseOrderStatusOverviewWrapper'
import GpoAwbListingWrapper from './pages/configuration/ConfigurationScreens/gpoAwb/list/GpoAwbListingWrapper'
import GpoInvoiceAndLabelWrapper from './Receipt/GpoInvoiceAndLabelWrapper'
import MenifestFormat from './Receipt/MenifestFormat'
import CourierReturnabsListingWrapper from './pages/warehouses/view/inventories/inward/CourierReturn/list/CourierReturnabsListingWrapper'
import AddCourierReturnWrapper from './pages/warehouses/view/inventories/inward/CourierReturn/add/AddCourierReturnWrapper'
import InwardInventoryOverview from './pages/warehouses/view/inventories/inward/overView/InwardInventoryOverview'
import BarcodeDestroySearchListingWrapper from './pages/warehouses/view/inventories/barcodedestroy/list/BarcodeDestroySearchListingWrapper'

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
        <BrowserRouter>
            <Routes>
                <Route
                    path="/welcome"
                    element={
                        <Authorization
                            children={<Welcome />}
                            permission={UserModuleNameTypes.NAV_WELCOME}
                        />
                    }
                />

                <Route path="/vendor-invoice" element={<VenderInvoice />} />

                {/* Login */}
                <Route path="/" element={<Auth />} />
                {/* Page not found */}
                <Route path="*" element={<PageNotFound />} />
                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <Authorization
                            children={<DashboardWrappper />}
                            permission={UserModuleNameTypes.NAV_DASHBOARD}
                        />
                    }
                />
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
                <Route
                    path="/vendors/add-vendor"
                    element={
                        <Authorization
                            children={<AddVendorWrapper />}
                            permission={UserModuleNameTypes.ACTION_VENDOR_ADD}
                        />
                    }
                />
                <Route
                    path="/vendors/edit-vendor/:id"
                    element={
                        <Authorization
                            children={<EditVendorWrapper />}
                            permission={UserModuleNameTypes.ACTION_VENDOR_EDIT}
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
                            permission={UserModuleNameTypes.ACTION_DEALER_ADD}
                        />
                    }
                />
                <Route
                    path="/dealers/edit-dealer/:id"
                    element={
                        <Authorization
                            children={<EditDealerWrapper />}
                            permission={UserModuleNameTypes.ACTION_DEALER_EDIT}
                        />
                    }
                />
                {/* dealer view */}
                <Route
                    path="/dealers/:dealerId"
                    element={
                        <Authorization
                            children={<ViewDealer />}
                            permission={UserModuleNameTypes.ACTION_DEALER_VIEW}
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
                                    UserModuleNameTypes.ACTION_WAREHOUSE_EDIT
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
                                children={<DealerOrderLedgerListTabWrapper />}
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
                                    UserModuleNameTypes.ACTION_DEALER_DEALER_SCHEME_EDIT
                                }
                            />
                        }
                    />
                </Route>

                {/* Dealer-Ratio */}
                <Route
                    path="/dealers-ratio"
                    element={
                        <Authorization
                            children={<DealersRatioListingWrapper />}
                            permission={UserModuleNameTypes.NAV_DELEAR_RATIO}
                        />
                    }
                />

                {/* Dealers-inventory */}
                <Route
                    path="/dealers-inventory"
                    element={
                        <Authorization
                            children={<DealerInventoryListingWrapper />}
                            permission={
                                UserModuleNameTypes.NAV_DEALERS_INVENTORY
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
                            permission={UserModuleNameTypes.ACTION_USER_EDIT}
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
                        path="expiry-barcode"
                        element={
                            <Authorization
                                children={
                                    <BarcodeDestroySearchListingWrapper />
                                }
                                permission={UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_EXPIRY_BARCODE}
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
                        path="inventories/inward-inventory/cartonbox"
                        element={
                            <Authorization
                                children={<FillCartonBoxInventoryWrapper />}
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
                            path="warehouse-status"
                            element={
                                <Authorization
                                    children={
                                        <WarehouseOrderStatusOverviewWrapper />
                                    }
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_STATUS
                                    }
                                />
                            }
                        />
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
                                    children={<OutwardRTVTabsListingWrapper />}
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
                                    children={<OutwardEcomTabsListingWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE
                                    }
                                />
                            }
                        />
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
                        <Route
                            path="gpo"
                            element={
                                <Authorization
                                    children={
                                        <OutwardGpoOrdersTabListingWrapper />
                                    }
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_GPO
                                    }
                                />
                            }
                        />

                        <Route
                            path="shipyaari-orders"
                            element={
                                <Authorization
                                    children={
                                        <OutwardShipyaariOrdersTabListingWrapper />
                                    }
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS
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
                                    UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INVENTORIES
                                }
                            />
                        }
                    >
                        <Route
                            path="inventory-overview"
                            element={
                                <Authorization
                                    children={<InwardInventoryOverview />}
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_DEALER
                                    }
                                />
                            }
                        />
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
                                    children={<InwardEcomTabsListingWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_WAREHOUSE
                                    }
                                />
                            }
                        />

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
                        <Route
                            path="courier-return"
                            element={
                                <Authorization
                                    children={
                                        <CourierReturnabsListingWrapper />
                                    }
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_COURIER_RETURN
                                    }
                                />
                            }
                        />
                        <Route
                            path="courier-return/add"
                            element={
                                <Authorization
                                    children={<AddCourierReturnWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_COURIER_RETURN_ADD
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
                            permission={UserModuleNameTypes.NAV_INVENTORY_FLOW}
                        />
                    }
                />

                {/* Mapping Module */}
                <Route
                    path="/mapping"
                    element={
                        <Authorization
                            children={<MappingTabsLayout />}
                            permission={UserModuleNameTypes.NAV_MULTI_MAPPING}
                        />
                    }
                >
                    <Route
                        index
                        path="scheme-to-dealer"
                        element={
                            // <AddSchemeToDealerMappingWrapper />
                            <Authorization
                                children={<AddSchemeToDealerMappingWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_SCHEME_TO_DEALER_MAPPING_TAB
                                }
                            />
                        }
                    />
                    <Route
                        index
                        path="dealer-to-scheme"
                        element={
                            // <AddDealerToSchemeMappingWrapper />
                            <Authorization
                                children={<AddDealerToSchemeMappingWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DEALER_TO_SCHEME_MAPPING_TAB
                                }
                            />
                        }
                    />
                </Route>

                {/* Warehouse First Call */}
                <Route
                    path="/warehouse-first-call-orders"
                    element={
                        <Authorization
                            children={<WarehouseAssignedOrderListingWrapper />}
                            permission={
                                UserModuleNameTypes.ACTION_WAREHOUSE_FIRST_CALL_ORDERS_TAB_LIST
                            }
                        />
                    }
                />

                {/* Dealer To Dealer Request */}
                <Route
                    path="/dealer-to-dealer"
                    element={
                        <Authorization
                            children={<DealerToDealerOrderListingWrapper />}
                            permission={
                                UserModuleNameTypes.NAV_DEALER_TO_DEALER
                            }
                        />
                    }
                />
                {/* Add */}
                {/* <Route
                    path="/dealer-to-dealer/add"
                    element={
                        <Authorization
                            children={<AddDealerToDealerOrderWrapper />}
                            permission={
                                UserModuleNameTypes.ACTION_SALE_ORDER_ADD
                            }
                        />
                    }
                /> */}

                {/* <Route
                    path="/dealer-to-dealer/:id"
                    element={
                        <Authorization
                            children={<EditDealerToDealerOrderWrapper />}
                            permission={
                                UserModuleNameTypes.ACTION_SALE_ORDER_EDIT
                            }
                        />
                    }
                /> */}

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
                {/* Sale Order Invoice */}
                <Route
                    path="/sale-order/:id/invoice"
                    element={<DispatchedInvoiceWrapper />}
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
                                UserModuleNameTypes.NAV_WAREHOUSE_TRANSFER
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
                                UserModuleNameTypes.ACTION_WAREHOUSE_TRANSFER_ADD
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
                                UserModuleNameTypes.ACTION_WAREHOUSE_TRANSFER_EDIT
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
                            children={<AddWarehouseToComapnyTransferWrapper />}
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
                            permission={
                                UserModuleNameTypes.ACTION_WAREHOUSE_TO_COMPANY_TRANSFER_EDIT
                            }
                        />
                    }
                />

                {/* WAREHOUSE TO SAMPLE Transfer */}
                <Route
                    path="/warehouse-to-sample"
                    element={
                        <Authorization
                            children={<WarehouseToSampleListingWrapper />}
                            permission={
                                UserModuleNameTypes.NAV_WAREHOUSE_TO_SAMPLE
                            }
                        />
                    }
                />
                <Route
                    path="/warehouse-to-sample/add"
                    element={
                        <Authorization
                            children={<AddWarehouseToSampleWrapper />}
                            permission={
                                UserModuleNameTypes.ACTION_WAREHOUSE_TO_SAMPLE_ADD
                            }
                        />
                    }
                />
                <Route
                    path="/warehouse-to-sample/edit/:id"
                    element={
                        <Authorization
                            children={<EditWarehouseToSampleWrapper />}
                            permission={
                                UserModuleNameTypes.ACTION_WAREHOUSE_TO_SAMPLE_EDIT
                            }
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
                            permission={UserModuleNameTypes.ACTION_ASR_ADD}
                        />
                    }
                />
                <Route
                    path="/asr/:id"
                    element={
                        <Authorization
                            children={<EditASRWrapper />}
                            permission={UserModuleNameTypes.ACTION_ASR_EDIT}
                        />
                    }
                />

                {/* Purchase Order */}
                <Route
                    path="/purchase-order"
                    element={
                        <Authorization
                            children={<PurchaseOrderListingWrapper />}
                            permission={UserModuleNameTypes.NAV_PURCHASE_ORDER}
                        />
                    }
                />
                <Route
                    path="/purchase-order/add"
                    element={
                        <Authorization
                            children={<AddPurchaseOrderWrapper />}
                            permission={
                                UserModuleNameTypes.ACTION_PURCHASE_ORDER_ADD
                            }
                        />
                    }
                />
                <Route
                    path="/purchase-order/view/:id"
                    element={
                        <Authorization
                            children={<ViewPurchaseOrderWrapper />}
                            permission={UserModuleNameTypes.NAV_PURCHASE_ORDER}
                        />
                    }
                />
                <Route
                    path="/purchase-order/edit/:id"
                    element={
                        <Authorization
                            children={<EditPurchaseOrderWrapper />}
                            permission={
                                UserModuleNameTypes.ACTION_PURCHASE_ORDER_EDIT
                            }
                        />
                    }
                />

                {/* GRN */}
                <Route
                    path="/grn"
                    element={
                        <Authorization
                            children={<GRNListingWrapper />}
                            permission={UserModuleNameTypes.NAV_GRN}
                        />
                    }
                />

                <Route
                    path="/grn/add"
                    element={
                        <Authorization
                            children={<AddGRNWrapper />}
                            permission={UserModuleNameTypes.ACTION_GRN_ADD}
                        />
                    }
                />
                {/* Multi Order Search */}
                <Route
                    path="/multi-order-search"
                    element={
                        <Authorization
                            children={<MultiOrderSearchListingWrapper />}
                            permission={
                                UserModuleNameTypes.NAV_MUILTI_ORDER_SEARCH
                            }
                        />
                    }
                ></Route>

                {/* Orders listing Dashboard and View */}
                <Route
                    path="/orders"
                    element={
                        <Authorization
                            children={<Order />}
                            permission={UserModuleNameTypes.NAV_ORDER}
                        />
                    }
                />

                <Route path="/orders/view/:id" element={<OrderViewWrapper />} />

                {/* Orders Cancel Request */}
                <Route
                    path="/order-cancel-request"
                    element={
                        <Authorization
                            children={<OrderCancelRequestListingWrapper />}
                            permission={
                                UserModuleNameTypes.NAV_ORDER_CANCEL_REQUEST
                            }
                        />
                    }
                />

                <Route
                    path="/order-cancel-request/add"
                    element={
                        <Authorization
                            children={<AddOrderCancelRequestWrapper />}
                            permission={
                                UserModuleNameTypes.ACTION_ORDER_CANCEL_REQUEST_ADD
                            }
                        />
                    }
                />
                <Route
                    path="/order-cancel-request/:id"
                    element={
                        <Authorization
                            children={<EditOrderCancelRequestWrapper />}
                            permission={
                                UserModuleNameTypes.ACTION_ORDER_CANCEL_REQUEST_EDIT
                            }
                        />
                    }
                />

                {/* Batch */}
                <Route
                    path="/batch"
                    element={
                        <Authorization
                            children={<BatchOrderView />}
                            permission={UserModuleNameTypes.NAV_BATCH_ORDER}
                        />
                    }
                >
                    {/* Create Batch */}
                    <Route
                        path="create-batch"
                        element={
                            <Authorization
                                children={<CreateBatchOrderListingWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_BATCH_ORDER_CREATE_BATCH_TAB
                                }
                            />
                        }
                    />
                    <Route
                        path="assign-batches"
                        element={
                            <Authorization
                                children={<AssigneBatchesListingWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_BATCH_ORDER_ASSIGN_BATCH_TAB
                                }
                            />
                        }
                    />
                    {/* view assign batches */}
                    <Route
                        path="assign-batches/:id"
                        element={<AssigneBatchesViewListingWrapper />}
                    />
                </Route>

                {/* Call */}
                <Route
                    path="/call"
                    element={
                        <Authorization
                            children={<CallListingWrapper />}
                            permission={UserModuleNameTypes.NAV_CALL}
                        />
                    }
                />

                {/* Configurations -> Attributes */}
                <Route
                    path="/configurations"
                    element={
                        <Authorization
                            children={<ConfigurationLayout />}
                            permission={UserModuleNameTypes.NAV_CONFIGURATION}
                        />
                    }
                >
                    <Route
                        path="attributes"
                        element={
                            <Authorization
                                children={<AttributesListingWrapper />}
                                permission={UserModuleNameTypes.NAV_ATTRIBUTE}
                            />
                        }
                    />
                    <Route
                        path="attributes/add"
                        element={
                            <Authorization
                                children={<AddAttributeWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ATTRIBUTE_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="attributes/:id"
                        element={
                            <Authorization
                                children={<EditAttributeWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ATTRIBUTE_EDIT
                                }
                            />
                        }
                    />
                    {/* Configurations -> Attributes Group */}
                    <Route
                        path="attributes-group"
                        element={
                            <Authorization
                                children={<AttributesGroupListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_ATTRIBUTE_GROUP
                                }
                            />
                        }
                    />

                    <Route
                        path="attributes-group/add"
                        element={
                            <Authorization
                                children={<AddAttributeGroupWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ATTRIBUTE_GROUP_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="attributes-group/:id"
                        element={
                            <Authorization
                                children={<EditAttributeGroupWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ATTRIBUTE_GROUP_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> Product Category */}
                    <Route
                        path="product-category"
                        element={
                            <Authorization
                                children={<ProductCategoryListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_PRODUCT_CATEGORY
                                }
                            />
                        }
                    />
                    <Route
                        path="product-category/add"
                        element={
                            <Authorization
                                children={<AddProductCategoryWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_PRODUCT_CATEGORY_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="product-category/:id"
                        element={
                            <Authorization
                                children={<EditProductCategoryWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_PRODUCT_CATEGORY_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> Product Sub Category */}
                    <Route
                        path="product-sub-category"
                        element={
                            <Authorization
                                children={<ProductSubCategoryListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_PRODUCT_SUB_CATEGORY
                                }
                            />
                        }
                    />
                    <Route
                        path="product-sub-category/add"
                        element={
                            <Authorization
                                children={<AddProductSubCategoryWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_PRODUCT_SUB_CATEGORY_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="product-sub-category/:id"
                        element={
                            <Authorization
                                children={<EditProductSubCategoryWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_PRODUCT_SUB_CATEGORY_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> Product Group */}
                    <Route
                        path="product-group"
                        element={
                            <Authorization
                                children={<ProductGroupListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_PRODUCT_GROUP
                                }
                            />
                        }
                    />

                    <Route
                        path="product-group/add"
                        element={
                            <Authorization
                                children={<AddProductGroupWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_PRODUCT_GROUP_ADD
                                }
                            />
                        }
                    />

                    <Route
                        path="product-group/:id"
                        element={
                            <Authorization
                                children={<EditProductGroupWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_PRODUCT_GROUP_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> Scheme */}
                    <Route
                        path="scheme"
                        element={
                            <Authorization
                                children={<SchemeListingWrapper />}
                                permission={UserModuleNameTypes.NAV_SCHEME}
                            />
                        }
                    />
                    <Route
                        path="scheme/add"
                        element={
                            <Authorization
                                children={<AddSchemeWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_SCHEME_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="scheme/:id"
                        element={
                            <Authorization
                                children={<EditSchemeWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_SCHEME_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> Item */}
                    <Route
                        path="item"
                        element={
                            <Authorization
                                children={<ItemListingWrapper />}
                                permission={UserModuleNameTypes.NAV_ITEMS}
                            />
                        }
                    />
                    <Route
                        path="item/add"
                        element={
                            <Authorization
                                children={<AddItemWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ITEMS_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="item/:id"
                        element={
                            <Authorization
                                children={<EditItemWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ITEMS_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> Products */}
                    <Route
                        path="products"
                        element={
                            <Authorization
                                children={<ProductsListingWrapper />}
                                permission={UserModuleNameTypes.NAV_PRODUCTS}
                            />
                        }
                    />

                    <Route
                        path="products/add"
                        element={
                            <Authorization
                                children={<AddProductWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_PRODUCTS_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="product/:id"
                        element={
                            <Authorization
                                children={<EditProductWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_PRODUCTS_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> Carton Box */}
                    <Route
                        path="carton-box"
                        element={
                            <Authorization
                                children={<CartonBoxListingWrapper />}
                                permission={UserModuleNameTypes.NAV_CARTON_BOX}
                            />
                        }
                    />
                    <Route
                        path="carton-box/add"
                        element={
                            <Authorization
                                children={<AddCartonBoxWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_CARTON_BOX_ADD
                                }
                            />
                        }
                    />

                    <Route
                        path="carton-box/:id"
                        element={
                            <Authorization
                                children={<EditCartonBoxWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_CARTON_BOX_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> Company */}
                    <Route
                        path="company"
                        element={
                            <Authorization
                                children={
                                    <ConfigurationCompanyListingWrapper />
                                }
                                permission={UserModuleNameTypes.NAV_COMPANY}
                            />
                        }
                    />
                    <Route
                        path="company/add"
                        element={
                            <Authorization
                                children={<AddCompanyWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_COMPANY_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="company/:id"
                        element={
                            <Authorization
                                children={<EditCompanyWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_COMPANY_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> CompanyBranch */}
                    <Route
                        path="company-branch"
                        element={
                            <Authorization
                                children={<CompanyBranchListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_COMPANY_BRANCH
                                }
                            />
                        }
                    />
                    <Route
                        path="company-branch/add"
                        element={
                            <Authorization
                                children={<AddCompanyBranchWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_COMPANY_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="company-branch/:id"
                        element={
                            <Authorization
                                children={<EditCompanyBranchWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_COMPANY_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> Barcode */}
                    <Route
                        path="barcode"
                        element={
                            <Authorization
                                children={<BarcodeListingWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_BARCODE_LIST_TAB
                                }
                            />
                        }
                    />
                    <Route
                        path="barcode/add"
                        element={
                            <Authorization
                                children={<AddBarcodeWrapper />}
                                permission={UserModuleNameTypes.NAV_BARCODE}
                            />
                        }
                    />
                    <Route
                        path="barcode/carton-box-items/:cartonboxcode"
                        element={
                            <Authorization
                                children={<ViewBarcodeWrapper />}
                                permission={UserModuleNameTypes.NAV_BARCODE}
                            />
                        }
                    />

                    <Route
                        path="barcode/carton-box/add"
                        element={
                            <Authorization
                                children={<AddCbBarcodeWrapper />}
                                permission={UserModuleNameTypes.NAV_BARCODE}
                            />
                        }
                    />

                    <Route
                        path="barcode/:barcodeId"
                        element={
                            <Authorization
                                children={<ViewBarcodeWrapper />}
                                permission={UserModuleNameTypes.NAV_BARCODE}
                            />
                        }
                    />

                    <Route
                        path="courier-preference/add"
                        element={
                            <Authorization
                                children={<AddCourierPreferenceWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_COURIER_PREFERENCE_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="courier-preference"
                        element={
                            <Authorization
                                children={<CourierPreferenceListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_COURIER_PREFERENCE
                                }
                            />
                        }
                    />
                    {/* transport */}
                    <Route
                        path="transport/add"
                        element={
                            <Authorization
                                children={<AddTransportWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_TRANSPORT_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="transport/:id"
                        element={
                            <Authorization
                                children={<EditTransportWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_TRANSPORT_EDIT
                                }
                            />
                        }
                    />
                    <Route
                        path="transport"
                        element={
                            <Authorization
                                children={<TransportListingWrapper />}
                                permission={UserModuleNameTypes.NAV_TRANSPORT}
                            />
                        }
                    />

                    {/* Gpo Awb */}
                    <Route
                        path="gpo-awb"
                        element={
                            <Authorization
                                children={<GpoAwbListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_GPO_AWB_NUMBER
                                }
                            />
                        }
                    />

                    {/* Configurations -> Location */}
                    <Route
                        path="location"
                        element={
                            <Authorization
                                children={<Locations />}
                                permission={UserModuleNameTypes.NAV_LOCATION}
                            />
                        }
                    />

                    {/* Configurations -> Language */}
                    <Route
                        path="language"
                        element={
                            <Authorization
                                children={<LanguageListingWrapper />}
                                permission={UserModuleNameTypes.NAV_LANGUAGE}
                            />
                        }
                    />
                    <Route
                        path="language/add"
                        element={
                            <Authorization
                                children={<AddLanguageWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_LANGUAGE_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="language/:id"
                        element={
                            <Authorization
                                children={<EditLanguageWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_LANGUAGE_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> Dealers Category */}
                    <Route
                        path="dealers-category"
                        element={
                            <Authorization
                                children={<DealersCategoryListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_DEALERS_CATEGORY
                                }
                            />
                        }
                    />
                    <Route
                        path="dealers-category/add"
                        element={
                            <Authorization
                                children={<AddDealersCategoryWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DEALERS_CATEGORY_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="dealers-category/:id"
                        element={
                            <Authorization
                                children={<EditDealersCategoryWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DEALERS_CATEGORY_EDIT
                                }
                            />
                        }
                    />
                    {/* Configurations -> call center master */}
                    <Route
                        path="callcenter-master"
                        element={
                            <Authorization
                                children={<CallCenterMasterListingWrapper />}
                                permission={UserModuleNameTypes.NAV_CALL_CENTER}
                            />
                        }
                    />
                    <Route
                        path="callcenter-master/add"
                        element={
                            <Authorization
                                children={<AddCallCenterMasterWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_CALL_CENTER_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="callcenter-master/:id"
                        element={
                            <Authorization
                                children={<EditCallCenterMasterWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_CALL_CENTER_ONE_EDIT
                                }
                            />
                        }
                    />

                    {/* Configurations -> Hierarchy */}
                    <Route
                        path="hierarchy"
                        element={<OrganisationHierarchy />}
                    />
                    <Route path="user-access" element={<UserAccessWrapper />} />
                </Route>

                {/* Media -> Channel Group */}
                <Route
                    path="/media"
                    element={
                        <Authorization
                            children={<MediaLayout />}
                            permission={UserModuleNameTypes.NAV_MEDIA}
                        />
                    }
                >
                    <Route
                        path="channel-group"
                        element={
                            <Authorization
                                children={<ChannelGroupListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_CHANNEL_GROUP
                                }
                            />
                        }
                    />
                    <Route
                        path="channel-group/add"
                        element={
                            <Authorization
                                children={<AddChannelGroupWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_CHANNEL_GROUP_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="channel-group/:id"
                        element={
                            <Authorization
                                children={<EditChannelGroupWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_CHANNEL_GROUP_EDIT
                                }
                            />
                        }
                    />

                    {/* Media -> Channel Category */}
                    <Route
                        path="channel-category"
                        element={
                            <Authorization
                                children={<ChannelCategoryListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_CHANNEL_CATEGORY
                                }
                            />
                        }
                    />
                    <Route
                        path="channel-category/add"
                        element={
                            <Authorization
                                children={<AddChannelCategoryWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_CHANNEL_CATEGORY_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="channel-category/edit/:id"
                        element={
                            <Authorization
                                children={<EditChannelCategoryWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_CHANNEL_CATEGORY_EDIT
                                }
                            />
                        }
                    />

                    {/* Media -> Channel */}
                    <Route
                        path="channel"
                        element={
                            <Authorization
                                children={<ChannelManagementListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_CHANNEL_MANAGEMENT
                                }
                            />
                        }
                    />
                    <Route
                        path="channel/add"
                        element={
                            <Authorization
                                children={<AddChannelManagementWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_CHANNEL_MANAGEMENT_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="channel/:id"
                        element={
                            <Authorization
                                children={<EditChannelManagementWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_CHANNEL_MANAGEMENT_EDIT
                                }
                            />
                        }
                    />

                    {/* Media -> Did Management */}
                    <Route
                        path="did"
                        element={
                            <Authorization
                                children={<DidManagementListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_DID_MANAGEMENT
                                }
                            />
                        }
                    />
                    <Route
                        path="did/add"
                        element={
                            <Authorization
                                children={<AddDidManagementWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DID_MANAGEMENT_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="did/:id"
                        element={
                            <Authorization
                                children={<EditDidManagementWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DID_MANAGEMENT_EDIT
                                }
                            />
                        }
                    />

                    {/* Media -> Artist */}
                    <Route
                        path="artist"
                        element={
                            <Authorization
                                children={<ArtistListingWrapper />}
                                permission={UserModuleNameTypes.NAV_ARTIST}
                            />
                        }
                    />
                    <Route
                        path="artist/add"
                        element={
                            <Authorization
                                children={<AddArtistWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ARTIST_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="artist/:id"
                        element={
                            <Authorization
                                children={<EditArtistWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ARTIST_EDIT
                                }
                            />
                        }
                    />

                    {/* Media -> Tap Management */}
                    <Route
                        path="tape"
                        element={
                            <Authorization
                                children={<TapeManagementListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_TAPE_MANAGEMENT
                                }
                            />
                        }
                    />
                    <Route
                        path="tape/add"
                        element={
                            <Authorization
                                children={<AddTapeManagementWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_TAPE_MANAGEMENT_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="tape/edit/:id"
                        element={
                            <Authorization
                                children={<EditTapeManagementWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_TAPE_MANAGEMENT_EDIT
                                }
                            />
                        }
                    />

                    {/* Media -> Competitor */}
                    <Route
                        path="competitor"
                        element={
                            <Authorization
                                children={
                                    <CompetitorManagementListingWrapper />
                                }
                                permission={UserModuleNameTypes.NAV_COMPETITOR}
                            />
                        }
                    />
                    <Route
                        path="competitor/add"
                        element={
                            <Authorization
                                children={<AddCompetitorWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_COMPETITOR_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="competitor/:id"
                        element={
                            <Authorization
                                children={<EditCompetitorWraper />}
                                permission={
                                    UserModuleNameTypes.ACTION_COMPETITOR_EDIT
                                }
                            />
                        }
                    />

                    {/* Media -> Slot */}
                    {/* Orders */}
                    <Route
                        path="slot"
                        element={
                            <Authorization
                                children={<ViewSlot />}
                                permission={
                                    UserModuleNameTypes.NAV_SLOT_MANAGEMENT
                                }
                            />
                        }
                    >
                        <Route
                            path="defination"
                            element={
                                <Authorization
                                    children={<SlotManagementListingWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_SLOT_MANAGEMENT_DEFINATION_LIST
                                    }
                                />
                            }
                        />
                        <Route
                            path="add"
                            element={
                                <Authorization
                                    children={<AddSlotManagementWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_SLOT_MANAGEMENT_ADD
                                    }
                                />
                            }
                        />
                        <Route
                            path="edit/:id"
                            element={
                                <Authorization
                                    children={<EditSlotManagementWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_SLOT_MANAGEMENT_EDIT
                                    }
                                />
                            }
                        />
                        <Route
                            path="view/:id"
                            element={
                                <Authorization
                                    children={<OrderViewWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_SLOT_MANAGEMENT_VIEW
                                    }
                                />
                            }
                        />
                        <Route
                            path="run-slots"
                            element={
                                <Authorization
                                    children={<SlotRunViewsListingWrapper />}
                                    permission={
                                        UserModuleNameTypes.ACTION_SLOT_MANAGEMENT_SLOTS_RUN_LIST
                                    }
                                />
                            }
                        />
                    </Route>
                </Route>

                {/* Media -> Inbound Or Caller Page & Customer Page */}
                <Route
                    path="/media/caller-page"
                    element={<CallerPageWrapper />}
                />

                {/* Calling outcall Dialer page */}
                <Route
                    path="/calling-outcall"
                    element={<WarehouseFirstCallDialerPageWrapper />}
                />

                {/* Dealer NDR Page */}
                <Route
                    path="media/dealer-ndrcalling"
                    element={<AddDealerNDRDetailsWrapper />}
                />

                <Route
                    path="/media/customer-care"
                    element={<CustomerCarePageWrapper />}
                />

                <Route
                    path="/media/courier-ndr"
                    element={<CourierNdrDialerPageWrapper />}
                />

                {/* Assets -> Assets Management */}
                <Route
                    path="assets"
                    element={
                        <Authorization
                            children={<AsstesLayout />}
                            permission={UserModuleNameTypes.NAV_ASSETS}
                        />
                    }
                >
                    <Route
                        path="assets-request"
                        element={
                            <Authorization
                                children={<AssetsRequestWrapper />}
                                permission={UserModuleNameTypes.NAV_ASSETS}
                            />
                        }
                    />
                    <Route
                        path="assets-request/add"
                        element={
                            <Authorization
                                children={<AddAssetsRequestWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ASSETS_REQUEST_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="assets-request/:id"
                        element={
                            <Authorization
                                children={<EditAssetsRequestwrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ASSETS_REQUEST_ONE_EDIT
                                }
                            />
                        }
                    />

                    {/* Assets -> Assets Category */}
                    <Route
                        path="assets-category"
                        element={
                            <Authorization
                                children={<AssetsCategoryWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_ASSETS_CATEGORY
                                }
                            />
                        }
                    />
                    <Route
                        path="assets-category/add"
                        element={
                            <Authorization
                                children={<AddAssetsCategoryWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ASSETS_CATEGORY_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="assets-category/:id"
                        element={
                            <Authorization
                                children={<EditAssetsCategoryWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ASSETS_CATEGORY_ONE_EDIT
                                }
                            />
                        }
                    />

                    {/* Assets -> Assets Location */}
                    <Route
                        path="assets-location"
                        element={
                            <Authorization
                                children={<AssetsLocationWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_ASSETS_LOCATION
                                }
                            />
                        }
                    />
                    <Route
                        path="assets-location/add"
                        element={
                            <Authorization
                                children={<AddAssetsLocationWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ASSETS_LOCATION_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="assets-location/:id"
                        element={
                            <Authorization
                                children={<EditAssetsLocatonWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ASSETS_LOCATION_ONE_EDIT
                                }
                            />
                        }
                    />

                    {/* Assets -> Assets Relocation */}
                    <Route
                        path="assets-relocation"
                        element={
                            <Authorization
                                children={<AssetsRelocationWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_ASSETS_RELOCATION
                                }
                            />
                        }
                    />

                    <Route
                        path="assets-relocation/add"
                        element={
                            <Authorization
                                children={<AddAssetsRelocationWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ASSETS_RELOCATION_ADD
                                }
                            />
                        }
                    />

                    {/* Assets -> Assets Allocation */}
                    <Route
                        path="assets-allocation"
                        element={
                            <Authorization
                                children={<AssetsAllocationWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_ASSETS_ALLOCATION
                                }
                            />
                        }
                    />
                    <Route
                        path="assets-allocation/add"
                        element={
                            <Authorization
                                children={<AddAssetsAllocationWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_ASSETS_ALLOCATION_ADD
                                }
                            />
                        }
                    />
                </Route>
                {/* Customer Complain */}
                <Route
                    path="/customer-complain"
                    element={
                        <Authorization
                            children={<CustomerComplainWrapper />}
                            permission={
                                UserModuleNameTypes.NAV_CUSTOMER_COMPLAIN
                            }
                        />
                    }
                />

                <Route
                    path="/warehouse-first-call/:id"
                    element={
                        <Authorization
                            children={<WarehouseFirstCallPageWrapper />}
                            permission={
                                UserModuleNameTypes.NAV_WAREHOUSE_FIRST_CALL_ORDERS
                            }
                        />
                    }
                />

                {/* Request Tabs */}
                <Route
                    path="/request"
                    element={
                        <Authorization
                            children={<ViewRequest />}
                            permission={UserModuleNameTypes.NAV_REQUEST}
                        />
                    }
                >
                    {/* Moneyback Requets */}
                    <Route
                        path="moneyback"
                        element={
                            <Authorization
                                children={<MoneybackListingWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_MONEY_BACK_TAB
                                }
                            />
                        }
                    />

                    <Route
                        path="moneyback/:id/view"
                        element={
                            <MoneyViewWrapper />
                            // <Authorization
                            //     children={
                            //         <DealerGeneralInformationTabWrapper />
                            //     }
                            //     permission={
                            //         UserModuleNameTypes.ACTION_DEALER_GENERAL_INFORMATION
                            //     }
                            // />
                        }
                    />

                    <Route
                        index
                        path="moneyback/:id/logs"
                        element={
                            <MoneybackLogsListingWrapper />
                            // <Authorization
                            //     children={
                            //         <DealerGeneralInformationTabWrapper />
                            //     }
                            //     permission={
                            //         UserModuleNameTypes.ACTION_DEALER_GENERAL_INFORMATION
                            //     }
                            // />
                        }
                    />

                    {/* Product Replacement Requets */}
                    <Route
                        path="product-replacement"
                        element={
                            <Authorization
                                children={<ProductReplacementListingWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_PRODUCT_REPLACMENT_TAB
                                }
                            />
                        }
                    />
                    <Route
                        index
                        path="product-replacement/:id/view"
                        element={
                            <ProductReplacementViewWrapper />
                            // <Authorization
                            //     children={
                            //         <DealerGeneralInformationTabWrapper />
                            //     }
                            //     permission={
                            //         UserModuleNameTypes.ACTION_DEALER_GENERAL_INFORMATION
                            //     }
                            // />
                        }
                    />
                    <Route
                        index
                        path="product-replacement/:id/logs"
                        element={
                            <ProductReplacementLogsListingWrapper />
                            // <Authorization
                            //     children={
                            //         <DealerGeneralInformationTabWrapper />
                            //     }
                            //     permission={
                            //         UserModuleNameTypes.ACTION_DEALER_GENERAL_INFORMATION
                            //     }
                            // />
                        }
                    />

                    {/* House Arrest */}
                    <Route
                        index
                        path="house-arrest"
                        element={
                            <Authorization
                                children={<HouseArrestListingWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_HOUSE_ARREST_TAB
                                }
                            />
                        }
                    />
                    <Route
                        index
                        path="house-arrest/add"
                        element={
                            <AddHouseArrestFormWrapper />
                            // <Authorization
                            //     children={
                            //         <DealerGeneralInformationTabWrapper />
                            //     }
                            //     permission={
                            //         UserModuleNameTypes.ACTION_DEALER_GENERAL_INFORMATION
                            //     }
                            // />
                        }
                    />
                    <Route
                        index
                        path="house-arrest/:id/view"
                        element={
                            <HouseArrestViewWrapper />
                            // <Authorization
                            //     children={
                            //         <DealerGeneralInformationTabWrapper />
                            //     }
                            //     permission={
                            //         UserModuleNameTypes.ACTION_DEALER_GENERAL_INFORMATION
                            //     }
                            // />
                        }
                    />
                    <Route
                        index
                        path="house-arrest/:id/logs"
                        element={
                            <HouseArrestLogsListingWrapper />
                            // <Authorization
                            //     children={
                            //         <DealerGeneralInformationTabWrapper />
                            //     }
                            //     permission={
                            //         UserModuleNameTypes.ACTION_DEALER_GENERAL_INFORMATION
                            //     }
                            // />
                        }
                    />
                </Route>

                {/* Dispositions -> Disposition One */}
                <Route
                    path="/dispositions"
                    element={
                        <Authorization
                            children={<DispositionLayout />}
                            permission={UserModuleNameTypes.NAV_DISPOSITION}
                        />
                    }
                >
                    <Route
                        path="disposition-one"
                        element={
                            <Authorization
                                children={<DispositionOneListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_DISPOSITION_ONE
                                }
                            />
                        }
                    />
                    <Route
                        path="disposition-one/add"
                        element={
                            <Authorization
                                children={<AddDispositionOneWrappper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DISPOSITION_ONE_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="disposition-one/:id"
                        element={
                            <Authorization
                                children={<EditDispositionOneWrappper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DISPOSITION_ONE_EDIT
                                }
                            />
                        }
                    />

                    {/* Dispositions -> Disposition Two */}
                    <Route
                        path="disposition-two"
                        element={
                            <Authorization
                                children={<DispositionTwoListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_DISPOSITION_TWO
                                }
                            />
                        }
                    />
                    <Route
                        path="disposition-two/add"
                        element={
                            <Authorization
                                children={<AddDispositionTwoWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DISPOSITION_TWO_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="disposition-two/edit/:id"
                        element={
                            <Authorization
                                children={<EditDispositionTwoWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DISPOSITION_TWO_EDIT
                                }
                            />
                        }
                    />

                    {/* Dispositions -> Disposition Three */}
                    <Route
                        path="disposition-three"
                        element={
                            <Authorization
                                children={<DispositionThreeListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_DISPOSITION_THREE
                                }
                            />
                        }
                    />
                    <Route
                        path="disposition-three/add"
                        element={
                            <Authorization
                                children={<AddDispositionThreeWrappper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DISPOSITION_THREE_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="disposition-three/edit/:id"
                        element={
                            <Authorization
                                children={<EditDispositionThreeWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DISPOSITION_THREE_EDIT
                                }
                            />
                        }
                    />
                    <Route
                        path="disposition-three/:id"
                        element={
                            <Authorization
                                children={<ViewDispositionThreeWrappper />}
                                permission={
                                    UserModuleNameTypes.NAV_DISPOSITION_THREE
                                }
                            />
                        }
                    />

                    {/* Dispositions -> Initialcall One */}
                    <Route
                        path="initialcall-one"
                        element={
                            <Authorization
                                children={<InitialCallOneListingWrapper />}
                                permission={UserModuleNameTypes.NAV_IC_ONE}
                            />
                        }
                    />
                    <Route
                        path="initialcall-one/add"
                        element={
                            <Authorization
                                children={<AddInitialCallOneWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_IC_ONE_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="initialcall-one/:id"
                        element={
                            <Authorization
                                children={<EditInitialCallOneWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_IC_ONE_EDIT
                                }
                            />
                        }
                    />

                    {/* Dispositions -> Initialcall Two */}
                    <Route
                        path="initialcall-two"
                        element={
                            <Authorization
                                children={<InitialCallTwoListingWrapper />}
                                permission={UserModuleNameTypes.NAV_IC_TWO}
                            />
                        }
                    />
                    <Route
                        path="initialcall-two/add"
                        element={
                            <Authorization
                                children={<AddInitialCallTwoWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_IC_TWO_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="initialcall-two/:id"
                        element={
                            <Authorization
                                children={<EditInitialCallTwoWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_IC_TWO_EDIT
                                }
                            />
                        }
                    />

                    {/* Dispositions -> Initialcall Three */}
                    <Route
                        path="initialcall-three"
                        element={
                            <Authorization
                                children={<InitialCallThreeListingWrapper />}
                                permission={UserModuleNameTypes.NAV_IC_THREE}
                            />
                        }
                    />
                    <Route
                        path="initialcall-three/add"
                        element={
                            <Authorization
                                children={<AddInitialCallThreeWrappper />}
                                permission={
                                    UserModuleNameTypes.ACTION_IC_THREE_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="initialcall-three/:id"
                        element={
                            <Authorization
                                children={<EditInitialCallThreeWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_IC_THREE_EDIT
                                }
                            />
                        }
                    />
                    <Route
                        path="initialcall-three/view/:id"
                        element={
                            <Authorization
                                children={<ViewInitialCallThreeWrappper />}
                                permission={UserModuleNameTypes.NAV_IC_THREE}
                            />
                        }
                    />

                    {/* Dispositions -> Disposition Complaint */}
                    <Route
                        path="disposition-complaint"
                        element={
                            <Authorization
                                children={
                                    <DispositionComplaintListingWrapper />
                                }
                                permission={
                                    UserModuleNameTypes.NAV_DISPOSITION_COMPLAINT
                                }
                            />
                        }
                    />
                    <Route
                        path="disposition-complaint/add"
                        element={
                            <Authorization
                                children={<AddDispositionComplaintWrappper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DISPOSITION_COMPLAINT_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="disposition-complaint/:id"
                        element={
                            <Authorization
                                children={<EditDispositionComplaintWrappper />}
                                permission={
                                    UserModuleNameTypes.ACTION_DISPOSITION_COMPLAINT_EDIT
                                }
                            />
                        }
                    />
                    {/* Dispositions ->NDR Disposition One */}
                    <Route
                        path="ndr-disposition"
                        element={
                            <Authorization
                                children={<NdrDispositionListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_NDR_DISPOSITION
                                }
                            />
                        }
                    />

                    {/* Dispositions ->NDR Disposition Add */}

                    <Route
                        path="ndr-disposition/add"
                        element={
                            <Authorization
                                children={<AddNdrDispositionWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_NDR_DISPOSITION_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="ndr-disposition/:id"
                        element={
                            <Authorization
                                children={<EditNdrDispositionWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_NDR_DISPOSITION_EDIT
                                }
                            />
                        }
                    />
                </Route>
                {/* All Websites -> Websites */}
                <Route
                    path="/all-websites"
                    element={
                        <Authorization
                            children={<WebsitesLayout />}
                            permission={UserModuleNameTypes.NAV_ALL_WEBSITE}
                        />
                    }
                >
                    <Route
                        path="website"
                        element={
                            <Authorization
                                children={<WebstieListingWrapper />}
                                permission={UserModuleNameTypes.NAV_WEBSITES}
                            />
                        }
                    />
                    <Route
                        path="website/add"
                        element={
                            <Authorization
                                children={<AddWebsiteWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_WEBSITES_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="website/:id"
                        element={
                            <Authorization
                                children={<EditWebsiteWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_WEBSITES_ONE_EDIT
                                }
                            />
                        }
                    />

                    {/* All Websites -> Websites Blog */}
                    <Route
                        path="website-blog"
                        element={
                            <Authorization
                                children={<ListWebstieBlogWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_WEBSITES_BLOG
                                }
                            />
                        }
                    />
                    <Route
                        path="website-blog/add"
                        element={
                            <Authorization
                                children={<AddWebsiteBlogWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_WEBSITES_BLOG_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="website-blog/:id"
                        element={
                            <Authorization
                                children={<EditWebsiteBlogWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_WEBSITES_BLOG_ONE_EDIT
                                }
                            />
                        }
                    />
                    <Route
                        path="website-blog/view/:id"
                        element={
                            <Authorization
                                children={<WebsiteBlogViewWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_WEBSITES_BLOG
                                }
                            />
                        }
                    />

                    {/* All Websites -> Websites Page */}
                    <Route
                        path="website-page"
                        element={
                            <Authorization
                                children={<WebsitePageListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_WEBSITES_PAGES
                                }
                            />
                        }
                    />
                    <Route
                        path="website-page/add"
                        element={
                            <Authorization
                                children={<AddWebsitePageWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_WEBSITES_PAGES_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="website-page/:id"
                        element={
                            <Authorization
                                children={<EditWebsitePageWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_WEBSITES_PAGES_ONE_EDIT
                                }
                            />
                        }
                    />
                    <Route
                        path="website-page/view/:id"
                        element={
                            <Authorization
                                children={<ViewWebsitePageWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_WEBSITES_PAGES
                                }
                            />
                        }
                    />

                    {/* All Websites -> Websites Tags */}
                    <Route
                        path="website-tags"
                        element={
                            <Authorization
                                children={<WebsiteTagListingWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_WEBSITES_TAGS
                                }
                            />
                        }
                    />
                    <Route
                        path="website-tags/add"
                        element={
                            <Authorization
                                children={<AddWebsiteTagsWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_WEBSITES_TAGS_ADD
                                }
                            />
                        }
                    />
                    <Route
                        path="website-tags/edit/:id"
                        element={
                            <Authorization
                                children={<EditWebsiteTagWrapper />}
                                permission={
                                    UserModuleNameTypes.ACTION_WEBSITES_TAGS_EDIT
                                }
                            />
                        }
                    />
                    <Route
                        path="website-tags/:id"
                        element={
                            <Authorization
                                children={<ViewWebsiteTagsWrapper />}
                                permission={
                                    UserModuleNameTypes.NAV_WEBSITES_TAGS
                                }
                            />
                        }
                    />
                </Route>
                <Route path="/success" element={<Successfully />} />

                <Route
                    path="/dealers/:dealerId/sale-order/add-sale-order"
                    element={
                        <Authorization
                            children={<AddSaleOrderWrapper />}
                            permission={
                                UserModuleNameTypes.ACTION_DEALER_DEALER_SALE_ORDER_ADD
                            }
                        />
                    }
                />

                <Route
                    path="/complain"
                    element={
                        <Authorization
                            children={<ComplainListingWrapper />}
                            permission={UserModuleNameTypes.NAV_COMPLAINT}
                        />
                    }
                />

                <Route
                    path="/offer-apply-ndr"
                    element={
                        <Authorization
                            children={<OfferAppliedNdrListingWrapper />}
                            permission={
                                UserModuleNameTypes.NAV_OFFER_APPLIED_NDR
                            }
                        />
                    }
                />

                <Route path="/barcodes" element={<BarcodeGenerator />} />
                {/* gpo invoice */}
                {/* <Route
                    path="gpo/label"
                    element={
                        <Authorization
                            children={
                                <GpoInvoiceAndLabelWrapper type="LABEL" />
                            }
                            permission={
                                UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_GPO
                            }
                        />
                    }
                /> */}
                {/* <Route
                    path="gpo/invoice"
                    element={
                        <Authorization
                            children={
                                <GpoInvoiceAndLabelWrapper type="INVOICE" />
                            }
                            permission={
                                UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_GPO
                            }
                        />
                    }
                /> */}

                <Route
                    path="gpo/label-invoice"
                    element={
                        <Authorization
                            children={<GpoInvoiceAndLabelWrapper type="BOTH" />}
                            permission={
                                UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_GPO
                            }
                        />
                    }
                />

                <Route
                    path="/menifest-invoice-orders"
                    element={<MenifestFormat />}
                />

                <Route
                    path="influencers-management"
                    element={<InfluencerListingWrapper />}
                />
                <Route
                    path="influencers-management/add"
                    element={<AddInfluencerWrapper />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes
