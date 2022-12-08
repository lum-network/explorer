import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ProposalDepositorsModel, MetadataModel } from 'models';
import { Card, Table } from 'frontend-elements';
import { i18n, StringsUtils } from 'utils';
import { NavigationConstants } from 'constant';
import numeral from 'numeral';
import SmallerDecimal from 'components/components/SmallerDecimal/SmallerDecimal';
import { LumConstants } from '@lum-network/sdk-javascript';

interface IProps extends RouteComponentProps {
    depositors: ProposalDepositorsModel[];
    title?: boolean;
    metadata?: MetadataModel;
    onPageChange?: (page: number) => void;
    total?: boolean;
}

const DepositorsList = (props: IProps): JSX.Element => {
    const renderRow = (depositors: ProposalDepositorsModel, index: number, head: string[]): JSX.Element => {
        return (
            <tr key={index}>
                <td data-label={head[0]}>{depositors.proposalId}</td>
                <td data-label={head[1]}>
                    <Link title={depositors.depositorAddress} to={`${NavigationConstants.ACCOUNT}/${depositors.depositorAddress}`}>
                        {StringsUtils.trunc(depositors.depositorAddress || '', 10)}
                    </Link>
                </td>
                <td className="text-end" data-label={head[2]}>
                    <SmallerDecimal nb={numeral(depositors.amount.amount).format('0,0.000000')} />
                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                </td>
            </tr>
        );
    };

    const { depositors, title, onPageChange, metadata, total } = props;
    const head = [i18n.t('proposalId'), i18n.t('depositorAddress'), i18n.t('depositAmount')];

    return (
        <Card withoutPadding className="mb-5 pb-3 h-100">
            <div className="d-flex justify-content-between">
                {title && (
                    <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">
                        {i18n.t('depositors')} {total && metadata && <span> ({numeral(metadata.itemsTotal).format('0,0')})</span>}
                    </h3>
                )}
            </div>
            <Table customPagination={'pagination-deposits'} pagination={metadata} onPageChange={onPageChange} head={head}>
                {depositors.map((depositor, index) => renderRow(depositor, index, head))}
            </Table>
        </Card>
    );
};

export default withRouter(DepositorsList);
