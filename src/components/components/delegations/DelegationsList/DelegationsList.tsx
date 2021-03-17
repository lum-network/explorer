import React, { PureComponent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { DelegationsModel } from 'models';
import { Card, Table } from 'frontend-elements';
import { i18n, StringsUtils } from 'utils';
import { NavigationConstants, NumberConstants } from 'constant';

interface IProps extends RouteComponentProps {
    delegations: DelegationsModel[];
    title?: boolean;
}

class DelegationsList extends PureComponent<IProps> {
    renderRow(delegation: DelegationsModel, index: number, head: string[]): JSX.Element {
        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <Link
                        title={delegation.delegation.delegatorAddress}
                        to={`${NavigationConstants.ACCOUNT}/${delegation.delegation.delegatorAddress}`}
                    >
                        {StringsUtils.trunc(delegation.delegation.delegatorAddress || '', 12)}
                    </Link>
                </td>
                <td className="text-end" data-label={head[1]}>
                    {parseFloat(delegation.delegation.shares || '') / NumberConstants.CLIENT_PRECISION}
                    <span className="ms-1 color-type">LUM</span>
                </td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { delegations, title } = this.props;
        const head = [i18n.t('delegatorAddress'), i18n.t('amount')];

        return (
            <Card withoutPadding className="mb-5 h-100">
                <div className="d-flex justify-content-between">
                    {title && <h3 className="mx-xl-3 mt-xl-5 mx-3 mt-3">{i18n.t('delegators')}</h3>}
                </div>
                <Table head={head}>
                    {delegations.map((delegation, index) => this.renderRow(delegation, index, head))}
                </Table>
            </Card>
        );
    }
}

export default withRouter(DelegationsList);
