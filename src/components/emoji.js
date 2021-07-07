import EmojiConvertor from "emoji-js"

let emoji = new EmojiConvertor();
export default function Emoji(props) {
    return <span dangerouslySetInnerHTML = {{__html: emoji.replace_colons(props.symbol)}}></span>
}