import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Card } from 'components';
import moment from 'moment-timezone';
import { SystemConstants } from 'constant';

interface IProps extends RouteComponentProps<{ id: string }> {}

const mapState = (state: RootState) => ({
    transaction: state.transactions.transaction,
    loading: state.loading.effects.transactions.getTransaction,
});

const mapDispatch = (dispatch: Dispatch) => ({
    getTransaction: (id: string) => dispatch.transactions.getTransaction(id),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class TransactionPage extends PureComponent<Props> {
    componentDidMount(): void {
        const { getTransaction } = this.props;
        const { id } = this.props.match.params;

        getTransaction(id).finally(() => null);
    }

    renderMessages(): JSX.Element | null {
        const { messages } = this.props.transaction;

        if (!messages || !messages.length) {
            return null;
        }

        return (
            <Card>
                <h2>Messages</h2>
                {messages.map((message, index) => (
                    <Card key={index}>
                        <h3>{message.type}</h3>
                    </Card>
                ))}
            </Card>
        );
    }

    renderInformation(): JSX.Element {
        const { transaction } = this.props;

        console.log(transaction);

        return (
            <Card className="mb-4">
                <h2>Information</h2>
                <div>Hash: {transaction.hash}</div>
                <div>
                    Date:{' '}
                    {`${moment.utc(transaction.dispatchedAt).fromNow()} (${moment
                        .utc(transaction.dispatchedAt)
                        .tz(SystemConstants.TIMEZONE)
                        .format('YYYY-MM-DD HH:mm:ss')})`}
                </div>
                <div>From: {transaction.fromAddress}</div>
                <div>To: {transaction.toAddress}</div>
                <div>Value: {transaction.amount}</div>
            </Card>
        );
    }

    renderContent(): JSX.Element {
        return (
            <>
                <h1>Transaction details</h1>
                {this.renderInformation()}
                {this.renderMessages()}
            </>
        );
    }

    renderLoading(): JSX.Element {
        return (
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    render(): JSX.Element {
        const { transaction, loading } = this.props;

        if (!transaction || loading) {
            return this.renderLoading();
        }

        return this.renderContent();
    }
}

export default connect(mapState, mapDispatch)(TransactionPage);
