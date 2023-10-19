import MainLayout from "@/layouts/mainLayout"
import BorrowComponent from "@/components/Borrow"

const Stake = () => {
    return (
        <MainLayout>
            <div class="w-full mx-auto max-w-screen-xl p-4">
                <BorrowComponent />
            </div>

        </MainLayout>
    )
}

export default Stake