import React from 'react';
import { VotesOption } from 'constant';
import { i18n } from 'utils';
import './VoteOption.scss';

interface IProps {
    option: VotesOption;
}

const VoteOption = ({ option }: IProps): JSX.Element => {
    switch (option) {
        case VotesOption.YES:
            return <span className="vote-option-green">{i18n.t('yes')}</span>;
        case VotesOption.NO:
            return <span className="vote-option-red">{i18n.t('no')}</span>;
        case VotesOption.NO_WITH_VETO:
            return <span className="vote-option-blue">{i18n.t('noWithVeto')}</span>;
        case VotesOption.ABSTAIN:
            return <span className="vote-option-grey">{i18n.t('abstain')}</span>;
        default:
            return option;
    }
};

export default VoteOption;
