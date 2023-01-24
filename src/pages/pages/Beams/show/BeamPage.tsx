import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import { LumMessages } from '@lum-network/sdk-javascript';

import { Badge } from 'components';
import { BeamsStatus } from 'constant';
import { Card, Loading } from 'frontend-elements';
import { EventModel } from 'models';
import { Dispatch, RootState } from 'redux/store';
import { i18n } from 'utils';

import beamLogo from 'assets/images/beamDark.svg';

import BeamOpen from '../components/BeamOpen';
import BeamClaim from '../components/BeamClaim';
import BeamUpdate from '../components/BeamUpdate';
import BeamClose from '../components/BeamClose';

interface IProps extends RouteComponentProps<{ id: string }> {}

const BeamPage = ({ match }: IProps): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const beam = useSelector((state: RootState) => state.beams.beam);
    const loading = useSelector((state: RootState) => state.loading.models.beams);

    const [beamEvents, setBeamEvents] = useState<EventModel[] | undefined>();
    const { id } = match.params;

    useEffect(() => {
        dispatch.beams.getBeam(id).finally(() => null);
    }, []);

    useEffect(() => {
        if (beam && beam.event) {
            setBeamEvents(
                beam.event.sort((eventA, eventB) => {
                    return new Date(eventB.time).getTime() - new Date(eventA.time).getTime();
                }),
            );
        }
    }, [beam]);

    return (
        <div className="beam">
            <h2 className="mt-3 mb-4">
                <img alt="Beam" src={beamLogo} /> {i18n.t('beamDetails')}&nbsp;&nbsp;
                {beam ? <Badge beamsStatus={beam.status} /> : null}
            </h2>
            {loading ? (
                <Card className="mb-5">
                    <Loading />
                </Card>
            ) : (
                <>
                    <h4>{i18n.t('beamHistory')}</h4>
                    <Card className="d-flex flex-column mt-4 mb-5 beam-history-card">
                        {beamEvents &&
                            beamEvents.map((event, index) => {
                                switch (event.type) {
                                    case LumMessages.MsgOpenBeamUrl:
                                        return (
                                            <BeamOpen
                                                key={`beam-${beam.id}-open-${index}`}
                                                date={moment(event.time).utc().format()}
                                                withLine={false}
                                                infos={{
                                                    rating: event.value.data?.merchantReview?.ratings.overall,
                                                    amount: event.value.amount,
                                                }}
                                                productsReviews={
                                                    event.value.data && event.value.data.productsReviews
                                                        ? event.value.data.productsReviews.map((pReview) => ({
                                                              id: pReview.reviewId,
                                                              hasContent: !!(pReview.content.overall || pReview.content.pros || pReview.content.cons),
                                                              hasMedia: pReview.media && pReview.media.length > 0,
                                                              rating: pReview.ratings.overall,
                                                          }))
                                                        : undefined
                                                }
                                            />
                                        );
                                    case LumMessages.MsgClaimBeamUrl:
                                        return <BeamClaim date={moment(event.time).utc().format()} address={event.value.claimerAddress || ''} amount={beam.amount} />;
                                    default: {
                                        if (event.value.status && event.value.status === BeamsStatus.CLOSED) {
                                            return <BeamClose date={moment(event.time).utc().format()} />;
                                        }
                                        return <BeamUpdate key={`beam-${beam.id}-update-${index}`} date={moment(event.time).utc().format()} event={event} />;
                                    }
                                }
                            })}
                    </Card>
                </>
            )}
        </div>
    );
};

export default BeamPage;
