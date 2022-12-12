import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

const _Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element={<OrderListing />} />
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
          <Route path='/dealers/:dealerId' element={<ViewDealer />} >
            <Route path='orders' element={<DealerOrderTab />} />
            <Route path='activities' element={"Activities"} />
            <Route path='delivery-boys' element={"Delivery Boys"} />

          </Route>
          <Route path='users' element={<UsersListingWrapper />} />
          <Route path='test' element={<Test />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default _Routes

