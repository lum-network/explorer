import { Expose, Transform } from 'class-transformer';

class ProposalsModel {
    @Expose({ name: 'proposal_id' })
    @Transform(({ value }) => {
        if (!value) {
            return undefined;
        }

        return value.low;
    })
    proposalId?: string;
}

export default ProposalsModel;
