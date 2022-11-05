import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import { loadUser } from './actions/userAction.js';
import "./App.css";
import LoginSignup from './Components/Authentication/LoginSignup.jsx';
import Header from './Components/Home/Header.jsx';
import Home from './Components/Home/Home.jsx';
import ProductDetails from "./Components/Products/ProductDetails";
import Profile from './Components/User/Profile.jsx';
import UserData from './more/UserData.jsx';
import Store from "./Store";
//import ProtectedRoute from './route/ProtectedRoute.js';
import About from './Components/about/About.jsx';
import Cart from './Components/cart/Cart.jsx';
import Products from './Components/Products/Products.jsx';
import Search from './Components/Products/Search.jsx';
import UpdatePassword from './Components/User/UpdatePassword.jsx';
import Support from './more/Support.jsx';

import {

  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import AllMedicines from './Components/Admin/AllMedicines.jsx';
import AllOrder from './Components/Admin/AllOrder.jsx';
import AllProducts from './Components/Admin/AllProducts.jsx';
import AllReviews from './Components/Admin/AllReviews.jsx';
import AllUsers from './Components/Admin/AllUsers.jsx';
import CreateMedicine from './Components/Admin/CreateMedicine.jsx';
import CreateProduct from './Components/Admin/CreateProduct.jsx';
import Dashboard from './Components/Admin/Dashboard.jsx';
import EditMedicine from './Components/Admin/EditMedicine.jsx';
import EditProduct from './Components/Admin/EditProduct.jsx';
import UpdateOrder from './Components/Admin/UpdateOrder.jsx';
import UpdateUser from './Components/Admin/UpdateUser.jsx';
import Animalinfo from './Components/Apointment/Animalinfo.js';
import Appointment from "./Components/Apointment/Appointment.js";
import Registration from './Components/Authentication/Registration.jsx';
import SignUp from './Components/Authentication/SignUp.jsx';
import CartMedicine from './Components/cart/CartMedicine.jsx';
import ConfirmOrder from './Components/cart/ConfirmOrder.jsx';
import Payment from './Components/cart/Payment.jsx';
import Shipping from './Components/cart/Shipping.jsx';
import Success from './Components/cart/Success.jsx';
import DoctorDetails from './Components/Doctor/DoctorDetails.jsx';
import Doctors from './Components/Doctor/Doctors.jsx';
import MedicineDetails from './Components/Medicine/MedicineDetails.jsx';
import Medicines from './Components/Medicine/Medicines.jsx';
import ForgotPassword from './Components/User/ForgotPassword.jsx';
import MoreOption from './Components/User/MoreOption.jsx';
import MyOrder from './Components/User/MyOrder.jsx';
import ResetPassword from './Components/User/ResetPassword.jsx';
import BottomTab from './more/BottomTab.jsx';
import Contact from './more/Contact.jsx';
import Rules from './more/Rules.jsx';
import ConfirmAppointment from './Components/Apointment/ConfirmAppointment.js';
import PaymentAppointment from "./Components/Apointment/PaymentAppointment.js";
import SuccessAppointment from "./Components/Apointment/SuccessAppointment.js";
import MyAppointment from './Components/User/MyAppointment.js';
// import MessengerCustomerChat from 'react-messenger-customer-chat';


// const promise = loadStripe(
//   "pk_test_51LhIOaJkj63K7pnU9GiT5YjHovEX50TuuxR7W0DZ5Wnb1rjsQLT22rI1sqbJCYRrmVMoqeUqTaWvAhM2RBSFOSuu00czRQnHJC"
// );


const App = () => {

  const {isAuthenticated,user} = useSelector((state) =>state.user);

  const [stripeApiKey, setStripeApiKey] = useState(" ");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    webFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    });
    Store.dispatch(loadUser());
    getStripeApiKey();

  },[]);

 

  return (
    <BrowserRouter>
     
    <Header />
    <BottomTab />
    {isAuthenticated && <UserData user={user} />}

     <Routes  >
         <Route path="/" element={< Home  />} />
         <Route path="/about" element={< About />} />
         <Route path="/contact" element={< Contact />} />
         <Route path="/faq" element={< Rules />} />
         <Route path="/singnup" element={< SignUp />} />
         
         
         <Route path="/products" element={< Products   />} />
         <Route path="/search" element={< Search   />} />
         <Route path="/products/:keyword" element= {<Products />} />
         <Route path="/product/:id" element={< ProductDetails   />} />

         <Route path="/medicines" element={< Medicines   />} />
         <Route path="/medicines/:keyword" element= {< Medicines />} />
         <Route path="/medicine/:id" element={< MedicineDetails   />} />
         <Route path="/admin/medicine" element={< CreateMedicine />} />
         <Route path="/admin/medicines" element={< AllMedicines />} />  
         <Route path="/cartmedi" element={< CartMedicine />} />
         <Route path="/edit/medicine/:id" element={< EditMedicine />} /> 
         <Route path="/doctorcart" element={< Appointment />} />
         
         <Route path="/doctors" element={< Doctors />} />  
         <Route path="/doctor/:id" element={< DoctorDetails />} />
         <Route path="/animalinfo" element={< Animalinfo/>} />
         <Route path="/appointment/confirm" element={< ConfirmAppointment />} />
         <Route path="/appointment/success" element={< SuccessAppointment />} />
         <Route path="/appointments" element={< MyAppointment />} /> 

         <Route path="/login" element={< LoginSignup   />} />
         <Route path="/registration" element={< Registration  />} />
         <Route path="/me" element={< Profile />} />
         <Route path="/me/update" element={< UpdatePassword />} />
         <Route path="/support" element={< Support/>} />
         <Route path="/cart" element={< Cart />} />
         <Route path="/shipping" element={< Shipping />} />
         <Route path="/order/confirm" element={< ConfirmOrder />} />

         <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
            <Route
            path="/process/appointment/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                < PaymentAppointment />
              </Elements>
            }
          />

          <Route path="/success" element={< Success />} />
          <Route path="/more" element={< MoreOption />} />
          <Route path="/dashboard" element={< Dashboard />} />
          <Route path="/admin/product" element={< CreateProduct />} />
          <Route path="/admin/products" element={< AllProducts />} />  
          <Route path="/edit/product/:id" element={< EditProduct />} /> 
          <Route path="/admin/orders" element={< AllOrder />} /> 
          <Route path="/admin/order/:id" element={< UpdateOrder />} /> 
          <Route path="/admin/users" element={< AllUsers />} /> 
          <Route path="/admin/user/:id" element={< UpdateUser />} /> 
          <Route path="/admin/reviews" element={< AllReviews />} />
          <Route path="/password/forgot" element={< ForgotPassword />} />
          <Route path="/password/reset/:token" element={< ResetPassword />} />
          <Route path="/orders" element={< MyOrder />} /> 
                  
     </Routes>
     {/* <MessengerCustomerChat pageId="100087493926566" appId="1089602411739540" /> */}
     
    </BrowserRouter>
  );
};

export default App;