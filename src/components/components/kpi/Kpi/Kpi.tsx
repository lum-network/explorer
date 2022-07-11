import React, { useEffect, useState } from 'react';
import { KpiType, NumberConstants } from 'constant';
import { KpiCard } from 'components';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { BlockUtils, i18n, NumbersUtils, ValidatorsUtils } from 'utils';
import numeral from 'numeral';
import { BlocksModel } from 'models';
import { LumConstants } from '@lum-network/sdk-javascript';

import blockLogo from 'assets/images/blockDark.svg';
import validatorLogo from 'assets/images/validatorDark.svg';
import clockLogo from 'assets/images/clockDark.svg';
import bondedTokensLogo from 'assets/images/bondedTokensDark.svg';
import inflationLogo from 'assets/images/inflationDark.svg';
import walletLogo from 'assets/images/walletBis.svg';

interface IProps {
    types: KpiType[];
    className?: string;
}

const Kpi = (props: IProps): JSX.Element => {
    const [blockTime, setBlockTime] = useState(5000);

    const blocks = useSelector((state: RootState) => state.blocks.blocks);
    const validators = useSelector((state: RootState) => state.validators.validators);
    const stats = useSelector((state: RootState) => state.core.stats);
    const params = useSelector((state: RootState) => state.core.params);

    const processBlockTime = (blocks: BlocksModel[]): void => {
        const time = BlockUtils.processBlockTime(blocks);
        setBlockTime(time);
    };

    useEffect(() => {
        if (blocks && blocks.length) {
            processBlockTime(blocks);
        }
    }, [blocks]);

    const renderCard = (type: KpiType): JSX.Element | null => {
        switch (type) {
            case KpiType.BLOCK_HEIGHT:
                if (!blocks || !blocks.length) {
                    return null;
                }

                return (
                    <KpiCard logo={blockLogo} title={i18n.t('blocks')}>
                        {numeral(blocks[0].height).format('0,0')}
                    </KpiCard>
                );

            case KpiType.VALIDATORS:
                if (!validators || !validators.length) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('validators')} logo={validatorLogo}>
                        {numeral(validators.length).format('0,0')}
                    </KpiCard>
                );

            case KpiType.BLOCK_TIME:
                if (!blocks || !blocks.length || blocks.length < 30) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('blockTime')} logo={clockLogo}>
                        {numeral(blockTime / 1000).format('0.00')}
                        {i18n.t('sec')}
                    </KpiCard>
                );

            case KpiType.BONDED_TOKEN:
                if (!validators || !validators.length) {
                    return null;
                }

                const nb = NumbersUtils.convertUnitNumber(ValidatorsUtils.calculateTotalVotingPower(validators));
                const total = stats && stats.totalSupply ? NumbersUtils.convertUnitNumber(stats.totalSupply.amount) : 0;

                return (
                    <KpiCard title={i18n.t('bondedTokens')} logo={bondedTokensLogo} additionalInfo={`${numeral(NumbersUtils.getPercentage(nb, total)).format('0.00')}%`}>
                        {numeral(nb).format('0,0')}
                    </KpiCard>
                );

            case KpiType.INFLATION:
                if (!stats || !stats.inflation) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('inflation')} logo={inflationLogo}>
                        {numeral(parseFloat(stats.inflation) / NumberConstants.CLIENT_PRECISION).format('0.00%')}
                    </KpiCard>
                );

            // Parameters

            case KpiType.UNBONDING_TIME:
                if (!params || !params.staking || !params.staking.unbondingTime) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('unbondingTime')} logo={clockLogo}>
                        {params.staking.unbondingTime / 3600 / 24} {i18n.t('days')}
                    </KpiCard>
                );
            case KpiType.GOAL_BONDED:
                if (!params || !params.mint || !params.mint.goalBonded) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('goalBonded')} logo={bondedTokensLogo}>
                        {numeral(parseFloat(params.mint.goalBonded) / NumberConstants.CLIENT_PRECISION).format('0.00%')}
                    </KpiCard>
                );
            case KpiType.INFLATION_MAX:
                if (!params || !params.mint || !params.mint.inflation || !params.mint.inflation.max) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('inflationMax')} logo={inflationLogo}>
                        {numeral(parseFloat(params.mint.inflation.max) / NumberConstants.CLIENT_PRECISION).format('0.00%')}
                    </KpiCard>
                );
            case KpiType.INFLATION_MIN:
                if (!params || !params.mint || !params.mint.inflation || !params.mint.inflation.min) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('inflationMin')} logo={inflationLogo}>
                        {numeral(parseFloat(params.mint.inflation.min) / NumberConstants.CLIENT_PRECISION).format('0.00%')}
                    </KpiCard>
                );
            case KpiType.INFLATION_RATE:
                if (!params || !params.mint || !params.mint.inflation || !params.mint.inflation.rateChange) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('inflationRate')} logo={inflationLogo}>
                        {numeral(parseFloat(params.mint.inflation.rateChange) / NumberConstants.CLIENT_PRECISION).format('0.00%')}
                    </KpiCard>
                );
            case KpiType.MINT_DENOM:
                if (!params || !params.mint || !params.mint.denom) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('mintDenom')} logo={walletLogo}>
                        {params.mint.denom}
                    </KpiCard>
                );
            case KpiType.BOND_DENOM:
                if (!params || !params.staking || !params.staking.bondDenom) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('bondDenom')} logo={walletLogo}>
                        {params.staking.bondDenom}
                    </KpiCard>
                );
            case KpiType.BLOCKS_PER_YEAR:
                if (!params || !params.mint || !params.mint.blocksPerYear) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('blocksPerYear')} logo={clockLogo}>
                        {numeral(params.mint.blocksPerYear).format('0,0')}
                    </KpiCard>
                );
            case KpiType.MAX_ENTRIES:
                if (!params || !params.staking || !params.staking.maxEntries) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('maxEntries')} logo={inflationLogo}>
                        {params.staking.maxEntries}
                    </KpiCard>
                );
            case KpiType.MAX_VALIDATORS:
                if (!params || !params.staking || !params.staking.maxValidators) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('maxValidators')} logo={validatorLogo}>
                        {params.staking.maxValidators}
                    </KpiCard>
                );
            case KpiType.HISTORICAL_ENTRIES:
                if (!params || !params.staking || !params.staking.historicalEntries) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('historicalEntries')} logo={inflationLogo}>
                        {params.staking.historicalEntries}
                    </KpiCard>
                );
            case KpiType.MIN_DEPOSIT:
                if (!params || !params.gov || !params.gov.deposit.minimum) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('minDeposit')} logo={inflationLogo}>
                        {NumbersUtils.formatNumber(params.gov.deposit.minimum[0])} <span className="color-type">{LumConstants.LumDenom}</span>
                    </KpiCard>
                );
            case KpiType.MAX_DEPOSIT_PERIOD:
                if (!params || !params.gov || !params.gov.deposit.period) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('maxDepositPeriod')} logo={inflationLogo}>
                        {params.gov.deposit.period / 3600 / 24} {i18n.t('days')}
                    </KpiCard>
                );
            case KpiType.VOTING_PERIOD:
                if (!params || !params.gov || !params.gov.vote.period) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('votingPeriod')} logo={inflationLogo}>
                        {params.gov.vote.period / 3600 / 24} {i18n.t('days')}
                    </KpiCard>
                );
            case KpiType.QUORUM:
                return (
                    <KpiCard title={i18n.t('quorum')} logo={inflationLogo}>
                        0.00
                    </KpiCard>
                );
            case KpiType.THRESHOLD:
                return (
                    <KpiCard title={i18n.t('threshold')} logo={inflationLogo}>
                        0.00
                    </KpiCard>
                );
            case KpiType.VETO_THRESHOLD:
                return (
                    <KpiCard title={i18n.t('vetoThreshold')} logo={inflationLogo}>
                        0.00
                    </KpiCard>
                );
            case KpiType.BASE_PROPOSER_REWARD:
                if (!params || !params.distribution || !params.distribution.baseProposerReward) {
                    return null;
                }
                return (
                    <KpiCard title={i18n.t('baseProposerReward')} logo={inflationLogo}>
                        {numeral(parseFloat(params.distribution.baseProposerReward) / NumberConstants.CLIENT_PRECISION).format('0.00%')}
                    </KpiCard>
                );
            case KpiType.BONUS_PROPOSER_REWARD:
                if (!params || !params.distribution || !params.distribution.bonusProposerReward) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('bonusProposerReward')} logo={inflationLogo}>
                        {numeral(parseFloat(params.distribution.bonusProposerReward) / NumberConstants.CLIENT_PRECISION).format('0.00%')}
                    </KpiCard>
                );
            case KpiType.COMMUNITY_TAX:
                if (!params || !params.distribution || !params.distribution.communityTax) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('communityTax')} logo={inflationLogo}>
                        {numeral(parseFloat(params.distribution.communityTax) / NumberConstants.CLIENT_PRECISION).format('0.00%')}
                    </KpiCard>
                );
            case KpiType.WITHDRAW_ADDR_ENABLED:
                return (
                    <KpiCard title={i18n.t('withdrawAddrEnabled')} logo={inflationLogo}>
                        {(!!params.distribution.withdrawAddrEnabled).toString()}
                    </KpiCard>
                );
            case KpiType.SIGNED_BLOCKS_WINDOW:
                if (!params || !params.slashing || !params.slashing.signedBlocksWindow) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('signedBlocksWindow')} logo={inflationLogo}>
                        {numeral(params.slashing.signedBlocksWindow).format('0,0')}
                    </KpiCard>
                );
            case KpiType.MIN_SIGNED_PER_WINDOW:
                return (
                    <KpiCard title={i18n.t('minSignedPerWindow')} logo={inflationLogo}>
                        0.00
                    </KpiCard>
                );
            case KpiType.DOWNTIME_JAIL_DURATION:
                if (!params || !params.slashing || !params.slashing.downtimeJailDuration) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('downtimeJailDuration')} logo={inflationLogo}>
                        {params.slashing.downtimeJailDuration}s
                    </KpiCard>
                );
            case KpiType.SLASH_FRACTION_DOUBLE_SIGN:
                if (!params || !params.slashing || !params.slashing.slashFractionDoubleSign) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('slashFractionDoubleSign')} logo={inflationLogo}>
                        {Number('0x' + params.slashing.slashFractionDoubleSign) / NumberConstants.CLIENT_PRECISION}
                    </KpiCard>
                );
            case KpiType.SLASH_FRACTION_DOWNTIME:
                return (
                    <KpiCard title={i18n.t('slashFractionDowntime')} logo={inflationLogo}>
                        0.00
                    </KpiCard>
                );
            default:
                return null;
        }
    };

    const { types, className } = props;
    return (
        <div className={`row mb-4 ${className}`}>
            {types.map((value, index) => (
                <div key={index} className="col-lg-3 col-sm-6">
                    {renderCard(value)}
                </div>
            ))}
        </div>
    );
};

export default Kpi;
