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
        setProposal(state, proposal: ProposalsModel) {
            return {
                ...state,
                proposal,
            };
        },
        resetProposal(state) {
            return {
                ...state,
                proposal: null,
            };
        },
    },
    effects: (dispatch) => ({
        async fetchProposals() {
            const proposals = await ApiGovernance.fetchProposals();

            dispatch.proposals.setProposals(proposals);
        },

        async getProposal(id: string) {
            const proposal = await ApiGovernance.getProposal(id);

            dispatch.proposals.setProposal(proposal);
        },
    }),
});

export default proposals;
