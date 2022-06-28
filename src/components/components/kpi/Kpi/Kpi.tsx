import React, { useEffect, useState } from 'react';
import { KpiType, NumberConstants } from 'constant';
import { KpiCard, SmallerDecimal } from 'components';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { BlockUtils, i18n, NumbersUtils, ValidatorsUtils } from 'utils';
import numeral from 'numeral';
import blockLogo from 'assets/images/blockDark.svg';
import validatorLogo from 'assets/images/validatorDark.svg';
import clockLogo from 'assets/images/clockDark.svg';
import bondedTokensLogo from 'assets/images/bondedTokensDark.svg';
import inflationLogo from 'assets/images/inflationDark.svg';
import totalReviewsLogo from 'assets/images/totalReviews.svg';
import merchantsLogo from 'assets/images/merchants.svg';
import rewardsLogo from 'assets/images/rewards.svg';
import todayRewardsLogo from 'assets/images/rewardsToday.svg';
import { BlocksModel } from 'models';
import { LumConstants } from '@lum-network/sdk-javascript';

interface IProps {
    types: KpiType[];
    className?: string;
}

const Kpi = (props: IProps): JSX.Element => {
    const [blockTime, setBlockTime] = useState(5000);

    const blocks = useSelector((state: RootState) => state.blocks.blocks);
    const validators = useSelector((state: RootState) => state.validators.validators);
    const stats = useSelector((state: RootState) => state.core.stats);

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

            case KpiType.TOTAL_REVIEWS:
                if (!stats || !stats.totalReviews) {
                    return null;
                }

                return (
                    <KpiCard color={'#FFC107'} title={i18n.t('totalReviews')} logo={totalReviewsLogo}>
                        {numeral(stats.totalReviews).format('0,0')}
                    </KpiCard>
                );

            case KpiType.MERCHANTS:
                if (!stats || !stats.totalMerchants) {
                    return null;
                }

                return (
                    <KpiCard color={'#3BDCC4'} title={i18n.t('merchants')} logo={merchantsLogo}>
                        {numeral(stats.totalMerchants).format('0,0')}
                    </KpiCard>
                );

            case KpiType.REWARDS:
                if (!stats || !stats.totalRewards) {
                    return null;
                }

                return (
                    <KpiCard color={'#F06451'} title={i18n.t('totalRewards')} logo={rewardsLogo}>
                        {<SmallerDecimal nb={numeral(stats.totalRewards).format('0,0.000000')} />}
                        <span className="ms-1">{LumConstants.LumDenom}</span>
                    </KpiCard>
                );

            case KpiType.REWARDS_TODAY:
                if (!stats || !stats.todayRewards) {
                    return null;
                }

                return (
                    <KpiCard color={'#F06451'} title={i18n.t('todaysRewards')} logo={todayRewardsLogo}>
                        {<SmallerDecimal nb={numeral(stats.todayRewards).format('0,0.000000')} />}
                        <span className="ms-1">{LumConstants.LumDenom}</span>
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
