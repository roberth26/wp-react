import * as React from 'react';
import * as DOMPurify from 'dompurify';
import * as HtmlToReact from 'html-to-react';
import FormContainer from '../containers/FormContainer/FormContainer';
import Paragraph from '../components/primitives/Paragraph';
import ClipPath from '../components/ClipPath/ClipPath';
import EShape from '../contracts/EShape';

const Parser = new HtmlToReact.Parser();
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions( React );
const processingInstructions = [
    {
        shouldProcessNode: node => node.name === 'clip-path',
        processNode: ( node, children, index ) => {
            const props = {
                shape: EShape.fromString( node.attribs[ 'shape' ] )
            };

            return React.createElement( ClipPath, props, children );
        }
    },
    {
        shouldProcessNode: node => node.name === 'form',
        processNode: ( node, children, index ) => {
            const props = { formId: node.attribs[ 'id' ], key: index };

            return React.createElement( FormContainer, props, children );
        }
    },
    {
        shouldProcessNode: node => true,
        processNode: ( node, children, index ) => {
            const parsed = processNodeDefinitions.processDefaultNode( node, children, index );

            if ( node.name === 'p' ) {
                // TODO: don't replace ALL p's, only ones containing invalid html
                return React.createElement( Paragraph, { ...parsed.props, key: index }, children );
            }

            return parsed;
        }
    }
];

export default function parse( html: string ) {
    if ( !html ) {
        return null;
    }

    html = DOMPurify.sanitize( html.trim() );
    // TODO: don't replace ALL square brackets
    html = html.replace( /\[/g, '<' ).replace( /\]/g, '>' );
    html = html.replace( /[“”‘’″]/g, '"' ); // normalize shortcode attribute quotes

    return Parser.parseWithInstructions(
        html,
        () => true,
        processingInstructions
    );
}