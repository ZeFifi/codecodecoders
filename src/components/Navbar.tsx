'use client'

import {
    HamburgerMenuIcon,
    QuestionMarkCircledIcon,
} from '@radix-ui/react-icons'
import { Home, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <nav className="mb-4 flex h-20 w-full items-center border-b border-gray-200 bg-[#fafafb] px-4 font-inter text-sm">
                <div className="relative flex w-full items-center">
                    <HamburgerMenuIcon
                        className="absolute left-0 size-6 md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                    <div className="flex w-full justify-center text-black md:justify-between">
                        <div className="items-center">
                            <Link href="/" className="no-effect block">
                                <Image
                                    src="/images/CCC.png"
                                    alt="Logo"
                                    width={70}
                                    height={70}
                                />
                            </Link>
                        </div>
                        <div className="hidden items-center md:flex">
                            <ul className="flex gap-8">
                                <li>
                                    <Link
                                        className="no-effect text-black"
                                        href="/"
                                    >
                                        <p className="rounded-md p-2 font-semibold hover:bg-gray-200">
                                            Accueil
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="no-effect text-black"
                                        href="/about"
                                    >
                                        <p className="rounded-md p-2 font-semibold hover:bg-gray-200">
                                            À propos
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="no-effect text-black"
                                        href="/contact"
                                    >
                                        <p className="rounded-md p-2 font-semibold hover:bg-gray-200">
                                            Contact
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div
                className={`fixed left-0 top-20 z-10 size-full bg-white p-6 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <ul className="flex flex-col gap-4">
                    <li>
                        <Link
                            className="no-effect text-black hover:text-[#3367c2]"
                            href="/"
                        >
                            <div className="flex items-center space-x-2">
                                <Home className="size-4" />
                                <p>Accueil</p>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="no-effect text-black hover:text-[#3367c2]"
                            href="/about"
                        >
                            <div className="flex items-center space-x-2">
                                <QuestionMarkCircledIcon className="size-4" />
                                <p>À propos</p>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="no-effect text-black hover:text-[#3367c2]"
                            href="/contact"
                        >
                            <div className="flex items-center space-x-2">
                                <Mail className="size-4" />
                                <p>Contact</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
