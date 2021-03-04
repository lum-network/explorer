import React, { PureComponent } from 'react';
import { Dispatch, RootState } from 'redux/store';
import validatorLogo from 'assets/images/validatorDark.svg';
import placeholderValidator from 'assets/images/placeholderValidator.svg';
import { i18n, StringsUtils, ValidatorsUtils } from 'utils';
import { Badge, Card, Loading, Table } from 'design-components';
import { Kpi } from 'components';
import { ValidatorsModel } from 'models';
import numeral from 'numeral';
import { KpiType, NavigationConstants } from 'constant';
import { Link } from 'react-router-dom';
import '../Validators.scss';
import { connect } from 'react-redux';

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

        fetchValidators().then(() => {
            const { validators } = this.props;

            const total = ValidatorsUtils.calculateTotalVotingPower(validators);

            this.setState({ totalVotingPower: total });
        });
    }

    renderRow(validator: ValidatorsModel, index: number, head: string[]): JSX.Element {
        const { totalVotingPower } = this.state;

        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <p className={index + 1 > 5 ? 'rank' : 'top-rank'}>{index + 1}</p>
                </td>
                <td data-label={head[1]}>
                    <Link
                        title={validator.operatorAddress}
                        to={`${NavigationConstants.VALIDATORS}/${validator.operatorAddress}`}
                    >
                        <img alt="logo validator" src={placeholderValidator} className="me-3" />
                        {validator.description.identity ||
                            validator.description.moniker ||
                            StringsUtils.trunc(validator.operatorAddress || '')}
                    </Link>
                </td>
                <td data-label={head[2]}>
                    <Badge jailed={validator.jailed} validatorsType={validator.status} />
                </td>
                <td data-label={head[3]}>
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
                <td data-label={head[4]} className="text-end">
                    <p>{numeral(parseFloat(validator.commission.rate || '')).format('0.00%')}</p>
                </td>
            </tr>
        );
    }

    renderKpi(): JSX.Element {
        return <Kpi types={[KpiType.BLOCK_HEIGHT, KpiType.VALIDATORS, KpiType.BONDED_TOKEN, KpiType.BLOCK_TIME]} />;
    }

    render(): JSX.Element {
        const { validators, loading } = this.props;
        const head = [
            i18n.t('rank'),
            i18n.t('validator'),
            i18n.t('status'),
            i18n.t('votingPower'),
            i18n.t('commission'),
        ];

        return (
            <>
                <h2 className="mt-3 mb-4">
                    <img alt="validator" src={validatorLogo} /> {i18n.t('validators')}
                </h2>
                {this.renderKpi()}
                <Card withoutPadding className="mb-5">
                    {!validators || !validators.length || loading ? (
                        <Loading />
                    ) : (
                        <Table head={head}>
                            {validators.map((value, index) => this.renderRow(value, index, head))}
                        </Table>
                    )}
                </Card>
            </>
        );
    }
}

export default connect(mapState, mapDispatch)(ValidatorsPage);
