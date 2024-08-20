'use client'
import { Provider } from "react-redux"
import { AppStore, makeStore } from "./store"
import { useRef } from "react"
import { useTheme } from "next-themes"
import { ConfigProvider } from "antd"



export function StoreProvider ({ children }: { children: React.ReactNode }) {
    const {setTheme, resolvedTheme} = useTheme()
    const storeRef = useRef<AppStore>()

    let theme = { 
        components: {
            Form: {
                itemMarginBottom: 12
            },
        },
        token: {}
    }

    if (resolvedTheme == 'dark') {theme = {
        ...theme,
        components: {
            ...theme.components,
        },
        token: {
            colorPrimary: '#FF9100',
            colorBgElevated: '#1E201E',
            colorText: 'white'
        }
    }} else { 
    theme = {
        ...theme,
        components: {
            ...theme.components,
        },
        token: {
            colorPrimary: '#FF9100',
        }
    }}

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }
    return (
        <ConfigProvider
            theme={theme}
            >
            <Provider store={storeRef.current}>
                {children}
            </Provider>
        </ConfigProvider>
    )
}