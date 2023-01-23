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

    const [openEvent, setOpenEvent] = useState<EventModel | undefined>();
    const [updateEvents, setUpdateEvents] = useState<EventModel[] | undefined>();
    const [claimEvent, setClaimEvent] = useState<EventModel | undefined>();

    const { id } = match.params;

    useEffect(() => {
        dispatch.beams.getBeam(id).finally(() => null);
    }, []);

    useEffect(() => {
        if (beam && beam.event) {
            setOpenEvent(beam.event.find((event) => event.type === LumMessages.MsgOpenBeamUrl));
            setUpdateEvents(
                beam.event
                    .filter((event) => event.type === LumMessages.MsgUpdateBeamUrl)
                    .sort((eventA, eventB) => {
                        return new Date(eventB.time).getTime() - new Date(eventA.time).getTime();
                    }),
            );
            setClaimEvent(beam.event.find((event) => event.type === LumMessages.MsgClaimBeamUrl));
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
                        {beam && beam.status === BeamsStatus.CLOSED && <BeamClose date={moment(beam.closeAt).utc().format()} />}
                        {claimEvent && <BeamClaim date={moment(claimEvent.time).utc().format()} address={claimEvent.value.claimerAddress || beam.claimAddress} amount={beam.amount} />}
                        {updateEvents &&
                            updateEvents.map((event, index) => (
                                <BeamUpdate index={updateEvents.length - index} key={`beam-${beam.id}-update-${index}`} date={moment(event.time).utc().format()} event={event} />
                            ))}
                        {openEvent && (
                            <BeamOpen
                                date={moment(openEvent.time).utc().format()}
                                withLine={false}
                                infos={{
                                    amount: openEvent.value.amount,
                                    rating: openEvent.value.data?.merchantReview?.ratings.overall,
                                }}
                            />
                        )}
                    </Card>
                </>
            )}
        </div>
    );
};

export default BeamPage;
