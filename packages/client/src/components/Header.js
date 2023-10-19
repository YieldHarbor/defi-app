
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ExternalLink } from 'react-feather'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    ConnectButton,
    useAccountBalance,
    useWallet,
    SuiChainId,
    ErrorCode,
    formatSUI
} from "@suiet/wallet-kit";
import useYieldHarbor from '@/hooks/useYieldHarbor'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


const Header = () => {

    const router = useRouter()
    const wallet = useWallet();

    const { correctedChain } = useYieldHarbor()

    const { pathname } = router

    return (
        <>
            <nav
                class="flex items-center justify-between flex-wrap  shadow">
                <div class="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
                    <div class="flex items-center flex-shrink-0 text-gray-800 mr-16 ">
                        <Link href="/">
                            <Image
                                src="/new_logo.png"
                                width={150}
                                height={36}
                                alt="Logo"

                            />
                        </Link>
                    </div>
                </div>
                <div class="menu w-full  flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
                    <div class="text-md font-bold text-blue-700 lg:flex-grow">
                        <div class="container flex items-center justify-center p-6 mx-auto  capitalize  text-black">
                            <Link className={`border-b-2 ${pathname === ("/") ? "text-black border-blue-700" : "border-transparent hover:text-black hover:border-blue-700"} mx-1.5 sm:mx-6`} href="/">
                                Stake
                            </Link>
                            <Link className={`border-b-2 ${pathname.includes("/trade") ? "text-black border-blue-700" : "border-transparent hover:text-black hover:border-blue-700"} mx-1.5 sm:mx-6`} href="/trade">
                                Trade
                            </Link>
                            <Link className={`border-b-2 ${pathname.includes("/portfolio") ? "text-black border-blue-700" : "border-transparent hover:text-black hover:border-blue-700"} mx-1.5 sm:mx-6`} href="/portfolio">
                                Portfolio
                            </Link>
                            <Link className={`border-b-2 ${pathname === ("/lend") ? "text-black border-blue-700" : "border-transparent hover:text-black hover:border-blue-700"} mx-1.5 sm:mx-6`} href="/lend">
                                Lend
                            </Link>
                            <Link className={`border-b-2 ${pathname === ("/borrow") ? "text-black border-blue-700" : "border-transparent hover:text-black hover:border-blue-700"} mx-1.5 sm:mx-6`} href="/borrow">
                                Borrow
                            </Link>
                        </div>
                    </div>
                    <div class="flex ">
                        <ConnectButton className="bg-gradient-to-l from-purple-400 to-green-400">
                            Connect Wallet
                        </ConnectButton>

                    </div>
                </div>
            </nav>

            {wallet && wallet.connected && !correctedChain && (
                <div class="container ml-auto mr-auto max-w-4xl p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-black dark:text-yellow-300" role="alert">

                    <strong class="font-bold">Incorrect chain!</strong>{` `}
                    <span class="block sm:inline ml-1">Support Testnet only</span>
                </div>
            )}
        </>
    )
}


export default Header