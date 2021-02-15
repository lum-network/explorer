import React, { PureComponent } from 'react';
import check from 'assets/images/check.svg';
import cross from 'assets/images/cross.svg';
import warning from 'assets/images/warning.svg';
import './Badge.scss';
import { ValidatorsType } from 'constant';

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
                <div className="d-flex justify-content-end">
                    <div className="app-badge failure">
                        <p className="text failure">
                            <img alt="checkmark" src={cross} /> Jailed
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
                            <div className="d-flex justify-content-end">
                                <div className="app-badge success">
                                    <p className="text success">
                                        <img alt="checkmark" src={check} /> Active
                                    </p>
                                </div>
                            </div>
                        );

                    case ValidatorsType.UNBOUNDING:
                        return (
                            <div className="d-flex justify-content-end">
                                <div className="app-badge warning">
                                    <p className="text warning">
                                        <img alt="checkmark" src={warning} /> Unbounding
                                    </p>
                                </div>
                            </div>
                        );

                    default:
                        return (
                            <div className="d-flex justify-content-end">
                                <div className="app-badge failure">
                                    <p className="text failure">
                                        <img alt="checkmark" src={cross} /> Unbounded
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
                                <img alt="checkmark" src={check} /> Success
                            </>
                        ) : (
                            <>
                                <img alt="checkmark" src={cross} /> Fail
                            </>
                        )}
                    </p>
                </div>
            </div>
        );
    }
}

export default Badge;
