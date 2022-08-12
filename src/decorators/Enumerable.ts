// Taken from https://github.com/d-fischer/shared-utils/blob/main/src/decorators/Enumerable.ts

/* eslint-disable @typescript-eslint/naming-convention */
export function Enumerable(enumerable = true): PropertyDecorator {
	return function (target: object, key: string | symbol) {
		// first property defined in prototype, that's why we use getters/setters
		// (otherwise assignment in object will override property in prototype)
		Object.defineProperty(target, key, {
			get() {
				return undefined;
			},
			set(this: object, val: unknown) {
				// here we have a reference to the instance and can set property directly to it
				Object.defineProperty(this, key, {
					value: val,
					writable: true,
					enumerable
				});
			},

			enumerable
		});
	};
}

export const enumerable = Enumerable;
