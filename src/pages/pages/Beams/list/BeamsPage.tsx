import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';
import { Card, Loading, Table } from 'frontend-elements';
import beamLogo from 'assets/images/beamDark.svg';
import { i18n, NumbersUtils, StringsUtils } from 'utils';
import { BeamModel } from 'models';
import { NavigationConstants } from 'constant';
import { Link } from 'react-router-dom';
import { Badge } from 'components';
import { LumConstants } from '@lum-network/sdk-javascript';

const BeamsPage = (): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const beams = useSelector((state: RootState) => state.beams.beams);
    const loading = useSelector((state: RootState) => state.loading.effects.beams.fetchBeams);

    useEffect(() => {
        dispatch.beams.fetchBeams().finally(() => null);
    }, []);

    const renderRows = (beam: BeamModel, index: number, head: string[]): JSX.Element => {
        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <Link to={`${NavigationConstants.BEAMS}/${beam.id}`} title={beam.id}>
                        {StringsUtils.trunc(beam.id || '')}
                    </Link>
                </td>
                <td data-label={head[1]}>
                    <Link to={`${NavigationConstants.ACCOUNT}/${beam.creatorAddress}`}>{StringsUtils.trunc(beam.creatorAddress || '')}</Link>
                </td>
                <td data-label={head[2]} className="text-end">
                    <Badge beamsStatus={beam.status} />
                </td>
                <td data-label={head[3]} className="text-end">
                    <div className="d-flex justify-content-end">
                        {beam.amount ? (
                            <>
                                {NumbersUtils.formatNumber(beam.amount, true)}
                                <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                            </>
                        ) : (
                            '-'
                        )}
                    </div>
                </td>
            </tr>
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

        if (!beams || !beams.length) {
            return (
                <Card className="mb-5 d-flex justify-content-center align-items-center flex-column">
                    <img width={44} height={44} className="mb-2 placeholder-image" alt="placeholder" src={beamLogo} />
                    {i18n.t('noBeamFound')}
                </Card>
            );
        }

        const head = [i18n.t('id'), i18n.t('creatorAddress'), i18n.t('status'), i18n.t('amount')];

        return (
            <Card withoutPadding className="mb-5 h-100">
                <Table head={head}>{beams.map((beam, index) => renderRows(beam, index, head))}</Table>
            </Card>
        );
    };

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="Beam" src={beamLogo} /> {i18n.t('beams')}
            </h2>
            {renderInformation()}
        </>
    );
};

export default BeamsPage;
