export const getFormattedDenom = (denom: string): string => {
    switch (denom) {
        case 'ulum':
            return 'lum';
        case 'udfr':
            return 'dfr';
        case 'ibc/05554A9BFDD28894D7F18F4C707AA0930D778751A437A9FE1F4684A3E1199728':
        case 'uusdc':
            return 'usdc';
        case 'ibc/A8C2D23A1E6F95DA4E48BA349667E322BD7A6C996D8A4AAE8BA72E190F3D1477':
        case 'uatom':
            return 'atom';
        default:
            return denom;
    }
}
