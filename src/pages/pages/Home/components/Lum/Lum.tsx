import React, { PureComponent } from 'react';
import lumLogo from 'assets/images/lum.svg';
import { Card } from 'components';
import numeral from 'numeral';
import './Lum.scss';
import { i18n } from 'utils';

class Lum extends PureComponent {
    render(): JSX.Element {
        return (
            <Card className="h-100">
                <img alt="Lum" className="placeholder-image mb-4" src={lumLogo} />
                <div className="row">
                    <div className="col-6 col-md-3 col-xxl-4 mb-4 mb-md-0">
                        <h4 className="mb-3">{i18n.t('marketCap')}</h4>
                        <p>{numeral(1000000000).format('$0,0')}</p>
                    </div>
                    <div className="col-6 col-md-3 col-xxl-4 mb-4 mb-md-0">
                        <h4 className="mb-3">{i18n.t('dayVolume')}</h4>
                        <p>{numeral(42067432).format('$0,0')}</p>
                    </div>
                    <div className="col-12 offset-md-2 offset-xxl-0 col-md-4">
                        <p className="d-flex flex-row align-items-center">
                            <span className="arrow-up me-1" />
                            {numeral(2.34 / 100).format('+0.00%')} ({i18n.t('day')})
                        </p>
                        <p className="big-text">{numeral(0.1).format('$0,0.00')}</p>
                    </div>
                </div>
            </Card>
        );
    }
}

export default Lum;
