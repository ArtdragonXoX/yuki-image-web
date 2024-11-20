export type StatisticsFunc<T1 extends number | null,
    T2 extends Date,
    T3 extends Date,
    U extends Promise<{ [key: string]: number }>>
    = (i1: T1, i2: T2, i3: T3) => U;