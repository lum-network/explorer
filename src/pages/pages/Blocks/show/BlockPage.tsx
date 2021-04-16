import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, TransactionsList } from 'components';
import { Card, Loading } from 'frontend-elements';
import '../Blocks.scss';

import moment from 'moment-timezone';
import { SystemConstants, NavigationConstants } from 'constant';
import blockLogo from 'assets/images/blockDark.svg';
import transactionLogo from 'assets/images/transactionDark.svg';
import clockLogo from 'assets/images/clockDark.svg';
import hashLogo from 'assets/images/hashDark.svg';
import validatorLogo from 'assets/images/validatorDark.svg';
import { i18n, StringsUtils } from 'utils';
import copyLogo from 'assets/images/copyDark.svg';
import placeholderTx from 'assets/images/placeholderTx.svg';
import arrowLeft from 'assets/images/arrowLeft.svg';
import arrowRight from 'assets/images/arrowRight.svg';

interface IProps extends RouteComponentProps<{ id: string }> {}

const BlockPage = (props: IProps): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const block = useSelector((state: RootState) => state.blocks.block);
    const loading = useSelector((state: RootState) => state.loading.effects.blocks.getBlock);

    const { id } = props.match.params;
    const { push } = props.history;

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        dispatch.blocks.getBlock(id).finally(() => null);
    }, []);

    useEffect(() => {
        dispatch.blocks.getBlock(id).finally(() => null);
    }, [id]);

    const copyHash = (): void => {
        if (!block.hash) {
            return;
        }

        navigator.clipboard.writeText(block.hash).finally(() => null);

        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const nextBlock = () => {
        push(`${NavigationConstants.BLOCKS}/${parseInt(id, 10) + 1}`);
    };

    const previousBlock = () => {
        push(`${NavigationConstants.BLOCKS}/${parseInt(id, 10) - 1}`);
    };

    const renderTransactions = (): JSX.Element | null => {
        if (!block || loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        const { transactions } = block;

        if (!transactions || !transactions.length) {
            return (
                <Card className="d-flex justify-content-center align-items-center flex-column">
                    <img className="mb-2 placeholder-image" alt="placeholder" src={placeholderTx} />
                    {i18n.t('noTransaction')}
                </Card>
            );
        }

        return <TransactionsList title transactions={transactions} />;
    };

    const renderInformation = (): JSX.Element => {
        if (!block || loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        return (
            <Card className="mb-5">
                <div className="row align-items-center">
                    <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={blockLogo} /> {i18n.t('height')}
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                        <p>{block.height}</p>
                    </div>
                    <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={transactionLogo} /> {i18n.t('numberOfTxs')}
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                        <p>{block.txCount}</p>
                    </div>
                    <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={clockLogo} /> {i18n.t('blockTime')}
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                        <p>{`${moment.utc(block.time).fromNow()} (${moment
                            .utc(block.time)
                            .tz(SystemConstants.TIMEZONE)
                            .format('lll')})`}</p>
                    </div>
                    <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={validatorLogo} /> {i18n.t('proposer')}
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                        <p title={block.operatorAddress}>
                            <Link to={`${NavigationConstants.VALIDATORS}/${block.operatorAddress}`}>
                                {StringsUtils.trunc(block.operatorAddress || '', 5)}
                            </Link>
                        </p>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={hashLogo} /> {i18n.t('blockHash')}
                        </h4>
                    </div>
                    <div className="col-lg-4 col-md-9 col-sm-8">
                        <Tooltip show={copied} content="Copied!" className="me-2" direction="right">
                            <div className="d-flex align-items-center">
                                <p title={block.hash}>{StringsUtils.trunc(block.hash || '', 10)}&nbsp;</p>
                                <img
                                    alt="copy"
                                    src={copyLogo}
                                    onClick={copyHash}
                                    className="pointer img-cpy placeholder-image"
                                />
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="mt-3 mb-4">
                    <img alt="block" src={blockLogo} /> {i18n.t('detailsForBlock')} #{(block && block.height) || id}
                </h2>
                <div className="d-flex">
                    <div className="arrow-container me-3 pointer" onClick={previousBlock}>
                        <img src={arrowLeft} alt="arrow left" />
                    </div>
                    <div className="arrow-container pointer" onClick={nextBlock}>
                        <img src={arrowRight} alt="arrow right" />
                    </div>
                </div>
            </div>
            {renderInformation()}
            {renderTransactions()}
        </>
    );
};

export default BlockPage;
