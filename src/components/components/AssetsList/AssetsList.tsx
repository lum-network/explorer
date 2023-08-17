import React, { useEffect } from 'react';
import { Table, Card } from 'frontend-elements';
import { i18n } from 'utils';
import placeholderTx from 'assets/images/placeholderTx.svg';
import tickerAtom from 'assets/images/tickers/ticker_atom.svg';
import tickerLum from 'assets/images/tickers/ticker_lum.svg';
import tickerDfr from 'assets/images/tickers/ticker_dfr.svg';
import tickerUsdc from 'assets/images/tickers/ticker_usdc.svg';
import tickerUnknown from 'assets/images/tickers/ticker_unknown.svg';
import numeral from 'numeral';
import SmallerDecimal from '../SmallerDecimal/SmallerDecimal';

export type Asset = { amount: number; denom: string };

interface IProps {
    head: string[];
    assets: Asset[];
    title?: boolean;
}

const AssetsList = ({ head, assets, title }: IProps): JSX.Element => {
    const [assetsList, setAssetsList] = React.useState<Asset[]>([]);

    useEffect(() => {
        setAssetsList(assets.sort((a, b) => (a.amount > b.amount ? -1 : 1)));
    }, [assets]);

    const renderNameAndLogo = (denom: string) => {
        switch (denom) {
            case 'ulum':
                return ['LUM', tickerLum];
            case 'udfr':
                return ['DFR', tickerDfr];
            case 'ibc/05554A9BFDD28894D7F18F4C707AA0930D778751A437A9FE1F4684A3E1199728':
            case 'uusdc':
                return ['USDC', tickerUsdc];
            case 'ibc/A8C2D23A1E6F95DA4E48BA349667E322BD7A6C996D8A4AAE8BA72E190F3D1477':
            case 'uatom':
                return ['ATOM', tickerAtom];
            default:
                return [i18n.t('unknown'), tickerUnknown];
        }
    };
    const renderRow = (asset: Asset, index: number, head: string[]) => {
        const [name, logo] = renderNameAndLogo(asset.denom);

        return (
            <tr key={index}>
                <td title={asset.denom} className="d-flex align-items-center" data-label={head[0]}>
                    <img width={26} height={26} className="me-2" alt={name} src={logo} /> {name}
                </td>
                <td data-label={head[1]}>
                    <SmallerDecimal nb={numeral(asset.amount).format('0,0.000000')} />
                </td>
                <td className="text-end" data-label={head[2]}>
                    N/A
                </td>
            </tr>
        );
    };

    if (!assetsList || !assetsList.length) {
        return (
            <Card className="mb-5 d-flex justify-content-center align-items-center flex-column h-100">
                <img className="mb-2 placeholder-image" alt="placeholder" src={placeholderTx} />
                {i18n.t('noAssets')}
            </Card>
        );
    }

    return (
        <Card withoutPadding className="mb-5 h-100">
            <div className="d-flex justify-content-between">{title && <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">{i18n.t('assets')}</h3>}</div>
            <Table head={head}>{assetsList.map((asset, index) => renderRow(asset, index, head))}</Table>
        </Card>
    );
};

export default AssetsList;
