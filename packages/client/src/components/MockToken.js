import useYieldHarbor from "@/hooks/useYieldHarbor"
import { useCallback, useEffect, useState } from "react"
import Spinner from "./Spinner"
import { useWallet } from "@suiet/wallet-kit"
import { shortAddress } from "@/helpers"

const MockToken = () => {

    const { faucet, getSuiBalance, getStakedSui } = useYieldHarbor()

    const wallet = useWallet()

    const { account } = wallet

    const [value, setValue] = useState(0.1)

    const [loading, setLoading] = useState(false)
    const [sui, setSui] = useState("0")
    const [tick, setTick] = useState(0)
    const [items, setItems] = useState([])

    const onMint = useCallback(async () => {
        setLoading(true)
        try {
            await faucet(value)
            setTick(tick + 1)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }, [faucet, tick, value])

    // const { balance } = useAccountBalance();

    useEffect(() => {
        account && getSuiBalance(account.address).then(setSui)
        account && getStakedSui(account.address).then(setItems)
    }, [account, tick])


    return (
        <div className="max-w-4xl mx-auto mt-7">
            <p class="text-black text-sm p-5 pb-3 text-center">
                Staked SUI Object Wrapper
            </p>
            <div class=" border border-blue-700 text-gray-100 px-1 bg-black  ml-7 mr-7 rounded-lg relative">
                <div class="grid grid-cols-12 gap-3 px-4 p-4 mt-2 mb-2 ">
                    
                    <div class="col-span-2 flex flex-col text-md">
                        <div class="mt-auto mb-auto">
                            Pool ID : 291
                        </div>
                    </div>
                    <div class="col-span-3 flex flex-col text-md">
                        <div class="mt-auto mb-auto">
                            Your Balance : {sui ? sui : 0} SUI
                        </div>
                    </div>
                    <div class="col-span-2 flex flex-col text-md">
                        <div class="mt-auto mb-auto ml-auto">
                            Amount :
                        </div>
                    </div>
                    <div class="col-span-3 flex flex-col text-md">
                        <div class="mt-auto mb-auto">
                            <input value={value} onChange={(e) => setValue(Number(e.target.value))} type="number" id="price" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full py-3  text-sm pl-[20px] border rounded-lg bg-transparent  border-gray-600  placeholder-gray-400  text-white  focus:ring-blue-500  focus:border-blue-500" />

                        </div>
                    </div>
                    <div class="col-span-2 flex flex-col text-xl font-bold">

                        <button disabled={loading} onClick={onMint} className=" py-3 rounded-lg pl-10 pr-10 text-sm font-medium flex flex-row w-full justify-center bg-gradient-to-l from-purple-400 to-green-400">
                            {loading && <Spinner />}
                            Wrap
                        </button>
                    </div>
                </div>
                <div className="text-sm pt-0 pb-1 text-center text-neutral-400">
                    Your Staked SUI Objects
                </div>

                <table class="table-auto w-full text-sm mt-2 text-left">
                    <thead>
                        <tr>
                            <th>Object ID</th>
                            <th>Pool ID</th>
                            <th>Principal</th>
                            <th>Staked Activition Epoch</th>

                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {shortAddress(item.data.objectId)}
                                    </td>
                                    <td>
                                        {Number(item.data.content.fields["pool_id"])}
                                    </td>
                                    <td>
                                        {(Number(item.data.content.fields["principal"]) / 1000000000).toLocaleString()}{` `}SUI
                                    </td>
                                    <td>
                                        {Number(item.data.content.fields["stake_activation_epoch"])}
                                    </td>
                                </tr>
                            )
                        })

                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default MockToken