import React from 'react';
import BeamStatusHeader from './BeamStatusHeader';
import BeamStatusUpdateCard from './BeamStatusUpdateCard';

const BeamClose = ({ date }: { date: string }): JSX.Element => {
    return (
        <>
            <BeamStatusHeader date={date} status="Close" />
            <BeamStatusUpdateCard></BeamStatusUpdateCard>
        </>
    );
};

export default BeamClose;
