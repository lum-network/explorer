import { ProposalsModel, VotesResultModel } from 'models';
import axios from 'axios';
import { ApiConstants } from 'constant';
import { plainToClass } from 'class-transformer';

export const fetchProposals = (): Promise<ProposalsModel[]> => {
    return new Promise((resolve, reject) => {
        axios(`${ApiConstants.GOVERNANCE_URL}/${ApiConstants.PROPOSALS_URL}`, {
            baseURL: ApiConstants.BASE_URL,
            method: 'GET',
        })
            .then((result) => {
                const proposals = plainToClass(ProposalsModel, result.data.result) as unknown as ProposalsModel[];

                resolve(proposals);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getProposal = (id: string): Promise<ProposalsModel> => {
    return new Promise((resolve, reject) => {
        axios(`${ApiConstants.GOVERNANCE_URL}/${ApiConstants.PROPOSALS_URL}/${id}`, {
            baseURL: ApiConstants.BASE_URL,
            method: 'GET',
        })
            .then((result) => {
                const proposal = plainToClass(ProposalsModel, result.data.result);

                resolve(proposal);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getTally = (id: string): Promise<VotesResultModel> => {
    return new Promise((resolve, reject) => {
        axios(`${ApiConstants.GOVERNANCE_URL}/${ApiConstants.PROPOSALS_URL}/${id}/tally`, {
            baseURL: ApiConstants.BASE_URL,
            method: 'GET',
        })
            .then((result) => {
                const tally = plainToClass(VotesResultModel, result.data.result);

                resolve(tally);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
