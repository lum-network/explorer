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
        setProposals(state, proposals: ProposalsModel[]) {
            return {
                ...state,
                proposals: proposals.sort((a, b) => parseInt(b.proposalId || '0') - parseInt(a.proposalId || '0')),
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

            dispatch.governance.setProposals(proposals);
        },

        async getProposal(id: string) {
            dispatch.governance.resetProposal();

            const proposal = await ApiGovernance.getProposal(id);
            proposal.result = await ApiGovernance.getTally(id);

            dispatch.governance.setProposal(proposal);
        },

        async getTally(id: string) {
            return await ApiGovernance.getTally(id);
        },
    }),
});

export default governance;
