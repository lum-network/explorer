import { Expose } from 'class-transformer';

class MetadataModel {
    @Expose({ name: 'has_nex_page' })
    hasNextPage?: boolean;

    @Expose({ name: 'has_previous_page' })
    hasPreviousPage?: boolean;

    @Expose({ name: 'items_count' })
    itemsCount?: number;

    @Expose({ name: 'items_total' })
    itemsTotal?: number;

    limit?: number;

    page?: number;

    @Expose({ name: 'pages_total' })
    pagesTotal?: number;
}

export default MetadataModel;
