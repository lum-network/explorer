import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import './MainLayout.scss';
import { i18n } from 'utils';
import logo from 'assets/images/logo.svg';
import dashboardLogo from 'assets/images/dashboard.svg';
import blockLogo from 'assets/images/block.svg';
import transactionLogo from 'assets/images/transaction.svg';
import validatorLogo from 'assets/images/validator.svg';
import walletLogo from 'assets/images/wallet.svg';
import { Search } from 'components';

class MainLayout extends PureComponent {
    render(): JSX.Element {
        const { children } = this.props;

        return (
            <div className="main-layout">
                <ul>
                    <li className="logo">
                        <img alt="logo" src={logo} /> <h1>Explorer</h1>
                    </li>
                    <li>
                        <Search />
                    </li>
                    <li>
                        <NavLink to={NavigationConstants.HOME} className="link" activeClassName="active-link">
                            <img className="icon-nav" alt="dashboard" src={dashboardLogo} /> {i18n.t('dashboard')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={NavigationConstants.BLOCKS} className="link" activeClassName="active-link">
                            <img className="icon-nav" alt="block" src={blockLogo} /> {i18n.t('blocks')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={NavigationConstants.TRANSACTIONS} className="link" activeClassName="active-link">
                            <img className="icon-nav" alt="transaction" src={transactionLogo} />{' '}
                            {i18n.t('transactions')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={NavigationConstants.VALIDATORS} className="link" activeClassName="active-link">
                            <img className="icon-nav" alt="validator" src={validatorLogo} /> {i18n.t('validators')}
                        </NavLink>
                    </li>
                    <li>
                        <a href={NavigationConstants.WALLET} rel="noreferrer" target="_blank" className="link">
                            <img className="icon-nav" alt="validator" src={walletLogo} /> {i18n.t('wallet')}
                        </a>
                    </li>
                </ul>

                <div className="container">{children}</div>
            </div>
        );
    }
}

export default MainLayout;
