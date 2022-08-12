import { Writable } from './Writable';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ReadOnly(target: object, key: string | symbol): void {
	return Writable(false)(target, key);
}

export const readonly = ReadOnly;
