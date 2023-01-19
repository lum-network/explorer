import React from 'react';
import { Table, Card } from 'frontend-elements';
import { i18n, StringsUtils } from 'utils';
import placeholderTx from 'assets/images/placeholderTx.svg';
import tickerLum from 'assets/images/tickers/ticker_lum.svg';
import tickerDfr from 'assets/images/tickers/ticker_dfr.svg';
import tickerUsdc from 'assets/images/tickers/ticker_usdc.svg';
import tickerUnknown from 'assets/images/tickers/ticker_unknown.svg';
import numeral from 'numeral';
import SmallerDecimal from '../SmallerDecimal/SmallerDecimal';

type Asset = { amount: number; denom: string };

interface IProps {
    head: string[];
    assets: Asset[];
    title?: boolean;
}

const AssetsList = ({ head, assets, title }: IProps): JSX.Element => {
    const renderNameAndLogo = (denom: string) => {
        switch (denom) {
            case 'ulum':
                return ['LUM', tickerLum];
            case 'udfr':
                return ['DFR', tickerDfr];
            case 'uusdc':
                return ['USDC', tickerUsdc];
            default:
                return [StringsUtils.capitalize(denom.slice(1)), tickerUnknown];
        }
    };
    const renderRow = (asset: Asset, index: number, head: string[]) => {
        const [name, logo] = renderNameAndLogo(asset.denom);

        return (
            <tr key={index}>
                <td className="d-flex align-items-center" data-label={head[0]}>
                    <img className="me-2" alt={name} src={logo} /> {name}
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

    if (!assets || !assets.length) {
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
            <Table head={head}>{assets.map((asset, index) => renderRow(asset, index, head))}</Table>
        </Card>
    );
};

export default AssetsList;
