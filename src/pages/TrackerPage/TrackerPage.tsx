import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import StockCard from "../../components/StockCard/StockCard";

import "./TrackerPage.css"

export default function TrackerPage() {
    return (
        <div>
            <Navbar />
            <div className="card-grid">
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
            </div>
            <Footer></Footer>
        </div>
    )
}