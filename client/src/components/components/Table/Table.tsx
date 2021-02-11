import React, { PureComponent } from 'react';

interface IProps {
    head: string[];
}

class Table extends PureComponent<IProps> {
    render(): JSX.Element {
        const { head, children } = this.props;

        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {head.map((value: string, index) => (
                                <th key={index}>{value}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        );
    }
}

export default Table;
