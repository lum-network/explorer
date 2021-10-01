import React, { useEffect } from 'react';
import proposalLogo from 'assets/images/proposalDark.svg';
import { i18n, NumbersUtils } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';
import { Card, Table } from 'frontend-elements';
import { ProposalsModel } from 'models';
import { NavigationConstants } from 'constant';
import { Link } from 'react-router-dom';
import { Badge } from 'components';
import moment from 'moment';
import { LumConstants } from '@lum-network/sdk-javascript';

const ProposalsPage = (): JSX.Element | null => {
    const dispatch = useDispatch<Dispatch>();
    const proposals = useSelector((state: RootState) => state.governance.proposals);

    useEffect(() => {
        dispatch.governance.fetchProposals().finally(() => null);
    }, []);

    if (!proposals) {
        return null;
    }

    const head = [
        i18n.t('id'),
        i18n.t('title'),
        i18n.t('status'),
        i18n.t('submitTime'),
        i18n.t('votingStart'),
        i18n.t('totalDeposit'),
    ];

    const renderRow = (proposal: ProposalsModel, index: number): JSX.Element => {
        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <p>#{proposal.proposalId}</p>
                </td>
                <td data-label={head[1]}>
                    <Link to={`${NavigationConstants.PROPOSALS}/${proposal.proposalId}`}>Proposal name</Link>
                </td>
                <td data-label={head[2]}>
                    <Badge text proposalStatus={proposal.status} />
                </td>
                <td data-label={head[3]} className="text-end">
                    <small>{moment.utc(proposal.submitTime).fromNow()}</small>
                </td>
                <td data-label={head[4]} className="text-end">
                    {proposal.votingStartTime === '0001-01-01T00:00:00.000Z' ? (
                        '-'
                    ) : (
                        <small>{moment.utc(proposal.votingStartTime).fromNow()}</small>
                    )}
                </td>
                <td data-label={head[5]} className="text-end">
                    {proposal.totalDeposit && proposal.totalDeposit[0] ? (
                        <>
                            {NumbersUtils.formatNumber(proposal.totalDeposit[0], true)}
                            <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                        </>
                    ) : (
                        '-'
                    )}
                </td>
            </tr>
        );
    };

    const renderDetails = (): JSX.Element => {
        if (!proposals.length) {
            return (
                <Card className="mb-5 d-flex justify-content-center align-items-center flex-column">
                    <img
                        width={44}
                        height={44}
                        className="mb-2 placeholder-image"
                        alt="placeholder"
                        src={proposalLogo}
                    />
                    {i18n.t('noProposalsFound')}
                </Card>
            );
        }

        return (
            <Card withoutPadding className="mb-5">
                <div className="d-flex justify-content-between">
                    <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">{i18n.t('allProposals')}</h3>
                </div>
                <Table head={head}>{proposals.map((proposals, index) => renderRow(proposals, index))}</Table>
            </Card>
        );
    };

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="proposal" src={proposalLogo} /> {i18n.t('proposals')}
            </h2>
            {renderDetails()}
        </>
    );
};

export default ProposalsPage;
