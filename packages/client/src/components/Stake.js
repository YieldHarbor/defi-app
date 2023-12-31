
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, ChevronDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid"
import { Fragment, useState, useEffect, useCallback } from 'react'
import MintPT from '@/panels/MintPT'
import { VAULT } from "../constants"
import useLegato from "@/hooks/useYieldHarbor"
import { useWallet } from "@suiet/wallet-kit"
import Link from 'next/link'

const vault = VAULT

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Stake = () => {

    const wallet = useWallet()
    const { account } = wallet

    const { getApr, getStakedSui, getTotalSupply, stake } = useLegato()
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(vault[0])
    const [mintPanelVisible, setMintPanelVisible] = useState(false)

    const [totalSupply, setTotalSupply] = useState(0)
    const [apr, setApr] = useState(0)
    const [tick, setTick] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
        getApr().then(setApr)
    }, [])

    useEffect(() => {
        getTotalSupply().then(setTotalSupply)
        account && getStakedSui(account.address).then(setItems)
    }, [account, tick])

    let myBalance = items && items.length > 0 ? items.reduce((out, item) => {
        return out + Number(item.data.content.fields.principal) / 1000000000
    }, 0) : []

    const onStake = useCallback(async (objectId) => {
        setLoading(true)
        try {
            await stake(objectId)
            setTick(tick + 1)
            setMintPanelVisible(false)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }, [tick, stake, items])

    return (
        <div>

            <MintPT
                selected={selected}
                visible={mintPanelVisible}
                close={() => setMintPanelVisible(false)}
                apr={apr}
                loading={loading}
                onStake={onStake}
                items={items}
            />
            <div className="max-w-xl ml-auto mr-auto">
                <div class="wrapper pt-10">
                    <div class="rounded-3xl p-px bg-black border border-indigo-600">
                        <div class="rounded-[calc(1.5rem-1px)] p-10 ">
                            <div class="flex gap-10 items-center">
                                <p class="text-gray-300">
                                    Select Market
                                </p>
                                <div class="flex gap-4 items-center flex-1 p-2 hover:cursor-pointer ">
                                    <img class="h-12 w-12 rounded-full" src="./sui-sui-logo.svg" alt="" />
                                    <div>
                                        <h3 class="text-2xl font-medium text-white">SUI</h3>
                                        <span class="text-sm tracking-wide text-gray-400">Staked SUI</span>
                                    </div>
                                    <div class="ml-auto ">
                                        <ChevronUpDownIcon className="h-6 w-6 text-gray-300" />
                                    </div>
                                </div>
                            </div>

                            <Listbox value={selected} onChange={setSelected}>
                                {({ open }) => (
                                    <>
                                        <Listbox.Label className="block mt-6 text-sm font-medium leading-6 text-gray-300">Vault to stake into</Listbox.Label>
                                        <div className="relative mt-2">
                                            <Listbox.Button className="relative hover:cursor-pointer w-full cursor-default rounded-md  py-3 pl-3 pr-10 text-left  shadow-sm sm:text-sm sm:leading-6  bg-black border border-indigo-100 placeholder-gray-400 text-white   ">
                                                <span className="flex items-center">
                                                    <span className="mr-3 block truncate">{selected.name}</span>
                                                    <img src={selected.avatar} alt="" className="h-5 w-5 ml-auto flex-shrink-0 rounded-full" />
                                                    <span className="ml-2 block font-medium w-5 text-right">
                                                        {totalSupply.toLocaleString()}
                                                    </span>
                                                </span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-800 placeholder-gray-400 text-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {vault.map((person) => (
                                                        <Listbox.Option
                                                            key={person.id}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active ? 'bg-blue-600 text-white' : 'text-gray-900',
                                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                )
                                                            }
                                                            value={person}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                    <div className="flex items-center">
                                                                        <span
                                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block text-white truncate')}
                                                                        >
                                                                            {person.name}
                                                                        </span>
                                                                        <img src={person.avatar} alt="" className="h-5 w-5 ml-auto flex-shrink-0 rounded-full" />
                                                                        <span className="ml-2 block text-white font-medium w-5 text-right">{totalSupply.toLocaleString()}</span>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>

                            <div class="grid grid-cols-2 gap-2  mb-6 mt-6">
                                <div>
                                    <div className="block text-sm font-medium leading-6 text-gray-300">
                                        Available to stake
                                    </div>
                                    <div className='flex flex-row text-lg'>
                                        <img src={"./sui-sui-logo.svg"} alt="" className="h-5 w-5  mt-auto mb-auto  mr-2 flex-shrink-0 rounded-full" />
                                        {items.length} (~{myBalance.toLocaleString()} Sui)
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <div className="block text-sm font-medium leading-6 text-gray-300">
                                        Total Staked
                                    </div>
                                    <div className="text-2xl">
                                        ${(totalSupply * 0.45).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-2  mb-6 mt-6">
                                <div>
                                    <div className="block text-sm font-medium leading-6 text-gray-300">
                                        Staked amount
                                    </div>
                                    <div className='flex flex-row text-lg'>
                                        <img src={"./sui-sui-logo.svg"} alt="" className="h-5 w-5  mr-2  mt-auto mb-auto flex-shrink-0 rounded-full" />
                                        {totalSupply.toLocaleString()}
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <div className="block text-sm font-medium leading-6 text-gray-300">
                                        APR
                                    </div>
                                    <div className="text-2xl">
                                        {apr.toLocaleString()}%
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setMintPanelVisible(true)} className=" py-3 rounded-lg pl-10 pr-10 text-sm font-medium flex flex-row w-full justify-center bg-gradient-to-l from-purple-400 to-green-400">
                                Next
                                <ArrowRightIcon className="h-5 w-5 ml-2" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="max-w-lg ml-auto mr-auto">

                <p class="text-black underline text-sm p-5  pt-8 text-center">
                    <Link href="/portfolio">
                        Wrap your Testnet SUI to Staked SUI object{` >>`}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Stake