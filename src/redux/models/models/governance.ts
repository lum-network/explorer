import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { ProposalsModel } from 'models';
import { ApiGovernance } from 'api';
import { ProposalStatus } from 'constant';

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
            // const proposals = await ApiGovernance.fetchProposals();

            const proposals: ProposalsModel[] = [
                {
                    totalDeposit: [{ amount: '100000000', denom: 'ulum' }],
                    status: ProposalStatus.DEPOSIT_PERIOD,
                    proposalId: '1',
                    result: {
                        yes: 0,
                        no: 0,
                        noWithVeto: 0,
                        abstain: 0,
                    },
                },
            ];

            dispatch.governance.setProposals(proposals);
        },

        async getProposal(id: string) {
            const proposal = await ApiGovernance.getProposal(id);

            dispatch.governance.setProposal(proposal);
        },
    }),
});

export default governance;
