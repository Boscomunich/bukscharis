'use client'
import { ThemeProvider } from "next-themes"
import { useTheme } from "next-themes";
import { ConfigProvider } from 'antd';
import { StoreProvider } from './features/storeprovider';
import { useEffect, useState } from "react";
import 'antd/dist/reset.css';


export function Providers ({children} : {children: React.ReactNode}) {

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <StoreProvider>
                {children}
            </StoreProvider>
        </ThemeProvider>
    )
}