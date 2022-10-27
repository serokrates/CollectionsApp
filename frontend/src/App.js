import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import UserProfile from "./pages/UserProfile";
import UserCollection from "./pages/UserCollection";
import PrivateProfile from "./pages/PrivateProfile";
import CreateCollection from "./pages/CreateCollection";
import CreateItem from "./pages/CreateItem";
import ViewItem from "./pages/ViewItem";
import TagCollection from "./pages/TagCollection";
import SearchCollection from "./pages/SearchCollection";

function App() {
  return (
    <>
      <Router>
        <div class="container-main">
          <div className="content-wrap">
            <Header />
            <Routes>
              <Route path="/userCollection/:id" element={<UserCollection />} />
              <Route path="/userProfile/:id" element={<UserProfile />} />
              <Route path="/" element={<Main />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/me" element={<PrivateProfile />} />
              <Route path="/Collection" element={<CreateCollection />} />
              <Route path="/Item" element={<CreateItem />} />
              <Route path="/ViewItem/:id" element={<ViewItem />} />
              <Route path="/TagCollection" element={<TagCollection />} />
              <Route path="/SearchCollection" element={<SearchCollection />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
    // {/* <div class="row">
    //   <div class="col-md-6 offset-md-3">
    //     <h2 class="text-center text-dark mt-5">Login Form</h2>
    //     <div class="text-center mb-5 text-dark">Made with bootstrap</div>
    //     <div class="card my-5">

    //       <form class="card-body cardbody-color p-lg-5">

    //         <div class="text-center">
    //           <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
    //             width="200px" alt="profile"/>
    //         </div>

    //         <div class="mb-3">
    //           <input type="text" class="form-control" id="Username" aria-describedby="emailHelp"
    //             placeholder="User Name"/>
    //         </div>
    //         <div class="mb-3">
    //           <input type="password" class="form-control" id="password" placeholder="password"/>
    //         </div>
    //         <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Login</button></div>
    //         <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
    //           Registered? <a href="#" class="text-dark fw-bold"> Create an
    //             Account</a>
    //         </div>
    //       </form>
    //     </div>

    //   </div>
    // </div> */}
  );
}

export default App;
