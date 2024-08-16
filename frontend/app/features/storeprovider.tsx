'use client'
import { Provider } from "react-redux"
import { AppStore, makeStore } from "./store"
import { useRef } from "react"

export function StoreProvider ({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }
    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    )
}