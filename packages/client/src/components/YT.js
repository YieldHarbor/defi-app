
import { Fragment, useState, useCallback, useEffect, useMemo } from 'react'
import { VAULT } from "../constants"
import { Listbox, Transition } from '@headlessui/react'
import { PlusIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import useYieldHarbor from '@/hooks/useYieldHarbor'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const InfoRow = ({ name, value }) => {
    return (
        <div class="grid grid-cols-2 gap-2 mt-1 mb-2 text-white">
            <div class="text-gray-300 text-sm font-medium">
                {name}
            </div>
            <div className=" font-medium text-sm ml-auto mr-3">
                {value}
            </div>
        </div>
    )
}

const YT = () => {

    const { getRates } = useYieldHarbor()

    const [tab, setTab] = useState(1)

    const [rate, setRate] = useState()
    const [amount, setAmount] = useState(0)

    const onAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const [tick, setTick] = useState(0)

    const increaseTick = useCallback(() => {
        setTick(tick + 1)
    }, [tick])

    useEffect(() => {
        getRates().then(setRate)
    }, [tick])

    console.log("rate : ", rate)

    return (
        <div class="max-w-xl border p-6 pt-4 m-1 bg-black border-gray-600">
            <div class="font-medium text-center  border-b  text-gray-400 border-gray-700 mb-6 ">
                <ul class="flex flex-wrap -mb-px">
                    <li class="w-1/2">
                        <span onClick={() => setTab(1)} class={`w-full inline-block cursor-pointer p-4 border-b-2 rounded-t-lg text-white `}>
                            Buy
                        </span>
                    </li>
                    <li class="w-1/2">
                        <span onClick={() => setTab(2)} class={`w-full inline-block  cursor-pointer p-4  border-b-2  rounded-t-lg text-white`}>
                            Sell
                        </span>
                    </li>
                </ul>
            </div>
            {tab === 1 && <Buy rate={rate} increaseTick={increaseTick} />}
            {tab === 2 && <Sell rate={rate} increaseTick={increaseTick} />}


        </div>
    )
}


const Buy = ({ rate, increaseTick }) => {

    const { swapSui } = useYieldHarbor()

    const [selected, setSelected] = useState(VAULT[0])

    const [amount, setAmount] = useState(0.1)

    const estimated = useMemo(() => {
        if (rate) {
            return (Number(rate.token_price) / 1000000000) * amount
        }
        return 1
    }, [amount, rate])

    const onSwap = useCallback(async () => {
        try {
            await swapSui(Number(amount))
            await increaseTick()
        } catch (e) {

        }

    }, [amount])

    return (
        <div>
            <div className="block mt-4 text-sm font-medium leading-6 text-gray-300">
                <div className="block mt-4 text-sm font-medium leading-6 text-gray-300">
                    YT token to buy
                </div>
                <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                        <>
                            <div className="relative mt-2">
                                <Listbox.Button className="relative hover:cursor-pointer w-full cursor-default rounded-md  py-3 pl-3 pr-10 text-left  shadow-sm sm:text-sm sm:leading-6  bg-transparent placeholder-gray-400 text-white   ">
                                    <span className="flex items-center">
                                        <span className="mr-3 block truncate">{selected.name}</span>
                                        <span className="ml-auto text-white font-medium text-xs text-right">{selected.ytSymbol}</span>
                                        <span className="ml-2 block font-medium w-5 text-right">0</span>
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
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-transparent placeholder-gray-400 text-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {VAULT.map((vault) => (
                                            <Listbox.Option
                                                key={vault.id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-blue-600 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                                    )
                                                }
                                                value={vault}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <div className="flex items-center">
                                                            <span
                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block text-white truncate')}
                                                            >
                                                                {vault.name}
                                                            </span>
                                                            <span className="ml-auto   text-white font-medium text-xs text-right">{vault.ytSymbol}</span>
                                                            <span className="ml-2 block text-white font-medium w-5 text-right">0</span>
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
                <div className="block text-sm font-medium leading-6 mt-2 text-gray-300">
                    Input token
                </div>
                <div class="flex mt-1 mb-2">
                    <div class="relative w-full">
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} id="large-input" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full p-4 border rounded-l-lg sm:text-md  bg-transparent border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <div class="flex-shrink-0 cursor-default z-8 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border rounded-r-lg border-gray-700 text-white  focus:ring-4 focus:outline-none   bg-gray-600   focus:ring-gray-800" type="button">
                        <div className='flex flex-row'>
                            <img src={"./sui-sui-logo.svg"} alt="" className="h-5 w-5  mt-auto mb-auto  mr-2 flex-shrink-0 rounded-full" />
                            SUI
                        </div>
                    </div>
                </div>
                <div class="mt-4 flex flex-row">
                    <div class="text-gray-300 text-sm font-medium">You will receive at least</div>
                    <span class="ml-auto bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        1 SUI = {rate ? (Number(rate.token_price) / 1000000000).toLocaleString() : "N/A"} YT
                    </span>
                </div>

                <hr class="h-px my-4 border-0  bg-gray-600" />
                <div class="grid grid-cols-2 gap-2 mt-2 mb-2">
                    <div>
                        <h2 className="text-3xl font-medium">
                            YT
                        </h2>
                        <div class="text-gray-300 text-sm font-medium">
                            {selected.ytSymbol}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="text-3xl font-medium mx-auto mt-3 mb-auto mr-2">
                            {estimated.toLocaleString()}
                        </div>
                    </div>
                </div>
                {/* <InfoRow
                        name={"Est. Profit at Maturity"}
                        value={"0.1123"}
                    />
                    <InfoRow
                        name={"Price impact"}
                        value={"0.01%"}
                    /> */}
                {/* <InfoRow
                    name={"Implied APR"}
                    value={"N/A"}
                /> */}
                <hr class="h-px my-4 border-0 bg-gray-600" />
                <button onClick={onSwap} className=" py-3 rounded-lg pl-10 pr-10 text-sm font-medium flex flex-row w-full justify-center bg-gradient-to-l from-purple-400 to-green-400">
                    Buy Now
                </button>
            </div>
        </div>
    )
}

const Sell = ({ rate }) => {
    const [selected, setSelected] = useState(VAULT[0])

    const [amount, setAmount] = useState(1000)

    const estimated = useMemo(() => {
        if (rate) {
            return (Number(rate.sui_price) / 1000000000) * amount
        }
        return 1
    }, [amount, rate])

    return (
        <div>
            <div className="block mt-4 text-sm font-medium leading-6 text-gray-300">


                <div className="block mt-4 text-sm font-medium leading-6 text-gray-300">
                    YT token to sell
                </div>
                <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                        <>
                            <div className="relative mt-2">
                                <Listbox.Button className="relative hover:cursor-pointer w-full cursor-default rounded-md  py-3 pl-3 pr-10 text-left  shadow-sm sm:text-sm sm:leading-6  bg-transparent placeholder-gray-400 text-white   ">
                                    <span className="flex items-center">
                                        <span className="mr-3 block truncate">{selected.name}</span>
                                        <span className="ml-auto text-white font-medium text-xs text-right">{selected.ytSymbol}</span>
                                        <span className="ml-2 block font-medium w-5 text-right">0</span>
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
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-transparent placeholder-gray-400 text-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {VAULT.map((vault) => (
                                            <Listbox.Option
                                                key={vault.id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-blue-600 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                                    )
                                                }
                                                value={vault}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <div className="flex items-center">
                                                            <span
                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block text-white truncate')}
                                                            >
                                                                {vault.name}
                                                            </span>
                                                            <span className="ml-auto   text-white font-medium text-xs text-right">{vault.ytSymbol}</span>
                                                            <span className="ml-2 block text-white font-medium w-5 text-right">0</span>
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
                <div className="block text-sm font-medium leading-6 mt-2 text-gray-300">
                    Input token
                </div>
                <div class="flex mt-1 mb-2">
                    <div class="relative w-full">
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} id="large-input" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full p-4 border rounded-l-lg sm:text-md  bg-transparent border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <div class="flex-shrink-0 cursor-default z-8 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border rounded-r-lg border-gray-700 text-white  focus:ring-4 focus:outline-none   bg-gray-600   focus:ring-gray-800" type="button">
                        <div className='flex flex-row'>
                            {selected.ytSymbol}
                        </div>
                    </div>
                </div>
                <div class="mt-4 flex flex-row">
                    <div class="text-gray-300 text-sm font-medium">You will receive at least</div>
                    <span class="ml-auto bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        1 YT = {rate ? (Number(rate.sui_price) / 1000000000).toFixed(8) : "N/A"} SUI
                    </span>
                </div>

                <hr class="h-px my-4 border-0  bg-gray-600" />
                <div class="grid grid-cols-2 gap-2 mt-2 mb-2">
                    <div>
                        <h2 className="text-3xl font-medium">
                            <img src={"./sui-sui-logo.svg"} alt="" className="h-8 w-8 mb-1 flex-shrink-0 rounded-full" />
                        </h2>
                        <div class="text-gray-300 text-sm font-medium">
                            SUI
                        </div>
                    </div>
                    <div className="flex">
                        <div className="text-3xl font-medium mx-auto mt-3 mb-auto mr-2">
                            {estimated.toFixed(6)}
                        </div>
                    </div>
                </div>
              
                <hr class="h-px my-4 border-0 bg-gray-600" />
                <button onClick={() => alert("Not available yet")} className=" py-3 rounded-lg pl-10 pr-10 text-sm font-medium flex flex-row w-full justify-center bg-gradient-to-l from-purple-400 to-green-400">
                    Sell Now
                </button>
            </div>
        </div>
    )
}

export default YT