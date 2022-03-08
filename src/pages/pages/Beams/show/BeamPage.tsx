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

interface IProps extends RouteComponentProps<{ id: string }> {}

const BeamPage = ({ match }: IProps): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const beam = useSelector((state: RootState) => state.beams.beam);
    const loading = useSelector((state: RootState) => state.loading.models.beams);

    const { id } = match.params;

    useEffect(() => {
        dispatch.beams.getBeam(id).finally(() => null);
    }, []);

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
                <div className="row g-4 g-md-3">
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('id')}</h4>
                        <span>{beam.id}</span>
                    </div>
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('creatorAddress')}</h4>
                        <Link to={`${NavigationConstants.ACCOUNT}/${beam.creatorAddress}`}>{beam.creatorAddress}</Link>
                    </div>
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('status')}</h4>
                        <Badge beamsStatus={beam.status} />
                    </div>
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('rewardAmount')}</h4>
                        <div className="d-flex">
                            {beam.amount ? (
                                <>
                                    {NumbersUtils.formatNumber(beam.amount, true)}
                                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                                </>
                            ) : (
                                '-'
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('ratings')}</h4>
                        <Rating
                            initialRating={
                                beam.data &&
                                beam.data.merchantReview &&
                                beam.data.merchantReview.ratings &&
                                beam.data.merchantReview.ratings.overall
                                    ? beam.data.merchantReview.ratings.overall / 2
                                    : 0
                            }
                        />
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="Beam" src={beamLogo} /> {i18n.t('beamDetails')}&nbsp;&nbsp;
                {beam ? <Badge beamsStatus={beam.status} /> : null}
            </h2>
            {renderInformation()}
        </>
    );
};

export default BeamPage;
