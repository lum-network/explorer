import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Badge, Card, Loading } from 'components';
import validatorLogo from 'assets/images/validatorDark.svg';
import placeholderValidator from 'assets/images/placeholderValidator.svg';
import { StringsUtils, ValidatorsUtils } from 'utils';

interface IProps extends RouteComponentProps<{ id: string }> {}

interface IState {
    rank?: number;
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

        this.state = {};
    }

    componentDidMount(): void {
        const { getValidator } = this.props;
        const { id } = this.props.match.params;

        getValidator(id).then(() => {
            const { validators, validator } = this.props;

            const rank = ValidatorsUtils.findRank(validators, validator);

            this.setState({ rank });
        });
    }

    renderInformation(): JSX.Element {
        const { validator } = this.props;
        const { rank } = this.state;

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
                        <div className="row mb-3 mt-3 mt-md-0">
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
                            <div className="col-xl-6 offset-xxl-1 col-xxl-5">
                                {/*TODO: Add address */}
                                <h4 className="mb-1">Address</h4>
                                <p className="text-break">Soon</p>
                            </div>
                        </div>
                    </div>
                </div>
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
