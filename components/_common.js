import Link from 'next/link'
import styled, { css, keyframes } from 'styled-components'

import { 
    colorPrimary, 
    colorLight, 
    colorOffLight, 
    colorDark, 
    shadowM,
    shadowL,
    transition,
    gradientPrimary,
    logos,
    colorError,
    colorConfirm,
    colorPrimaryLight
} from './_theme'


const loadingKeyframes = keyframes`
    from {left: -200px; width: 20%;}
    30% {width: 25%;}
    50% {width: 30%;}
    70% {width: 70%;}
    80% { left: 50%;}
    95% {left: 120%;}
    to {left: 100%;}
`

export const Loader = styled.div`
    height: 3px;
    width: 100%;
    overflow: hidden;
    position: relative;
    z-index: 998;
    background-color: rgba(255,255,255,0.3);
    &:before{
        display: block;
        position: absolute;
        content: "";
        left: -200px;
        width: 200px;
        height: 4px;
        background-color: ${colorLight};
        animation: ${loadingKeyframes} 2s linear infinite;
    }
    ${props => props.hidden && css`
        display: none;
    `} 
    ${props => props.purple && css`
        background-color: rgba(0,0,0,0.4);
        &:before{background-color: ${colorPrimary}; }
    `} 
    ${props => props.black && css`
        background-color: rgba(0,0,0,0.1);
        &:before{background-color: ${colorDark}; }
    `} 
`

export const PageContainer = styled.div`
    padding: 1em;

    @media all and (min-width: 750px) {
        padding: 1em 50px;
    }
    @media all and (min-width: 1065px) {
        padding: 1em 100px;
    }
`

export const ColorDecoratedTitle = styled.h3`
    width: fit-content;
    border-bottom: solid 4px ${colorPrimary};
    ${props => props.color && css`
        border-color: ${props.color};
    `}
`

export const PageTitle = styled.h1`
    font-size: 2.5em;
    margin-bottom: .2em;
`

export const CtaButton = styled.button`
    border: none;
    color: ${colorLight}; 
    border-radius: 0.15em;
    margin:14px;
    font-family: $regular-font;
    background-color: ${colorPrimary};   
    &:hover{
        background-color: ${colorOffLight};  
        color: ${colorPrimary}; 
        font-weight: bold;
    }
    &:active{
        background-color: ${colorLight};  
        color: lighten(${colorPrimary},10); 
    }
    ${props => props.white && css`
        margin : 0;
        padding : .4em .8em;
        border-radius: 0.1em;
        color: ${colorPrimary};
        background-color: ${colorLight};
    `}
    ${props => props.black && css`
        margin : 0;
        padding : .4em .8em;
        border-radius: 0.1em;
        border: solid 2px ${colorLight};  
        color: ${colorLight};
        background-color: ${colorDark};
        &:hover{
            border: solid 2px ${colorPrimary};  
        }
    `}
    ${props => props.uppercase && css`
        text-transform: uppercase;
    `} 
    ${props => props.lg && css`
        font-size: 1.6em;
    `} 
`

export const TextBadge = styled.span`
    font-family: monospace;
    font-size: 1em;
    font-weight: 500;
    text-transform: capitalize;
    margin-right: 0.1em;
    background-color: ${colorPrimary};
    color: ${colorLight};
    padding: 0.3em 0.4em 0.3em 0.6em;
    border-radius: 0.2em;
    ${props => props.upper && css`
        text-transform: uppercase;
    `}
    ${props => props.color && css`
        background-color: ${props.color};
    `}
`

export const ActionCard = styled.div`
    padding: 1em;
    display: flex;
    cursor: pointer;
    text-align: center;
    text-decoration: none !important;
    color: ${colorDark}; 
    border-radius: 0.2em;
    text-decoration: none;
    flex-direction: column;
    transition: ${transition};
    justify-content: center;
    background-color: ${colorLight};
    &:hover{ box-shadow: ${shadowM}; }
    &:active{ box-shadow: ${shadowL}; }
`

export const TextImgGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1em; 
`

export const TextImgRow = styled.div`
    margin: 1.5em 0 1.5em 0;
    display: grid;
    grid-template-areas: "txt img";
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr;
    ${props => props.flip && css`
        grid-template-areas: "img txt";
        grid-template-columns: 2fr 3fr;
    `}

    & > div:nth-child(1) { 
        grid-area: txt; 
        padding: 14px;
        h2{text-align: center;} 
        @media all and (max-width: 895px) {
            padding:7px;
        }
    }
    & > div:nth-child(2) { 
        grid-area: img; 
        display: flex;
        align-content: center;
        justify-content: center;
        text-align: -webkit-center;
        flex-direction: column;
        justify-content: center;
        img{max-width:90%;}
    }

    @media all and (max-width: 895px) {
        grid-template-areas: "img" "txt";
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        ${props => props.flip && css`
            grid-template-areas: "img" "txt";
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
        `}
    }
`

export const Purple = styled.strong`
    color: ${colorPrimary};
    font-weight: bolder; 
