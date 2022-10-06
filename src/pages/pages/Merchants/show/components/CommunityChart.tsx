import React, { useEffect, useState } from 'react';
import { Card } from 'frontend-elements';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { i18n } from 'utils';

const data = [4000, 2000, 680, 1201, 1789];

const CommunityChart = (): JSX.Element => {
    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
        credits: {
            enabled: false,
        },
        title: {
            text: '',
        },
        legend: {
            enabled: false,
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
        plotOptions: {
            column: {
                borderRadius: 5,
                pointWidth: 10,
            },
        },
    });

    useEffect(() => {
        setChartOptions({
            series: [
                {
                    data,
                    color: '#FFC107',
                    name: 'Reviews',
                    type: 'column',
                    dataLabels: {
                        enabled: false,
                    },
                },
            ],
        });
    }, []);

    return (
        <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
            <Card withoutPadding className="p-4">
                <h1 className="mb-4">{i18n.t('communityTime')}</h1>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </Card>
        </div>
    );
};

export default CommunityChart;
