// Taken from https://github.com/d-fischer/shared-utils/blob/main/src/functions/config/resolveConfigValue.ts

export type ResolvableValue<T = unknown> = T | (() => T | Promise<T>);

export async function resolveValue<T>(value: ResolvableValue<T>): Promise<T> {
	if (typeof value === 'function') {
		return await (value as () => T | Promise<T>)();
	}

	return value;
}
