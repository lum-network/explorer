import React, { useEffect, useState } from 'react';
import lumLogo from 'assets/images/lum.svg';
import { Card, Loading } from 'frontend-elements';
import numeral from 'numeral';
import './Lum.scss';
import { AssetsUtils, i18n, NumbersUtils } from 'utils';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const Lum = (): JSX.Element => {
    const lum = useSelector((state: RootState) => state.core.lum);
    const assets = useSelector((state: RootState) => state.core.assets);
    const loading = useSelector((state: RootState) => state.loading.effects.core.getLum || state.loading.effects.core.getKpi);

    const [previousDayPercentage, setPreviousDayPercentage] = useState(0);

    useEffect(() => {
        if (!lum || !lum.price || !lum.volume24h || !lum.previousDayPrice) {
            return;
        }

        setPreviousDayPercentage(NumbersUtils.getDifferencePercentage(lum.previousDayPrice, lum.price));
    }, [lum]);

    if (loading) {
        return (
            <Card className="h-100 d-flex align-items-center justify-content-center">
                <Loading />
            </Card>
        );
    }

    if (!lum || !lum.price || !lum.volume24h || !lum.previousDayPrice || !assets) {
        return (
            <Card className="h-100">
                <img alt="Lum" className="placeholder-image mb-4" src={lumLogo} />
                <div className="d-flex justify-content-center align-items-center">{i18n.t('noData')}</div>
            </Card>
        );
    }

    return (
        <Card className="d-flex flex-column h-100">
            <img alt="Lum" className="placeholder-image align-self-start lum-logo" src={lumLogo} />
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-end h-100 mt-5">
                <div className="mt-auto">
                    <h4 className="mb-3">{i18n.t('marketCap')}</h4>
                    <h6 className="fw-light">{numeral(AssetsUtils.getTotalSupply(assets) * lum.price).format('$0,0')}</h6>
                </div>
                <div className="mt-5 mt-sm-auto">
                    <h4 className="mb-3">{i18n.t('dayVolume')}</h4>
                    <h6 className="fw-light">{numeral(lum.volume24h).format('$0,0')}</h6>
                </div>
                <div className="mt-5 mt-sm-auto">
                    <p className="d-flex flex-row align-items-center">
                        <span className={`me-1 ${previousDayPercentage >= 0 ? 'arrow-up' : 'arrow-down'}`} />
                        {numeral(previousDayPercentage).format('+0.00%')} ({i18n.t('day')})
                    </p>
                    <p className="big-text">{numeral(lum.price).format('$0,0.000000')}</p>
                </div>
            </div>
        </Card>
    );
};

export default Lum;
