import React, { useEffect, useState } from 'react';
import { Card, Loading } from 'frontend-elements';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import numeral from 'numeral';
import { useDarkMode } from 'hooks';
import { ChartDataModel } from 'models';
import moment from 'moment';
import { NumbersUtils } from 'utils';

interface IProps {
    data: (ChartDataModel[] | null)[];
    loading?: boolean;
    color: string[];
    yAxisTitle: string[];
    timestamp?: boolean;
    title?: string;
}

const LineChart = ({ data, loading, color, yAxisTitle, timestamp, title }: IProps): JSX.Element => {
    const isDarkMode = useDarkMode();

    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
        chart: {
            plotBorderWidth: 0,
            style: {
                fontFamily: 'Work Sans',
            },
        },
        title: {
            text: '',
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
    });

    useEffect(() => {
        if (loading || !data || !data.length) {
            return;
        }

        setChartOptions({
            ...chartOptions,
            chart: {
                ...chartOptions.chart,
                backgroundColor: isDarkMode ? '#2E2E2E' : '#FFFFFF',
            },
            series: data.map((value, index) => {
                if (!value) {
                    return {
                        type: 'spline',
                    };
                }

                return {
                    color: {
                        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 50 },
                        stops: [
                            [0, color[index]],
                            [100, '#FFFFFF'],
                        ],
                    },
                    name: yAxisTitle[index],
                    type: 'spline',
                    data: value.map((item) => [timestamp ? parseInt(item.key, 10) : item.key, timestamp ? item.value : parseInt(item.value, 10)]),
                };
            }),
            xAxis: {
                ...chartOptions.xAxis,
                categories: !timestamp ? (data && data.length && data[0] ? data[0].map((item) => item.key) : ['']) : undefined,
                type: 'datetime',
                labels: {
                    formatter: ({ value }) => {
                        return moment(value).format('DD MMM');
                    },
                    style: {
                        color: isDarkMode ? '#FFFFFF' : '#2E2E2E',
                        fontSize: '12px',
                        fontWeight: '400',
                    },
                },
            },
            yAxis: [
                {
                    ...chartOptions.yAxis,
                    title: {
                        text: yAxisTitle[0],
                        style: {
                            color: color[0],
                        },
                    },
                    labels: {
                        formatter: ({ value }) => {
                            if (timestamp) {
                                return `$${numeral(value).format('0,0.0000')}`;
                            } else {
                                return numeral(value).format('0,0');
                            }
                        },
                        style: {
                            color: color[0],
                        },
                    },
                },
                {
                    ...chartOptions.yAxis,
                    title: {
                        text: yAxisTitle[1],
                        style: {
                            color: color[1],
                        },
                    },
                    labels: {
                        formatter: ({ value }) => {
                            return `${numeral(NumbersUtils.convertUnitNumber(value)).format('0,0.0000')} lum`;
                        },
                        style: {
                            color: color[1],
                        },
                    },
                    opposite: true,
                },
            ],
        });
    }, [data, loading, isDarkMode]);

    if (loading || !data) {
        return (
            <Card>
                <Loading />
            </Card>
        );
    }

    return (
        <Card>
            {title && <h1 className="mb-4">{title}</h1>}
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Card>
    );
};

export default LineChart;
