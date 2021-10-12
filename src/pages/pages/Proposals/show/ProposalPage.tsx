import React, { useEffect } from 'react';
import proposalLogo from 'assets/images/proposalDark.svg';
import { i18n } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';
import { RouteComponentProps } from 'react-router';
import { Card, Loading } from 'frontend-elements';
import { Badge } from 'components';

interface IProps extends RouteComponentProps<{ id: string }> {}

const ProposalPage = ({ match }: IProps): JSX.Element => {
    const proposal = useSelector((state: RootState) => state.governance.proposal);
    const dispatch = useDispatch<Dispatch>();
    const loading = useSelector((state: RootState) => state.loading.effects.governance.getProposal);

    const { id } = match.params;

    useEffect(() => {
        dispatch.governance.getProposal(id).finally(() => null);
    }, []);

    const renderInformation = () => {
        if (loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        if (!proposal) {
            return (
                <Card className="mb-5 d-flex justify-content-center align-items-center flex-column">
                    <img
                        width={44}
                        height={44}
                        className="mb-2 placeholder-image"
                        alt="placeholder"
                        src={proposalLogo}
                    />
                    {i18n.t('noProposalFound')}
                </Card>
            );
        }

        return (
            <Card className="mb-5">
                <p>Hello, World!</p>
            </Card>
        );
    };

    return (
        <>
            <div className="mt-3 mb-4 d-flex align-items-center">
                <h2 className="me-3">
                    <img alt="proposal" src={proposalLogo} /> {i18n.t('proposal')} #
                    {(proposal && proposal.proposalId) || id}
                </h2>
                {proposal && <Badge proposalStatus={proposal.status} />}
            </div>
            {renderInformation()}
        </>
    );
};

export default ProposalPage;
