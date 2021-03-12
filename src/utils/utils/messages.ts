import { MessagesType } from 'constant';
import { i18n } from 'utils';
import createLogo from 'assets/images/messageTypes/create.svg';
import editLogo from 'assets/images/messageTypes/edit.svg';
import delegateLogo from 'assets/images/messageTypes/delegate.svg';
import undelegateLogo from 'assets/images/messageTypes/undelegate.svg';
import sendLogo from 'assets/images/messageTypes/send.svg';
import multiSendLogo from 'assets/images/messageTypes/multiSend.svg';

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

        default:
            return { text: type || '', icon: '' };
    }
};
