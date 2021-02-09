import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import './MainLayout.scss';
import { i18n } from 'utils';

class MainLayout extends PureComponent {
    render(): JSX.Element {
        const { children } = this.props;

        return (
            <div className="main">
                <div className="container main-layout">
                    <ul>
                        <li>
                            <NavLink to={NavigationConstants.HOME} activeClassName="active-link">
                                {i18n.t('home')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={NavigationConstants.BLOCKS} activeClassName="active-link">
                                {i18n.t('blocks')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={NavigationConstants.TRANSACTIONS} activeClassName="active-link">
                                {i18n.t('transactions')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={NavigationConstants.VALIDATORS} activeClassName="active-link">
                                {i18n.t('validators')}
                            </NavLink>
                        </li>
                    </ul>
                    {children}
                </div>
            </div>
        );
    }
}

export default MainLayout;
