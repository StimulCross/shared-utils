/**
 * Checks whether a given value is an array.
 *
 * @param val The value to check.
 */
export function isArray<T = unknown>(val: unknown): val is T[] {
	return Array.isArray(val);
}
