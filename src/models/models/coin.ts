import { Transform } from 'class-transformer';

class CoinModel {
    denom = '';

    @Transform((param) => param.value.toString())
    amount = '';
}

export default CoinModel;
