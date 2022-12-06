import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';
import { RouteComponentProps } from 'react-router-dom';
import { i18n, NumbersUtils } from 'utils';
import { Link } from 'react-router-dom';
import { NavigationConstants } from 'constant';

import beamLogo from 'assets/images/beamDark.svg';
import { Card, Loading } from 'frontend-elements';
import { Badge, Rating } from 'components';
import { LumConstants } from '@lum-network/sdk-javascript';
import getSymbolFromCurrency from 'currency-symbol-map';
import moment from 'moment';

interface IProps extends RouteComponentProps<{ id: string }> {}

const BeamPage = ({ match }: IProps): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const beam = useSelector((state: RootState) => state.beams.beam);
    const loading = useSelector((state: RootState) => state.loading.models.beams);

    const { id } = match.params;

    useEffect(() => {
        dispatch.beams.getBeam(id).finally(() => null);
    }, []);

    const renderRating = (rating?: number): JSX.Element => {
        return (
            <div className="d-flex align-items-center">
                <div className="ratings-number me-2">{rating ? `${rating}/5` : ''}</div>
                <Rating size={26} initialRating={rating || 0} />
            </div>
        );
    };

    const renderRatings = (ratings: any, isMerchant = false): JSX.Element[] => {
        const view: JSX.Element[] = [];

        for (const [key, value] of Object.entries(ratings)) {
            if (!value) {
                continue;
            }

            view.push(
                <div>
                    <span className="ratings-title">{i18n.t(key)}</span>
                    {renderRating(isMerchant ? (value as number) / 2 : (value as number))}
                </div>,
            );
        }

        return view;
    };

    const renderInformation = (): JSX.Element => {
        if (loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        if (!beam) {
            return (
                <Card className="mb-5 d-flex justify-content-center align-items-center flex-column">
                    <img width={44} height={44} className="mb-2 placeholder-image" alt="placeholder" src={beamLogo} />
                    {i18n.t('noBeamFound')}
                </Card>
            );
        }

        return (
            <Card className="mb-5">
                <div className="row g-3 g-lg-4 g-xl-5">
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('id')}</h4>
                        <span>{beam.id}</span>
                    </div>
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('dispatchedAt')}</h4>
                        <span>{moment(beam.dispatchedAt).format('lll')}</span>
                    </div>
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('walletMerchant')}</h4>
                        <Link to={`${NavigationConstants.ACCOUNT}/${beam.creatorAddress}`}>{beam.creatorAddress}</Link>
                    </div>
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('walletDestination')}</h4>
                        {beam.claimAddress ? <Link to={`${NavigationConstants.ACCOUNT}/${beam.claimAddress}`}>{beam.claimAddress}</Link> : <>{i18n.t('rewardNotClaimed')}</>}
                    </div>
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('status')}</h4>
                        <Badge beamsStatus={beam.status} />
                    </div>
                    {/*<div className="col-12 col-lg-6">*/}
                    {/*    {beam.cl}*/}
                    {/*    <h4 className="mb-2">{i18n.t('status')}</h4>*/}
                    {/*</div>*/}
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('rewardAmount')}</h4>
                        <div className="d-flex align-items-center">
                            {beam.data.reward && beam.data.reward.amount && beam.data.reward.currency && (
                                <span className="amount-fiat me-2">
                                    {getSymbolFromCurrency(beam.data.reward.currency)}
                                    {beam.data.reward.amount.toFixed(2)}
                                </span>
                            )}
                            {beam.amount ? (
                                <>
                                    ({NumbersUtils.formatNumber(beam.amount, true)}
                                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>)
                                </>
                            ) : (
                                '-'
                            )}
                        </div>
                    </div>
                    {beam.data && beam.data.merchantReview && beam.data.merchantReview.ratings ? (
                        <div className="col-12 col-lg-6">
                            <h4 className="mb-2">{i18n.t('merchantRatings')}</h4>
                            {renderRatings(beam.data.merchantReview.ratings, true)}
                        </div>
                    ) : null}
                    {beam.data && beam.data.productsReviews && beam.data.productsReviews.length ? (
                        <div className="col-12 col-lg-6">
                            <h4 className="mb-2">{i18n.t('products')}</h4>
                            {beam.data.productsReviews.map((product) => (
                                <>
                                    <span>{decodeURIComponent(product.title).replaceAll('+', ' ')}</span>
                                    {renderRatings(product.ratings)}
                                </>
                            ))}
                        </div>
                    ) : null}
                </div>
            </Card>
        );
    };

    return (
        <div className="beam">
            <h2 className="mt-3 mb-4">
                <img alt="Beam" src={beamLogo} /> {i18n.t('beamDetails')}&nbsp;&nbsp;
                {beam ? <Badge beamsStatus={beam.status} /> : null}
            </h2>
            {renderInformation()}
        </div>
    );
};

export default BeamPage;
