// LIB
import React from 'react'
import styled, {css} from 'styled-components'
import {    
    Editor, 
    EditorState, 
    RichUtils, 
    convertToRaw, 
    convertFromRaw,
    CompositeDecorator, 
    AtomicBlockUtils
} from 'draft-js'


// COMPONENNTS
import { Loader, Center } from './_common';
import { transition, shadowL, colorConfirm, colorLink } from './_theme';
import { isUrl } from '../services/helpers';

// DEV CTRLS
const DEBUG = true

// CONTAINER STYLES
const EditorContainer = styled.div`
    border-radius: 4px;
    border: solid 1px #17171740;
    ${props => props.readOnly && css`
        border: none;

    `}
` 
const DebuggerContainer = styled.div`
    border: solid 1px green;
`
const ToolbarContainer = styled.div`
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    min-height: 45px;
    flex-wrap: wrap;
    background-color: white;
    border-bottom: solid 0.5px #17171740;
    & > div{
        user-select: none;
        width:22px;
        text-align: center;
        margin: 4px;
        padding:5px;
        border-radius:100%;
        cursor: pointer;
        i {font-size: 19px;}
        transition: ${transition};
        &:hover{
            background-color: #17171710;
        }
        &:active{
            color:${colorConfirm};
            background-color: #171717A2;
        }
        &.active{
            color:${colorConfirm};
            font-weight:bolder;
        }
    }
`
const DatainputContainer = styled.div`
    display: flex;
    align-items:flex-start;
    justify-content: flex-start;
    transition: ${transition};
    input{
        transition: ${transition};
        width: 60%;
        font-size: 14px;
        box-shadow: ${shadowL};
        position:relative;
        margin:7px;
    }
    &.hidden{
        font-size:0;
        input{
            z-index:-1;
            margin-top:-30px;
            opacity:0;
        }
    }
`

// DECORATOR STRATEGIES
function makeStrategyForEntity(entityType){
    return function (contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(
            (character) => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null &&
                    contentState.getEntity(entityKey).getType() === entityType
                )
            },
            callback
        )
    }
}

function makeStrategyForBlock(blockType){
    return function (contentBlock, callback, contentState) {
        if(contentBlock.getType() === blockType){
            contentBlock.findStyleRanges(
                ()=>true,
                callback
            )
        }
    }
}


const A = (props) => (
    <a href={props.contentState.getEntity(props.entityKey).getData().url} style={{color:colorLink}}>
        {props.children}
    </a>
)

const H1 = styled.h1``
const H2 = styled.h2``
const H3 = styled.h3``

const QuoteStyled = styled.div`
    text-align: center;
    hr{ border: .5px solid rgba(0, 0, 0, 0.06); width: 50%; }
    i{font-size: 50px;}
    span{font-size:20px;}
`
const QUOTE = (props) => (
    <QuoteStyled>
        <hr />
        <i className='material-icons'>format_quote</i> <br />
        <span>{props.children}</span>
        <hr />
    </QuoteStyled>
)
const P = styled.p`
    margin: 1.3em 0em;
    line-height: 1.5em;
`

const CODE = styled.pre`
    padding: 10px;
    border-radius: 5px;
    font-family: 'Ubuntu Mono', monospace;
    background-color: #F1F1F1;
    white-space: wrap;
    overflow-x: scroll;
`


//defineDecorators

const decorator = new CompositeDecorator([
    {
        strategy: makeStrategyForEntity('LINK'),
        component: A,
    },
    {
        strategy: makeStrategyForBlock('H1'),
        component: H1,
    },
    {
        strategy: makeStrategyForBlock('unstyled'),
        component: P,
    },
    {
        strategy: makeStrategyForBlock('H2'),
        component: H2,
    },
    {
        strategy: makeStrategyForBlock('H3'),
        component: H3,
    },
    {
        strategy: makeStrategyForBlock('QUOTE'),
        component: QUOTE,
    },
    {
        strategy: makeStrategyForBlock('CODE'),
        component: CODE,
    },
    {
        strategy: makeStrategyForBlock('IFRAME'),
        component: IFRAME,
    }
])

// atomic media block rennder =>
function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }
    return null;
}

const styles = {
    media: {
        width: '180px',
        textAlign: 'center',
        whiteSpace: 'initial'
    }
}

const IFRAME = ({src}) => {
    if(isUrl(src)){
        return <div>
            <iframe width='100%' height='360px' frameBorder='0' src={src} /> 
        </div> 
    }
    else{
        return <h4>-- Url not valid --</h4>
    }
}

