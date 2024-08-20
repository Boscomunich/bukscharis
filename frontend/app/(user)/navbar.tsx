'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Drawer, } from "antd"
import { PiMoonLight } from "react-icons/pi";
import { GoSun } from "react-icons/go";
import { useTheme } from "next-themes";
import { GiHamburgerMenu } from "react-icons/gi";

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
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="flex justify-center sm:justify-between items-center md:justify-between h-[77px] gap-4 w-screen pl-4 py-3 bg-transparent fixed top-0 backdrop-blur-3xl z-20">
                <div className="">
                    <h1 className="text-2xl sm:xl font-bold">Bukscharis</h1>
                </div>
                <div className="w-[50%] md:hidden sm:hidden">
                    <ul className=" flex justify-evenly items-center gap-3">
                        <Link href="/" className="hover:text-rare">Home</Link>
                        <Link href="#features" className="hover:text-rare">Features</Link>
                        <Link href="#perks" className="hover:text-rare">Perks</Link>
                        <Link href="#contact" className="hover:text-rare">Contact</Link>
                    </ul>
                </div>
                <div className="sm:hidden md:hidden">
                    <ThemeToggle/>
                </div>
                <div className="w-[10%] flex justify-between items-center lg:hidden"
                >
                    <GiHamburgerMenu onClick={showDrawer}/>
                </div>
                <Drawer closable={false} onClose={onClose} open={open}
                className="text-lg font-medium text-primary dark:text-white">
                <ul className=" flex flex-col justify-evenly items-center gap-3">
                    <Link href="/" className="hover:text-rare">Home</Link>
                    <Link href="#features" className="hover:text-rare">Features</Link>
                    <Link href="#perks" className="hover:text-rare">Perks</Link>
                    <Link href="#contact" className="hover:text-rare">Contact</Link>
                    <ThemeToggle/>
                </ul>
            </Drawer>
            </div>
        </>
    );
};

export default Navbar;