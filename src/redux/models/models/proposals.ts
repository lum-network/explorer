import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { ProposalsModel } from 'models';
import { ApiGovernance } from '../../../api';

interface ProposalsState {
    proposals: ProposalsModel[];
    proposal: ProposalsModel | null;
}

const proposals = createModel<RootModel>()({
    state: {
        proposals: [],
        proposal: null,
    } as ProposalsState,
    reducers: {
        setProposals(state, proposals: ProposalsModel[]) {
            return {
                ...state,
                proposals,
            };
        },
    },
    effects: (dispatch) => ({
        async fetchProposals() {
            const proposals = await ApiGovernance.fetchProposals();

            dispatch.proposals.setProposals(proposals);
        },
    }),
});

export default proposals;
