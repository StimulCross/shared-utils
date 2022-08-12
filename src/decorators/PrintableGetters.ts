/**
 * Makes instance getters printable in console output in NodeJs as if they were regular properties.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function PrintableGetters<T extends object>(): ClassDecorator {
	return cls => {
		const fn = function (this: T): object {
			const prototype = Object.getPrototypeOf(this) as object;

			const getters = Object.entries(Object.getOwnPropertyDescriptors(prototype))
				.filter(([, val]) => typeof val.get === 'function')
				.map(([key]) => [key, this[key as keyof T]])
				.filter(([, value]) => (value as unknown) !== undefined);

			const objectFromEntries: Record<string, unknown> = {};
			getters.forEach(([key, val]) => (objectFromEntries[key as string] = val));

			const object = Object.create(this, Object.getOwnPropertyDescriptors(objectFromEntries)) as object;

			Object.defineProperty(object, Symbol.for('nodejs.util.inspect.custom'), {});
			return object;
		};

		Object.defineProperty(cls.prototype, Symbol.for('nodejs.util.inspect.custom'), {
			value: fn,
			enumerable: false
		});
	};
}

export const printableGetters = PrintableGetters;
