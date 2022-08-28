/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/naming-convention */

/**
 * Configuration for {@link Awaitable} decorator.
 */
export interface AwaitableConfig {
	/**
	 * Number of milliseconds when promises will be removed from cache.
	 *
	 * After that, the subsequent method call will create a new promise.
	 */
	ttl?: number;

	/**
	 * Custom hash function.
	 *
	 * If the method has arguments you can use them to create a custom hash key.
	 *
	 * @param args Method arguments to create a cache key from.
	 */
	hashFunction?: (...args: any[]) => string;
}

/**
 * Awaits for the existing promise to resolve instead of creating a new promise.
 *
 * @remarks
 * This decorator caches a promise of an async method. If the async method already has a pending promise,
 * subsequent method calls will wait on the existing promise instead of creating new promises.
 *
 * @alpha
 */
export function Awaitable(config?: AwaitableConfig): MethodDecorator;
export function Awaitable(hashFunction?: AwaitableConfig['hashFunction']): MethodDecorator;
export function Awaitable(
	configOrHashFunction: AwaitableConfig | AwaitableConfig['hashFunction'] = {}
): MethodDecorator {
	return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (typeof descriptor.value !== 'function') {
			throw new Error('Awaitable decorator must be applied only on async functions');
		}

		const originalMethod = descriptor.value as Function;

		let hashFunction: AwaitableConfig['hashFunction'];
		let ttl: AwaitableConfig['ttl'];

		if (typeof configOrHashFunction === 'object') {
			hashFunction = configOrHashFunction.hashFunction;
			ttl = configOrHashFunction.ttl;
		} else {
			hashFunction = configOrHashFunction;
		}

		const promisesMap = new Map<string, Promise<unknown>>();
		let promise: Promise<unknown> | null = null;

		descriptor.value = async function (...args: any[]) {
			if (hashFunction && args.length > 0) {
				const hashKey = hashFunction.apply(this, args);

				if (promisesMap.has(hashKey)) {
					return await promisesMap.get(hashKey)!;
				}

				const originalMethodPromise = originalMethod.apply(this, args) as Promise<unknown>;
				promisesMap.set(hashKey, originalMethodPromise);

				if (ttl) {
					setTimeout(() => promisesMap.delete(hashKey), ttl);
				}

				const result = await originalMethodPromise;

				promisesMap.delete(hashKey);

				return result;
			}

			if (promise) {
				return await promise;
			}

			promise = originalMethod.apply(this, args) as Promise<unknown>;

			if (ttl) {
				setTimeout(() => (promise = null), ttl);
			}

			const result = await promise;

			promise = null;

			return result;
		};
	};
}

export const awaitable = Awaitable;
