import React from 'react';
import { i18n, StringsUtils } from 'utils';
import { Card, Table } from 'frontend-elements';
import { UnbondingModel } from 'models/models/account';
import { Link } from 'react-router-dom';
import { NavigationConstants, SystemConstants } from 'constant';
import numeral from 'numeral';
import moment from 'moment';
import placeholderTx from '../../../../assets/images/placeholderTx.svg';

interface IProps {
    unbondings: UnbondingModel[];
    title?: boolean;
}

const UnbondingsList = (props: IProps): JSX.Element => {
    const renderRow = (unbonding: UnbondingModel, head: string[]) => {
        return unbonding.entries.map((value, index) => (
            <tr key={String(index) + unbonding.validatorAddress}>
                <td data-label={head[0]}>
                    <Link
                        title={unbonding.validatorAddress}
                        to={`${NavigationConstants.VALIDATORS}/${unbonding.validatorAddress}`}
                    >
                        {StringsUtils.trunc(unbonding.validatorAddress || '', 6)}
                    </Link>
                </td>
                <td data-label={head[1]}>
                    <Link to={`${NavigationConstants.BLOCKS}/${value.height}`}>{value.height}</Link>
                </td>
                <td data-label={head[2]} className="text-end">
                    {numeral(value.balance).format('0,0.00')}
                    <span className="ms-1 color-type">LUM</span>
                </td>
                <td data-label={head[3]} className="text-end">
                    <small>
                        {moment.utc(value.completionTime).tz(SystemConstants.TIMEZONE).format('ll')}
                        <br />
                        <span className="text-muted">({moment.utc(value.completionTime).fromNow()})</span>
                    </small>
                </td>
            </tr>
        ));
    };

    const { unbondings, title } = props;
    const head = [i18n.t('validator'), i18n.t('height'), i18n.t('amount'), i18n.t('completion')];

    if (!unbondings || !unbondings.length) {
        return (
            <Card className="mb-5 d-flex justify-content-center align-items-center flex-column h-100">
                <img className="mb-2 placeholder-image" alt="placeholder" src={placeholderTx} />
                {i18n.t('noUnbondedToken')}
            </Card>
        );
    }

    return (
        <Card withoutPadding className="mb-5 h-100">
            <div className="d-flex justify-content-between">
                {title && <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">{i18n.t('unbondings')}</h3>}
            </div>
            <Table head={head}>{unbondings.map((unbonding) => renderRow(unbonding, head))}</Table>
        </Card>
    );
};

export default UnbondingsList;
