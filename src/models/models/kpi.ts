import { Expose, Type } from 'class-transformer';

class Beams {
    @Expose()
    total: number;

    @Expose()
    pending: number;

    @Expose()
    validated: number;

    @Expose()
    canceled: number;
}

class Rewards {
    @Expose()
    total: number;

    @Expose()
    average: number;

    @Expose({ name: 'best_ath' })
    bestAth: number;

    @Expose({ name: 'best_today' })
    bestToday: number;
}

class Medias {
    @Expose()
    total: number;
}

class Merchants {
    @Expose()
    total: number;
}

class KpiModel {
    @Expose()
    @Type(() => Beams)
    beams: Beams = new Beams();

    @Expose()
    @Type(() => Rewards)
    rewards: Rewards = new Rewards();

    @Expose()
    @Type(() => Medias)
    medias: Medias = new Medias();

    @Expose()
    @Type(() => Merchants)
    merchants: Merchants = new Merchants();
}

export default KpiModel;
