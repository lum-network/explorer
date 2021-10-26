import { VotesResultModel } from 'models';
import { i18n } from 'utils';

export const sumOfVotes = (results: VotesResultModel): number => {
    if (!results) {
        return 0;
    }

    return results.abstain + results.no + results.yes + results.noWithVeto;
};

export const isNoVoteYet = (results: VotesResultModel): boolean => {
    return !Math.max(results.yes, results.no, results.noWithVeto, results.abstain);
};

export const maxVote = (resultsPercent: VotesResultModel): [string, number] => {
    let max = 0;
    let name = '';

    for (const [key, value] of Object.entries(resultsPercent)) {
        if (value > max) {
            max = value;
            name = key;
        }
    }

    return [i18n.t(name), max];
};
