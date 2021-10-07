import React, { useEffect, useState } from 'react';
import { ProposalsModel } from 'models';
import { Button, Card } from 'frontend-elements';
import { Badge } from 'components';
import { NavigationConstants } from 'constant';
import { useHistory } from 'react-router-dom';
import { GovernanceUtils, i18n, NumbersUtils } from 'utils';
import './ProposalCard.scss';
import VoteBar from '../VoteBar/VoteBar';

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
            <h6 className="mt-3">Proposal name</h6>
            <hr />
            <div className="mt-5 row">
                <div className="col-12">
                    <h4>Proposer</h4>
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
                    <h4>Results</h4>
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
