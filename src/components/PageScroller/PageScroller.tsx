import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';
import { Location, History } from 'history';
import { withRouter } from 'react-router-dom';
import * as scrollTo from 'scroll-to';
import * as offset from 'document-offset';
import Page from '../Page/Page';
import PageModel from '../../models/Page';
import GlobalStore from '../../stores/GlobalStore';

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
@observer
@withRouter
export default class PageScroller extends React.Component<IPageScrollerProps, IPageScrollerState> {
    state: IPageScrollerState = {
        location: null
    };
    pageRefs = new Map<number, IPageWrapper>();
    autorun = null;

    addPageRef = ( page: PageModel, ref: HTMLElement ) => {
        this.pageRefs.set( page.id, { page, ref } );
    }

    handleScroll = () => {
        const { history } = this.props;
        const scrolled = this.getMostVisible( Array.from( this.pageRefs.values() ) );
        history.replace( scrolled.url );
    }

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

    shouldComponentUpdate( nextProps: IPageScrollerProps ) {
        return nextProps.history.action !== 'REPLACE';
    }

    componentWillReceiveProps( nextProps: IPageScrollerProps ) {
        this.autorun = autorun(() => {
            this.setState({
                location: nextProps.globalStore.location
            });
        });
    }

    componentDidMount() {
        window.addEventListener( 'scroll', this.handleScroll );
    }

    componentDidUpdate() {
        const { globalStore } = this.props;
        const { currentPage } = globalStore;

        if ( !currentPage ) {
            return;
        }

        const currentPageRef = this.pageRefs.get( currentPage.id ).ref;
        const y = offset( currentPageRef ).top;
        const dy = Math.abs( window.scrollY - y );
        scrollTo( 0, y, {
            ease: 'out-sine',
            duration: dy * .6
        });
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