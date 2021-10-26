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

export const maxVote = (resultsPercent: VotesResultModel): [string, number, string] => {
    let max = 0;
    let name = '';
    let dotClass: string;

    for (const [key, value] of Object.entries(resultsPercent)) {
        if (value > max) {
            max = value;
            name = key;
        }
    }

    switch (name) {
        case 'yes':
            dotClass = 'vote-option-green';
            break;
        case 'no':
            dotClass = 'vote-option-red';
            break;
        case 'noWithVeto':
            dotClass = 'vote-option-yellow';
            break;
        default:
            dotClass = 'vote-option-grey';
    }

    return [i18n.t(name), max, dotClass];
};
