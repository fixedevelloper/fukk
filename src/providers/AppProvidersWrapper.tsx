"use client";

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import AxiosInterceptorProvider from "./AxiosInterceptorProvider";
import React from "react";
import NextTopLoader from 'nextjs-toploader';
type ChildrenType = {
    children: React.ReactNode;
};

const AppProvidersWrapper = ({ children }: ChildrenType) => {
    return (
        <SessionProvider>

            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                autoHideDuration={4000}
            >
                <NextTopLoader

                    color="#f4b628"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={true}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                    template='<div class="bar" role="bar"><div class="peg"></div></div>
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                    zIndex={1600}
                    showAtBottom={false}
                />
                <AxiosInterceptorProvider /> {/* ⚠️ AVANT children */}
                {children}
            </SnackbarProvider>
        </SessionProvider>
    );
};

export default AppProvidersWrapper;