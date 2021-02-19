import React, { PureComponent } from 'react';
import './Table.scss';

interface IProps {
    head: string[];
}

class Table extends PureComponent<IProps> {
    render(): JSX.Element {
        const { head, children } = this.props;
        const limitLeft = head.length / 2;

        return (
            <div className="table-responsive">
                <table className="table app-table-striped table-borderless">
                    <thead>
                        <tr>
                            {head.map((value: string, index) => (
                                <th className={limitLeft <= index ? 'text-end' : 'm-4'} key={index}>
                                    {value}
                                </th>
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
