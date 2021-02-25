import React, { PureComponent } from 'react';
import { KpiType } from 'constant';
import { KpiCard } from 'components';
import { connect } from 'react-redux';
import { RootState } from 'redux/store';
import { BlockUtils, i18n, ValidatorsUtils } from 'utils';
import numeral from 'numeral';
import blockLogo from 'assets/images/blockDark.svg';
import validatorLogo from 'assets/images/validatorDark.svg';
import clockLogo from 'assets/images/clockDark.svg';
import bondedTokensLogo from 'assets/images/bondedTokensDark.svg';
import { BlocksModel } from 'models';

interface IProps {
    types: KpiType[];
    className?: string;
}

interface IState {
    blockTime: number;
}

const mapState = (state: RootState) => ({
    blocks: state.blocks.blocks,
    validators: state.validators.validators,
});

type StateProps = ReturnType<typeof mapState>;

type Props = IProps & StateProps;

class Kpi extends PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            blockTime: 5000,
        };
    }

    componentDidMount() {
        const { blocks } = this.props;

        if (blocks && blocks.length) {
            this.processBlockTime(blocks);
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        const { blocks } = this.props;

        if (blocks && blocks.length && prevProps.blocks && prevProps.blocks.length && blocks !== prevProps.blocks) {
            this.processBlockTime(blocks);
        }
    }

    processBlockTime(blocks: BlocksModel[]): void {
        const blockTime = BlockUtils.processBlockTime(blocks);

        this.setState({ blockTime });
    }

    renderCard(type: KpiType): JSX.Element | null {
        const { blocks, validators } = this.props;
        const { blockTime } = this.state;

        switch (type) {
            case KpiType.BLOCK_HEIGHT:
                if (!blocks || !blocks.length) {
                    return null;
                }

                return (
                    <KpiCard logo={blockLogo} title={i18n.t('blocks')}>
                        {numeral(blocks[0].height).format('0,0')}
                    </KpiCard>
                );

            case KpiType.VALIDATORS:
                if (!validators || !validators.length) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('validators')} logo={validatorLogo}>
                        {numeral(validators.length).format('0,0')}
                    </KpiCard>
                );

            case KpiType.BLOCK_TIME:
                if (!blocks || !blocks.length || blocks.length < 30) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('blockTime')} logo={clockLogo}>
                        {numeral(blockTime / 1000).format('0.00')}
                        {i18n.t('sec')}
                    </KpiCard>
                );

            case KpiType.BONDED_TOKEN:
                if (!validators || !validators.length) {
                    return null;
                }

                return (
                    <KpiCard title={i18n.t('bondedTokens')} logo={bondedTokensLogo}>
                        {numeral(ValidatorsUtils.calculateTotalVotingPower(validators)).format('0,0')}
                    </KpiCard>
                );

            default:
                return null;
        }
    }

    render(): JSX.Element {
        const { types, className } = this.props;

        return (
            <div className={`row mb-4 ${className}`}>
                {types.map((value, index) => (
                    <div key={index} className="col-lg-3 col-sm-6">
                        {this.renderCard(value)}
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(mapState)(Kpi);
