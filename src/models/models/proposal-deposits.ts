import { Expose } from 'class-transformer';
import CoinModel from './coin';

class ProposalDepositorsModel {
    @Expose({ name: 'proposal_id' })
    proposalId: number;

    @Expose({ name: 'depositor_address' })
    depositorAddress: string;

    @Expose()
    amount: CoinModel;
}

export default ProposalDepositorsModel;
