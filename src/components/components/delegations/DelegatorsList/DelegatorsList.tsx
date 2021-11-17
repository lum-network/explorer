import React from 'react';
import { Link, RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { DelegationsModel } from 'models';
import { Button, Card, Table } from 'frontend-elements';
import { i18n, NumbersUtils, StringsUtils } from 'utils';
import { NavigationConstants } from 'constant';
import numeral from 'numeral';
import { LumConstants } from '@lum-network/sdk-javascript';

interface IProps extends RouteComponentProps {
    delegators: DelegationsModel[];
    title?: boolean;
    validatorTokens: number;
    more?: boolean;
}

const DelegatorsList = (props: IProps): JSX.Element => {
    const history = useHistory();

    const renderRow = (delegator: DelegationsModel, index: number, head: string[]): JSX.Element => {
        const { validatorTokens } = props;

        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <Link
                        title={delegator.delegation.delegatorAddress}
                        to={`${NavigationConstants.ACCOUNT}/${delegator.delegation.delegatorAddress}`}
                    >
                        {StringsUtils.trunc(delegator.delegation.delegatorAddress || '', 10)}
                    </Link>
                </td>
                <td data-label={head[1]}>
                    {NumbersUtils.formatNumber(delegator.balance, true)}
                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                </td>
                <td className="text-end" data-label={head[2]}>
                    {numeral(parseFloat(delegator.balance?.amount || '0') / validatorTokens).format('0.00%')}
                </td>
            </tr>
        );
    };

    const { delegators, title, more } = props;
    const head = [i18n.t('delegatorAddress'), i18n.t('amount'), i18n.t('shares')];

    return (
        <Card withoutPadding className="mb-5 h-100">
            <div className="d-flex justify-content-between">
                {title && <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">{i18n.t('delegators')}</h3>}
                {more && (
                    <Button
                        className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3"
                        onPress={() => history.push(`${history.location.pathname}${NavigationConstants.DELEGATORS}`)}
                    >
                        {i18n.t('viewAll')}
                    </Button>
                )}
            </div>
            <Table head={head}>{delegators.map((delegator, index) => renderRow(delegator, index, head))}</Table>
        </Card>
    );
};

export default withRouter(DelegatorsList);
