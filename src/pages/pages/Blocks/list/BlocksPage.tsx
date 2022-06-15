import React, { useEffect } from 'react';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { BlocksList } from 'components';
import blockLogo from 'assets/images/blockDark.svg';
import { i18n } from 'utils';

const BlocksPage = (): JSX.Element | null => {
    const dispatch = useDispatch<Dispatch>();
    const blocks = useSelector((state: RootState) => state.blocks.blocks);
    const metadata = useSelector((state: RootState) => state.blocks.metadata);

    useEffect(() => {
        dispatch.blocks.fetchBlocks().finally(() => null);
    }, []);

    if (!blocks) {
        return null;
    }

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="block" src={blockLogo} /> {i18n.t('blocks')}
            </h2>
            <BlocksList blocks={blocks} metadata={metadata} />
        </>
    );
};

export default BlocksPage;
