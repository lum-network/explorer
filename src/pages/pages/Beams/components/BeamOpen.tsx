import React from 'react';

import { Rating } from 'components';
import { Card } from 'frontend-elements';
import { i18n, NumbersUtils } from 'utils';
import { CoinModel } from 'models';

import beamRatingLogo from 'assets/images/beamUpdateRating.svg';
import beamRewardLogo from 'assets/images/beamReward.svg';
import lumLogo from 'assets/images/lum.svg';

import BeamStatusUpdateCard from './BeamStatusUpdateCard';
import BeamStatusHeader from './BeamStatusHeader';

interface Props {
    infos: { merchantIcon?: string; verifierIcon?: string; rating?: number; amount?: CoinModel };
    date: string;
    withLine?: boolean;
}

const BeamOpen = ({ date, infos, withLine }: Props): JSX.Element => {
    return (
        <>
            <BeamStatusHeader date={date} status={i18n.t('open')} />
            <BeamStatusUpdateCard withLine={withLine}>
                <Card className="status-update-card">
                    <div>
                        {infos.merchantIcon && (
                            <div className="d-flex flex-row align-items-center mb-5">
                                <div className="status-update-icon"></div>
                                <h4 className="fw-normal">{i18n.t('beamMerchantAdded')}</h4>
                            </div>
                        )}
                        {infos.verifierIcon && (
                            <div className="d-flex flex-row align-items-center mb-5">
                                <div className="status-update-icon"></div>
                                <h4 className="fw-normal">{i18n.t('beamVerifierAdded')}</h4>
                            </div>
                        )}
                        {infos.rating && (
                            <div className="d-flex flex-row align-items-center mb-5">
                                <div className="status-update-icon">
                                    <img src={beamRatingLogo} />
                                </div>
                                <div className="d-flex flex-row align-items-center beam ratings-number">
                                    {`${infos.rating / 2}/5`}
                                    <Rating className="ms-4 mb-2" size={26} initialRating={infos.rating / 2} />
                                </div>
                            </div>
                        )}
                        <div className="d-flex flex-row align-items-center">
                            <div className="status-update-icon">
                                <img src={beamRewardLogo} />
                            </div>
                            <h4 className="fw-normal">{i18n.t('beamRewardAdded')}</h4>
                        </div>
                    </div>
                    <h1 className="display-4 mt-4 mt-lg-0 ms-2 ms-lg-0">
                        {infos.amount ? NumbersUtils.formatNumber(infos.amount, true) : 0}
                        <span className="lum-logo ms-2">
                            <img src={lumLogo} height={28} />
                        </span>
                    </h1>
                </Card>
            </BeamStatusUpdateCard>
        </>
    );
};

export default BeamOpen;
