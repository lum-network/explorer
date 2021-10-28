import { Expose, Transform } from 'class-transformer';

class VotesResultModel {
    @Expose()
    @Transform((res) => parseFloat(res.value))
    yes = 0;

    @Expose()
    @Transform((res) => parseFloat(res.value))
    no = 0;

    @Expose()
    @Transform((res) => parseFloat(res.value))
    abstain = 0;

    @Expose({ name: 'no_with_veto' })
    @Transform((res) => parseFloat(res.value))
    noWithVeto = 0;
}

export default VotesResultModel;
