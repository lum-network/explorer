import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { ChartDataModel } from 'models';
import { useDarkMode } from 'hooks';
import { Card, Loading } from 'frontend-elements';
import { i18n } from 'utils';

interface Props {
    options?: Highcharts.Options;
    data: ChartDataModel[];
    loading?: boolean;
}

const ColumnChart = ({ options, data, loading }: Props): JSX.Element => {
    const isDarkMode = useDarkMode();

    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
        credits: {
            enabled: false,
        },
        tooltip: {
            shared: true,
        },
        yAxis: {
            grid: {
                enabled: false,
            },
            gridLineWidth: 0,
            title: {
                text: undefined,
            },
        },
        xAxis: {
            grid: {
                enabled: false,
            },
        },
        legend: {
            enabled: false,
        },
        ...options,
    });

    useEffect(() => {
        setChartOptions({
            ...chartOptions,
            chart: {
                type: 'column',
                backgroundColor: isDarkMode ? '#2E2E2E' : '#FFFFFF',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: data.map((item) => item.key),
                type: 'datetime',
            },
            series: [
                {
                    color: '#F06451',
                    data: data.map((item) => ({
                        name: item.key,
                        y: Number(item.value),
                    })),
                    type: 'column',
                },
            ],
        });
    }, [data, loading]);

    if (!data || loading) {
        return (
            <Card>
                <Loading />
            </Card>
        );
    }

    return (
        <Card>
            <h1 className="mb-4">{i18n.t('rewardsAverage')}</h1>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Card>
    );
};

export default ColumnChart;
