'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PiMoonLight } from "react-icons/pi";
import { GoSun } from "react-icons/go";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false)
    const {setTheme, resolvedTheme} = useTheme()

    useEffect(() => setMounted(true), [])

    return (
        <div onClick={ () =>{ 
        resolvedTheme ===  'dark'? setTheme('light') : setTheme('dark')}}>
            {
                resolvedTheme === 'dark' ? 
                <GoSun/> :
                <PiMoonLight/>
            }
        </div>
    )
}


const Navbar = () => {
    const [active, setActive] = useState(false)
    return (
        <>
            <div className="flex justify-center sm:justify-between items-center md:justify-between h-[77px] gap-4 w-screen pl-4 py-3  bg-transparent fixed top-0 backdrop-blur-3xl">
                <div className="w-[30%]">
                    
                    <h1 className="text-2xl sm:xl font-bold dark:text-white">webBase</h1>
                </div>
                <div className="w-[30%] text-gray-600 md:hidden sm:hidden">
                    <ul className=" flex justify-evenly items-center gap-3">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <Link href="#features" className="hover:text-primary">Features</Link>
                        <Link href="#perks" className="hover:text-primary">Perks</Link>
                        <Link href="#contact" className="hover:text-primary">Contact</Link>
                    </ul>
                </div>
                <ThemeToggle/>
                <div className="w-[30%] flex justify-between items-center px-5">
                    <div >
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;