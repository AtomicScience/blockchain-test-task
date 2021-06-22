import TokenPrices from "./tokenPrices";

export default function InfoScreen(props) {
    return (
        <div>
            <TokenPrices wallet={props.wallet}></TokenPrices>
        </div>
    )
}