import React, { Fragment, useEffect, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon, ChevronDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid"
import { Listbox, Transition } from '@headlessui/react'
import Link from 'next/link'
import { VAULT } from "../constants"


const Borrow = () => {

  let [amount, setAmount] = useState("")
  let [ymValue, setYMValue] = useState("")
  const YM = 10;

  const getAmount = (e) => {
    setAmount(e.target.value);
  }

  useEffect(() => {
    let value = amount * 10;
    setYMValue(value)
  }, [setAmount, amount])

  const calYMValue = () => {
    return (amount * 10)
  }



  return (

    <div>
      <div className="max-w-xl ml-auto mr-auto">
        <div class="wrapper pt-10">
          <div class="rounded-3xl p-px bg-black border border-indigo-600">
            <div class="rounded-[calc(1.5rem-1px)] p-10 ">
              <div class="flex gap-10 items-center">
                <p class="text-gray-300">
                  Borrow
                </p>

                <div class="flex gap-4 items-center flex-1 p-2 hover:cursor-pointer ">
                  <img class="h-12 w-12 rounded-full" src="./sui-sui-logo.svg" alt="" />
                  <div>
                    <h3 class="text-2xl font-medium text-white">SUI</h3>
                    <span class="text-sm tracking-wide text-gray-400">Borrowed SUI</span>
                  </div>

                </div>
              </div>

              <div className='mt-2 mb-8'>

                <div className="flex items-center w-full pb-4 flex-1 rounded h-16 outline-none bg-transparent px-5  border border-white hover:border-gray-600 transition  font-inter">
                  <input
                    name="wSUI"
                    type="number"
                    value={amount}
                    onChange={getAmount}
                    className="w-full rounded h-16 outline-none bg-transparent  font-medium text-3xl"
                    placeholder="0.0"
                    autoComplete="off"
                  />
                  <span className="text-2xl ml-5  cursor-auto select-none">
                    wSUI
                  </span>
                </div>
              </div>

              <div className="flex items-center w-full rounded h-16 outline-none bg-transparent px-5  border border-white hover:border-gray-600 transition  font-inter">
                <input
                  name="YM"
                  type="number"
                  value={ymValue}
                  onChange={calYMValue}
                  className="w-full rounded h-16 outline-none bg-transparent  font-medium text-3xl"
                  placeholder="0.0"
                  autoComplete="off"
                />
                <span className="text-2xl ml-5  cursor-auto select-none">
                  YH
                </span>
              </div>

              <div className='mt-3 pt-4'>
                <button className=" py-3 rounded-lg pl-10 pr-10 text-sm font-medium flex flex-row w-full justify-center bg-gradient-to-l from-purple-400 to-green-400 "> Borrow </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>





  )
}

export default Borrow