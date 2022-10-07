import React from 'react';
import { Card } from 'frontend-elements';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import { i18n } from 'utils';

import './RewardsCalendar.scss';
import { ChartDataModel } from 'models';
import moment from 'moment';

const RewardsCalendar = ({ data }: { data: ChartDataModel[] }): JSX.Element => {
    const tileClassName = (props: CalendarTileProperties): string | string[] => {
        const classNames = ['tiles'];

        if (props.view === 'month') {
            classNames.push('tiles-0');

            for (const item of data) {
                if (moment(item.key).utc().unix() === props.date.getTime()) {
                    const value = Number(item.value);

                    if (value === 0) {
                        classNames.push('tiles-0');
                    } else if (value < 5) {
                        classNames.push('tiles-5');
                    } else if (value < 10) {
                        classNames.push('tiles-10');
                    } else if (value < 15) {
                        classNames.push('tiles-15');
                    } else if (value < 20) {
                        classNames.push('tiles-20');
                    } else {
                        classNames.push('tiles-25');
                    }
                }
            }
        }
        return classNames;
    };

    return (
        <Card className="rewards-calendar">
            <h1>{i18n.t('rewardsThisMonth')}</h1>
            <Calendar className="mt-4" locale="en-US" tileClassName={tileClassName} />
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
