import React from 'react';
import lumLogo from 'assets/images/lum.svg';
import { Card, Loading } from 'frontend-elements';
import numeral from 'numeral';
import './Lum.scss';
import { i18n } from 'utils';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { LumConstants } from 'constant';

const Lum = (): JSX.Element => {
    const lum = useSelector((state: RootState) => state.core.lum);
    const loading = useSelector((state: RootState) => state.loading.effects.core.getLum);

    if (loading) {
        return (
            <Card className="h-100 d-flex align-items-center justify-content-center">
                <Loading />
            </Card>
        );
    }

    if (!lum || !lum.price || !lum.volume24h) {
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
                    <p>{numeral(LumConstants.TOTAL_TOKENS * lum.price).format('$0,0')}</p>
                </div>
                <div className="col-6 col-md-3 col-xxl-4 mb-4 mb-md-0">
                    <h4 className="mb-3">{i18n.t('dayVolume')}</h4>
                    {numeral(lum.volume24h).format('$0,0')}
                </div>
                <div className="col-12 offset-md-2 offset-xxl-0 col-md-4">
                    <p className="d-flex flex-row align-items-center">
                        <span className="arrow-up me-1" />
                        {numeral(0).format('+0.00%')} ({i18n.t('day')})
                    </p>
                    <p className="big-text">{numeral(lum.price).format('$0,0.00')}</p>
                </div>
            </div>
        </Card>
    );
};

export default Lum;
