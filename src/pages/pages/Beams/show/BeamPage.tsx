import React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux/store';
import { RouteComponentProps } from 'react-router-dom';
import { i18n } from 'utils';

import beam from 'assets/images/beamDark.svg';
import { Card } from 'frontend-elements';

interface IProps extends RouteComponentProps<{ id: string }> {}

const BeamPage = ({ match }: IProps): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();

    const { id } = match.params;

    const renderInformation = (): JSX.Element => {
        return (
            <Card className="mb-5 d-flex justify-content-center align-items-center flex-column">
                <img width={44} height={44} className="mb-2 placeholder-image" alt="placeholder" src={beam} />
                {i18n.t('noBeamFound')}
            </Card>
        );
    };

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="Beam" src={beam} /> {i18n.t('beamDetails')}
            </h2>
            {renderInformation()}
        </>
    );
};

export default BeamPage;
