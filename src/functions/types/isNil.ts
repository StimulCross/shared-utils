/**
 * Checks whether a given value is nullish.
 *
 * @param val The value to check.
 */
export function isNil(val: unknown): val is null | undefined {
	return val === null || val === undefined;
}
