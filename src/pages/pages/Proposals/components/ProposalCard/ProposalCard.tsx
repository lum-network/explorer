import React, { useEffect, useState } from 'react';
import { ProposalsModel } from 'models';
import { Button, Card } from 'frontend-elements';
import { Badge } from 'components';
import { NavigationConstants, ProposalStatus, SystemConstants } from 'constant';
import { useHistory } from 'react-router-dom';
import { GovernanceUtils, i18n, NumbersUtils } from 'utils';
import './ProposalCard.scss';
import VoteBar from '../VoteBar/VoteBar';
import numeral from 'numeral';
import moment from 'moment';

interface IProps {
    proposal: ProposalsModel;
}

const ProposalCard = ({ proposal }: IProps): JSX.Element => {
    const history = useHistory();

    const [voteYes, setVoteYes] = useState(0);
    const [voteNo, setVoteNo] = useState(0);
    const [voteNoWithVeto, setVoteNoWithVeto] = useState(0);
    const [voteAbstain, setVoteAbstain] = useState(0);

    useEffect(() => {
        if (!proposal || !proposal.result) {
            return;
        }

        const { result } = proposal;

        const total = GovernanceUtils.sumOfVotes(result);

        setVoteYes(NumbersUtils.getPercentage(result.yes, total));
        setVoteNo(NumbersUtils.getPercentage(result.no, total));
        setVoteNoWithVeto(NumbersUtils.getPercentage(result.noWithVeto, total));
        setVoteAbstain(NumbersUtils.getPercentage(result.abstain, total));
    }, [proposal]);

    const renderResult = () => {
        if (GovernanceUtils.isNoVoteYet(proposal.result)) {
            return <p className="mb-1">{i18n.t('noVoteYet')}</p>;
        } else {
            const [name, percent] = GovernanceUtils.maxVote({
                yes: voteYes,
                no: voteNo,
                noWithVeto: voteNoWithVeto,
                abstain: voteAbstain,
            });

            return (
                <p className="mb-1">
                    {i18n.t('mostVotedOn')} <strong>{name}</strong>{' '}
                    <small className="text-muted">{numeral(percent).format('0.00')}%</small>
                </p>
            );
        }
    };

    const renderDates = () => {
        let date1Title: string;
        let date1: string | undefined;
        let date2Title: string;
        let date2: string | undefined;

        switch (proposal.status) {
            case ProposalStatus.DEPOSIT_PERIOD:
                date1Title = i18n.t('submitTime');
                date1 = proposal.submitTime;
                date2Title = i18n.t('depositEnd');
                date2 = proposal.depositEndTime;
                break;

            case ProposalStatus.VOTING_PERIOD:
                date1Title = i18n.t('votingStart');
                date1 = proposal.votingStartTime;
                date2Title = i18n.t('votingEnd');
                date2 = proposal.votingEndTime;
                break;

            default:
                date1Title = i18n.t('submitTime');
                date1 = proposal.submitTime;
                date2Title = i18n.t('votingEnd');
                date2 = proposal.votingEndTime;
        }

        return (
            <>
                <div className="col-md-6">
                    <h4>{date1Title}</h4>
                    {date1 ? (
                        <p>
                            {moment.utc(date1).tz(SystemConstants.TIMEZONE).format('ll')}{' '}
                            <span className="text-muted">({moment.utc(date1).fromNow()})</span>
                        </p>
                    ) : (
                        '-'
                    )}
                </div>
                <div className="mt-3 mt-md-0 col-md-6">
                    <h4>{date2Title}</h4>
                    {date2 ? (
                        <p>
                            {moment.utc(date2).tz(SystemConstants.TIMEZONE).format('ll')}{' '}
                            <span className="text-muted">({moment.utc(date2).fromNow()})</span>
                        </p>
                    ) : (
                        '-'
                    )}
                </div>
            </>
        );
    };

    return (
        <Card>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <span className="me-3 card-id">#{proposal.proposalId}</span>
                    <Badge proposalStatus={proposal.status} />
                </div>
                <div>
                    <Button onPress={() => history.push(`${NavigationConstants.PROPOSALS}/${proposal.proposalId}`)}>
                        {i18n.t('open')}
                    </Button>
                </div>
            </div>
            <h6 className="mt-3">{proposal.content.title}</h6>
            <hr />
            <div className="mt-5 row">
                <div className="col-12 mb-3">
                    <h4>{i18n.t('proposer')}</h4>
                    <p>TODO: proposer name</p>
                </div>
                {renderDates()}
                <div className="col-12 mt-3">
                    <h4 className="mb-2">{i18n.t('results')}</h4>
                    {renderResult()}
                    <VoteBar
                        results={{
                            yes: voteYes,
                            no: voteNo,
                            noWithVeto: voteNoWithVeto,
                            abstain: voteAbstain,
                        }}
                    />
                </div>
            </div>
        </Card>
    );
};

export default ProposalCard;
