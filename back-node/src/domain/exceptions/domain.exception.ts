export class DomainException<
    TContext = Record<string, unknown>
> extends Error {
    constructor(
        public readonly code: string,
        public readonly message: string,
        public readonly context?: TContext,
    ) {
        super(message);
    }
}