import * as React from 'react';
import * as DOMPurify from 'dompurify';
import * as HtmlToReact from 'html-to-react';
import FormContainer from '../containers/FormContainer/FormContainer';
import Paragraph from '../components/primitives/Paragraph';
import ClipPath from '../components/ClipPath/ClipPath';
import EShape from '../contracts/EShape';
import EIcon from '../contracts/EIcon';
import Icon from '../components/Icon/Icon';
import MenuContainer from '../containers/MenuContainer/MenuContainer';

const Parser = new HtmlToReact.Parser();
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions( React );
const processingInstructions = [
    {
        shouldProcessNode: node => node.name === 'clip-path',
        processNode: ( node, children, index ) => {
            const props = {
                shape: EShape.fromString( node.attribs[ 'shape' ] )
            } as any;
            const rot = node.attribs[ 'rotation' ];
            if ( rot ) {
                props.rotation = Number.parseInt( node.attribs[ 'rotation' ] );
            }

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
        shouldProcessNode: node => node.name === 'icon',
        processNode: ( node, children, index ) => {
            const props = { icon: EIcon.fromString( node.attribs[ 'name' ] ), key: index };

            return React.createElement( Icon, props, children );
        }
    },
    {
        shouldProcessNode: node => node.name === 'menu',
        processNode: ( node, children, index ) => {
            const props = {
                menuId: Number.parseInt( node.attribs[ 'id' ] ),
                vertical: node.attribs[ 'vertical' ],
                key: index
            };

            return React.createElement( MenuContainer, props, children );
        }
    },
    {
        shouldProcessNode: node => node.name === 'year',
        processNode: ( node, children, index ) => {
            return React.createElement( 'span', null, new Date().getFullYear() );
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

export default function parse( html: string ): React.ReactElement<any> {
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