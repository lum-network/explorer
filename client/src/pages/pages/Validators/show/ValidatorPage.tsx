import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Badge, Card, Loading } from 'components';
import validatorLogo from 'assets/images/validatorDark.svg';

interface IProps extends RouteComponentProps<{ id: string }> {}

const mapState = (state: RootState) => ({
    validator: state.validators.validator,
    loading: state.loading.effects.validators.getValidator,
});

const mapDispatch = (dispatch: Dispatch) => ({
    getValidator: (id: string) => dispatch.validators.getValidator(id),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class BlockPage extends PureComponent<Props> {
    componentDidMount(): void {
        const { getValidator } = this.props;
        const { id } = this.props.match.params;

        getValidator(id).finally(() => null);
    }

    renderInformation(): JSX.Element {
        const { validator } = this.props;

        return (
            <Card badge={<Badge jailed={validator.jailed} validatorsType={validator.status} />} className="mb-5"></Card>
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
