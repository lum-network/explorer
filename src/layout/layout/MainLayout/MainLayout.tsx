import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import './MainLayout.scss';

class MainLayout extends PureComponent {
    render(): JSX.Element {
        const { children } = this.props;

        return (
            <div className="main-layout">
                <ul>
                    <li>
                        <NavLink to={NavigationConstants.HOME} activeClassName="active-link">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={NavigationConstants.BLOCKS} activeClassName="active-link">
                            Blocks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={NavigationConstants.TRANSACTIONS} activeClassName="active-link">
                            Transactions
                        </NavLink>
                    </li>
                </ul>
                {children}
            </div>
        );
    }
}

export default MainLayout;
