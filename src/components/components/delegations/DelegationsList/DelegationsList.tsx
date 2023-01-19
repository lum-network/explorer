import React from 'react';
import { Table } from 'frontend-elements';
import { Link } from 'react-router-dom';
import { DelegationModel, MetadataModel } from 'models';
import { i18n, NumbersUtils, StringsUtils } from 'utils';
import { NavigationConstants } from 'constant';
import numeral from 'numeral';
import { RewardModel } from 'models/models/account';
import placeholderTx from 'assets/images/placeholderTx.svg';
import { LumConstants } from '@lum-network/sdk-javascript';
import SmallerDecimal from '../../SmallerDecimal/SmallerDecimal';

interface IProps {
    delegations: DelegationModel[];
    rewards: RewardModel[];
    title?: boolean;
    metadata?: MetadataModel;
    onPageChange?: (page: number) => void;
    total?: boolean;
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

        return parseFloat(result.reward[0].amount || '0');
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
                    <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(delegation.shares || 0)).format('0,0.000000')} />
                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                </td>
                <td data-label={head[2]} className="text-end">
                    <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(getReward(delegation.validatorAddress))).format('0,0.000000')} />
                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                </td>
            </tr>
        );
    };

    const { delegations, title, total, metadata, onPageChange } = props;
    const head = [i18n.t('validatorAddress'), i18n.t('amount'), i18n.t('reward')];

    if (!delegations || !delegations.length) {
        return (
            <div className="mb-5 d-flex justify-content-center align-items-center flex-column h-100">
                <img className="mb-2 placeholder-image" alt="placeholder" src={placeholderTx} />
                {i18n.t('noDelegatedToken')}
            </div>
        );
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                {title && (
                    <h3 className="mx-xl-5 mb-xl-2 mx-3 mt-3">
                        {i18n.t('delegations')} {total && metadata && <span> ({numeral(metadata.itemsTotal).format('0,0')})</span>}
                    </h3>
                )}
            </div>
            <Table pagination={metadata} onPageChange={onPageChange} head={head}>
                {delegations.map((delegation, index) => renderRow(delegation, index, head))}
            </Table>
        </>
    );
};

export default DelegationsList;
