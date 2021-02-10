import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Card } from 'components';
import moment from 'moment-timezone';
import { SystemConstants } from 'constant';
import { i18n, MessagesUtils } from 'utils';
import { MessageModel } from 'models';

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

    renderMessage(value: MessageModel.Value): JSX.Element {
        if (value instanceof MessageModel.Send) {
            return (
                <>
                    <div>From: {value.fromAddress}</div>
                    <div>To: {value.toAddress}</div>
                    <div>
                        Amount: {value.amount[0].amount} {value.amount[0].denom.toUpperCase()}
                    </div>
                </>
            );
        }

        if (value instanceof MessageModel.CreateValidator) {
            return (
                <>
                    <div>Delegator: {value.delegatorAddress}</div>
                    <div>Validator: {value.validatorAddress}</div>
                </>
            );
        }

        if (value instanceof MessageModel.Delegate) {
            return <div>Delegate</div>;
        }

        if (value instanceof MessageModel.Undelegate) {
            return <div>Undelegate</div>;
        }

        if (value instanceof MessageModel.EditValidator) {
            return <div>EditValidator</div>;
        }

        return <div>{i18n.t('errorOccurred')}</div>;
    }

    renderMessages(): JSX.Element | null {
        const { messages } = this.props.transaction;

        if (!messages || !messages.length) {
            return null;
        }

        return (
            <Card>
                <h2>Messages</h2>
                {messages.map((message, index) => {
                    return (
                        <Card key={index}>
                            <h3>{MessagesUtils.name(message.type)}</h3>
                            {this.renderMessage(message.value)}
                        </Card>
                    );
                })}
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
