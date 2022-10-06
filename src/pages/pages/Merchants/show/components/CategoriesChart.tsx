import React, { useEffect, useState } from 'react';
import { Card } from 'frontend-elements';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import treeMap from 'highcharts/modules/treemap';
import './CategoriesChart.scss';
import { i18n } from 'utils';

const categories = [
    { id: 'food', name: 'Food', color: '#94D2BD' },
    { id: 'drinks', name: 'Drinks', color: '#FEA9AC' },
    { id: 'coffee', name: 'Coffee', color: '#0A9396' },
    { id: 'restaurants', name: 'Restaurants', color: '#BB3E03' },
    { id: 'hotels', name: 'Hotels', color: '#CA6702' },
    { id: 'shopping', name: 'Shopping', color: '#005F73' },
    { id: 'entertainment', name: 'Entertainment', color: '#E9D8A6' },
    { id: 'transport', name: 'Transport', color: '#EE9B00' },
    { id: 'tech', name: 'Tech', color: '#001219' },
    { id: 'other', name: 'Other', color: '#01AED2' },
];

const data = [
    { id: 'food', value: 20 },
    { id: 'drinks', value: 10 },
    { id: 'coffee', value: 2 },
    { id: 'restaurants', value: 200 },
    { id: 'tech', value: 2010 },
    { id: 'hotels', value: 120 },
    { id: 'shopping', value: 1200 },
    { id: 'entertainment', value: 600 },
    { id: 'transport', value: 87 },
    { id: 'other', value: 9 },
];

if (typeof Highcharts === 'object') {
    treeMap(Highcharts);
}

const CategoriesChart = (): JSX.Element => {
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
    });

    useEffect(() => {
        setChartOptions({
            series: [
                {
                    data: data.map((item) => {
                        const category = categories.find((category) => category.id === item.id);

                        return { ...item, ...category };
                    }),
                    type: 'treemap',
                    layoutAlgorithm: 'squarified',
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
                <h1 className="mb-4">{i18n.t('reviewsCategories')}</h1>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                <div className="row gy-3 my-3">
                    {categories.map((category, index) => {
                        return (
                            <div key={index} className="col-2 d-flex flex-column align-items-center ms-4">
                                <div className="category-dot mb-2" style={{ backgroundColor: category.color }} />
                                {category.name}
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
};

export default CategoriesChart;
