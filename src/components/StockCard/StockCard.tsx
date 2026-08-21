import './StockCard.css';

import sampleLogo from '../../assets/hero.png';
import starIcon from '../../assets/star.svg'
import type { stockId } from '../../services/SymbolLookup';
import type { Quote } from '../../services/Quote';


interface StockCardProps {
    stockId: stockId,
    quote: Quote
}


// export default function StockCard({ symbol, name, price } : StockCardProps) {

export default function StockCard({stockId, quote} : StockCardProps) {
    return (
        <div className="stock-card">
            <div className="card-heading">
                <div>
                    <img src={sampleLogo} alt="Sample Logo"/>
                    <span className="card-symbol">{stockId.symbol}</span>
                </div>

                <img src={starIcon}/>
            </div>

            <h4>{stockId.description}</h4>
            <h4>Current Price ${quote.c}</h4>
            <h4>Change ${quote.d}</h4>
            <h4>Percent Change %{quote.dp}</h4>
            <h4>High ${quote.h}</h4>
            <h4>Low ${quote.l}</h4>
            <h4>Open Price ${quote.o}</h4>
            <h4>last Close Price ${quote.pc}</h4>

        </div>
    )
}

