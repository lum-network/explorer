import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { DelegationModel, MetadataModel } from 'models';
import { Card, Table } from 'frontend-elements';
import { i18n, NumbersUtils, StringsUtils } from 'utils';
import { NavigationConstants, NumberConstants } from 'constant';
import numeral from 'numeral';
import { LumConstants } from '@lum-network/sdk-javascript';
import { SmallerDecimal } from 'components';

interface IProps extends RouteComponentProps {
    delegators: DelegationModel[];
    title?: boolean;
    validatorTokens: number;
    metadata?: MetadataModel;
    onPageChange?: (page: number) => void;
    total?: boolean;
}

const DelegatorsList = (props: IProps): JSX.Element => {
    const renderRow = (delegator: DelegationModel, index: number, head: string[]): JSX.Element => {
        const { validatorTokens } = props;

        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <Link title={delegator.delegatorAddress} to={`${NavigationConstants.ACCOUNT}/${delegator.delegatorAddress}`}>
                        {StringsUtils.trunc(delegator.delegatorAddress || '', 10)}
                    </Link>
                </td>
                <td data-label={head[1]}>
                    <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(delegator.shares || 0) / NumberConstants.CLIENT_PRECISION).format('0,0.000000')} />
                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                </td>
                <td className="text-end" data-label={head[2]}>
                    {numeral((parseFloat(delegator.shares || '0') / NumberConstants.CLIENT_PRECISION / validatorTokens).toFixed(6)).format('0.00%')}
                </td>
            </tr>
        );
    };

    const { delegators, title, onPageChange, metadata, total } = props;
    const head = [i18n.t('delegatorAddress'), i18n.t('amount'), i18n.t('shares')];

    return (
        <Card withoutPadding className="mb-5 h-100">
            <div className="d-flex justify-content-between">
                {title && (
                    <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">
                        {i18n.t('delegators')} {total && metadata && <span> ({numeral(metadata.itemsTotal).format('0,0')})</span>}
                    </h3>
                )}
            </div>
            <Table pagination={metadata} onPageChange={onPageChange} head={head}>
                {delegators.map((delegator, index) => renderRow(delegator, index, head))}
            </Table>
        </Card>
    );
};

export default withRouter(DelegatorsList);
