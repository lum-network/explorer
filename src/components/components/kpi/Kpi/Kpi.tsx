import React, { useEffect, useState } from 'react';
import { KpiType } from 'constant';
import { KpiCard } from 'components';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { BlockUtils, i18n, NumbersUtils, ValidatorsUtils } from 'utils';
import numeral from 'numeral';
import blockLogo from 'assets/images/blockDark.svg';
import validatorLogo from 'assets/images/validatorDark.svg';
import clockLogo from 'assets/images/clockDark.svg';
import bondedTokensLogo from 'assets/images/bondedTokensDark.svg';
import inflationLogo from 'assets/images/inflationDark.svg';
import { BlocksModel } from 'models';

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
                        {numeral(parseFloat(stats.inflation)).format('0.00%')}
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
