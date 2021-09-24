import { ProposalsModel } from 'models';
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
