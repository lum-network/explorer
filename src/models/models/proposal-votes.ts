import { Expose } from 'class-transformer';

class ProposalVotersModel {
    @Expose({ name: 'proposal_id' })
    proposalId: number;

    @Expose({ name: 'voter_address' })
    voterAddress: string;

    @Expose({ name: 'vote_option' })
    voteOption: number;
}

export default ProposalVotersModel;