const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />
}
const Image = (props) => {
    return <img src={props.src} style={styles.media} />
}
const Video = (props) => {
    return <video controls src={props.src} style={styles.media} />
}
const Media = (props) => {
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    )
    const {src} = entity.getData()
    const type = entity.getType()
    let media
    if (type === 'audio') {
        media = <Audio src={src} />
    } else if (type === 'image') {
        media = <Image src={src} />
    } else if (type === 'video') {
        media = <Video src={src} />
    } else if (type === 'IFRAME'){
        media = <IFRAME src={src} />
    }
    return media
}


class HtmlEditor extends React.Component {

    constructor(props){ 
        super(props)

        const initialEditorState = this.props.instantiateWithModel ? 
            EditorState.createWithContent( convertFromRaw(this.props.instantiateWithModel), decorator ) :
            EditorState.createEmpty(decorator)

        this.state = {
            debuggerToggled:false,
            onBrowser:false,
            editorState: initialEditorState,
            showMetaInput : false,
            metaInputPlaceholder : '',
            metaValue : '',
            metaType: ''
        }
        
    }

    componentWillReceiveProps({instantiateWithModel}){
        if(instantiateWithModel !== this.props.instantiateWithModel && instantiateWithModel){
            let editorState = EditorState.createWithContent( convertFromRaw(instantiateWithModel), decorator )
            this.setState({ editorState, modelInstantiated:true })
        }
    }

    componentDidMount(){
        this.setState({onBrowser:true})
        if(this.props.autoFocus) setTimeout(this.focus, 0)
    }

    onChange = (editorState) => {
        this.setState({editorState})
        this.props.onChange(this.rawEditorState)
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    get currentBlockType() {
        const key = this.state.editorState.getSelection().getStartKey()
        return this.state.editorState
            .getCurrentContent()
            .getBlockForKey(key)
            .getType()
    }

    focus = () => {
        this.refs.editor.focus()
    }

    get loading() {
        return (
            <Center>
                <Loader black />
                <h2>Loading</h2>
            </Center>
        )
    }

    get rawEditorState(){
        return convertToRaw(this.state.editorState.getCurrentContent())
    }

    get rawEditorStateComponent() {
        return <pre>{JSON.stringify( this.rawEditorState, null, 2 )}</pre>
    }

    toggleDebugger = () => {
        this.setState({debuggerToggled:!this.state.debuggerToggled})
    }

    handleToolbarClick = (tag) => {

        switch(tag){
            case 'LINK':
                this.toggleMetaInput('URL')
                this.refs.meta.focus()
                this.setState({metaType:tag})
                break;
            case 'image':
                this.toggleMetaInput('IMAGE URL')
                this.refs.meta.focus()
                this.setState({metaType:tag})
                break;
            case 'IFRAME':
                this.toggleMetaInput('CONTENT URL')
                this.refs.meta.focus()
                this.setState({metaType:tag})
                break;
            case 'BOLD':
            case 'ITALIC':
            case 'UNDERLINE':
                this.onChange(RichUtils.toggleInlineStyle( this.state.editorState , tag))    
                setTimeout(this.focus,0)    
                break;
            default:
                this.onChange(RichUtils.toggleBlockType( this.state.editorState , tag))   
                setTimeout(this.focus,0)

        }

    }

    toggleMetaInput = (placeholder) => {
        this.setState({metaInputPlaceholder:placeholder, showMetaInput:!this.state.showMetaInput})
    }

    submitMetaInput = (e) => {
        if(e.key!=='Enter'){ return }

        e.preventDefault()
        const editorState = this.state.editorState
        const contentState = editorState.getCurrentContent();

        let meta = {}
        let mutability = ''

        switch(this.state.metaType){
            case 'LINK':
                meta.url = this.state.metaValue    
                mutability = 'MUTABLE'
                break
            case 'image':
                meta.src = this.state.metaValue
                mutability = 'IMMUTABLE'
                break
            case 'IFRAME':
                meta.src = this.state.metaValue
                mutability = 'IMMUTABLE'
                break
            default:
                console.warn('type not known')
        }

        // create new state 
        const contentStateWithEntity = contentState.createEntity(
            this.state.metaType, mutability, meta
        )
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })

        // set new state       
        let builtEditorState
        switch(this.state.metaType){
            case 'LINK':
                builtEditorState = RichUtils.toggleLink( newEditorState, newEditorState.getSelection(), entityKey)
                break
            case 'image':
                builtEditorState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ' )
                break
            case 'IFRAME':
                builtEditorState = AtomicBlockUtils.insertAtomicBlock(newEditorState , entityKey,  ' ' )
                break
            default:
                console.warn('Type not known')
        }

        this.setState(
            { editorState:builtEditorState },
            () => { setTimeout(this.focus, 0) }
        )

