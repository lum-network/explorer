import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';
import { RouteComponentProps } from 'react-router-dom';
import { i18n } from 'utils';

import beamLogo from 'assets/images/beamDark.svg';
import { Card, Loading } from 'frontend-elements';

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
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        <h4></h4>
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="Beam" src={beamLogo} /> {i18n.t('beamDetails')}
            </h2>
            {renderInformation()}
        </>
    );
};

export default BeamPage;
