import * as React from 'react';
import Page from '../Page/Page';
import PageModel from '../../models/Page';

interface IPageScrollerProps {
    pages: PageModel[];
    activePage: PageModel;
}

export default class PageScroller extends React.Component<IPageScrollerProps, {}> {
    render() {
        const { pages, activePage } = this.props;
        console.log( activePage );

        return (
            <div>
                {pages.map( page => (
                    <Page
                        page={page}
                        key={page.id}
                    />
                ))}
            </div>
        );
    }
}