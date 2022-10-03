import React, { useEffect, useState } from 'react';
import { Card, Loading } from 'frontend-elements';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import numeral from 'numeral';
import { useDarkMode } from 'hooks';
import { ChartDataModel } from 'models';

interface IProps {
    data: ChartDataModel[] | null;
    loading?: boolean;
    title: string;
    color: string;
}

const LineChart = ({ data, loading, title, color }: IProps): JSX.Element => {
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
        },
        xAxis: {
            grid: {
                enabled: false,
            },
        },
        legend: {
            enabled: false,
        },
    });

    useEffect(() => {
        if (loading || !data) {
            return;
        }

        setChartOptions({
            chart: {
                backgroundColor: isDarkMode ? '#2E2E2E' : '#FFFFFF',
            },
            title: {
                text: title,
            },
            series: [
                {
                    color: {
                        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 50 },
                        stops: [
                            [0, color],
                            [100, '#FFFFFF'],
                        ],
                    },
                    name: 'Lum',
                    type: 'spline',
                    data: data.map((item) => [item.key, item.value]),
                },
            ],
            xAxis: {
                ...chartOptions.xAxis,
                type: 'datetime',
            },
            yAxis: {
                ...chartOptions.yAxis,
                title: {
                    text: 'Prices',
                },
                labels: {
                    formatter: ({ value }) => {
                        return `$${numeral(value).format('0,0.0000')}`;
                    },
                },
            },
            tooltip: {
                ...chartOptions.tooltip,
            },
        });
    }, [data, loading]);

    if (loading || !data) {
        return (
            <Card>
                <Loading />
            </Card>
        );
    }

    return (
        <Card>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Card>
    );
};

export default LineChart;
