import { isObject } from '../types/isObject';

/**
 * Flattens a given objects.
 *
 * @param obj Object to flat.
 */
export function flattenObject(obj: Record<PropertyKey, unknown>): Record<PropertyKey, unknown> {
	const result: Record<PropertyKey, unknown> = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			if (isObject(obj[key])) {
				const tempObj = flattenObject(obj[key] as Record<PropertyKey, unknown>);

				for (const tempKey in tempObj) {
					if (Object.prototype.hasOwnProperty.call(tempObj, tempKey)) {
						result[tempKey] = tempObj[tempKey];
					}
				}
			} else {
				result[key] = obj[key];
			}
		}
	}

	return result;
}
