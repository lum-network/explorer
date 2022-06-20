import React from 'react';
import { Card, Table } from 'frontend-elements';
import { i18n, NumbersUtils, StringsUtils } from 'utils';
import { RedelegationModel } from 'models/models/account';
import placeholderTx from 'assets/images/placeholderTx.svg';
import { Link } from 'react-router-dom';
import { NavigationConstants, SystemConstants } from 'constant';
import SmallerDecimal from '../../SmallerDecimal/SmallerDecimal';
import numeral from 'numeral';
import { LumConstants } from '@lum-network/sdk-javascript';
import moment from 'moment';

interface IProps {
    redelegates: RedelegationModel[];
    title?: boolean;
}

const RedelegatesList = ({ title, redelegates }: IProps): JSX.Element => {
    const renderRow = (redelegate: RedelegationModel, head: string[]) => {
        return redelegate.entries.map((value, index) => (
            <tr key={String(index)}>
                <td data-label={head[0]}>
                    <Link title={redelegate.redelegation.validatorSrcAddress} to={`${NavigationConstants.VALIDATORS}/${redelegate.redelegation.validatorSrcAddress}`}>
                        {StringsUtils.trunc(redelegate.redelegation.validatorSrcAddress || '', 4)}
                    </Link>
                </td>
                <td data-label={head[1]}>
                    <Link title={redelegate.redelegation.validatorDstAddress} to={`${NavigationConstants.VALIDATORS}/${redelegate.redelegation.validatorDstAddress}`}>
                        {StringsUtils.trunc(redelegate.redelegation.validatorDstAddress || '', 4)}
                    </Link>
                </td>
                <td data-label={head[2]} className="text-end">
                    <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(value.balance || 0)).format('0,0.000000')} />
                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                </td>
                <td data-label={head[3]} className="text-end">
                    <small>
                        {moment.utc(value.redelegationEntry.completionTime).tz(SystemConstants.TIMEZONE).format('ll')}
                        <br />
                        <span className="text-muted">({moment.utc(value.redelegationEntry.completionTime).fromNow()})</span>
                    </small>
                </td>
            </tr>
        ));
    };

    const head = [i18n.t('from'), i18n.t('to'), i18n.t('amount'), i18n.t('time')];

    if (!redelegates || !redelegates.length) {
        return (
            <Card className="mb-5 d-flex justify-content-center align-items-center flex-column h-100">
                <img className="mb-2 placeholder-image" alt="placeholder" src={placeholderTx} />
                {i18n.t('noRedelegation')}
            </Card>
        );
    }

    return (
        <Card withoutPadding className="mb-5 h-100">
            <div className="d-flex justify-content-between">{title && <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">{i18n.t('redelegations')}</h3>}</div>
            <Table head={head}>{redelegates.map((redelegate) => renderRow(redelegate, head))}</Table>
        </Card>
    );
};

export default RedelegatesList;
