import * as React from 'react';
import * as DOMPurify from 'dompurify';
import * as HtmlToReact from 'html-to-react';
import FormContainer from '../containers/FormContainer/FormContainer';
import Paragraph from '../components/primitives/Paragraph';

const Parser = new HtmlToReact.Parser();

/*
interface IParserProps {
    children?: React.ReactChildren;
}

class Parser extends React.Component<IParserProps, {}> {
    parseShortcode = ( str: string ): React.ReactElement<any> => {
        const type = str.split( ' ' )[ 0 ].substring( 1 );
        const shortcode = str.match( /[\w-]+="[^"]*"/g );
        if ( !shortcode ) {
            return <span>{str}</span>;
        }

        const params = new Map<string, string>(
            shortcode.map(( param: string ) => {
                const key = param.split( '=' )[ 0 ];
                const value = param.split( '"' )[ 1 ];

                return [ key, value ] as [ string, string ];
            })
        );

        switch ( type ) {
            case 'form': {
                const id = Number.parseInt( params.get( 'id' ) );
                return <FormContainer formId={id} />;
            }
            default: {
                return <span>{str}</span>;
            }
        }
    }

    renderShortcode = ( element: React.ReactElement<any> ): React.ReactElement<any> => {
        return React.cloneElement( element, {
            children: React.Children.map( element.props.children, ( child: React.ReactChild ) => {
                if ( !React.isValidElement( child ) ) {
                    return ( child as string ).replace( /[“”‘’″]/g, '"' )
                        .split( /(\[.*?\])/ )
                        .map(( str: string ) => {
                            if ( str && str.match( /(\[.*?\])/ ) ) {
                                return this.parseShortcode( str );
                            }

                            return <span>{str}</span>;
                        });
                }
                return child;
            })
        });
    }

    renderShortcodes = ( nodes: React.ReactChildren ) => {
        return React.Children.map( nodes, ( node: React.ReactChild ) => {
            if ( !React.isValidElement( node ) ) {
                return node;
            }

            node = node as React.ReactElement<any>;

            // prevent invalid html...
            if ( node.type === 'p' ) {
                node = <Paragraph {...node.props} />;
            }

            if ( node.props.children ) {
                node = React.cloneElement( node, {
                    children: this.renderShortcodes( node.props.children ) // recursive call
                });
            }

            return this.renderShortcode( node );
        });
    }

    render() {
        const { children } = this.props;

        return (
            <span>
                {this.renderShortcodes( children )}
            </span>
        );
    }
}

export default function parse( str: string ) {
    if ( !str ) {
        return null;
    }

    const nodes = HtmlToReact.parse(
        DOMPurify.sanitize( str.trim() )
    );

    return <Parser>{nodes}</Parser>;
};
*/

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions( React );

const processingInstructions = [
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
    html = html.replace( '[', '<' ).replace( ']', '>' ); // TODO: don't replace ALL square brackets
    html = html.replace( /[“”‘’″]/g, '"' ); // normalize shortcode attribute quotes

    return Parser.parseWithInstructions(
        html,
        () => true,
        processingInstructions
    );
}