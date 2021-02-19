import React, { PureComponent } from 'react';
import QRCode from 'qrcode.react';
import logoDark from 'assets/images/logoDark.svg';

interface Props {
    content: string;
    size?: number;
    color?: string;
}

class CodeQR extends PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {
        const { content, size: sizeProps, color } = this.props;
        const size = sizeProps || 80;
        const logoSize = size / 4.0;

        return (
            <QRCode
                size={size}
                value={content}
                fgColor={color || '#2E2E2E'}
                level={'Q'}
                includeMargin={false}
                imageSettings={{
                    src: logoDark,
                    height: logoSize,
                    width: logoSize,
                    excavate: true,
                }}
            />
        );
    }
}

export default CodeQR;
