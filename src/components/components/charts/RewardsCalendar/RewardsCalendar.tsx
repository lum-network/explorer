import React from 'react';
import Calendar, { CalendarTileProperties, ViewCallbackProperties } from 'react-calendar';
import { Card } from 'frontend-elements';
import moment from 'moment';

import { ChartDataModel } from 'models';
import { i18n } from 'utils';

import './RewardsCalendar.scss';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux/store';
import { ChartGroupType } from 'constant';

const RewardsCalendar = ({ data }: { data: ChartDataModel[] }): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();

    const tileClassName = (props: CalendarTileProperties): string | string[] => {
        const classNames = ['tiles'];
        const valuesArray = data.map((item) => Number(item.value));

        const maxValue = Math.max(...valuesArray);

        if (props.view === 'month') {
            classNames.push('tiles-0');

            for (const item of data) {
                const dateToUnix = moment(item.key).utc().unix();
                const tileDateToUnix = moment(props.date.toISOString()).utc().unix();

                if (dateToUnix === tileDateToUnix) {
                    const percentage = (Number(item.value) / maxValue) * 100;

                    if (percentage === 0) {
                        classNames.push('tiles-0');
                    } else if (percentage < 20) {
                        classNames.push('tiles-5');
                    } else if (percentage < 40) {
                        classNames.push('tiles-10');
                    } else if (percentage < 60) {
                        classNames.push('tiles-15');
                    } else if (percentage < 80) {
                        classNames.push('tiles-20');
                    } else if (percentage < 100) {
                        classNames.push('tiles-25');
                    }
                }
            }
        }

        return classNames;
    };

    const onActiveStartDateChange = ({ view, activeStartDate }: ViewCallbackProperties): void => {
        if (view === 'month') {
            dispatch.charts.getRewardsSumCalendar({
                startAt: moment(activeStartDate).startOf('month').format('YYYY-MM-DD'),
                endAt: moment(activeStartDate).endOf('month').format('YYYY-MM-DD'),
                groupType: ChartGroupType.DAILY,
            });
        }
    };

    return (
        <Card className="rewards-calendar">
            <h1>{i18n.t('rewardsThisMonth')}</h1>
            <Calendar className="mt-4" locale="en-US" tileClassName={tileClassName} onActiveStartDateChange={onActiveStartDateChange} />
            <div className="d-flex flex-row align-items-center justify-content-center mt-5">
                <small>{i18n.t('less')}</small>
                <div className="reward-count-tile tile-5 ms-2" />
                <div className="reward-count-tile tile-10 ms-2" />
                <div className="reward-count-tile tile-15 ms-2" />
                <div className="reward-count-tile tile-20 ms-2" />
                <div className="reward-count-tile tile-25 mx-2" />
                <small>{i18n.t('more')}</small>
            </div>
        </Card>
    );
};

export default RewardsCalendar;
