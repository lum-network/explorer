import { Exclude, Expose, Type } from 'class-transformer';
import CoinModel from './coin';

@Exclude()
class ProductsReviewsContentResponse {
    @Expose({ name: 'cons' })
    cons: string;

    @Expose({ name: 'overall' })
    overall: string;

    @Expose({ name: 'pros' })
    pros: string;
}

@Exclude()
class ProductsReviewsRatingsResponse {
    @Expose({ name: 'overall' })
    overall: number;

    @Expose({ name: 'quality' })
    quality: number;
}

@Exclude()
class ProductsReviewsProductResponse {
    @Expose({ name: 'name' })
    name: string;

    @Expose({ name: 'url' })
    url: string;

    @Expose({ name: 'urls' })
    urls: string[];

    @Expose({ name: 'ids' })
    ids: {
        asins: string[];
        gtins: string[];
        mpns: string[];
        skus: string[];
    };
}

@Exclude()
class ProductsReviewsResponse {
    @Expose({ name: 'collection_method' })
    collectionMethod: string;

    @Expose({ name: 'order_id' })
    orderId: string;

    @Expose({ name: 'rating_url' })
    ratingUrl: string;

    @Expose({ name: 'review_id' })
    reviewId: string;

    @Expose({ name: 'review_url' })
    reviewUrl: string;

    @Expose({ name: 'timestamp' })
    timestamp: string;

    @Expose({ name: 'title' })
    title: string;

    @Expose({ name: 'content' })
    @Type(() => ProductsReviewsContentResponse)
    content: ProductsReviewsContentResponse;

    @Expose({ name: 'ratings' })
    @Type(() => ProductsReviewsRatingsResponse)
    ratings: ProductsReviewsRatingsResponse;

    @Expose({ name: 'products' })
    @Type(() => ProductsReviewsProductResponse)
    products: ProductsReviewsProductResponse[];
}

@Exclude()
class RewardDetailsResponse {
    @Expose({ name: 'amount' })
    amount: number;

    @Expose({ name: 'max_amount' })
    maxAmount: number;

    @Expose({ name: 'status' })
    status: string;

    @Expose({ name: 'type' })
    type: string;
}

@Exclude()
class RewardResponse {
    @Expose({ name: 'amount' })
    amount: number;

    @Expose({ name: 'currency' })
    currency: string;

    @Expose({ name: 'max_amount' })
    maxAmount: number;

    @Expose({ name: 'status' })
    status: string;

    @Expose({ name: 'trigger' })
    trigger: string;

    @Expose({ name: 'details' })
    @Type(() => RewardDetailsResponse)
    details: RewardDetailsResponse[];
}

@Exclude()
class MerchantReviewContentResponse {
    @Expose({ name: 'customer_service' })
    customerService: string;

    @Expose({ name: 'overall' })
    overall: string;
}

@Exclude()
class MerchantReviewRatingsResponse {
    @Expose({ name: 'overall' })
    overall: number;

    @Expose({ name: 'nps' })
    nps: number;

    @Expose({ name: 'customer_service' })
    customerService: number;
}

@Exclude()
class MerchantReviewResponse {
    @Expose({ name: 'collection_method' })
    collectionMethod: string;

    @Expose({ name: 'merchant_url' })
    merchantUrl: string;

    @Expose({ name: 'order_id' })
    orderId: string;

    @Expose({ name: 'rating_url' })
    ratingUrl: string;

    @Expose({ name: 'review_id' })
    reviewId: string;

    @Expose({ name: 'review_url' })
    reviewUrl: string;

    @Expose({ name: 'timestamp' })
    timestamp: string;

    @Expose({ name: 'title' })
    title: string;

    @Expose({ name: 'content' })
    @Type(() => MerchantReviewContentResponse)
    content: MerchantReviewContentResponse;

    @Expose({ name: 'ratings' })
    @Type(() => MerchantReviewRatingsResponse)
    ratings: MerchantReviewRatingsResponse;
}

@Exclude()
class DataResponse {
    @Expose({ name: 'products_Reviews' })
    @Type(() => ProductsReviewsResponse)
    productsReviews: ProductsReviewsResponse[];

    @Expose({ name: 'reward' })
    @Type(() => RewardResponse)
    reward: RewardResponse;

    @Expose({ name: 'merchant_review' })
    @Type(() => MerchantReviewResponse)
    merchantReview: MerchantReviewResponse;
}

@Exclude()
class BeamModel {
    @Expose({ name: 'amount' })
    amount: CoinModel;

    @Expose({ name: 'cancel_reason' })
    cancelReason: string;

    @Expose({ name: 'claim_address' })
    claimAddress: string;

    @Expose({ name: 'claim_expires_at_block' })
    claimExpiresAtBlock: number;

    @Expose({ name: 'claimed' })
    claimed: boolean;

    @Expose({ name: 'close_at' })
    closeAt: string;

    @Expose({ name: 'closes_at_block' })
    closesAtBlock: number;

    @Expose({ name: 'created_at' })
    createdAt: string;

    @Expose({ name: 'creator_address' })
    creatorAddress: string;

    @Expose({ name: 'funds_withdrawn' })
    fundsWithdrawn: boolean;

    @Expose({ name: 'hide_content' })
    hideContent: boolean;

    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'schema' })
    schema: string;

    @Expose({ name: 'secret' })
    secret: string;

    @Expose({ name: 'status' })
    status: number;

    @Expose({ name: 'data' })
    @Type(() => DataResponse)
    data: DataResponse;
}

export default BeamModel;
