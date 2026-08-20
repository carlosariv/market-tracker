import './StockCard.css';

import sampleLogo from '../../assets/hero.png';
import starIcon from '../../assets/star.svg'


interface StockCardProps {
    symbol: string;
    name: string;
    price: number;
}

export default function StockCard({ symbol, name, price } : StockCardProps) {
    return (
        <div className="stock-card">
            <div className="card-heading">
                <div>
                    <img src={sampleLogo} alt="Sample Logo"/>
                    <span className="card-symbol">{symbol}</span>
                </div>

                <img src={starIcon}/>
            </div>

            <h4>{name}</h4>
            <h4>{price}</h4>
        </div>
    )
}