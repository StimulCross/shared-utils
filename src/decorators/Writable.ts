// eslint-disable-next-line @typescript-eslint/naming-convention
export function Writable(writable: boolean = true): PropertyDecorator {
	return function (target: object, key: string | symbol) {
		Object.defineProperty(target, key, {
			get() {
				return undefined;
			},

			set(this: never, value: unknown) {
				Object.defineProperty(this, key, {
					value,
					writable,
					enumerable: true
				});
			}
		});
	};
}

export const writable = Writable;
