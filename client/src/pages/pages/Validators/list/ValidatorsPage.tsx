import React, { PureComponent } from 'react';
import { Dispatch, RootState } from 'redux/store';
import validatorLogo from 'assets/images/validatorDark.svg';
import { i18n, StringsUtils, ValidatorsUtils } from 'utils';
import { Badge, Card, Loading, Table } from 'components';
import { connect } from 'react-redux';
import { ValidatorsModel } from 'models';
import numeral from 'numeral';
import { NavigationConstants } from 'constant';
import { Link } from 'react-router-dom';
import '../Validators.scss';

interface IProps {}

interface IState {
    totalVotingPower: number | null;
}

const mapState = (state: RootState) => ({
    validators: state.validators.validators,
    loading: state.loading.effects.validators.fetchValidators,
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchValidators: () => dispatch.validators.fetchValidators(),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class ValidatorsPage extends PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            totalVotingPower: null,
        };
    }
    componentDidMount() {
        const { fetchValidators } = this.props;

        fetchValidators().finally(() => {
            const { validators } = this.props;

            if (!validators || !validators.length) {
                return;
            }

            const total = ValidatorsUtils.calculateTotalVotingPower(validators);

            this.setState({ totalVotingPower: total });
        });
    }

    renderRow(validator: ValidatorsModel, index: number): JSX.Element {
        const { totalVotingPower } = this.state;

        return (
            <tr key={index}>
                <td>
                    <p className={index + 1 > 5 ? 'rank' : 'top-rank'}>{index + 1}</p>
                </td>
                <td>
                    <Link
                        title={validator.operatorAddress}
                        to={`${NavigationConstants.VALIDATORS}/${validator.operatorAddress}`}
                    >
                        {StringsUtils.trunc(validator.operatorAddress || '')}
                    </Link>
                </td>
                <td>
                    <Badge jailed={validator.jailed} validatorsType={validator.status} />
                </td>
                <td>
                    <div className="d-flex flex-column align-items-end">
                        <p>{numeral(validator.delegatorShares).format('0,0')}</p>
                        <p className="text-muted">
                            {totalVotingPower &&
                                numeral(parseFloat(validator.delegatorShares || '0') / totalVotingPower).format(
                                    '0.00%',
                                )}
                        </p>
                    </div>
                </td>
                <td className="text-end">
                    <p>{numeral(parseFloat(validator.commission.rate || '')).format('0.00%')}</p>
                </td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { validators, loading } = this.props;

        return (
            <>
                <h2 className="mt-3 mb-4">
                    <img alt="validator" src={validatorLogo} /> {i18n.t('validators')}
                </h2>
                <Card>
                    {!validators || !validators.length || loading ? (
                        <Loading />
                    ) : (
                        <Table head={['Rank', 'Validator', 'Status', 'Voting power', 'Commission']}>
                            {validators.map((value, index) => this.renderRow(value, index))}
                        </Table>
                    )}
                </Card>
            </>
        );
    }
}

export default connect(mapState, mapDispatch)(ValidatorsPage);
