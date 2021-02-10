import { MessagesType } from 'constant';
import { i18n } from 'utils';

export const name = (type?: MessagesType): string => {
    switch (type) {
        case MessagesType.CREATE_VALIDATOR:
            return i18n.t('createValidatorMessage');

        case MessagesType.SEND:
            return i18n.t('sendMessage');

        case MessagesType.DELEGATE:
            return i18n.t('delegateMessage');

        case MessagesType.UNDELEGATE:
            return i18n.t('undelegateMessage');

        case MessagesType.EDIT_VALIDATOR:
            return i18n.t('editValidatorMessage');

        default:
            return type || '';
    }
};
