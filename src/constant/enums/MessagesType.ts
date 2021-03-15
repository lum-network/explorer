enum MessagesType {
    CREATE_VALIDATOR = '/cosmos.staking.v1beta1.MsgCreateValidator',
    SEND = '/cosmos.bank.v1beta1.MsgSend',
    DELEGATE = '/cosmos.staking.v1beta1.MsgDelegate',
    UNDELEGATE = '/cosmos.staking.v1beta1.MsgUndelegate',
    EDIT_VALIDATOR = '/cosmos.staking.v1beta1.MsgEditValidator',
    MULTI_SEND = '/cosmos.bank.v1beta1.MsgMultiSend',
}

export default MessagesType;
