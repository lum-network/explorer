import React from 'react';
import { Card } from 'frontend-elements';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import { i18n } from 'utils';

import './RewardsCalendar.scss';

const data = [
    {
        date: new Date(2022, 6, 11),
        rewardsCount: 4,
    },
    {
        date: new Date(2022, 6, 12),
        rewardsCount: 12,
    },
    {
        date: new Date(2022, 6, 13),
        rewardsCount: 25,
    },
    {
        date: new Date(2022, 6, 20),
        rewardsCount: 18,
    },
    {
        date: new Date(2022, 6, 19),
        rewardsCount: 8,
    },
];

const RewardsCalendar = (): JSX.Element => {
    const tileClassName = (props: CalendarTileProperties): string | string[] => {
        const classNames = ['tiles'];

        if (props.view === 'month') {
            classNames.push('tiles-0');

            for (const item of data) {
                if (item.date.getTime() === props.date.getTime()) {
                    if (item.rewardsCount === 0) {
                        classNames.push('tiles-0');
                    } else if (item.rewardsCount < 5) {
                        classNames.push('tiles-5');
                    } else if (item.rewardsCount < 10) {
                        classNames.push('tiles-10');
                    } else if (item.rewardsCount < 15) {
                        classNames.push('tiles-15');
                    } else if (item.rewardsCount < 20) {
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
