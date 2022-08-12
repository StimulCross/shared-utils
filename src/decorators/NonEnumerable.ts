import { Enumerable } from './Enumerable';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function NonEnumerable(target: object, key: string | symbol): void {
	return Enumerable(false)(target, key);
}

export const nonenumerable = NonEnumerable;
