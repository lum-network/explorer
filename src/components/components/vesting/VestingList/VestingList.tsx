import React from 'react';
import { i18n, NumbersUtils } from 'utils';
import { Table } from 'frontend-elements';
import placeholderTx from 'assets/images/placeholderTx.svg';
import { VestingModel } from 'models/models/account';
import moment from 'moment';
import { SystemConstants } from 'constant';
import SmallerDecimal from '../../SmallerDecimal/SmallerDecimal';
import numeral from 'numeral';
import { LumConstants } from '@lum-network/sdk-javascript';

interface IProps {
    vesting: VestingModel | null;
    title?: boolean;
}

const VestingList = ({ vesting, title }: IProps): JSX.Element => {
    const head = [i18n.t('startsAt'), i18n.t('amount'), i18n.t('vestingSchedule')];

    if (!vesting) {
        return (
            <div className="mb-5 d-flex justify-content-center align-items-center flex-column h-100">
                <img className="mb-2 placeholder-image" alt="placeholder" src={placeholderTx} />
                {i18n.t('noVestingToken')}
            </div>
        );
    }

    return (
        <>
            <div className="d-flex justify-content-between">{title && <h3 className="mx-xl-5 mb-xl-2 mx-3 mt-3">{i18n.t('vesting')}</h3>}</div>
            <Table head={head}>
                <tr>
                    <td data-label={head[0]}>
                        <small>
                            {moment.utc(vesting.startsAt).tz(SystemConstants.TIMEZONE).format('ll')}
                            <br />
                            <span className="text-muted">({moment.utc(vesting.startsAt).fromNow()})</span>
                        </small>
                    </td>
                    <td data-label={head[1]}>
                        <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(vesting.lockedCoins.amount)).format('0,0.000000')} />
                        <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                    </td>
                    <td data-label={head[2]} className="text-end">
                        <small>
                            {moment.utc(vesting.endsAt).tz(SystemConstants.TIMEZONE).format('ll')}
                            <br />
                            <span className="text-muted">({moment.utc(vesting.endsAt).fromNow()})</span>
                        </small>
                    </td>
                </tr>
            </Table>
        </>
    );
};

export default VestingList;
