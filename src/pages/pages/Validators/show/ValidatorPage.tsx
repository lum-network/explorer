import React, { PureComponent } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Badge } from 'components';
import { Card, Loading } from 'frontend-elements';
import validatorLogo from 'assets/images/validatorDark.svg';
import placeholderValidator from 'assets/images/placeholderValidator.svg';
import { i18n, StringsUtils, ValidatorsUtils } from 'utils';
import numeral from 'numeral';
import { NavigationConstants } from 'constant';

interface IProps extends RouteComponentProps<{ id: string }> {}

interface IState {
    rank: number | null;
    totalVotingPower: number | null;
    address: string;
}

const mapState = (state: RootState) => ({
    validator: state.validators.validator,
    validators: state.validators.validators,
    loading: state.loading.models.validators,
});

const mapDispatch = (dispatch: Dispatch) => ({
    getValidator: (id: string) => dispatch.validators.getValidator(id),
    fetchValidators: () => dispatch.validators.fetchValidators(),
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
            address: '',
        };
    }

    async componentDidMount(): Promise<void> {
        const { getValidator, fetchValidators } = this.props;
        const { id } = this.props.match.params;

        await fetchValidators();
        getValidator(id).then(() => {
            const { validators, validator } = this.props;

            if (!validators || !validator) {
                return;
            }

            const rank = ValidatorsUtils.findRank(validators, validator);
            const totalVotingPower = ValidatorsUtils.calculateTotalVotingPower(validators);
            const address = ValidatorsUtils.convertValAddressToAccAddress(validator.operatorAddress || '');

            this.setState({ rank, totalVotingPower, address });
        });
    }

    renderInformation(): JSX.Element {
        const { validator, loading } = this.props;
        const { rank, totalVotingPower, address } = this.state;

        if (!validator || loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        return (
            <Card badge={<Badge jailed={validator.jailed} validatorsType={validator.status} />} className="mb-5">
                <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                    <div className="position-relative validator-logo me-3 me-xxl-5 me-sm-4">
                        <div className="rank-dot-container">
                            <p className="rank-dot-text">{rank}</p>
                        </div>
                        {/*TODO: Add logo */}
                        <img className="validator-logo" alt="validators logo" src={placeholderValidator} />
                    </div>
                    <div className="d-flex flex-column flex-grow-1">
                        <div className="row mb-3 mb-xl-4 mt-3 mt-md-0">
                            <div className="col-12">
                                <h1>
                                    {validator.description.identity ||
                                        validator.description.moniker ||
                                        StringsUtils.trunc(validator.operatorAddress || '')}
                                </h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6">
                                <h4 className="mb-1">{i18n.t('operatorAddress')}</h4>
                                <p className="text-break">{validator.operatorAddress}</p>
                            </div>
                            <div className="mt-3 mt-xl-0 col-xl-6 offset-xxl-1 col-xxl-5">
                                <h4 className="mb-1">{i18n.t('address')}</h4>
                                <p className="text-break">
                                    <Link to={`${NavigationConstants.ACCOUNT}/${address}`}>{address}</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Card className="mt-5" flat>
                    <div className="row align-items-center">
                        <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                            <h4>{i18n.t('website')}</h4>
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
                            <h4>{i18n.t('bondedHeight')}</h4>
                        </div>
                        <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                            <p>Soon</p>
                        </div>
                        <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                            <h4>{i18n.t('commission')}</h4>
                        </div>
                        <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                            <p>{numeral(validator.commission.rate).format('0.00%')}</p>
                        </div>
                        <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                            <h4>{i18n.t('selfBonded')}</h4>
                        </div>
                        <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                            <p>Soon</p>
                        </div>
                        <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                            <h4>{i18n.t('uptime')}</h4>
                        </div>
                        <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                            <p>Soon</p>
                        </div>
                        <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                            <h4>{i18n.t('details')}</h4>
                        </div>
                        <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                            <p>{validator.description.details || '-'}</p>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <h4>{i18n.t('votingPower')}</h4>
                        </div>
                        <div className="col-lg-4 col-md-9 col-sm-8">
                            <p className="d-flex align-items-center">
                                {totalVotingPower &&
                                    numeral(parseFloat(validator.delegatorShares || '0') / totalVotingPower).format(
                                        '0.00%',
                                    )}{' '}
                                ({numeral(validator.delegatorShares).format('0,0.000000')}
                                <span className="ms-1 color-type">LUM</span>)
                            </p>
                        </div>
                    </div>
                </Card>
            </Card>
        );
    }

    render(): JSX.Element {
        return (
            <>
                <h2 className="mt-3 mb-4">
                    <img alt="block" src={validatorLogo} /> {i18n.t('validatorDetails')}
                </h2>
                {this.renderInformation()}
            </>
        );
    }
}

export default connect(mapState, mapDispatch)(BlockPage);