`

const LogoBannerStyled = styled.div`
    background: ${gradientPrimary};
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    h1{margin:0; 
        img{max-width:80%;}
    }
    h2{
        padding: 0 14px 0 14px;
        font-size: 35px;
        margin-top:0;
        color: ${colorLight};
        @media all and (max-width: 895px) {
            font-size: 25px;
        }
    }
`

export const LogoBanner = (props) => (
    <LogoBannerStyled>
        <h1>
            <img title="Purple Facts Logo" alt="Svg Purple Facts logo in white on purple background." height="150" width="400" src={logos.svg.white} />
        </h1>
        <h2>
            {props.text || <span>Real Estate Investing in the Age of Technology</span>}
        </h2>
    </LogoBannerStyled>
)

export const socialIcons = [
    {title : 'Email icon', alt : 'Send us an email', imgSrc : '/static/social/email.svg', href : 'mailto:contact@purplefacts.com'},
    // {title : 'Whatsapp icon', alt : 'Message us on Whatsapp', imgSrc : '/static/social/whatsapp.svg', href : 'https://api.whatsapp.com/send?phone=16176512481'},
    {title : 'Facebook icon', alt : 'Follow us on Facebook', imgSrc : '/static/social/fb.svg', href : 'https://fb.me/purplefactsinvesting'},
    {title : 'Messenger icon', alt : 'Message us on Facebook Messenger', imgSrc : '/static/social/messenger.svg', href : 'https://m.me/purplefactsinvesting'},
    // {title : 'Google+ icon', alt : 'Be on our circle on G+', imgSrc : '/static/social/g+.svg', href : 'https://plus.google.com/about'}
]

export const Center = styled.div`
    text-align: center;
    ${props => props.flex && css`
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    `}
`

export const NoticeBanner = styled.p`
    border: 1px solid ${colorPrimary};
    margin : 1em 2em; 
    padding: 1.3em;
    text-align: center;    
    border-radius: 3px;
    padding-left: 10%;
    padding-right: 10%;
    min-width: calc(300px - 4em);

    @media all and (max-width: 895px) {
        margin-left: 14px;
        margin-right: 14px;
        padding-left: 14px;
        padding-right: 14px;
    }

    ${props => props.breath && css`
        margin: 2em;
        @media all and (max-width: 500px) {
            margin-left: 14px;
            margin-right: 14px;
            padding-left: 14px;
            padding-right: 14px;
        }
    `}

    ${props => props.colored && css`
        background-color: ${colorPrimaryLight};
    `}

`

export const OptionCard = styled.button`
    transition: ${transition};
    width: 140px;
    margin:0.5em;
    padding: 3em 1em;
    outline: none;
    background-color: ${colorLight};
    -webkit-touch-callout: none; 
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; 
    ${props => props.selected && css`
        color: ${colorOffLight};
        background-color: ${colorPrimary};
    `}
    ${props => props.capitilize && css`
        text-transform: capitalize;
    `}
    ${props => props.space && css`
        margin: 20px;
        @media all and (max-width: 500px) {
            margin: 7px;
        }
    `}
    ${props => props.borderColor && css`
        border: solid 2px ${props.borderColor};
    `}
    
    
`

export const CleanList = styled.ul`
    list-style: none;
    padding:0;
    li { margin: 1em 0em; }
    li > h3 {margin-bottom: 0.3em;}
    
`

export const ErrorSpan = styled.span`
    color: ${colorError}; 
`
export const SuccessSpan = styled.span`
    color : ${colorConfirm};
`

export const DateEpoch = ({epoch, complete, mono}) => {
    let d = new Date(epoch);
    let fixedDate
    if(complete){
        fixedDate = d.toLocaleDateString(0, {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour:'numeric', 
            minute:'numeric', 
            second: 'numeric'
        })
    }
    else{
        fixedDate = d.toLocaleDateString(0, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }
    return (
        <span style={{fontFamily:(mono ? '"Ubuntu Mono", monospace' : '') }} >{fixedDate}</span>
    )
}

export const ShortText = (props) => {
    if(!props.text) return props.text
    const limit = props.limit || 20  
    let text = props.text
    if(props.text.length > limit) {
        text= text.substring(0,limit)
        text = `${text}...` 
    }
    return <span>{text}</span>
}

const QuestionsStyled = styled.div`
    margin : 1.3em 2em; 
    text-align: center;
    h2{
        color: ${colorPrimary};
    }
    &>i{color: ${colorPrimary};}
    i{font-size:2.6em;}
