import { VotesResultModel } from 'models';

export const sumOfVotes = (results: VotesResultModel) => {
    return results.abstain + results.no + results.yes + results.noWithVeto;
};
