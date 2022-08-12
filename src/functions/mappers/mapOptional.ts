// Taken from https://github.com/d-fischer/shared-utils/blob/main/src/functions/optional/mapOptional.ts

import { isNil } from '../types/isNil';

/**
 * Maps a possibly nullish value to the desired result.
 *
 * Returns `undefined` if the value is nullish.
 *
 * @param val A value to map.
 * @param cb A function that transforms the value if it is not nullish.
 */
export function mapOptional<I, O>(val: I | null | undefined, cb: (val: I) => O): O | undefined {
	return isNil(val) ? undefined : cb(val);
}
