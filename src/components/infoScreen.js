import Balance from "./balance";
import { TokenPrices } from "./tokenPrices";

export default function InfoScreen(props) {
    return (
        <div>
            <Balance wallet={props.wallet}></Balance>
            <TokenPrices wallet={props.wallet}></TokenPrices>
        </div>
    )
}