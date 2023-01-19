import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddCompanyWrapper from './pages/configuration/screens/companies/add/AddCompanyWrapper'
import CompaniesListingWrapper from './pages/configuration/screens/companies/list/CompaniesListingWrapper'
import Locations from './pages/configuration/screens/locations/Locations'
import OrganisationHierarchyWrapper from './pages/configuration/screens/organisationHierarchy/list/OrganisationHierarchyWrapper'
import AddPolicyWrapper from './pages/configuration/screens/policies/add/AddPolicyWrapper'
import PolicyListingWrapper from './pages/configuration/screens/policies/list/PolicyListingWrapper'
import DashboardWrappper from './pages/Dashboard/DashboardWrappper'
import AddDealerWrapper from './pages/dealers/add/AddDealerWrapper'
import DealersListingWrapper from './pages/dealers/list/DealersListingWrapper'
import ViewDealer from './pages/dealers/view'
import DealerOrderTab from './pages/dealers/view/tabs/orderTab/DealerOrderTab'
import LoginPage from './pages/login/LoginPage'
import AddOrder from './pages/orders/add/AddOrder'
import OrderListing from './pages/orders/OrderListing'
import Test from './pages/test/Test'
import UsersListingWrapper from './pages/users/list/UsersListingWrapper'
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
          <Route path='/vendors/:vendorId' element={<ViewVendor />} >
            <Route path='orders' element={"Orders"} />
            <Route path='activities' element={"Activities"} />
            <Route path='delivery-boys' element={"Delivery Boys"} />

          </Route>

          <Route path='/warehouse' element={<WarehousesListingWrapper />} />
          <Route path='/warehouse/add-warehouse' element={<AddWarehouseWrapper />} />

          <Route path='/dealers/:dealerId' element={<ViewDealer />} >
            <Route path='orders' element={<DealerOrderTab />} />
            <Route path='activities' element={"Activities"} />
            <Route path='delivery-boys' element={"Delivery Boys"} />

          </Route>
          <Route path='users' element={<UsersListingWrapper />} />
          <Route path='test' element={<Test />} />
          <Route path='configuration/companies' element={<CompaniesListingWrapper />} />
          <Route path='configuration/companies/add-company' element={<AddCompanyWrapper />} />
          <Route path='configuration/organizations-hierarchy' element={<OrganisationHierarchyWrapper />} />
          <Route path='configuration/locations' element={<Locations />} />
          <Route path='configuration/policies' element={<PolicyListingWrapper />} />
          <Route path='configuration/policies/add-policy' element={<AddPolicyWrapper />} />



        </Routes>
      </BrowserRouter>
    </>
  )
}

export default PageRoutes