        // cleanup input
        this.setState({
            showMetaInput : false,
            metaInputPlaceholder : '',
            metaValue : '',
            metaType: ''
        })

    }

    get toolbar() {
        
        const tools = [
            {
                label: <span>H1</span>,
                title: 'Header 1',
                actionTag : 'H1'
            },
            {
                label: <span>H2</span>,
                title: 'Header 2',
                actionTag : 'H2'
            },
            {
                label: <span>H3</span>,
                title: 'Header 3',
                actionTag : 'H3'
            },
            {
                label: <span>P</span>,
                title: 'Paragraph',
                actionTag : 'unstyled'
            },
            {
                label: <span><i className='material-icons'>format_list_bulleted</i></span>,
                title: 'Unordered List',
                actionTag : 'unordered-list-item'
            },
            {
                label: <span><i className='material-icons'>format_list_numbered</i></span>,
                title: 'Ordered List',
                actionTag : 'ordered-list-item'
            },
            {
                label: <span><i className='material-icons'>format_bold</i></span>,
                title: 'Bold',
                actionTag : 'BOLD'
            },
            {
                label: <span><i className='material-icons'>format_italic</i></span>,
                title: 'Italic',
                actionTag : 'ITALIC'
            },
            {
                label: <span><i className='material-icons'>format_underlined</i></span>,
                title: 'Underline',
                actionTag : 'UNDERLINE'
            },
            {
                label: <span><i className='material-icons'>link</i></span>,
                title: 'Hyperlink',
                actionTag : 'LINK'
            },
            {
                label: <span><i className='material-icons'>format_quote</i></span>,
                title: 'Quote',
                actionTag : 'QUOTE'
            },
            {
                label: <span><i className='material-icons'>code</i></span>,
                title: 'Monospace',
                actionTag : 'CODE'
            },
            {
                label: <span><i className='material-icons'>add_photo_alternate</i></span>,
                title: 'Image',
                actionTag : 'image'
            },
            {
                label: <span><i className='material-icons'>photo_filter</i></span>,
                title: 'Embed',
                actionTag : 'IFRAME'
            },
            // {
            //     label: <span><i className='material-icons'>bug_report</i></span>,
            //     title: 'Toggle Debug',
            //     actionTag : null,
            //     action : this.toggleDebugger
            // }
        ]
          
        return (
            <div>
                <ToolbarContainer>
                    {tools.map((x,i)=>(
                        <div title={x.title} className={this.currentBlockType === x.actionTag ? 'active' : ''}  key={i} onClick={()=>{ x.actionTag ? this.handleToolbarClick(x.actionTag) : x.action() }} >{x.label}</div>
                    ))}
                </ToolbarContainer>
                <DatainputContainer className={ this.state.showMetaInput ? '' : 'hidden' } >
                    <input ref='meta' 
                            placeholder={this.state.metaInputPlaceholder} 
                            value={this.state.metaValue} 
                            onChange={ (e)=>{this.setState({metaValue:e.target.value})} } 
                            onKeyDown={ this.submitMetaInput }
                    /> 
                </DatainputContainer>
            </div>
        )
    }

    get editor(){
        return (
            <div>
                <EditorContainer readOnly={this.props.readOnly}>
                    {this.props.readOnly ? '' : this.toolbar}
                    <div style={{padding:'1em', height:( this.props.readOnly ? 'fit-content' : '80vh' ), overflowY:'scroll'}} onClick={this.focus}>
                        <Editor
                            blockRendererFn={mediaBlockRenderer}
                            customStyleMap={this.styleMap}
                            editorState={this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            spellCheck={true}
                            ref='editor'
                            readOnly={this.props.readOnly}
                        />
                    </div>
                </EditorContainer>
                <DebuggerContainer hidden={ !this.state.debuggerToggled || !DEBUG } >
                    {this.rawEditorStateComponent}
                </DebuggerContainer>
            </div>
        )
    }

    get serverEditor() {
        return (
            <div>
                <EditorContainer readOnly={this.props.readOnly}>
                    {this.props.readOnly ? '' : this.toolbar}
                    <div style={{padding:'1em', minHeight:'300px', height:'fit-content', overflow:'scroll'}} onClick={this.focus}>
                        <Editor
                            blockRendererFn={mediaBlockRenderer}
                            customStyleMap={this.styleMap}
                            editorState={this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            spellCheck={true}
                            ref='editor'
                            readOnly={this.props.readOnly}
                        />
                    </div>
                </EditorContainer>
                <DebuggerContainer hidden={ !this.state.debuggerToggled || !DEBUG } >
                    {this.rawEditorStateComponent}
                </DebuggerContainer>
            </div>
        )
    }

    render() {
        if(this.state.onBrowser){ 
            return this.editor
        }
        else{
            return this.serverEditor
        }
    }


}




export default HtmlEditor


