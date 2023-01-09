import React from 'react';
import moment from 'moment';
import { Button } from 'frontend-elements';

interface Props {
    date: string;
    status: string;
    index?: number;
    onViewJson?: () => void;
}

const BeamStatusHeader = ({ date, status, index, onViewJson }: Props): JSX.Element => (
    <div className="status-header">
        <div>
            <h4>
                <span>
                    <div className="dot me-4" />
                </span>
                {status} {index ? index : null}
                <span>
                    <div className="date-badge ms-4">{moment(date).format('D MMMM YYYY - LTS')}</div>
                </span>
            </h4>
        </div>
        {onViewJson && <Button onPress={onViewJson}>View Json</Button>}
    </div>
);

export default BeamStatusHeader;
