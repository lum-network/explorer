import React from 'react';
import check from 'assets/images/check.svg';
import cross from 'assets/images/cross.svg';
import warning from 'assets/images/warning.svg';
import depositPeriod from 'assets/images/depositPeriod.svg';
import votePeriod from 'assets/images/votePeriod.svg';
import './Badge.scss';
import { BeamsStatus, ProposalStatus, ValidatorsType } from 'constant';
import { i18n } from 'utils';

interface IProps {
    beamsStatus?: BeamsStatus;
    text?: boolean;
    proposalStatus?: ProposalStatus;
    validatorsType?: ValidatorsType;
    jailed?: boolean;
    tombstoned?: boolean;
    success?: boolean;
}

const Badge = (props: IProps): JSX.Element => {
    const { success, jailed, validatorsType, proposalStatus, text, beamsStatus, tombstoned } = props;

    const getBeamStatus = () => {
        switch (beamsStatus) {
            case BeamsStatus.OPEN:
                return i18n.t('open');
            case BeamsStatus.CLOSED:
                return i18n.t('closed');
            case BeamsStatus.CANCELED:
                return i18n.t('canceled');
            case BeamsStatus.UNSPECIFIED:
                return i18n.t('unspecified');
        }
    };

    if (tombstoned) {
        return (
            <div className="d-flex align-items-center">
                <div className="app-badge failure">
                    <p className="text failure">
                        <img alt="checkmark" src={cross} /> {i18n.t('tombstoned')}
                    </p>
                </div>
            </div>
        );
    }

    if (jailed) {
        return (
            <div className="d-flex align-items-center">
                <div className="app-badge failure">
                    <p className="text failure">
                        <img alt="checkmark" src={cross} /> {i18n.t('badgeJailed')}
                    </p>
                </div>
            </div>
        );
    }

    if (proposalStatus !== undefined) {
        switch (proposalStatus) {
            case ProposalStatus.DEPOSIT_PERIOD:
                return (
                    <div className="">
                        <div className={`app-badge warning ${text && 'text-only'}`}>
                            <p className="text warning">
                                <img alt="checkmark" src={depositPeriod} /> {i18n.t('badgeDepositPeriod')}
                            </p>
                        </div>
                    </div>
                );

            case ProposalStatus.VOTING_PERIOD:
                return (
                    <div className="">
                        <div className={`app-badge info ${text && 'text-only'}`}>
                            <p className="text info">
                                <img alt="checkmark" src={votePeriod} /> {i18n.t('badgeVotingPeriod')}
                            </p>
                        </div>
                    </div>
                );

            case ProposalStatus.PASSED:
                return (
                    <div className="">
                        <div className={`app-badge success ${text && 'text-only'}`}>
                            <p className="text success">
                                <img alt="checkmark" src={check} /> {i18n.t('badgePassed')}
                            </p>
                        </div>
                    </div>
                );

            case ProposalStatus.REJECTED:
                return (
                    <div className="">
                        <div className={`app-badge failure ${text && 'text-only'}`}>
                            <p className="text failure">
                                <img alt="checkmark" src={cross} /> {i18n.t('badgeRejected')}
                            </p>
                        </div>
                    </div>
                );
        }
    }

    if (beamsStatus !== undefined) {
        return (
            <div>
                <div className="app-badge info">
                    <p className="text info">{getBeamStatus()}</p>
                </div>
            </div>
        );
    }

    if (validatorsType !== undefined) {
        switch (validatorsType) {
            case ValidatorsType.ACTIVE:
                return (
                    <div>
                        <div className="app-badge success">
                            <p className="text success">
                                <img alt="checkmark" src={check} /> {i18n.t('badgeActive')}
                            </p>
                        </div>
                    </div>
                );

            case ValidatorsType.UNBONDING:
                return (
                    <div>
                        <div className="app-badge warning">
                            <p className="text warning">
                                <img alt="checkmark" src={warning} /> {i18n.t('badgeUnbonding')}
                            </p>
                        </div>
                    </div>
                );

            default:
                return (
                    <div>
                        <div className="app-badge failure">
                            <p className="text failure">
                                <img alt="checkmark" src={cross} /> {i18n.t('badgeUnbonded')}
                            </p>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div>
            <div className={`app-badge ${success ? 'success' : 'failure'}`}>
                <p className={`text ${success ? 'success' : 'failure'}`}>
                    {success ? (
                        <>
                            <img alt="checkmark" src={check} /> {i18n.t('badgeSuccess')}
                        </>
                    ) : (
                        <>
                            <img alt="checkmark" src={cross} /> {i18n.t('badgeFail')}
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Badge;
