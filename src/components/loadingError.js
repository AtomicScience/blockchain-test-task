import Emoji from "./emoji";

export default function LoadingError(props) {
    return <abbr title={props.error}>
        <Emoji symbol=":x:"></Emoji>
    </abbr>
}