import * as React from 'react';
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
}

export default class PageScroller extends React.Component<IPageScrollerProps, {}> {
    pageRefs = new Map<number, IPageWrapper>();

    addPageRef = ( page: PageModel, ref: HTMLElement ) => {
        this.pageRefs.set( page.id, { page, ref } );
    }

    componentDidUpdate() {
        const { activePage } = this.props;
        const activePageRef = this.pageRefs.get( activePage.id ).ref;
        const y = offset( activePageRef ).top;
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