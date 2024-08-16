'use client'
import { ThemeProvider } from "next-themes"
import { useTheme } from "next-themes";
import { ConfigProvider } from 'antd';
import { useEffect, useState } from "react";
import 'antd/dist/reset.css';


export function Providers ({children} : {children: React.ReactNode}) {
    const { setTheme, resolvedTheme } = useTheme()
    let theme = {}
    if (resolvedTheme == undefined) {theme = {
        token: {
            colorPrimary: 'red' 
        }
    }} else { 
    theme = {
        token: {
            colorPrimary: 'green' 
        }
    }}
    return (
    <ConfigProvider
    theme={theme}
    >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
        </ThemeProvider>
    </ConfigProvider>
    )
}