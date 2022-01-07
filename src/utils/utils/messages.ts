import { MessagesType } from 'constant';
import { i18n } from 'utils';
import createLogo from 'assets/images/messageTypes/create.svg';
import editLogo from 'assets/images/messageTypes/edit.svg';
import delegateLogo from 'assets/images/messageTypes/delegate.svg';
import undelegateLogo from 'assets/images/messageTypes/undelegate.svg';
import sendLogo from 'assets/images/messageTypes/send.svg';
import multiSendLogo from 'assets/images/messageTypes/multiSend.svg';
import getRewardLogo from 'assets/images/messageTypes/reward.svg';
import placeholderLogo from 'assets/images/messageTypes/beam.svg';
import beamOpenLogo from 'assets/images/messageTypes/openBeam.svg';
import beamUpdateLogo from 'assets/images/messageTypes/updateBeam.svg';
import beamClaimLogo from 'assets/images/messageTypes/claimBeam.svg';
import submitProposalLogo from 'assets/images/messageTypes/submitProposal.svg';
import depositLogo from 'assets/images/messageTypes/deposit.svg';
import voteLogo from 'assets/images/messageTypes/vote.svg';
import redelegateLogo from 'assets/images/messageTypes/redelegate.svg';
import gearsLogo from 'assets/images/messageTypes/gears.svg';
import commissionLogo from 'assets/images/messageTypes/commission.svg';
import unjailLogo from 'assets/images/messageTypes/unjail.svg';

export const name = (type?: MessagesType | null): { text: string; icon: string } => {
    switch (type) {
        case MessagesType.CREATE_VALIDATOR:
            return { text: i18n.t('createValidatorMessage'), icon: createLogo };

        case MessagesType.SEND:
            return { text: i18n.t('sendMessage'), icon: sendLogo };

        case MessagesType.DELEGATE:
            return { text: i18n.t('delegateMessage'), icon: delegateLogo };

        case MessagesType.UNDELEGATE:
            return { text: i18n.t('undelegateMessage'), icon: undelegateLogo };

        case MessagesType.EDIT_VALIDATOR:
            return { text: i18n.t('editValidatorMessage'), icon: editLogo };

        case MessagesType.MULTI_SEND:
            return { text: i18n.t('multiSendMessage'), icon: multiSendLogo };

        case MessagesType.GET_REWARD:
            return { text: i18n.t('getRewardMessage'), icon: getRewardLogo };

        case MessagesType.OPEN_BEAM:
            return { text: i18n.t('openBeamMessage'), icon: beamOpenLogo };

        case MessagesType.UPDATE_BEAM:
            return { text: i18n.t('updateBeamMessage'), icon: beamUpdateLogo };

        case MessagesType.CLAIM_BEAM:
            return { text: i18n.t('claimBeamMessage'), icon: beamClaimLogo };

        case MessagesType.SUBMIT_PROPOSAL:
            return { text: i18n.t('submitProposalMessage'), icon: submitProposalLogo };

        case MessagesType.DEPOSIT:
            return { text: i18n.t('depositMessage'), icon: depositLogo };

        case MessagesType.VOTE:
            return { text: i18n.t('voteMessage'), icon: voteLogo };

        case MessagesType.BEGIN_REDELEGATE:
            return { text: i18n.t('redelegateMessage'), icon: redelegateLogo };

        case MessagesType.CREATE_VESTING_ACCOUNT:
            return { text: i18n.t('createVestingAccount'), icon: gearsLogo };

        case MessagesType.WITHDRAW_VALIDATOR_COMMISSION:
            return { text: i18n.t('getCommission'), icon: commissionLogo };

        case MessagesType.UNJAIL:
            return { text: i18n.t('unjail'), icon: unjailLogo };

        default:
            return { text: type || '', icon: placeholderLogo };
    }
};
