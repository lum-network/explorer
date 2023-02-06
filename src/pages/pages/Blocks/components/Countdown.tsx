import React, { useEffect } from 'react';
import { KpiCard } from 'components';
import blockLogo from 'assets/images/block.svg';
import blockDarkLogo from 'assets/images/blockDark.svg';
import { i18n, StringsUtils, TimesUtils } from 'utils';
import numeral from 'numeral';
import moment from 'moment';
import { SystemConstants } from 'constant';
import './Countdown.scss';

interface IProps {
    currentBlockHeight: string;
    userBlockHeight: string;
    blockTime: number;
    getUserBlock: () => void;
}

const Countdown = ({ currentBlockHeight, userBlockHeight, blockTime, getUserBlock }: IProps): JSX.Element => {
    const [remainingBlocks, setRemainingBlocks] = React.useState(Number(userBlockHeight) - Number(currentBlockHeight));
    const [remainingTime, setRemainingTime] = React.useState(0);
    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);

    useEffect(() => {
        setRemainingBlocks(Number(userBlockHeight) - Number(currentBlockHeight));
    }, [currentBlockHeight, userBlockHeight]);

    useEffect(() => {
        setRemainingTime(remainingBlocks * blockTime);
    }, [remainingBlocks, blockTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(remainingTime - 1000);
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingTime]);

    useEffect(() => {
        if (remainingTime < 0) {
            setRemainingTime(0);

            getUserBlock();
        }

        const [days, hours, minutes, seconds] = TimesUtils.getDaysHoursMinutesSeconds(remainingTime);

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    }, [remainingTime]);

    return (
        <div className="row g-3 g-xxl-4">
            {!!days && (
                <div className="col-lg-3 col-sm-6">
                    <span className="countdown-number me-2">{days}</span> <span className="countdown-unit">{StringsUtils.capitalize(i18n.t('days'))}</span>
                </div>
            )}
            {!(!days && hours) && (
                <div className="col-lg-3 col-sm-6">
                    <span className="countdown-number me-2">{hours}</span> <span className="countdown-unit">{StringsUtils.capitalize(i18n.t('hours'))}</span>
                </div>
            )}
            {!(!days && !hours && minutes) && (
                <div className="col-lg-3 col-sm-6">
                    <span className="countdown-number me-2">{minutes}</span> <span className="countdown-unit">{StringsUtils.capitalize(i18n.t('minutes'))}</span>
                </div>
            )}
            <div className="col-lg-3 col-sm-6">
                <span className="countdown-number me-2">{seconds}</span> <span className="countdown-unit">{StringsUtils.capitalize(i18n.t('seconds'))}</span>
            </div>
            <div className="col-12 mb-3">
                <span className="countdown-unit me-2">{i18n.t('estimatedTargetTime')}:</span>
                {moment.utc().tz(SystemConstants.TIMEZONE).milliseconds(remainingTime).format('LLL')}
            </div>
            <div className="col-lg-3 col-sm-6">
                <KpiCard dark title={i18n.t('block')} logo={blockLogo}>
                    #{numeral(userBlockHeight).format('0,0')}
                </KpiCard>
            </div>
            <div className="col-lg-3 col-sm-6">
                <KpiCard title={i18n.t('currentBlock')} logo={blockDarkLogo}>
                    #{numeral(currentBlockHeight).format('0,0')}
                </KpiCard>
            </div>
            <div className="col-lg-3 col-sm-6">
                <KpiCard title={i18n.t('remainingBlocks')} logo={blockDarkLogo}>
                    #{numeral(remainingBlocks).format('0,0')}
                </KpiCard>
            </div>
        </div>
    );
};

export default Countdown;
