import React, { useEffect, useState } from 'react';
import { Dispatch, RootState } from 'redux/store';
import validatorLogo from 'assets/images/validatorDark.svg';
import genesisFlag from 'assets/images/genesisFlag.svg';
import { i18n, NumbersUtils, StringsUtils, ValidatorsUtils } from 'utils';
import { Card, Loading, Table, ValidatorLogo } from 'frontend-elements';
import { Kpi, Badge } from 'components';
import { ValidatorModel } from 'models';
import numeral from 'numeral';
import { KpiType, NavigationConstants } from 'constant';
import { Link } from 'react-router-dom';
import '../Validators.scss';
import { useDispatch, useSelector } from 'react-redux';

const ValidatorsPage = (): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const validators = useSelector((state: RootState) => state.validators.validators);
    const loading = useSelector((state: RootState) => state.loading.effects.validators.fetchValidators);

    const head = [i18n.t('rank'), i18n.t('validator'), i18n.t('status'), i18n.t('votingPower'), i18n.t('commission')];

    const [totalVotingPower, setTotalVotingPower] = useState<number | null>(null);

    useEffect(() => {
        dispatch.validators.fetchValidators().finally(() => null);
    }, []);

    useEffect(() => {
        if (!validators) {
            return;
        }

        setTotalVotingPower(NumbersUtils.convertUnitNumber(ValidatorsUtils.calculateTotalVotingPower(validators)));
    }, [validators]);

    const renderGenesisBadge = (validator: ValidatorModel) => {
        if (validator.bondedHeight !== 0) {
            return null;
        }

        return (
            <div className="ms-3 genesis-flag-container">
                <img src={genesisFlag} alt="genesis" />
            </div>
        );
    };

    const renderRow = (validator: ValidatorModel, index: number): JSX.Element => {
        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <p className={index + 1 > 5 ? 'rank' : 'top-rank'}>{index + 1}</p>
                </td>
                <td data-label={head[1]}>
                    <Link title={validator.operatorAddress} to={`${NavigationConstants.VALIDATORS}/${validator.operatorAddress}`}>
                        <div className="d-flex flex-row align-items-center">
                            <ValidatorLogo
                                width={34}
                                height={34}
                                validatorAddress={validator.operatorAddress || ''}
                                // TODO: Get chainId from chainbridge when available
                                chainId={'lum-network-1'}
                                githubUrl={NavigationConstants.GITHUB_ASSETS}
                                className="me-3"
                            />
                            {validator.description.moniker || validator.description.identity || StringsUtils.trunc(validator.operatorAddress || '')}
                            {renderGenesisBadge(validator)}
                        </div>
                    </Link>
                </td>
                <td data-label={head[2]}>
                    <Badge jailed={validator.jailed} validatorsType={validator.status} />
                </td>
                <td data-label={head[3]}>
                    <div className="d-flex flex-column align-items-end">
                        <p>{numeral(NumbersUtils.convertUnitNumber(validator.tokens || 0)).format('0,0')}</p>
                        <p className="text-muted">{totalVotingPower && numeral(NumbersUtils.convertUnitNumber(validator.tokens || 0) / totalVotingPower).format('0.00%')}</p>
                    </div>
                </td>
                <td data-label={head[4]} className="text-end">
                    <p>{numeral(parseFloat(validator.commission.rates.rate || '')).format('0.00%')}</p>
                </td>
            </tr>
        );
    };

    const renderKpi = (): JSX.Element => {
        return <Kpi types={[KpiType.BLOCK_HEIGHT, KpiType.VALIDATORS, KpiType.BONDED_TOKEN, KpiType.BLOCK_TIME]} />;
    };

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="validator" src={validatorLogo} /> {i18n.t('validators')}
            </h2>
            {renderKpi()}
            <Card withoutPadding className="mb-5">
                {!validators || !validators.length || loading ? <Loading /> : <Table head={head}>{validators.map((value, index) => renderRow(value, index))}</Table>}
            </Card>
        </>
    );
};

export default ValidatorsPage;
