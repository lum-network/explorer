import { Expose } from 'class-transformer';

class VotesResultModel {
    @Expose()
    yes = 0;

    @Expose()
    no = 0;

    @Expose()
    abstain = 0;

    @Expose({ name: 'no_with_veto' })
    noWithVeto = 0;
}

export default VotesResultModel;
