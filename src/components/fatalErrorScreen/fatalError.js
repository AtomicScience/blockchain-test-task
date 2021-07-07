import NoMetamaskFatalError from "./noMetamaskFatalError";
import UnknownFatalError from "./unknownFatalError";

export default function FatalError(props) {
    let errorBody = getContentForError(props.error);

    return (
        <div>
            <h1>Fatal error!</h1>
            {errorBody}
        </div>);
}

function getContentForError(error) {
    if(error.message === "Metamask is not present on client")
        return <NoMetamaskFatalError/>;

    return <UnknownFatalError error={error}/>;
}