import React, { PureComponent } from 'react';
import { BlocksList, Kpi, TransactionsList } from 'components';
import { RootState } from 'redux/store';
import { connect } from 'react-redux';
import Lum from './components/Lum/Lum';
import Wallet from './components/Wallet/Wallet';
import { KpiType } from 'constant';

interface IProps {}

const mapState = (state: RootState) => ({
    blocks: state.blocks.blocks,
    transactions: state.transactions.transactions,
});

type StateProps = ReturnType<typeof mapState>;

type Props = IProps & StateProps;

class HomePage extends PureComponent<Props> {
    render(): JSX.Element | null {
        const { blocks, transactions } = this.props;

        if (!blocks || !transactions) {
            return null;
        }

        return (
            <div className="row mt-5">
                <div className="col-12 col-xxl-6 mb-4">
                    <Lum />
                </div>
                <div className="col-12 col-xxl-6 mb-4">
                    <Wallet />
                </div>
                <Kpi className="mb-5" types={[KpiType.BLOCK_HEIGHT, KpiType.BLOCK_TIME]} />
                <div className="col-12 col-xxl-6 mb-4">
                    <BlocksList more title blocks={blocks.slice(0, 5)} />
                </div>
                <div className="col-12 col-xxl-6 mb-5">
                    <TransactionsList more title rej transactions={transactions.slice(0, 5)} />
                </div>
            </div>
        );
    }
}

export default connect(mapState)(HomePage);
