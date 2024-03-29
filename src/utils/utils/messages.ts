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
import millionsDepositLogo from 'assets/images/messageTypes/millionsDeposit.svg';
import millionsClaimPrizeLogo from 'assets/images/messageTypes/millionsClaimPrize.svg';
import millionsWithdrawLogo from 'assets/images/messageTypes/millionsWithdraw.svg';

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
        case MessagesType.VOTE2:
            return { text: i18n.t('voteMessage'), icon: voteLogo };

        case MessagesType.BEGIN_REDELEGATE:
            return { text: i18n.t('redelegateMessage'), icon: redelegateLogo };

        case MessagesType.CREATE_VESTING_ACCOUNT:
            return { text: i18n.t('createVestingAccountMessage'), icon: gearsLogo };

        case MessagesType.WITHDRAW_VALIDATOR_COMMISSION:
            return { text: i18n.t('getCommissionMessage'), icon: commissionLogo };

        case MessagesType.UNJAIL:
            return { text: i18n.t('unjailMessage'), icon: unjailLogo };

        case MessagesType.IBC_ACKNOWLEDGEMENT:
            return { text: i18n.t('ibcAcknowledgementMessage'), icon: placeholderLogo };

        case MessagesType.IBC_UPDATE_CLIENT:
            return { text: i18n.t('ibcUpdateClientMessage'), icon: placeholderLogo };

        case MessagesType.IBC_TIMEOUT:
            return { text: i18n.t('ibcTimeoutMessage'), icon: placeholderLogo };

        case MessagesType.IBC_TRANSFER:
            return { text: i18n.t('ibcTransferMessage'), icon: placeholderLogo };

        case MessagesType.IBC_RECV_PACKET:
            return { text: i18n.t('ibcRecvPacketMessage'), icon: placeholderLogo };

        case MessagesType.EXEC:
            return { text: i18n.t('execMessage'), icon: placeholderLogo };

        case MessagesType.GRANT:
            return { text: i18n.t('grantMessage'), icon: placeholderLogo };

        case MessagesType.SET_WITHDRAW_ADDRESS:
            return { text: i18n.t('setWithdrawAddressMessage'), icon: placeholderLogo };

        case MessagesType.MILLIONS_DEPOSIT:
            return { text: i18n.t('millionsDepositMessage'), icon: millionsDepositLogo };

        case MessagesType.MILLIONS_CLAIM_PRIZE:
            return { text: i18n.t('millionsClaimPrizeMessage'), icon: millionsClaimPrizeLogo };

        case MessagesType.MILLIONS_WITHDRAW:
            return { text: i18n.t('millionsWithdrawMessage'), icon: millionsWithdrawLogo };

        default:
            return { text: type || '', icon: placeholderLogo };
    }
};
