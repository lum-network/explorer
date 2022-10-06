import React, { useEffect, useState } from 'react';
import { Card } from 'frontend-elements';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { i18n } from 'utils';

const data = [
    { time: 1655712000, value: 0 },
    { time: 1655715600, value: 1 },
    { time: 1655719200, value: 2 },
    { time: 1655722800, value: 8 },
    { time: 1655726400, value: 12 },
    { time: 1655730000, value: 16 },
    { time: 1655733600, value: 28 },
    { time: 1655737200, value: 32 },
    { time: 1655740800, value: 28 },
    { time: 1655744400, value: 12 },
    { time: 1655748000, value: 38 },
    { time: 1655751600, value: 40 },
    { time: 1655755200, value: 42 },
    { time: 1655758800, value: 43 },
    { time: 1655762400, value: 44 },
    { time: 1655766000, value: 47 },
    { time: 1655769600, value: 50 },
    { time: 1655773200, value: 52 },
    { time: 1655776800, value: 53 },
    { time: 1655780400, value: 56 },
    { time: 1655784000, value: 62 },
    { time: 1655787600, value: 64 },
    { time: 1655791200, value: 66 },
    { time: 1655794800, value: 72 },
    { time: 1655798400, value: 78 },
    { time: 1655802000, value: 80 },
    { time: 1655805600, value: 81 },
    { time: 1655809200, value: 85 },
    { time: 1655812800, value: 88 },
    { time: 1655816400, value: 90 },
    { time: 1655820000, value: 93 },
    { time: 1655823600, value: 95 },
    { time: 1655827200, value: 98 },
    { time: 1655830800, value: 100 },
    { time: 1655834400, value: 110 },
    { time: 1655838000, value: 118 },
    { time: 1655841600, value: 120 },
    { time: 1655845200, value: 124 },
    { time: 1655848800, value: 128 },
];

const ReviewsChart = (): JSX.Element => {
    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
        credits: {
            enabled: false,
        },
        title: {
            text: '',
        },
        tooltip: {
            shared: true,
        },
        yAxis: {
            title: {
                text: '',
            },
            grid: {
                enabled: false,
            },
            gridLineWidth: 0,
        },
        xAxis: {
            type: 'datetime',
            grid: {
                enabled: false,
            },
        },
        legend: {
            enabled: false,
        },
    });

    useEffect(() => {
        setChartOptions({
            series: [
                {
                    marker: {
                        enabled: false,
                    },
                    color: '#FFC107',
                    fillOpacity: 0.16,
                    name: 'Simple',
                    type: 'areaspline',
                    data: data.map((item) => [item.time * 1000, item.value]),
                },
            ],
        });
    }, []);

    return (
        <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
            <Card withoutPadding className="p-4">
                <h1 className="mb-4">{i18n.t('reviewsNumbers')}</h1>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </Card>
        </div>
    );
};

export default ReviewsChart;
