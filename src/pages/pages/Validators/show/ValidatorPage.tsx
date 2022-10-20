import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, BlocksList, DelegatorsList, SmallerDecimal } from 'components';
import { Card, Loading, ValidatorLogo } from 'frontend-elements';
import validatorLogo from 'assets/images/validatorDark.svg';
import { i18n, NumbersUtils, StringsUtils, ValidatorsUtils } from 'utils';
import numeral from 'numeral';
import { NavigationConstants } from 'constant';
import { LumConstants } from '@lum-network/sdk-javascript';
import genesisFlag from 'assets/images/genesisFlag.svg';

interface IProps extends RouteComponentProps<{ id: string }> {}

const ValidatorPage = (props: IProps): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const validator = useSelector((state: RootState) => state.validators.validator);
    const validators = useSelector((state: RootState) => state.validators.validators);
    const loading = useSelector((state: RootState) => state.loading.effects.validators.fetchValidators);
    const blocksMetadata = useSelector((state: RootState) => state.validators.blocksMetadata);
    const delegationsMetadata = useSelector((state: RootState) => state.validators.delegationsMetadata);

    const { id } = props.match.params;

    const [rank, setRank] = useState<number | null>(null);
    const [totalVotingPower, setTotalVotingPower] = useState<number | null>(null);
    const [blocksPage, setBlocksPage] = useState(0);
    const [delegationsPage, setDelegationsPage] = useState(0);

    useEffect(() => {
        dispatch.validators.getValidator(id).finally(() => null);
    }, []);

    useEffect(() => {
        if (!validator) {
            return;
        }

        dispatch.validators.fetchValidatorBlocks({ id, page: blocksPage }).finally(() => null);
    }, [blocksPage]);

    useEffect(() => {
        if (!validator) {
            return;
        }

        dispatch.validators.fetchValidatorDelegations({ id, page: delegationsPage }).finally(() => null);
    }, [delegationsPage]);

    useEffect(() => {
        if (!validators || !validators.length || !validator) {
            return;
        }

        setRank(ValidatorsUtils.findRank(validators, validator));
        setTotalVotingPower(NumbersUtils.convertUnitNumber(ValidatorsUtils.calculateTotalVotingPower(validators)));
    }, [validators, validator]);

    const renderUptime = () => {
        if (!validator.uptime) {
            return null;
        }

        if (validator.uptime >= 99) {
            return <p className="text-success fw-bold">{validator.uptime.toFixed()}%</p>;
        } else if (validator.uptime < 90) {
            return <p className="text-danger fw-bold">{validator.uptime.toFixed()}%</p>;
        } else {
            return <p className="text-warning fw-bold">{validator.uptime.toFixed()}%</p>;
        }
    };

    const renderGenesisBadge = () => {
        if (validator.bondedHeight !== 0) {
            return null;
        }

        return (
            <div className="ms-3 genesis-flag-container-big">
                <img src={genesisFlag} alt="genesis" className="me-2" />
                {i18n.t('genesis')}
            </div>
        );
    };

    const renderInformation = (): JSX.Element => {
        if (loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        if (!validator) {
            return (
                <Card className="mb-5 d-flex justify-content-center align-items-center flex-column">
                    <img width={44} height={44} className="mb-2 placeholder-image" alt="placeholder" src={validatorLogo} />
                    {i18n.t('noValidatorFound')}
                </Card>
            );
        }

        return (
            <Card badge={<Badge tombstoned={validator.tombstoned} jailed={validator.jailed} validatorsType={validator.status} />} className="mb-5">
                <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                    <div className="position-relative validator-logo me-3 me-xxl-5 me-sm-4">
                        <div className="rank-dot-container">
                            <p className="rank-dot-text">{rank}</p>
                        </div>
                        <ValidatorLogo
                            validatorAddress={validator.operatorAddress || ''}
                            // TODO: Get chainId from chainbridge when available
                            chainId={'lum-network-1'}
                            githubUrl={NavigationConstants.GITHUB_ASSETS}
                            className="validator-logo"
                            width={72}
                            height={72}
                        />
                    </div>
                    <div className="d-flex flex-column flex-grow-1">
                        <div className="row mb-3 mb-xl-4 mt-3 mt-md-0">
                            <div className="col-12 d-flex align-items-center flex-row flex-wrap-reverse">
                                <h1>{validator.displayName || validator.description.moniker || validator.description.identity || StringsUtils.trunc(validator.operatorAddress || '')}</h1>
                                {renderGenesisBadge()}
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
                                    <Link to={`${NavigationConstants.ACCOUNT}/${validator.address}`}>{validator.address}</Link>
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
                                    <a
                                        rel="noreferrer"
                                        target="_blank"
                                        href={validator.description.website.startsWith('http') ? validator.description.website : `https://${validator.description.website}`}
                                    >
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
                            <p>{numeral(validator.bondedHeight).format('0,0')}</p>
                        </div>
                        <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                            <h4>{i18n.t('commission')}</h4>
                        </div>
                        <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                            <p>{numeral(parseFloat(validator.commission.rates.rate || '0')).format('0.00%')}</p>
                        </div>
                        <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                            <h4>{i18n.t('selfBonded')}</h4>
                        </div>
                        <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                            soon
                            {/*//FIXME*/}
                            {/*<p>*/}
                            {/*    {numeral(validator.selfBonded / parseFloat(validator.tokens || '0')).format('0.00%')} (*/}
                            {/*    <SmallerDecimal*/}
                            {/*        nb={numeral(NumbersUtils.convertUnitNumber(validator.selfBonded)).format(*/}
                            {/*            '0,0.000000',*/}
                            {/*        )}*/}
                            {/*    />*/}
                            {/*    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>)*/}
                            {/*</p>*/}
                        </div>
                        <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                            <h4>{i18n.t('uptime')}</h4>
                        </div>
                        <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                            <p>{renderUptime()}</p>
                        </div>
                        <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                            <h4>{i18n.t('votingPower')}</h4>
                        </div>
                        <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                            <p className="d-flex align-items-center">
                                {totalVotingPower && numeral(NumbersUtils.convertUnitNumber(validator.tokens || 0) / totalVotingPower).format('0.00%')} (
                                <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(validator.tokens || 0)).format('0,0.000000')} />
                                <span className="ms-2 color-type">{LumConstants.LumDenom}</span>)
                            </p>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <h4>{i18n.t('details')}</h4>
                        </div>
                        <div className="col-lg-4 col-md-9 col-sm-8">
                            <p>{validator.description.details || '-'}</p>
                        </div>
                    </div>
                </Card>
            </Card>
        );
    };

    const renderBlocksAndDelegations = (): JSX.Element | null => {
        if (loading) {
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

        if (!validator) {
            return null;
        }

        const { blocks, delegations, tokens } = validator;

        return (
            <div className="row">
                <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                    <BlocksList total metadata={blocksMetadata} onPageChange={setBlocksPage} rej title blocks={blocks} />
                </div>
                <div className="col-12 col-xxl-6 mb-5">
                    <DelegatorsList total metadata={delegationsMetadata} onPageChange={setDelegationsPage} title delegators={delegations.slice(0, 5)} validatorTokens={parseFloat(tokens || '0')} />
                </div>
            </div>
        );
    };

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="Validator" src={validatorLogo} /> {i18n.t('validatorDetails')}
            </h2>
            {renderInformation()}
            {renderBlocksAndDelegations()}
        </>
    );
};

export default ValidatorPage;
