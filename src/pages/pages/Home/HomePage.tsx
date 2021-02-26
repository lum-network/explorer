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
    render(): JSX.Element | null {
        const { blocks, transactions } = this.props;

        if (!blocks || !transactions) {
            return null;
        }

        return (
            <div className="row mt-5">
                <div className="col-12 col-xxl-6">
                    <BlocksList more title blocks={blocks.slice(0, 5)} />
                </div>
                <div className="col-12 col-xxl-6">
                    <TransactionsList more title rej transactions={transactions.slice(0, 5)} />
                </div>
            </div>
        );
    }
}

export default connect(mapState)(HomePage);
