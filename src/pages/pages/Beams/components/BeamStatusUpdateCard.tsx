import React from 'react';
import { useWindowSize } from 'utils/utils/hooks';

const BeamStatusUpdateCard: React.FC<{ withLine?: boolean }> = ({ children, withLine = true }): JSX.Element => {
    const winSizes = useWindowSize();

    return (
        <div className="beam-history d-flex flex-row align-items-stretch py-4">
            <div className={`beam-content ${withLine && winSizes.width >= 992 ? 'with-line' : ''}`}>{children}</div>
        </div>
    );
};

export default BeamStatusUpdateCard;
