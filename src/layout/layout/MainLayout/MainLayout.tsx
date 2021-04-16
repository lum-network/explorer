import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import './MainLayout.scss';
import { i18n } from 'utils';
import logo from 'assets/images/logo.svg';
import dashboardLogo from 'assets/images/dashboard.svg';
import blockLogo from 'assets/images/block.svg';
import transactionLogo from 'assets/images/transaction.svg';
import validatorLogo from 'assets/images/validator.svg';
import walletLogo from 'assets/images/wallet.svg';
import walletBis from 'assets/images/walletBis.svg';
import github from 'assets/images/github.svg';
import { Search } from 'components';

interface IProps {
    children?: React.ReactNode;
}

const MainLayout = (props: IProps): JSX.Element => {
    const renderNav = (footer?: boolean): JSX.Element => {
        return (
            <ul className={footer ? 'footer' : ''}>
                {!footer && (
                    <>
                        <li className="logo">
                            <Link to={NavigationConstants.HOME} className="d-flex flex-row">
                                <img alt="logo" src={logo} /> <h1>Explorer</h1>
                            </Link>
                        </li>
                        <li>
                            <Search />
                        </li>
                    </>
                )}
                <li>
                    <NavLink to={NavigationConstants.HOME} className="link" activeClassName="active-link">
                        <div className="nav-title">
                            <img className="icon-nav" alt="dashboard" src={dashboardLogo} /> {i18n.t('dashboard')}
                        </div>
                        <div className="bar">
                            <div className="bar-2">
                                <div className="bar-3" />
                            </div>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={NavigationConstants.BLOCKS} className="link" activeClassName="active-link">
                        <div className="nav-title">
                            <img className="icon-nav" alt="block" src={blockLogo} /> {i18n.t('blocks')}
                        </div>
                        <div className="bar">
                            <div className="bar-2">
                                <div className="bar-3" />
                            </div>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={NavigationConstants.TRANSACTIONS} className="link" activeClassName="active-link">
                        <div className="nav-title">
                            <img className="icon-nav" alt="transaction" src={transactionLogo} />{' '}
                            {i18n.t('transactions')}
                        </div>
                        <div className="bar">
                            <div className="bar-2">
                                <div className="bar-3" />
                            </div>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={NavigationConstants.VALIDATORS} className="link" activeClassName="active-link">
                        <div className="nav-title">
                            <img className="icon-nav" alt="validator" src={validatorLogo} /> {i18n.t('validators')}
                        </div>
                        <div className="bar">
                            <div className="bar-2">
                                <div className="bar-3" />
                            </div>
                        </div>
                    </NavLink>
                </li>
                {!footer && (
                    <li>
                        <a
                            href={NavigationConstants.WALLET}
                            rel="noreferrer"
                            target="_blank"
                            className="nav-title link-icon"
                        >
                            <img className="icon-nav" alt="validator" src={walletLogo} /> {i18n.t('wallet')}
                        </a>
                    </li>
                )}
            </ul>
        );
    };

    const { children } = props;

    return (
        <div className="main-layout dark-mode">
            <div className="content">
                {renderNav()}
                <div className="container">{children}</div>
            </div>
            <footer>
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="logo">
                            <Link to={NavigationConstants.HOME} className="d-flex flex-row">
                                <img alt="logo" src={logo} /> <h1>Explorer</h1>
                            </Link>
                        </div>
                        <div className="ms-sm-5 ms-3 button-wallet">
                            <a href={NavigationConstants.WALLET} rel="noreferrer" target="_blank">
                                <img alt="wallet" src={walletBis} />
                                {i18n.t('webWallet')}
                            </a>
                        </div>
                    </div>
                    <div>
                        <a href={NavigationConstants.GITHUB} rel="noreferrer" target="_blank">
                            <img alt="github" src={github} className="link-icon" />
                        </a>
                    </div>
                </div>
            </footer>
            {renderNav(true)}
        </div>
    );
};

export default MainLayout;
