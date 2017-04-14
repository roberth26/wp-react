import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as DOMPurify from 'dompurify';
import { Parser as HtmlToReactParser } from 'html-to-react';
import Form from '../components/Form/Form';
import GlobalStore from '../stores/GlobalStore';
import Paragraph from '../components/primitives/Paragraph';

const HtmlToReact = new HtmlToReactParser();

interface IParserProps {
    globalStore?: GlobalStore;
    children?: React.ReactChildren;
}

@inject( 'globalStore' )
@observer
class Parser extends React.Component<IParserProps, {}> {
    parseShortcode = ( str: string ): React.ReactElement<any> => {
        const { globalStore } = this.props;
        const { forms } = globalStore;

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
                return <Form form={forms.get( id )} />;
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
        const { globalStore, children } = this.props;

        if ( !globalStore ) {
            return null;
        }

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