import EventEmitter from 'eventemitter3';
import { Queue } from './queue';
import PriorityQueue from './priority-queue';
import { QueueAddOptions, DefaultAddOptions, Options } from './options';
declare type Task<TaskResultType> = (() => PromiseLike<TaskResultType>) | (() => TaskResultType);
/**
Promise queue with concurrency control.
*/
export default class PQueue<QueueType extends Queue<EnqueueOptionsType> = PriorityQueue, EnqueueOptionsType extends QueueAddOptions = DefaultAddOptions> extends EventEmitter<'active'> {
    private readonly _carryoverConcurrencyCount;
    private readonly _isIntervalIgnored;
    private _intervalCount;
    private readonly _intervalCap;
    private readonly _interval;
    private _intervalEnd;
    private _intervalId?;
    private _timeoutId?;
    private _queue;
    private readonly _queueClass;
    private _pendingCount;
    private readonly _concurrency;
    private _paused;
    private _resolveEmpty;
    private _resolveIdle;
    private _timeout?;
    private readonly _throwOnTimeout;
    constructor(options?: Options<QueueType, EnqueueOptionsType>);
    readonly doesIntervalAllowAnother: boolean;
    readonly doesConcurrentAllowAnother: boolean;
    next(): void;
    resolvePromises(): void;
    onResumeInterval(): void;
    intervalPaused(): boolean;
    tryToStartAnother(): boolean;
    initializeIntervalIfNeeded(): void;
    onInterval(): void;
    /**
    Adds a sync or async task to the queue. Always returns a promise.
    */
    add<TaskResultType>(fn: Task<TaskResultType>, options?: EnqueueOptionsType): Promise<TaskResultType>;
    /**
    Same as `.add()`, but accepts an array of sync or async functions.

    @returns A promise that resolves when all functions are resolved.
    */
    addAll<TaskResultsType>(functions: ReadonlyArray<Task<TaskResultsType>>, options?: EnqueueOptionsType): Promise<TaskResultsType[]>;
    /**
    Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
    */
    start(): void;
    /**
    Put queue execution on hold.
    */
    pause(): void;
    /**
    Clear the queue.
    */
    clear(): void;
    /**
    Can be called multiple times. Useful if you for example add additional items at a later time.

    @returns A promise that settles when the queue becomes empty.
    */
    onEmpty(): Promise<void>;
    /**
    The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.

    @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
    */
    onIdle(): Promise<void>;
    /**
    Size of the queue.
    */
    readonly size: number;
    /**
    Number of pending promises.
    */
    readonly pending: number;
    /**
    Whether the queue is currently paused.
    */
    readonly isPaused: boolean;
    /**
    Set the timeout for future operations.
    */
    timeout: number | undefined;
}
export {};
