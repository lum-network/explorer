import { Kpi } from 'components';
import { KpiType } from 'constant';
import React from 'react';
import { i18n } from 'utils';

const ParametersPage = (): JSX.Element => {
    return (
        <>
            <h2 className="mt-3 mb-4">{i18n.t('mintingParam')}</h2>
            <Kpi types={[KpiType.BLOCKS_PER_YEAR, KpiType.GOAL_BONDED, KpiType.INFLATION_MAX, KpiType.INFLATION_MIN, KpiType.INFLATION_RATE, KpiType.MINT_DENOM]} />
            <h2 className="my-4">{i18n.t('stakingParam')}</h2>
            <Kpi types={[KpiType.UNBONDING_TIME, KpiType.MAX_VALIDATORS, KpiType.MAX_ENTRIES, KpiType.HISTORICAL_ENTRIES, KpiType.BOND_DENOM]} />
            <h2 className="my-4">{i18n.t('governanceParam')}</h2>
            <Kpi types={[KpiType.MIN_DEPOSIT, KpiType.MAX_DEPOSIT_PERIOD, KpiType.VOTING_PERIOD, KpiType.QUORUM, KpiType.THRESHOLD, KpiType.VETO_THRESHOLD]} />
            <h2 className="my-4">{i18n.t('distributionParam')}</h2>
            <Kpi types={[KpiType.BASE_PROPOSER_REWARD, KpiType.BONUS_PROPOSER_REWARD, KpiType.COMMUNITY_TAX, KpiType.WITHDRAW_ADDR_ENABLED]} />
            <h2 className="my-4">{i18n.t('slashingParam')}</h2>
            <Kpi types={[KpiType.SIGNED_BLOCKS_WINDOW, KpiType.MIN_SIGNED_PER_WINDOW, KpiType.DOWNTIME_JAIL_DURATION, KpiType.SLASH_FRACTION_DOUBLE_SIGN, KpiType.SLASH_FRACTION_DOWNTIME]} />
        </>
    );
};

export default ParametersPage;
