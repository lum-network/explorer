import React, { PureComponent } from 'react';
import { BlocksList, TransactionsList } from 'components';
import { RootState } from 'redux/store';
import { connect } from 'react-redux';

interface IProps {}

const mapState = (state: RootState) => ({
    blocks: state.blocks.blocks,
    transactions: state.transactions.transactions,
});

type StateProps = ReturnType<typeof mapState>;

type Props = IProps & StateProps;

class HomePage extends PureComponent<Props> {
    render(): JSX.Element {
        const { blocks, transactions } = this.props;

        return (
            <>
                <div className="row">
                    <div className="col-12 col-xl-6 mt-3">
                        <BlocksList more title blocks={blocks.slice(0, 5)} />
                    </div>
                    <div className="col-12 col-xl-6 mt-3">
                        <TransactionsList more title rej transactions={transactions.slice(0, 5)} />
                    </div>
                </div>
            </>
        );
    }
}

export default connect(mapState)(HomePage);
