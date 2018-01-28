import * as React from 'react';
import { inject } from 'mobx-react';
import { autorun } from 'mobx';
import { History } from 'history';
import { withRouter, Route } from 'react-router-dom';
import * as throttle from 'throttle-debounce/throttle';
import * as offset from 'document-offset';
import PageContainer from '../../containers/PageContainer/PageContainer';
import PageModel from '../../models/Page';
import GlobalStore from '../../stores/GlobalStore';
import * as Zenscroll from 'zenscroll';

interface IPageWrapper {
    page: PageModel;
    ref: HTMLElement;
}

interface IPageScrollerProps {
    globalStore?: GlobalStore; // injected
    history?: History; // injected
}

const computeOverlap = (
    topA: number,
    topB: number,
    bottomA: number,
    bottomB: number
) => Math.max(0, Math.min(bottomA, bottomB) - Math.max(topA, topB));

const getMostVisiblePageWrapper = (pageWrappers: IPageWrapper[]) => {
    const windowTop = window.scrollY;
    const windowBottom = windowTop + window.innerHeight;

    const mostVisiblePageWrapper = pageWrappers.map(({ page, ref }) => ({
        page,
        ref,
        offsetTop: ref.offsetTop,
        offsetHeight: ref.offsetHeight
    })).reduce((mostVisible, current) => {
        const {
            offsetTop: mostVisibleOffsetTop,
            offsetHeight: mostVisibleOffsetHeight
        } = mostVisible;
        const mostVisibleOffsetBottom = mostVisibleOffsetTop + mostVisibleOffsetHeight;
        const {
            offsetTop: currentOffsetTop,
            offsetHeight: currentOffsetHeight
        } = current;
        const currentOffsetBottom = currentOffsetTop + currentOffsetHeight;

        const mostVisibleOverlap = computeOverlap(
            mostVisibleOffsetTop,
            windowTop,
            mostVisibleOffsetBottom,
            windowBottom
        );
        const currentOverlap = computeOverlap(
            currentOffsetTop,
            windowTop,
            currentOffsetBottom,
            windowBottom
        );

        return currentOverlap > mostVisibleOverlap ? current : mostVisible;
    });

    return mostVisiblePageWrapper;
};

@inject( 'globalStore' )
@withRouter
export default class PageScroller extends React.Component<IPageScrollerProps, {}> {
    isScrolling = false;
    pageRefs = new Map<string, IPageWrapper>();
    previousPage: PageModel = null;
    autorun = null;

    addPageRef = ( page: PageModel, ref: HTMLElement ) => {
        this.pageRefs.set( page.id, { page, ref } );
    }

    handleScroll = throttle( 500, () => {
        if ( this.isScrolling ) {
            return;
        }
        const { history } = this.props;
        const scrolled = getMostVisiblePageWrapper( Array.from( this.pageRefs.values() ) ).page;
        if ( scrolled !== this.previousPage ) {
            history.replace( scrolled.url );
        }
        this.previousPage = scrolled;
    });

    componentDidMount() {
        const { globalStore, history } = this.props;

        this.autorun = autorun(() => {
            const { currentPage } = globalStore;

            if ( !currentPage ) {
                return;
            }

            // this component is REPLACE-ing the history, don't scroll
            if ( history.action === 'REPLACE' ) {
                return;
            }

            const currentPageRef = this.pageRefs.get( currentPage.id ).ref;
            const y = offset( currentPageRef ).top;
            const dy = Math.abs( window.scrollY - y );

            this.isScrolling = true;
            Zenscroll.toY( y, dy * .6, () => this.isScrolling = false );
        });

        window.addEventListener( 'scroll', this.handleScroll );
    }

    componentWillUnmount() {
        window.removeEventListener( 'scroll', this.handleScroll );
        this.autorun(); // dispose
    }

    render() {
        const { globalStore } = this.props;
        const { pages } = globalStore;

        return (
            <div>
                {pages.map( page => (
                    <Route
                        path={page.url}
                        key={page.id}
                        children={() => (
                            <PageContainer
                                page={page}
                                innerRef={this.addPageRef.bind( this, page )}
                            />
                        )}
                    />
                ))}
            </div>
        );
    }
}