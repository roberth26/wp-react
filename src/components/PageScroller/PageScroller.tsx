import * as React from 'react';
import { withRouter } from 'react-router-dom';
import * as scrollTo from 'scroll-to';
import * as offset from 'document-offset';
import Page from '../Page/Page';
import PageModel from '../../models/Page';

interface IPageWrapper {
    page: PageModel;
    ref: HTMLElement;
}

interface IPageScrollerProps {
    pages: PageModel[];
    activePage: PageModel;
    replace?: ( path: string ) => void; // injected
    action?: string; // injected
}

@withRouter
export default class PageScroller extends React.Component<IPageScrollerProps, {}> {
    pageRefs = new Map<number, IPageWrapper>();

    addPageRef = ( page: PageModel, ref: HTMLElement ) => {
        this.pageRefs.set( page.id, { page, ref } );
    }

    componentDidMount() {
        const { activePage } = this.props;

        if ( !activePage ) {
            return;
        }

        const activePageRef = this.pageRefs.get( activePage.id ).ref;
        const y = offset( activePageRef ).top;
        const dy = Math.abs( window.scrollY - y );
        scrollTo( 0, y, {
            ease: 'out-sine',
            duration: dy * .6
        });
        // window.addEventListener( 'scroll', this.handleScroll );
    }

    /*
    componentWillUnmount() {
        window.removeEventListener( 'scroll', this.handleScroll );
    }

    handleScroll = () => {
        setTimeout( () => this.props.replace( '/' ), 3000 );
    }

    shouldComponentUpdate( nextProps: IPageScrollerProps ) {
        console.log( nextProps.action );
        return nextProps.action !== 'REPLACE';
    }
    */

    /*
	getMostVisible = items => {
		let windowTop = document.documentElement.scrollTop;
		let windowBottom = windowTop + window.innerHeight;
		return items.reduce( ( mostVisible, current ) => {
			let {
				top: mostVisibleTop,
				bottom: mostVisibleBottom
			} = mostVisible.targetElement.getBoundingClientRect();
			let mostVisibleOverlap =
				Math.max( 0,
					Math.min( mostVisibleBottom, windowBottom )
					- Math.max( mostVisibleTop, windowTop )
				);
			let {
				top: currentTop,
				bottom: currentBottom
			} = current.targetElement.getBoundingClientRect();
			let currentOverlap =
				Math.max( 0,
					Math.min( currentBottom, windowBottom )
					- Math.max( currentTop, windowTop )
				);
			return currentOverlap > mostVisibleOverlap ? current : mostVisible;
		}, items[ 0 ] );
	}
    */

    render() {
        const { pages } = this.props;
        console.log( 'pagescroller' );

        return (
            <div>
                {pages.map( page => (
                    <Page
                        page={page}
                        key={page.id}
                        innerRef={this.addPageRef.bind( this, page )}
                    />
                ))}
            </div>
        );
    }
}