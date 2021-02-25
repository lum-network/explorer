import { BlocksModel } from 'models';
import { TimesUtils } from 'utils';

export const processBlockTime = (blocks: BlocksModel[]): number => {
    if (blocks.length < 30) {
        return 0;
    }

    let x = 0;

    for (let i = 1; i <= 30; i++) {
        x += TimesUtils.differenceBetweenDates(blocks[i - 1].dispatchedAt || '', blocks[i].dispatchedAt || '');
    }

    return x / 30;
};
