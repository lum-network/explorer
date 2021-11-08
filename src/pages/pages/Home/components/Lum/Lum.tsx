import React from 'react';
import lumLogo from 'assets/images/lum.svg';
import { Card } from 'frontend-elements';
import numeral from 'numeral';
import './Lum.scss';
import { i18n } from 'utils';

const Lum = (): JSX.Element => {
    return (
        <Card className="h-100">
            <img alt="Lum" className="placeholder-image mb-4" src={lumLogo} />
            <div className="row">
                <div className="col-6 col-md-3 col-xxl-4 mb-4 mb-md-0">
                    <h4 className="mb-3">{i18n.t('marketCap')}</h4>
                    <p>{numeral(50_000_000).format('$0,0')}</p>
                </div>
                <div className="col-6 col-md-3 col-xxl-4 mb-4 mb-md-0">
                    <h4 className="mb-3">{i18n.t('dayVolume')}</h4>
                    <p>coming soon</p>
                </div>
                <div className="col-12 offset-md-2 offset-xxl-0 col-md-4">
                    <p className="d-flex flex-row align-items-center">
                        <span className="arrow-up me-1" />
                        {numeral(0).format('+0.00%')} ({i18n.t('day')})
                    </p>
                    <p className="big-text">{numeral(0.01).format('$0,0.00')}</p>
                </div>
            </div>
        </Card>
    );
};

export default Lum;
