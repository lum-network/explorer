import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, BlocksList, DelegatorsList, SmallerDecimal } from 'components';
import { Card, Loading } from 'frontend-elements';
import validatorLogo from 'assets/images/validatorDark.svg';
import placeholderValidator from 'assets/images/placeholderValidator.svg';
import { i18n, NumbersUtils, StringsUtils, ValidatorsUtils } from 'utils';
import numeral from 'numeral';
import { NavigationConstants, NumberConstants } from 'constant';
import { LumConstants } from '@lum-network/sdk-javascript';

interface IProps extends RouteComponentProps<{ id: string }> {}

const ValidatorPage = (props: IProps): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const validator = useSelector((state: RootState) => state.validators.validator);
    const validators = useSelector((state: RootState) => state.validators.validators);
    const loading = useSelector((state: RootState) => state.loading.models.validators);

    const { id } = props.match.params;

    const [rank, setRank] = useState<number | null>(null);
    const [totalVotingPower, setTotalVotingPower] = useState<number | null>(null);

    useEffect(() => {
        dispatch.validators.fetchValidators().finally(() => null);
        dispatch.validators.getValidator(id).finally(() => null);
    }, []);

    useEffect(() => {
        if (!validators || !validators.length || !validator) {
            return;
        }

        setRank(ValidatorsUtils.findRank(validators, validator));
        setTotalVotingPower(NumbersUtils.convertUnitNumber(ValidatorsUtils.calculateTotalVotingPower(validators)));
    }, [validators, validator]);

    const renderInformation = (): JSX.Element => {
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
                                <h4 className="mb-1">{i18n.t('validatorAddress')}</h4>
                                <p className="text-break">{validator.operatorAddress}</p>
                            </div>
                            <div className="mt-3 mt-xl-0 col-xl-6 offset-xxl-1 col-xxl-5">
                                <h4 className="mb-1">{i18n.t('address')}</h4>
                                <p className="text-break">
                                    <Link to={`${NavigationConstants.ACCOUNT}/${validator.address}`}>
                                        {validator.address}
                                    </Link>
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
                            <p>
                                {numeral(
                                    parseFloat(validator.commission.rate || '0') / NumberConstants.CLIENT_PRECISION,
                                ).format('0.00%')}
                            </p>
                        </div>
                        <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                            <h4>{i18n.t('selfBonded')}</h4>
                        </div>
                        <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                            <p>
                                {numeral(validator.selfBonded / parseFloat(validator.tokens || '0')).format('0.00%')} (
                                <SmallerDecimal
                                    nb={numeral(NumbersUtils.convertUnitNumber(validator.selfBonded)).format('0,0.000')}
                                />
                                <span className="ms-1 color-type">{LumConstants.LumDenom}</span>)
                            </p>
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
                                    numeral(
                                        NumbersUtils.convertUnitNumber(validator.tokens || 0) / totalVotingPower,
                                    ).format('0.00%')}{' '}
                                (
                                <SmallerDecimal
                                    nb={numeral(NumbersUtils.convertUnitNumber(validator.selfBonded)).format('0,0.000')}
                                />
                                <span className="ms-1 color-type">{LumConstants.LumDenom}</span>)
                            </p>
                        </div>
                    </div>
                </Card>
            </Card>
        );
    };

    const renderBlocksAndDelegations = (): JSX.Element => {
        if (!validator || loading) {
            return (
                <div className="row">
                    <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                        <Card>
                            <Loading />
                        </Card>
                    </div>
                    <div className="col-12 col-xxl-6 mb-5">
                        <Card>
                            <Loading />
                        </Card>
                    </div>
                </div>
            );
        }

        const { blocks, delegations, tokens } = validator;

        return (
            <div className="row">
                <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                    <BlocksList rej title blocks={blocks} />
                </div>
                <div className="col-12 col-xxl-6 mb-5">
                    <DelegatorsList title delegators={delegations} validatorTokens={parseFloat(tokens || '0')} />
                </div>
            </div>
        );
    };

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="block" src={validatorLogo} /> {i18n.t('validatorDetails')}
            </h2>
            {renderInformation()}
            {renderBlocksAndDelegations()}
        </>
    );
};

export default ValidatorPage;
