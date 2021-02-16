import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Badge, Card, Loading } from 'components';
import validatorLogo from 'assets/images/validatorDark.svg';
import placeholderValidator from 'assets/images/placeholderValidator.svg';
import { StringsUtils, ValidatorsUtils } from 'utils';
import tickerLogo from 'assets/images/ticker.svg';
import numeral from 'numeral';

interface IProps extends RouteComponentProps<{ id: string }> {}

interface IState {
    rank: number | null;
    totalVotingPower: number | null;
}

const mapState = (state: RootState) => ({
    validator: state.validators.validator,
    validators: state.validators.validators,
    loading: state.loading.effects.validators.getValidator,
});

const mapDispatch = (dispatch: Dispatch) => ({
    getValidator: (id: string) => dispatch.validators.getValidator(id),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class BlockPage extends PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            rank: null,
            totalVotingPower: null,
        };
    }

    componentDidMount(): void {
        const { getValidator } = this.props;
        const { id } = this.props.match.params;

        getValidator(id).then(() => {
            const { validators, validator } = this.props;

            const rank = ValidatorsUtils.findRank(validators, validator);
            const totalVotingPower = ValidatorsUtils.calculateTotalVotingPower(validators);

            this.setState({ rank, totalVotingPower });
        });
    }

    renderInformation(): JSX.Element {
        const { validator } = this.props;
        const { rank, totalVotingPower } = this.state;

        return (
            <Card badge={<Badge jailed={validator.jailed} validatorsType={validator.status} />} className="mb-5">
                <div className="d-flex align-items-center flex-wrap">
                    <div className="position-relative validator-logo me-3 me-sm-5">
                        <div className="rank-dot-container">
                            <p className="rank-dot-text">{rank}</p>
                        </div>
                        {/*TODO: Add logo */}
                        <img className="validator-logo" alt="validators logo" src={placeholderValidator} />
                    </div>
                    <div className="d-flex flex-column flex-grow-1">
                        <div className="row mb-4 mt-3 mt-md-0">
                            <div className="col-12">
                                {/*TODO: Add title */}
                                <h1>{StringsUtils.trunc(validator.operatorAddress || '')}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6">
                                <h4 className="mb-1">Operator address</h4>
                                <p className="text-break">{validator.operatorAddress}</p>
                            </div>
                            <div className="mt-3 mt-xl-0 col-xl-6 offset-xxl-1 col-xxl-5">
                                {/*TODO: Add address */}
                                <h4 className="mb-1">Address</h4>
                                <p className="text-break">Soon</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Card className="mt-5" flat>
                    <div className="row align-items-center">
                        <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                            <h4>Website</h4>
                        </div>
                        <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                            <p className="text-break">
                                {validator.description.website ? (
                                    <a rel="noreferrer" target="_blank" href={validator.description.website}>
                                        {validator.description.website}
                                    </a>
                                ) : (
                                    '-'
                                )}
                            </p>
                        </div>
                        <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                            <h4>Bonded height</h4>
                        </div>
                        <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                            <p>Soon</p>
                        </div>
                        <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                            <h4>Commission</h4>
                        </div>
                        <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                            <p>{numeral(validator.commission.rate).format('0.00%')}</p>
                        </div>
                        <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                            <h4>Self bonded</h4>
                        </div>
                        <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                            <p>Soon</p>
                        </div>
                        <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                            <h4>Uptime</h4>
                        </div>
                        <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                            <p>Soon</p>
                        </div>
                        <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                            <h4>Details</h4>
                        </div>
                        <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                            <p>{validator.description.details || '-'}</p>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <h4>Voting power</h4>
                        </div>
                        <div className="col-lg-4 col-md-9 col-sm-8">
                            <p>
                                {totalVotingPower &&
                                    numeral(parseFloat(validator.delegatorShares || '0') / totalVotingPower).format(
                                        '0.00%',
                                    )}{' '}
                                ({numeral(validator.delegatorShares).format('0,0.000000')}{' '}
                                <img alt="ticker" src={tickerLogo} />)
                            </p>
                        </div>
                    </div>
                </Card>
            </Card>
        );
    }

    renderContent(): JSX.Element {
        return (
            <>
                <h2 className="mt-3 mb-4">
                    <img alt="block" src={validatorLogo} /> Validator details
                </h2>
                {this.renderInformation()}
            </>
        );
    }

    render(): JSX.Element {
        const { validator, loading } = this.props;

        if (!validator || loading) {
            return <Loading />;
        }

        return this.renderContent();
    }
}

export default connect(mapState, mapDispatch)(BlockPage);
