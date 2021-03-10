import React, { PureComponent } from 'react';
import check from 'assets/images/check.svg';
import cross from 'assets/images/cross.svg';
import warning from 'assets/images/warning.svg';
import './Badge.scss';
import { ValidatorsType } from 'constant';
import { i18n } from 'utils';

interface IProps {
    validatorsType?: ValidatorsType;
    jailed?: boolean;
    success?: boolean;
}

class Badge extends PureComponent<IProps> {
    render(): JSX.Element | null {
        const { success, jailed, validatorsType } = this.props;

        if (jailed) {
            return (
                <div className="d-flex align-items-center">
                    <div className="app-badge failure">
                        <p className="text failure">
                            <img alt="checkmark" src={cross} /> {i18n.t('badgeJailed')}
                        </p>
                    </div>
                </div>
            );
        }

        if (validatorsType !== undefined) {
            {
                switch (validatorsType) {
                    case ValidatorsType.ACTIVE:
                        return (
                            <div>
                                <div className="app-badge success">
                                    <p className="text success">
                                        <img alt="checkmark" src={check} /> {i18n.t('badgeActive')}
                                    </p>
                                </div>
                            </div>
                        );

                    case ValidatorsType.UNBONDING:
                        return (
                            <div>
                                <div className="app-badge warning">
                                    <p className="text warning">
                                        <img alt="checkmark" src={warning} /> {i18n.t('badgeUnbonding')}
                                    </p>
                                </div>
                            </div>
                        );

                    default:
                        return (
                            <div>
                                <div className="app-badge failure">
                                    <p className="text failure">
                                        <img alt="checkmark" src={cross} /> {i18n.t('badgeUnbonded')}
                                    </p>
                                </div>
                            </div>
                        );
                }
            }
        }

        return (
            <div>
                <div className={`app-badge ${success ? 'success' : 'failure'}`}>
                    <p className={`text ${success ? 'success' : 'failure'}`}>
                        {success ? (
                            <>
                                <img alt="checkmark" src={check} /> {i18n.t('badgeSuccess')}
                            </>
                        ) : (
                            <>
                                <img alt="checkmark" src={cross} /> {i18n.t('badgeFail')}
                            </>
                        )}
                    </p>
                </div>
            </div>
        );
    }
}

export default Badge;
