import React, { useEffect, useState } from 'react';
import proposalLogo from 'assets/images/proposalDark.svg';
import { GovernanceUtils, i18n, NumbersUtils } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';
import { RouteComponentProps } from 'react-router';
import { Card, Loading } from 'frontend-elements';
import { Badge, SmallerDecimal } from 'components';
import moment from 'moment';
import { LumConstants } from '@lum-network/sdk-javascript';
import { ProposalStatus } from 'constant';
import VoteBar from '../components/VoteBar/VoteBar';
import numeral from 'numeral';

interface IProps extends RouteComponentProps<{ id: string }> {}

const ProposalPage = ({ match }: IProps): JSX.Element => {
    const proposal = useSelector((state: RootState) => state.governance.proposal);
    const dispatch = useDispatch<Dispatch>();
    const loading = useSelector((state: RootState) => state.loading.effects.governance.getProposal);

    const [voteYes, setVoteYes] = useState(0);
    const [voteNo, setVoteNo] = useState(0);
    const [voteNoWithVeto, setVoteNoWithVeto] = useState(0);
    const [voteAbstain, setVoteAbstain] = useState(0);
    const [total, setTotal] = useState(0);

    const { id } = match.params;

    useEffect(() => {
        dispatch.governance.getProposal(id).finally(() => null);
    }, []);

    useEffect(() => {
        if (!proposal || !proposal.result) {
            return;
        }

        setTotal(GovernanceUtils.sumOfVotes(proposal.result));

        setVoteYes(NumbersUtils.getPercentage(proposal.result.yes, total));
        setVoteNo(NumbersUtils.getPercentage(proposal.result.no, total));
        setVoteNoWithVeto(NumbersUtils.getPercentage(proposal.result.noWithVeto, total));
        setVoteAbstain(NumbersUtils.getPercentage(proposal.result.abstain, total));
    }, [proposal]);

    const renderResult = (): JSX.Element | null => {
        if (!proposal || proposal.status === ProposalStatus.DEPOSIT_PERIOD) {
            return null;
        }

        return (
            <Card className="mt-5" flat>
                <div className="mb-4 d-flex">
                    <h4 className="me-2">{i18n.t('total')}:</h4>
                    <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(total)).format('0,0.000000')} />
                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                </div>
                <VoteBar
                    results={{
                        yes: voteYes,
                        no: voteNo,
                        noWithVeto: voteNoWithVeto,
                        abstain: voteAbstain,
                    }}
                />
                <div className="row mt-4 gy-3 ms-1">
                    <div className="col-12 col-md-6 col-xl-3 border-vote-green">
                        <h4>{i18n.t('yes')}</h4>
                        <small>{numeral(voteYes).format('0.00')}%</small>
                        <br />
                        <SmallerDecimal
                            nb={numeral(NumbersUtils.convertUnitNumber(proposal.result.yes)).format('0,0.000000')}
                        />
                        <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3 border-vote-red">
                        <h4>{i18n.t('no')}</h4>
                        <small>{numeral(voteNo).format('0.00')}%</small>
                        <br />
                        <SmallerDecimal
                            nb={numeral(NumbersUtils.convertUnitNumber(proposal.result.no)).format('0,0.000000')}
                        />
                        <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3 border-vote-yellow">
                        <h4>{i18n.t('noWithVeto')}</h4>
                        <small>{numeral(voteNoWithVeto).format('0.00')}%</small>
                        <br />
                        <SmallerDecimal
                            nb={numeral(NumbersUtils.convertUnitNumber(proposal.result.noWithVeto)).format(
                                '0,0.000000',
                            )}
                        />
                        <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3 border-vote-grey">
                        <h4>{i18n.t('abstain')}</h4>
                        <small>{numeral(voteAbstain).format('0.00')}%</small>
                        <br />
                        <SmallerDecimal
                            nb={numeral(NumbersUtils.convertUnitNumber(proposal.result.abstain)).format('0,0.000000')}
                        />
                        <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                    </div>
                </div>
            </Card>
        );
    };

    const renderInformation = () => {
        if (loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        if (!proposal) {
            return (
                <Card className="mb-5 d-flex justify-content-center align-items-center flex-column">
                    <img
                        width={44}
                        height={44}
                        className="mb-2 placeholder-image"
                        alt="placeholder"
                        src={proposalLogo}
                    />
                    {i18n.t('noProposalFound')}
                </Card>
            );
        }

        return (
            <Card className="mb-5">
                <div className="row gy-4">
                    <div className="col-md-6">
                        <h4 className="mb-2">{i18n.t('title')}</h4>
                        {proposal.content.title}
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-2">{i18n.t('id').toUpperCase()}</h4>
                        {'#'}
                        {proposal.proposalId.toString()}
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-2">{i18n.t('status')}</h4>
                        <Badge proposalStatus={proposal.status} />
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-2">{i18n.t('proposer')}</h4>
                        coming soon
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-2">{i18n.t('submitTime')}</h4>
                        {proposal.submitTime && proposal.submitTime !== '0001-01-01T00:00:00.000Z'
                            ? moment(proposal.submitTime).format('lll')
                            : '-'}
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-2">{i18n.t('depositEnd')}</h4>
                        {proposal.depositEndTime && proposal.depositEndTime !== '0001-01-01T00:00:00.000Z'
                            ? moment(proposal.depositEndTime).format('lll')
                            : '-'}
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-2">{i18n.t('votingStart')}</h4>
                        {proposal.votingStartTime && proposal.votingStartTime !== '0001-01-01T00:00:00.000Z'
                            ? moment(proposal.votingStartTime).format('lll')
                            : '-'}
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-2">{i18n.t('votingEnd')}</h4>
                        {proposal.votingEndTime && proposal.votingEndTime !== '0001-01-01T00:00:00.000Z'
                            ? moment(proposal.votingEndTime).format('lll')
                            : '-'}
                    </div>
                    <div className="col-12">
                        <h4 className="mb-2">{i18n.t('totalDeposit')}</h4>
                        {proposal.totalDeposit && proposal.totalDeposit[0] ? (
                            <>
                                {NumbersUtils.formatNumber(proposal.totalDeposit[0], true)}
                                <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                            </>
                        ) : (
                            '-'
                        )}
                    </div>
                    <div className="col-12">
                        <h4>{i18n.t('details')}</h4>
                        {proposal.content.description}
                    </div>
                </div>
                {renderResult()}
            </Card>
        );
    };

    return (
        <>
            <div className="mt-3 mb-4 d-flex align-items-center">
                <h2 className="me-3">
                    <img alt="proposal" src={proposalLogo} /> {i18n.t('proposal')} #
                    {(proposal && proposal.proposalId.toString()) || id}
                </h2>
                {proposal && <Badge proposalStatus={proposal.status} />}
            </div>
            {renderInformation()}
        </>
    );
};

export default ProposalPage;
