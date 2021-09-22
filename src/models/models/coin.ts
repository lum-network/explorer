import { Transform } from 'class-transformer';

class CoinModel {
    denom = '';

    @Transform((param) => {
        if (!param || !param.value) {
            return '';
        }
        return param.value.toString();
    })
    amount = '';
}

export default CoinModel;
