import React from 'react';

const BeamStatusUpdateCard: React.FC<{ withLine?: boolean }> = ({ children, withLine = true }): JSX.Element => {
    return (
        <div className="beam-history d-flex flex-row align-items-stretch py-4">
            <div className={`history-line me-3 ${!withLine && 'hidden'}`} />
            <div className="ms-3 w-100 pb-5">{children}</div>
        </div>
    );
};

export default BeamStatusUpdateCard;
