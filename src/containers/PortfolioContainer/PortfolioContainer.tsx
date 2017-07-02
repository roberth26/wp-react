import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PortfolioStore from '../../stores/PortfolioStore';
import Portfolio from '../../components/Portfolio/Portfolio';

interface IPortfolioContainerProps {
    portfolioStore?: PortfolioStore; // injected
}

@inject( 'portfolioStore' )
@withRouter
@observer
export default class PortfolioContainer extends React.Component<IPortfolioContainerProps, {}> {
    render() {
        const { portfolioStore } = this.props;
        const { projects, projectCategories } = portfolioStore;

        return (
            <Portfolio
                projects={projects}
                projectCategories={projectCategories}
            />
        );
    }
}