import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ASRListingWrapper from './pages/configuration/Configuration Screens/asr/list/ASRListingWrapper'
import AddAttributeWrapper from './pages/configuration/Configuration Screens/attributes/add/AddAttributeWrapper'
import AttributesListingWrapper from './pages/configuration/Configuration Screens/attributes/list/AttributesListingWrapper'
import AttributesGroupListingWrapper from './pages/configuration/Configuration Screens/attributesGroup/list/AttributesGroupListingWrapper'
import AddCartonBoxWrapper from './pages/configuration/Configuration Screens/cartonBox/add/AddCartonBoxWrapper'
import CartonBoxListingWrapper from './pages/configuration/Configuration Screens/cartonBox/list/CartonBoxListingWrapper'
import ConfigurationCompanyListingWrapper from './pages/configuration/Configuration Screens/configurationCompany/list/ConfigurationCompanyListingWrapper'
import AddDealersCategoryWrapper from './pages/configuration/Configuration Screens/dealersCategory/add/AddDealersCategoryWrapper'
import DealersCategoryListingWrapper from './pages/configuration/Configuration Screens/dealersCategory/list/DealersCategoryListingWrapper'
import GRNListingWrapper from './pages/configuration/Configuration Screens/grn/list/GRNListingWrapper'
import AddItemWrapper from './pages/configuration/Configuration Screens/item/add/AddItemWrapper'
import ItemListingWrapper from './pages/configuration/Configuration Screens/item/list/ItemListingWrapper'
import AddLanguageWrapper from './pages/configuration/Configuration Screens/language/add/AddLanguageWrapper'
import LanguageListingWrapper from './pages/configuration/Configuration Screens/language/list/LanguageListingWrapper'
import AddProductCategoryWrapper from './pages/configuration/Configuration Screens/productCategory/add/AddProductCategoryWrapper'
import ProductCategoryListingWrapper from './pages/configuration/Configuration Screens/productCategory/list/ProductCategoryListingWrapper'
import ProductsListingWrapper from './pages/configuration/Configuration Screens/products/list/ProductWrapper'
import AddProductSubCategoryWrapper from './pages/configuration/Configuration Screens/productSubCategory/add/AddProductSubCategoryWrapper'
import ProductSubCategoryListingWrapper from './pages/configuration/Configuration Screens/productSubCategory/list/ProductSubCategoryListingWrapper'
import PurchaseOrderListingWrapper from './pages/configuration/Configuration Screens/purchaseOrder/list/PurchaseOrderListingWrapper'
import SchemeListingWrapper from './pages/configuration/Configuration Screens/scheme/list/SchemeListingWrapper'
import AddTaxesWrapper from './pages/configuration/Configuration Screens/taxes/add/AddTaxesWrapper'
import TaxesListingWrapper from './pages/configuration/Configuration Screens/taxes/list/TaxesListingWrapper'
import ConfigurationLayout from './pages/configuration/ConfigurationLayout'
import DashboardWrappper from './pages/Dashboard/DashboardWrappper'
import AddDealerWrapper from './pages/dealers/add/AddDealerWrapper'
import DealersListingWrapper from './pages/dealers/list/DealersListingWrapper'
import ViewDealer from './pages/dealers/view'
import DealerOrderTab from './pages/dealers/view/tabs/orderTab/DealerOrderTab'
import InventoryListingWrapper from './pages/inventories/list/InventoryListingWrapper'
import LoginPage from './pages/login/LoginPage'
import AddOrder from './pages/orders/add/AddOrder'
import OrderListing from './pages/orders/OrderListing'
import OutwardRequestListingWrapper from './pages/outwardRequest/list/OutwardRequestListingWrapper'
import AddSaleOrderWrapper from './pages/saleOrder/add/AddSaleOrderWrapper'
import SaleOrderListingWrapper from './pages/saleOrder/list/SaleOrderListingWrapper'
import Test from './pages/test/Test'
import UsersListingWrapper from './pages/users/list/UsersListingWrapper'
import AddVendorWrapper from './pages/vendors/add/AddVendorWrapper'
import VendorsListingWrapper from './pages/vendors/list/VendorsListingWrapper'
import ViewVendor from './pages/vendors/view'
import AddWarehouseWrapper from './pages/warehouses/add/AddWarehouseWrapper'
import WarehousesListingWrapper from './pages/warehouses/list/WarehousesListingWrapper'

const PageRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element={<DashboardWrappper />} />
          <Route path='/orders' element={<OrderListing />} />
          <Route path='/orders/add-order' element={<AddOrder />} />
          <Route path='/dealers' element={<DealersListingWrapper />} />
          <Route path='/dealers/add-dealer' element={<AddDealerWrapper />} />
          <Route path='/vendors' element={<VendorsListingWrapper />} />
          <Route path='/vendors/add-vendor' element={<AddVendorWrapper />} />
          <Route path='/vendors/:vendorId' element={<ViewVendor />} >
            <Route path='orders' element={"Orders"} />
            <Route path='activities' element={"Activities"} />
            <Route path='delivery-boys' element={"Delivery Boys"} />

          </Route>

          <Route path='/warehouse' element={<WarehousesListingWrapper />} />
          <Route path='/warehouse/add-warehouse' element={<AddWarehouseWrapper />} />
          <Route path='/inventories' element={<InventoryListingWrapper />} />
          <Route path='/sale-order' element={<SaleOrderListingWrapper />} />
          <Route path='/sale-order/add-sale-order' element={<AddSaleOrderWrapper />} />
          <Route path='/outward-request' element={<OutwardRequestListingWrapper />} />

          <Route path='/dealers/:dealerId' element={<ViewDealer />} >
            <Route path='orders' element={<DealerOrderTab />} />
            <Route path='activities' element={"Activities"} />
            <Route path='delivery-boys' element={"Delivery Boys"} />

          </Route>
          <Route path='users' element={<UsersListingWrapper />} />
          <Route path='test' element={<Test />} />
          <Route path='/configurations' element={<ConfigurationLayout />} />
          <Route path='/configurations/attributes' element={<AttributesListingWrapper />} />
          
          <Route path='/configurations/attributes/add' element={<AddAttributeWrapper />} />

          <Route path='/configurations/attributes-group' element={<AttributesGroupListingWrapper />} />
          <Route path='/configurations/product-category' element={<ProductCategoryListingWrapper />} />
          <Route path='/configurations/product-category/add' element={<AddProductCategoryWrapper />} />

          <Route path='/configurations/product-sub-category' element={<ProductSubCategoryListingWrapper />} />
          <Route path='/configurations/product-sub-category/add' element={<AddProductSubCategoryWrapper />} />

          <Route path='/configurations/item' element={<ItemListingWrapper />} />
          <Route path='/configurations/item/add' element={<AddItemWrapper />} />

          <Route path='/configurations/products' element={<ProductsListingWrapper />} />
          <Route path='/configurations/carton-box' element={<CartonBoxListingWrapper />} />
          <Route path='/configurations/carton-box/add' element={<AddCartonBoxWrapper />} />

          <Route path='/configurations/scheme' element={<SchemeListingWrapper />} />
          <Route path='/configurations/taxes' element={<TaxesListingWrapper />} />
          <Route path='/configurations/taxes/add' element={<AddTaxesWrapper />} />

          <Route path='/configurations/purchase-order' element={<PurchaseOrderListingWrapper />} />
          <Route path='/configurations/grn' element={<GRNListingWrapper />} />
          <Route path='/configurations/company' element={<ConfigurationCompanyListingWrapper />} />
          <Route path='/configurations/asr' element={<ASRListingWrapper />} />
          <Route path='/configurations/dealers-category' element={<DealersCategoryListingWrapper />} />
          <Route path='/configurations/dealers-category/add' element={<AddDealersCategoryWrapper />} />

          <Route path='/configurations/language' element={<LanguageListingWrapper />} />
          <Route path='/configurations/language/add' element={<AddLanguageWrapper />} />

          </Routes>
      </BrowserRouter>
    </>
  )
}

export default PageRoutes

