enum MessagesType {
    CREATE_VALIDATOR = '/cosmos.staking.v1beta1.MsgCreateValidator',
    SEND = '/cosmos.bank.v1beta1.MsgSend',
    DELEGATE = '/cosmos.staking.v1beta1.MsgDelegate',
    UNDELEGATE = '/cosmos.staking.v1beta1.MsgUndelegate',
    EDIT_VALIDATOR = '/cosmos.staking.v1beta1.MsgEditValidator',
    MULTI_SEND = '/cosmos.bank.v1beta1.MsgMultiSend',
    GET_REWARD = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
    OPEN_BEAM = '/lum.network.beam.MsgOpenBeam',
    UPDATE_BEAM = '/lum.network.beam.MsgUpdateBeam',
    CLAIM_BEAM = '/lum.network.beam.MsgClaimBeam',
    SUBMIT_PROPOSAL = '/cosmos.gov.v1beta1.MsgSubmitProposal',
    DEPOSIT = '/cosmos.gov.v1beta1.MsgDeposit',
    VOTE = '/cosmos.gov.v1beta1.MsgVote',
    BEGIN_REDELEGATE = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
}

export default MessagesType;
