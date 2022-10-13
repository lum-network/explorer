import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { ChartDataModel } from 'models';
import { useDarkMode } from 'hooks';
import { Card, Loading } from 'frontend-elements';
import { i18n, NumbersUtils } from 'utils';
import moment from 'moment';

interface Props {
    options?: Highcharts.Options;
    data: ChartDataModel[];
    loading?: boolean;
}

const ColumnChart = ({ options, data, loading }: Props): JSX.Element => {
    const isDarkMode = useDarkMode();

    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
        chart: {
            plotBorderWidth: 0,
            style: {
                fontFamily: 'Work Sans',
            },
        },
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
            labels: {
                enabled: false,
            },
        },
        xAxis: {
            grid: {
                enabled: false,
            },
            lineColor: 'transparent',
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
            tooltip: {
                pointFormat: '{point.y:,.2f} lum',
            },
            xAxis: {
                categories: data.map((item) => item.key),
                type: 'datetime',
                labels: {
                    formatter: (props) => {
                        return moment(props.value, 'MM/YYYY').format('MMM YY');
                    },
                    style: {
                        color: isDarkMode ? '#FFFFFF' : '#2E2E2E',
                        fontSize: '12px',
                        fontWeight: '400',
                    },
                },
            },
            series: [
                {
                    color: '#F06451',
                    pointWidth: 14,
                    borderRadius: 7,
                    borderWidth: 0,
                    name: i18n.t('Rewards'),
                    data: data.map((item) => ({
                        name: item.key,
                        y: NumbersUtils.convertUnitNumber(item.value),
                    })),
                    type: 'column',
                },
            ],
        });
    }, [data, loading, isDarkMode]);

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
