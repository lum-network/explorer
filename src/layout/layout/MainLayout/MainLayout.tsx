import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ApiConstants, NavigationConstants } from 'constant';
import './MainLayout.scss';
import { i18n } from 'utils';
import logo from 'assets/images/logo.svg';
import dashboardLogo from 'assets/images/dashboard.svg';
import blockLogo from 'assets/images/block.svg';
import transactionLogo from 'assets/images/transaction.svg';
import validatorLogo from 'assets/images/validator.svg';
import proposalLogo from 'assets/images/proposal.svg';
import walletBis from 'assets/images/walletBis.svg';
import github from 'assets/images/github.svg';
import discord from 'assets/images/discord.svg';
import { Search } from 'components';

interface IProps {
    children?: React.ReactNode;
}

const MainLayout = (props: IProps): JSX.Element => {
    const renderTestnetHeader = () => {
        if (ApiConstants.IS_TESTNET) {
            return (
                <div className="testnet-header">
                    <span>{i18n.t('testnet')}</span>
                </div>
            );
        }

        return null;
    };

    const renderNav = (tab?: boolean): JSX.Element => {
        return (
            <ul className={tab ? 'tab nav' : 'nav'}>
                {!tab && (
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
                            <img className="icon-nav" alt="transaction" src={transactionLogo} /> {i18n.t('transactions')}
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
                <li>
                    <NavLink to={NavigationConstants.PROPOSALS} className="link" activeClassName="active-link">
                        <div className="nav-title">
                            <img className="icon-nav" alt="proposal" src={proposalLogo} /> {i18n.t('proposals')}
                        </div>
                        <div className="bar">
                            <div className="bar-2">
                                <div className="bar-3" />
                            </div>
                        </div>
                    </NavLink>
                </li>
            </ul>
        );
    };

    const { children } = props;

    return (
        <div className="main-layout dark-mode">
            <div className="content">
                {renderNav()}
                {renderTestnetHeader()}
                <div className="container">{children}</div>
            </div>
            <footer className="mt-5">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="logo">
                            <Link to={NavigationConstants.HOME} className="d-flex flex-row">
                                <img alt="logo" src={logo} /> <h1>Explorer</h1>
                            </Link>
                        </div>
                        <Link className="nav-title ms-lg-5 ms-4" to={NavigationConstants.ASSETS}>
                            {i18n.t('assets')}
                        </Link>
                        <Link className="nav-title ms-lg-5 ms-4" to={NavigationConstants.PARAMETERS}>
                            {i18n.t('parameters')}
                        </Link>
                        <div className="ms-lg-5 ms-4 button-wallet">
                            <a href={NavigationConstants.WALLET} rel="noreferrer" target="_blank">
                                <img alt="wallet" src={walletBis} />
                                {i18n.t('webWallet')}
                            </a>
                        </div>
                    </div>
                    <div className="d-none d-sm-flex align-items-center flex-column-reverse flex-md-row">
                        <span className="copyright mt-2 mt-md-0">{i18n.t('copyright')}</span>
                        <div>
                            <a href={NavigationConstants.DISCORD} rel="noreferrer" target="_blank">
                                <img alt="discord" src={discord} className="link-icon" />
                            </a>
                            <a href={NavigationConstants.GITHUB} rel="noreferrer" target="_blank">
                                <img alt="github" src={github} className="ms-2 link-icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
            {renderNav(true)}
        </div>
    );
};

export default MainLayout;
