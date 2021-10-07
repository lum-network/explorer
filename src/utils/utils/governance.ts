import { VotesResultModel } from 'models';

export const sumOfVotes = (results: VotesResultModel): number => {
    return results.abstain + results.no + results.yes + results.noWithVeto;
};