`

export const Questions = (props) => (
    <QuestionsStyled>
        <i className="material-icons">contact_support</i>
        <h2>Still have questions?</h2>

        <OptionCard space onClick={ ()=>{if(Tawk_API.getStatus()){Tawk_API.showWidget();Tawk_API.maximize();} else alert('Seems like our chat server is not online right now. Sorry about that!')} } style={{fontSize:'1em', width:'200px'}} >
            <i className="material-icons">chat</i><br/><br/>
            Chat with us <strong>now</strong>
        </OptionCard>

        <Link href="/contact"><a>
            <OptionCard space style={{fontSize:'1em', width:'200px'}} >
                <i className="material-icons">forum</i><br/><br/>
                More contact options
            </OptionCard>
        </a></Link>
    </QuestionsStyled>
)

export const PaperDivider = styled.div`
    background: url('/static/resource-icons/paper-divider.svg');
    width: 100%;
    height:45px;
    ${props => props.height && css`
        height : ${props.height}px;
    `}

    ${props => props.space && css`
        margin-top: 1em;
        margin-bottom: 1em;
    `}
`

export const CityDivider = styled.div`
    background-image: url('/static/resource-icons/cityscape-divider.svg');
    height: 100px;
    margin-top: -90px;
`

export const ImageDiv = styled.div`
    height: 100px;
    width: 100px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    ${props=> props.height && css`
        height : ${props.height}px; 
    `}
    ${props=> props.width && css`
        width : ${props.width}px; 
    `}
    ${props=> props.img && css`
        background-image : url(${props.img}); 
    `}
    ${props=> props.cover && css`
        background-size: cover;
    `}
    ${props=> props.round && css`
        border-radius: 5px;
    `}

`

export const CompactContainerStyled = styled.div`
    
    display: grid;
    grid-template-areas: 'gap body gap';
    grid-template-columns: 10px auto 10px;

    & > .gap{
        grid-area: 'gap';
    }
    & > .body{
        grid-area: 'body';
        display: flex;
        flex-direction: column;
        justify-content: center;

        &>h1, &>h2, &>h3{text-align:center}
        ${props => props.nocenter && css`
            &>h1, &>h2, &>h3{text-align:left}
        `}

    }

    

    @media all and (min-width: 770px) {
        grid-template-columns: 1fr 5fr 1fr;
    }
    @media all and (min-width: 1245px) {
        grid-template-columns: 2fr 7fr 2fr
    }

`

export const CompactContainer = (props) => (
    <CompactContainerStyled nocenter={props.nocenter} id={props.id} style={props.style} >
        <div className='gap'></div>
        <div className='body'>{props.children}</div>
        <div className='gap'></div>
    </CompactContainerStyled>
)


export const CodeContainer = styled.pre`
    width: calc(90% - 1.5em);
    margin-left:5%;
    padding: 0.75em;
    line-height: 1.7em;
    overflow-x: scroll;
    color:${colorOffLight};
    background-color:${colorDark};
`

export const Dot = styled.div`
    height: 8px;
    width: 8px;
    border-radius: 100%;
    background-color:${colorConfirm};
    display: inline-block;
    ${props => props.color && css`
        background-color: ${props.color};
    `}
`

export const FullWindow = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;

    ${props => props.breath && css`
        padding-top : ${ props.breath===true ? `1.2em` : props.breath };
        padding-bottom : ${ props.breath===true ? `1.2em` : props.breath };
    `}

    ${props => props.color && css`
        background: ${props.color};    
    `}

    ${props => props.fit && css`
        height: fit-content;    
    `}

    ${props => props.waves && css`   
        background-color:#f1f1f1;
        background-image: 
            radial-gradient(circle at 100% 150%, #f1f1f1 24%, white 25%, white 28%, #f1f1f1 29%, #f1f1f1 36%, white 36%, white 40%, transparent 40%, transparent),
            radial-gradient(circle at 0    150%, #f1f1f1 24%, white 25%, white 28%, #f1f1f1 29%, #f1f1f1 36%, white 36%, white 40%, transparent 40%, transparent),
            radial-gradient(circle at 50%  100%, white 10%, #f1f1f1 11%, #f1f1f1 23%, white 24%, white 30%, #f1f1f1 31%, #f1f1f1 43%, white 44%, white 50%, #f1f1f1 51%, #f1f1f1 63%, white 64%, white 71%, transparent 71%, transparent),
            radial-gradient(circle at 100% 50%, white 5%, #f1f1f1 6%, #f1f1f1 15%, white 16%, white 20%, #f1f1f1 21%, #f1f1f1 30%, white 31%, white 35%, #f1f1f1 36%, #f1f1f1 45%, white 46%, white 49%, transparent 50%, transparent),
            radial-gradient(circle at 0    50%, white 5%, #f1f1f1 6%, #f1f1f1 15%, white 16%, white 20%, #f1f1f1 21%, #f1f1f1 30%, white 31%, white 35%, #f1f1f1 36%, #f1f1f1 45%, white 46%, white 49%, transparent 50%, transparent);
        background-size:100px 50px;
    `}

    ${props => props.bk && css`
        background-image : url('${props.bk}');
        background-size: cover;
        background-position: center;
    `}

    ${props => props.center && css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `}

    ${props => props.border && css`
        border: ${ props.border===true ? `2px solid ${colorPrimary}` : props.border };
    `}

    ${props => props.height && css`
        height: ${ props.height }vh;
    `}    

`


