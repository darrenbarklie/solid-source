export interface HeaderVideo {
  titleFull: string
  titleShort: string
  authorName: string
  authorTwitter?: string
  contentSource: string
  contentHost: string
  contentIntro: string
}

export default function Header(props: HeaderVideo) {
  return (
    <>
      <header>
        <h1>{props.titleShort}</h1>
        <h2>
          {props.authorName}
          {props.authorTwitter &&
            ` | <a href="https://twitter.com/${props.authorTwitter}" target="_blank" rel=”noopener noreferrer”>@${props.authorTwitter}</a>`}
        </h2>
      </header>
    </>
  )
}
