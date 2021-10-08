import React, { useEffect, useState } from 'react';
import { ProposalsModel } from 'models';
import { Button, Card } from 'frontend-elements';
import { Badge } from 'components';
import { NavigationConstants } from 'constant';
import { useHistory } from 'react-router-dom';
import { GovernanceUtils, i18n, NumbersUtils } from 'utils';
import './ProposalCard.scss';
import VoteBar from '../VoteBar/VoteBar';
import numeral from 'numeral';

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
                <p>
                    {i18n.t('mostVotedOn')} {name} {numeral(percent).format('0.00')}%
                </p>
            );
        }
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
            <h6 className="mt-3">{i18n.t('proposalName')}</h6>
            <hr />
            <div className="mt-5 row">
                <div className="col-12 mb-3">
                    <h4>{i18n.t('proposer')}</h4>
                    <p>proposer name</p>
                </div>
                <div className="col-md-6">
                    <h4>Time</h4>
                    <p>proposer name</p>
                </div>
                <div className="col-md-6">
                    <h4>Time</h4>
                    <p>proposer name</p>
                </div>
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
