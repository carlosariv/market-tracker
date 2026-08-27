import { useSearchResults } from "../../context/Context";
import './Watchlist.css'




export default function Watchlist() {
    const { watchlist } = useSearchResults();

    return (

         <div className="card-grid"></div>
    )
}