import React, { PureComponent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { DelegationsModel } from 'models';
import { Card, Table } from 'frontend-elements';
import { i18n, StringsUtils } from 'utils';
import { NavigationConstants } from 'constant';
import numeral from 'numeral';

interface IProps extends RouteComponentProps {
    delegations: DelegationsModel[];
    title?: boolean;
    validatorTokens: number;
}

class DelegationsList extends PureComponent<IProps> {
    renderRow(delegation: DelegationsModel, index: number, head: string[]): JSX.Element {
        const { validatorTokens } = this.props;

        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <Link
                        title={delegation.delegation.delegatorAddress}
                        to={`${NavigationConstants.ACCOUNT}/${delegation.delegation.delegatorAddress}`}
                    >
                        {StringsUtils.trunc(delegation.delegation.delegatorAddress || '', 10)}
                    </Link>
                </td>
                <td data-label={head[1]}>
                    {numeral(delegation.balance?.amount).format('0,0')}
                    <span className="ms-1 color-type">{delegation.balance?.denom.toUpperCase()}</span>
                </td>
                <td className="text-end" data-label={head[2]}>
                    {numeral(parseFloat(delegation.balance?.amount || '0') / validatorTokens).format('0.00%')}
                </td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { delegations, title } = this.props;
        const head = [i18n.t('delegatorAddress'), i18n.t('amount'), i18n.t('shares')];

        return (
            <Card withoutPadding className="mb-5 h-100">
                <div className="d-flex justify-content-between">
                    {title && <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">{i18n.t('delegators')}</h3>}
                </div>
                <Table head={head}>
                    {delegations.map((delegation, index) => this.renderRow(delegation, index, head))}
                </Table>
            </Card>
        );
    }
}

export default withRouter(DelegationsList);
