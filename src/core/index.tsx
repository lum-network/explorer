import React, { useEffect, useState } from 'react';
import RootNavigator from 'navigation';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux/store';
import { BlocksModel, TransactionsModel } from 'models';
import { ApiConstants, SocketConstants } from 'constant';
import { plainToClass } from 'class-transformer';
import io, { Socket } from 'socket.io-client';

const Core = (): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();

    let [socket] = useState<typeof Socket | null>(null);

    useEffect(() => {
        fetch();
        sockets();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const fetch = () => {
        dispatch.blocks.fetchBlocks().finally(() => null);
        dispatch.transactions.fetchTransactions().finally(() => null);
        dispatch.validators.fetchValidators().finally(() => null);
        dispatch.core.getStats().finally(() => null);
    };

    const sockets = () => {
        socket = io(String(ApiConstants.BASE_URL));
        socket.on('connect', () => {
            if (!socket) {
                console.warn('cannot listen channel, null socket pointer');
                return;
            }

            socket.emit(
                SocketConstants.LISTEN_CHANNEL,
                JSON.stringify({
                    name: SocketConstants.BLOCKS,
                }),
            );

            socket.io.emit(
                SocketConstants.LISTEN_CHANNEL,
                JSON.stringify({
                    name: SocketConstants.TRANSACTIONS,
                }),
            );

            socket.on(SocketConstants.NEW_TRANSACTION_EVENT, (data: Record<string, unknown>) => {
                const transaction = plainToClass(TransactionsModel, data);

                dispatch.transactions.addTransaction(transaction);
            });

            socket.on(SocketConstants.NEW_BLOCK_EVENT, (data: Record<string, unknown>) => {
                const block = plainToClass(BlocksModel, data);

                dispatch.blocks.addBlock(block);
            });
        });
    };

    return <RootNavigator />;
};

export default Core;
