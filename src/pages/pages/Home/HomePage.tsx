import React from 'react';
import { BlocksList, Kpi, TransactionsList } from 'components';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import Lum from './components/Lum/Lum';
import Lumki from './components/Lumki/Lumki';
import { KpiType } from 'constant';

const HomePage = (): JSX.Element | null => {
    const blocks = useSelector((state: RootState) => state.blocks.blocks);
    const transactions = useSelector((state: RootState) => state.transactions.transactions);

    if (!blocks || !transactions) {
        return null;
    }

    return (
        <div className="row mt-3 g-xxl-5 g-4">
            <div className="col-12">
                <Lum />
            </div>
            <div className="col-12 col-xxl-6">
                <Lumki />
            </div>
            <div className="col-12 col-xxl-6">
                <Lumki />
            </div>
            <div className="col-12">
                <Kpi types={[KpiType.BLOCK_HEIGHT, KpiType.BLOCK_TIME, KpiType.BONDED_TOKEN, KpiType.INFLATION]} />
            </div>
            <div className="col-12 col-xxl-6">
                <BlocksList more title blocks={blocks.slice(0, 5)} />
            </div>
            <div className="col-12 col-xxl-6">
                <TransactionsList more title rej transactions={transactions.slice(0, 5)} />
            </div>
        </div>
    );
};

export default HomePage;
