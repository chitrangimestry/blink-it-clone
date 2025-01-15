import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import Footer from "./components/Footer";
import toast, { Toaster } from 'react-hot-toast';

function App() {
 return (
  <React.Fragment>
    <Header/>
    <main className="min-h-[76vh]">
        <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
   </React.Fragment>
 )
}

export default App;
