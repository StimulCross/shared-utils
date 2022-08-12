/**
 * Extendable custom error.
 */
export abstract class CustomError extends Error {
	constructor(message?: string) {
		super(message);

		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this, new.target.constructor);
	}

	/**
	 * Error name.
	 */
	get name(): string {
		return this.constructor.name;
	}
}
