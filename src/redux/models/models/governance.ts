import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { ProposalsModel } from 'models';
import { ApiGovernance } from 'api';

interface GovernanceState {
    proposals: ProposalsModel[];
    proposal: ProposalsModel | null;
}

const governance = createModel<RootModel>()({
    state: {
        proposals: [],
        proposal: null,
    } as GovernanceState,
    reducers: {
        SET_PROPOSALS(state, proposals: ProposalsModel[]) {
            return {
                ...state,
                proposals: proposals.sort((a, b) => b.proposalId.toNumber() - a.proposalId.toNumber()),
            };
        },
        SET_PROPOSAL(state, proposal: ProposalsModel) {
            return {
                ...state,
                proposal,
            };
        },
        RESET_PROPOSAL(state) {
            return {
                ...state,
                proposal: null,
            };
        },
    },
    effects: (dispatch) => ({
        async fetchProposals() {
            const proposals = await ApiGovernance.fetchProposals();

            dispatch.governance.SET_PROPOSALS(proposals);
        },

        async getProposal(id: string) {
            dispatch.governance.RESET_PROPOSAL();

            const proposal = await ApiGovernance.getProposal(id);
            proposal.result = await ApiGovernance.getTally(id);

            dispatch.governance.SET_PROPOSAL(proposal);
        },

        async getTally(id: string) {
            return await ApiGovernance.getTally(id);
        },
    }),
});

export default governance;
