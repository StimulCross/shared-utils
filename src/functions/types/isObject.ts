/**
 * Checks whether a given value is an object.
 *
 * @param val The value to check.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject<T extends object = object>(val: unknown): val is T {
	return Object.prototype.toString.call(val) === '[object Object]';
}
