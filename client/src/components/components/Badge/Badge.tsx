import React, { PureComponent } from 'react';
import check from 'assets/images/check.svg';
import cross from 'assets/images/cross.svg';
import './Badge.scss';

interface IProps {
    success: boolean;
}

class Badge extends PureComponent<IProps> {
    render(): JSX.Element {
        const { success } = this.props;
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
