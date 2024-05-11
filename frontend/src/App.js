import './App.css';
import AdCreate from './components/AdCreate';
import AdminStatistic from './components/AdminStatistic';
import AdPayment from './components/AdPayment';
import Header from './components/Header';
import AllAds from './components/AllAds';
import PayApprove from './components/PayApprove';
import ManageAds from './components/ManageAds';
import UpdateAd from './components/UpdateAd';
import DeleteAd from './components/DeleteAd';
import ManagerDelete from './components/ManagerDelete';
import ManagerUpdate from './components/ManagerUpdate';
import HomePage from './components/HomePage';
import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCustomer from "./components/AddCustomer";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Update from "./components/update";
import ManageUsers from "./components/manageusers";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Aboutus from "./components/Aboutus";
import RealHome from "./components/realhome.js";


//dishan
import AddPackage from './components/AddPackage';
import CabEditForm from './components/UpdatePackage/CabEditForm';
import CabTable from './components/UpdatePackage/CabTable';
// import Header from './components/Header';
import ViewForm from './components/ViewForm';
import PackageCounts from './components/PackageCounts';
import UploadedImagesPage from './components/UploadedImagesPage';
import UploadForm from './components/UploadForm';
import ImageGallery from './components/ImageGallery';


//payments
import AddPaymentDetails from './components/AddPaymentDetails';
// import Header from './components/Header';
import Payments from './components/Payments';
import AllPaymentDetails from './components/AllPaymentDetails';
//import UpdatePaymentDetails from './components/UpdatePaymentDetails';
import AddReports from './components/AddReports';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AllPaymentReports from './components/AllPaymentReport';
import AddDriversPayments from './components/AddDriversPayments';
import PaymentManagerHome from './components/PaymentManagerHome';
import Reports from './components/Reports';
import AllDriverPayments from './components/AllDriverPayments';
import UDcuspayments from './components/UDcuspayments';


function App() {
  return (
    <Router>
        <div className="App">
          <Header/>
            <Routes>
              <Route path="/add" element={<AdCreate/>} />
              <Route path="/statistic" element={<AdminStatistic/>} />
              <Route path="/pay/:id" element={<AdPayment/>} />
              <Route path="/manage" element={<ManageAds/>} />
              <Route path="/delete/:id" element={<DeleteAd/>} />
              <Route path="/update/:id" element={<UpdateAd/>} />
              <Route path="/mdelete/:id" element={<ManagerDelete/>} />
              <Route path="/mupdate/:id" element={<ManagerUpdate/>} />
              <Route path="/get" element={<PayApprove/>} />
              <Route path="/random" element={<HomePage/>} />
              <Route path="/" element={<AllAds/>} />
              <Route path="/addcus" element={<AddCustomer />} />
              <Route path="/home" element={<Home />} />
              <Route path="/getcus/:id" element={<UserProfile />} />
              <Route path="/updatecus/:id" element={<Update />} />
              <Route path="/manageusers" element={<ManageUsers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Navbar" element={<Navbar />} />
              <Route path="/Aboutus" element={<Aboutus />} />
              <Route path="/RealHome" element={<RealHome />} />

              {/* dishan */}
              <Route path="/package/add" element={<AddPackage />} />
              <Route path="/package/home" element={<CabTable />} />
              <Route path="/package/edit/:id" element={<CabEditForm />} />
              <Route path="/package/delete/:id" element={<CabEditForm />} />
              <Route path="/package/view" element={<ViewForm />} />
              <Route path="/package/select" element={<PackageCounts/>} />
              <Route path="/package/uploaded-images" element={<UploadedImagesPage/>} />
              <Route path="/package/form" element={<UploadForm/>} />
              <Route path="/package/uploads" element={<ImageGallery/>} />

              {/* payment */}
              <Route path="/payments" element={<Payments />} />
              <Route path="/addpaydetails" element={<AddPaymentDetails />} />
              <Route path="/allpaydetails" element={<AllPaymentDetails />} />
              <Route path="/addreports" element={<AddReports />} />
              <Route path="/allreports" element={<AllPaymentReports />} />
              <Route path="/adddriverpayment" element={<AddDriversPayments />} />
              <Route path="/payments/home" element={<PaymentManagerHome />} />
              {/* <Route path="/" element={<PaymentManagerHome />} /> */}
              <Route path="/reports" element={<Reports />} />
              <Route path="/alldriverpayments" element={<AllDriverPayments />} />
              <Route path="/udcuspayments/:id" element={<UDcuspayments />} />
          </Routes>
        </div>
        </Router>
  );
}

export default App;
