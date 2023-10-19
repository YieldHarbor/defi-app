import Header from "@/components/Header"


const MainLayout = ({ children }) => {
    return (
        <main class="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-white">
            <div class="flex min-h-screen flex-col mx-auto justify-between">
                <Header />
                <div className="mb-auto">
                    {children}
                </div>

            </div>

        </main>
    )
}

export default MainLayout