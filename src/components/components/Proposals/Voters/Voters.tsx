import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ProposalVotersModel, MetadataModel } from 'models';
import { Card, Table } from 'frontend-elements';
import { i18n, StringsUtils } from 'utils';
import { NavigationConstants } from 'constant';
import numeral from 'numeral';

interface IProps extends RouteComponentProps {
    voters: ProposalVotersModel[];
    title?: boolean;
    metadata?: MetadataModel;
    onPageChange?: (page: number) => void;
    total?: boolean;
}

const VotersList = (props: IProps): JSX.Element => {
    const renderRow = (voters: ProposalVotersModel, index: number, head: string[]): JSX.Element => {
        const voteOptionToResult = () => {
            switch (voters.voteOption) {
                case 0:
                    return i18n.t('unspecified');
                case 1:
                    return i18n.t('yes');
                case 2:
                    return i18n.t('abstain');
                case 3:
                    return i18n.t('no');
                case 4:
                    return i18n.t('noWithVeto');
                case -1:
                    return i18n.t('unrecognized');
            }
        };
        return (
            <tr key={index}>
                <td data-label={head[0]}>{voters.proposalId}</td>
                <td data-label={head[1]}>
                    <Link title={voters.voterAddress} to={`${NavigationConstants.ACCOUNT}/${voters.voterAddress}`}>
                        {StringsUtils.trunc(voters.voterAddress || '', 10)}
                    </Link>
                </td>
                <td className="text-end" data-label={head[2]}>
                    {voteOptionToResult()}
                </td>
            </tr>
        );
    };

    const { voters, title, onPageChange, metadata, total } = props;
    const head = [i18n.t('proposalId'), i18n.t('voterAddress'), i18n.t('voteStatus')];

    return (
        <Card withoutPadding className="mb-5 pb-3 h-100">
            <div className="d-flex justify-content-between">
                {title && (
                    <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">
                        {i18n.t('voters')} {total && metadata && <span> ({numeral(metadata.itemsTotal).format('0,0')})</span>}
                    </h3>
                )}
            </div>
            <Table customPagination={'pagination-deposits'} pagination={metadata} onPageChange={onPageChange} head={head}>
                {voters.map((voter, index) => renderRow(voter, index, head))}
            </Table>
        </Card>
    );
};

export default withRouter(VotersList);
