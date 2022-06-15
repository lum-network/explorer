import React from 'react';
import { Card, Table } from 'frontend-elements';
import { Link } from 'react-router-dom';
import { DelegationModel } from 'models';
import { i18n, NumbersUtils, StringsUtils } from 'utils';
import { NavigationConstants, NumberConstants } from 'constant';
import numeral from 'numeral';
import { RewardModel } from 'models/models/account';
import placeholderTx from 'assets/images/placeholderTx.svg';
import { LumConstants } from '@lum-network/sdk-javascript';
import SmallerDecimal from '../../SmallerDecimal/SmallerDecimal';

interface IProps {
    delegations: DelegationModel[];
    rewards: RewardModel[];
    title?: boolean;
}

const DelegationsList = (props: IProps): JSX.Element => {
    const getReward = (validatorAddress?: string): number => {
        const { rewards } = props;

        if (!validatorAddress) {
            return 0;
        }

        const result = rewards.find((reward) => reward.validatorAddress === validatorAddress);

        if (!result || !result.reward || !result.reward.length) {
            return 0;
        }

        return parseFloat(result.reward[0].amount || '0') / NumberConstants.CLIENT_PRECISION;
    };

    const renderRow = (delegation: DelegationModel, index: number, head: string[]) => {
        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <Link title={delegation.delegatorAddress} to={`${NavigationConstants.VALIDATORS}/${delegation.validatorAddress}`}>
                        {StringsUtils.trunc(delegation.validatorAddress || '', 10)}
                    </Link>
                </td>
                <td data-label={head[1]}>
                    <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(delegation.shares || 0) / NumberConstants.CLIENT_PRECISION).format('0,0.000000')} />
                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                </td>
                <td data-label={head[2]} className="text-end">
                    <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(getReward(delegation.validatorAddress))).format('0,0.000000')} />
                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                </td>
            </tr>
        );
    };

    const { delegations, title } = props;
    const head = [i18n.t('validatorAddress'), i18n.t('amount'), i18n.t('reward')];

    if (!delegations || !delegations.length) {
        return (
            <Card className="mb-5 d-flex justify-content-center align-items-center flex-column h-100">
                <img className="mb-2 placeholder-image" alt="placeholder" src={placeholderTx} />
                {i18n.t('noDelegatedToken')}
            </Card>
        );
    }

    return (
        <Card withoutPadding className="mb-5 h-100">
            <div className="d-flex justify-content-between">{title && <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">{i18n.t('delegations')}</h3>}</div>
            <Table head={head}>{delegations.map((delegation, index) => renderRow(delegation, index, head))}</Table>
        </Card>
    );
};

export default DelegationsList;
