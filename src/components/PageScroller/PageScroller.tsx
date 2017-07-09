import * as React from 'react';
import { inject } from 'mobx-react';
import { autorun } from 'mobx';
import { Location, History } from 'history';
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

interface IPageScrollerState {
    location: Location;
}

@inject( 'globalStore' )
@withRouter
export default class PageScroller extends React.Component<IPageScrollerProps, IPageScrollerState> {
    isScrolling = false;
    state: IPageScrollerState = {
        location: null
    };
    pageRefs = new Map<number, IPageWrapper>();
    previousPage: PageModel = null;
    autorun = null;

    addPageRef = ( page: PageModel, ref: HTMLElement ) => {
        this.pageRefs.set( page.id, { page, ref } );
    }

    handleScroll = throttle( 500, () => {
        if ( this.isScrolling ) {
            return;
        }
        const { history, globalStore } = this.props;
        const scrolled = this.getMostVisible( Array.from( this.pageRefs.values() ) );
        if ( scrolled !== this.previousPage ) {
            history.replace( scrolled.url );
        }
        if ( globalStore.currentPage ) {
            this.previousPage = globalStore.currentPage;
        }
    });

    getMostVisible = ( pageWrappers: IPageWrapper[] ): PageModel => {
        const windowTop = document.documentElement.scrollTop;
        const windowBottom = windowTop + window.innerHeight;
        const mostVisiblePageWrapper = pageWrappers.reduce(
            ( mostVisible: IPageWrapper, current: IPageWrapper ) => {
                const {
                    top: mostVisibleTop,
                    bottom: mostVisibleBottom
                } = mostVisible.ref.getBoundingClientRect();
                const mostVisibleOverlap = Math.max(
                    0,
                    Math.min( mostVisibleBottom, windowBottom )
                        - Math.max( mostVisibleTop, windowTop )
                );
                const {
                    top: currentTop,
                    bottom: currentBottom
                } = current.ref.getBoundingClientRect();
                const currentOverlap = Math.max(
                    0,
                    Math.min( currentBottom, windowBottom )
                        - Math.max( currentTop, windowTop )
                );

                return currentOverlap > mostVisibleOverlap ? current : mostVisible;
            },
            pageWrappers[ 0 ]
        );

        return mostVisiblePageWrapper.page;
	}

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