import Balance from "./balance";

export default function InfoScreen(props) {
    return (
        <div>
            <Balance wallet={props.wallet}></Balance>
        </div>
    )
}