import React, { useEffect, useState } from 'react';
import lumLogo from 'assets/images/lum.svg';
import { Card, Loading } from 'frontend-elements';
import numeral from 'numeral';
import './Lum.scss';
import { i18n, NumbersUtils } from 'utils';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const Lum = (): JSX.Element => {
    const lum = useSelector((state: RootState) => state.core.lum);
    const stats = useSelector((state: RootState) => state.core.stats);
    const loading = useSelector(
        (state: RootState) => state.loading.effects.core.getLum || state.loading.effects.core.getStats,
    );

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

    if (
        !lum ||
        !lum.price ||
        !lum.volume24h ||
        !lum.previousDayPrice ||
        !stats ||
        !stats.totalSupply ||
        !stats.totalSupply.length
    ) {
        return (
            <Card className="h-100">
                <img alt="Lum" className="placeholder-image mb-4" src={lumLogo} />
                <div className="d-flex justify-content-center align-items-center">{i18n.t('noData')}</div>
            </Card>
        );
    }

    return (
        <Card className="h-100">
            <img alt="Lum" className="placeholder-image mb-4" src={lumLogo} />
            <div className="row">
                <div className="col-6 col-md-3 col-xxl-4 mb-4 mb-md-0">
                    <h4 className="mb-3">{i18n.t('marketCap')}</h4>
                    <p>
                        {numeral(NumbersUtils.convertUnitNumber(stats.totalSupply[0].amount) * lum.price).format(
                            '$0,0',
                        )}
                    </p>
                </div>
                <div className="col-6 col-md-3 col-xxl-4 mb-4 mb-md-0">
                    <h4 className="mb-3">{i18n.t('dayVolume')}</h4>
                    {numeral(lum.volume24h).format('$0,0')}
                </div>
                <div className="col-12 offset-md-2 offset-xxl-0 col-md-4">
                    <p className="d-flex flex-row align-items-center">
                        <span className={`me-1 ${previousDayPercentage >= 0 ? 'arrow-up' : 'arrow-down'}`} />
                        {numeral(previousDayPercentage).format('+0.00%')} ({i18n.t('day')})
                    </p>
                    <p className="big-text">{numeral(lum.price).format('$0,0.000')}</p>
                </div>
            </div>
        </Card>
    );
};

export default Lum;
