import { Expose, Transform, Type } from 'class-transformer';
import VotesResultModel from './votesResult';
import CoinModel from './coin';
import { ProposalStatus } from 'constant';

class ContentModel {
    title?: string;

    description?: string;
}

class ProposalsModel {
    @Expose({ name: 'proposal_id' })
    @Transform(({ value }) => {
        if (!value) {
            return undefined;
        }

        return value.low;
    })
    proposalId?: string;

    @Type(() => ContentModel)
    content: ContentModel = new ContentModel();

    @Expose({ name: 'submit_time' })
    submitTime?: string;

    @Expose({ name: 'deposit_end_time' })
    depositEndTime?: string;

    @Expose({ name: 'voting_start_time' })
    votingStartTime?: string;

    @Expose({ name: 'voting_end_time' })
    votingEndTime?: string;

    @Expose()
    status: ProposalStatus = ProposalStatus.UNRECOGNIZED;

    @Expose({ name: 'total_deposit' })
    @Type(() => CoinModel)
    totalDeposit: CoinModel[] = [];

    @Expose()
    @Type(() => VotesResultModel)
    result: VotesResultModel = new VotesResultModel();
}

export default ProposalsModel;
