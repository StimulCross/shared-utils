export type Optional<T extends object, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
