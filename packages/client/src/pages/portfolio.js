import MainLayout from "@/layouts/mainLayout"

import PortfolioModule from "@/components/Portfolio"
import MockToken from "@/components/MockToken"

const Portfolio = () => {

    return (
        <MainLayout>
            <div className="pb-10">
                <PortfolioModule />
                <MockToken />
            </div>
        </MainLayout>
    )
}

export default Portfolio