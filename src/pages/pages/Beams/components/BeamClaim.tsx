import React from 'react';
import { Card } from 'frontend-elements';
import lumLogo from 'assets/images/lum.svg';
import walletLogo from 'assets/images/beamWallet.svg';
import beamClaimLogo from 'assets/images/beamClaim.svg';
import BeamStatusUpdateCard from './BeamStatusUpdateCard';
import BeamStatusHeader from './BeamStatusHeader';
import { i18n } from 'utils';
import { Link } from 'react-router-dom';
import { NavigationConstants } from 'constant';

interface Props {
    address: string;
    amount: number;
    date: string;
}

const BeamClaim = ({ address, amount, date }: Props): JSX.Element => {
    return (
        <>
            <BeamStatusHeader date={date} status={i18n.t('claim')} />
            <BeamStatusUpdateCard>
                <Card className="status-update-card mb-5">
                    <div className="d-flex flex-row align-items-center">
                        <div className="status-update-icon">
                            <img src={walletLogo} />
                        </div>
                        <div>
                            <h4 className="mb-3">{i18n.t('walletDestination')}</h4>
                            <Link to={`${NavigationConstants.ACCOUNT}/${address}`}>{address}</Link>
                        </div>
                    </div>
                    <h1 className="display-4">
                        {amount}
                        <span className="ms-2">
                            <img src={lumLogo} height={28} />
                        </span>
                    </h1>
                </Card>
                <Card className="status-update-card">
                    <div className="d-flex flex-row align-items-center">
                        <div className="status-update-icon">
                            <img src={beamClaimLogo} />
                        </div>
                        <h4 className="fw-normal">{i18n.t('lumSent')}</h4>
                    </div>
                </Card>
            </BeamStatusUpdateCard>
        </>
    );
};

export default BeamClaim;
