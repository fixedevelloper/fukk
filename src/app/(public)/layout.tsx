import './public.css'
import Footer from "../components/Footer";
import React from "react";
import Header from "../components/Header";
import Preloader from "../components/Preloader";
import {Newaletter} from "../components/Newsletter";
import QuickViewModal from "../components/shop/QuickViewModal";
import {ScrollToTop} from "../components/select/ScrollToTop";

export default function PublicLayout({ children }: { children: React.ReactNode }) {

  return (
      <>
       <Preloader />
          <Header/>
          <main className="content">{children}
              <Newaletter />
          </main>

      <Footer/>
      <ScrollToTop />
           </>
  )
}
