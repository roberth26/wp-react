import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, Route, withRouter, Switch } from 'react-router-dom';
import PortfolioStore from '../../stores/PortfolioStore';
import ProjectCategorySummary from '../../components/ProjectCategorySummary/ProjectCategorySummary';
import ProjectCategoryDetails from '../../components/ProjectCategoryDetails/ProjectCategoryDetails';
import Grid from '../../components/primitives/Grid';
import Container from '../../components/primitives/Container';
import { removeLeadingSlash } from '../../utils/Formatting';

interface IPortfolioContainerProps {
    portfolioStore?: PortfolioStore; // injected
    match?: any; // injected
}

@inject( 'portfolioStore' )
@withRouter
@observer
export default class PortfolioContainer extends React.Component<IPortfolioContainerProps, {}> {
    render() {
        const { portfolioStore, match } = this.props;
        const { projectCategories } = portfolioStore;

        return (
            <Container>
                <Switch>
                    {projectCategories.map( projectCategory => (
                        <Route
                            path={match.path + removeLeadingSlash( projectCategory.url )}
                            key={projectCategory.id}
                            render={() => (
                                <ProjectCategoryDetails
                                    projectCategory={projectCategory}
                                    key={projectCategory.id}
                                />
                            )}
                        />
                    ))}
                    <Route
                        render={() => (
                            <Grid>
                                {projectCategories.map( projectCategory => (
                                    <Link
                                        to={match.path + removeLeadingSlash( projectCategory.url )}
                                        key={projectCategory.id}
                                    >
                                        <ProjectCategorySummary projectCategory={projectCategory} />
                                    </Link>
                                ))}
                            </Grid>
                        )}
                    />
                </Switch>
            </Container>
        );
    }
}