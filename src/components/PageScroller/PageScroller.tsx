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
    location?: any; // injected
}

@withRouter
export default class PageScroller extends React.Component<IPageScrollerProps, {}> {
    pageRefs = new Map<number, IPageWrapper>();

    addPageRef = ( page: PageModel, ref: HTMLElement ) => {
        this.pageRefs.set( page.id, { page, ref } );
    }

    componentDidUpdate() {
        const { pages, location } = this.props;
        const currentPage = pages.find( p => p.url === location.pathname );
        const currentPageRef = this.pageRefs.get( currentPage.id ).ref;
        const y = offset( currentPageRef ).top;
        const dy = Math.abs( window.scrollY - y );
        scrollTo( 0, y, {
            ease: 'out-sine',
            duration: dy * .6
        });
    }

    render() {
        const { pages } = this.props;

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