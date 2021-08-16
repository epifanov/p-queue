var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import lowerBound from './lower-bound';
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue() {
        this._queue = [];
    }
    PriorityQueue.prototype.enqueue = function (run, options) {
        options = __assign({ priority: 0 }, options);
        var element = {
            priority: options.priority,
            run: run
        };
        if (this.size && this._queue[this.size - 1].priority >= options.priority) {
            this._queue.push(element);
            return;
        }
        var index = lowerBound(this._queue, element, function (a, b) { return b.priority - a.priority; });
        this._queue.splice(index, 0, element);
    };
    PriorityQueue.prototype.dequeue = function () {
        var item = this._queue.shift();
        return item && item.run;
    };
    Object.defineProperty(PriorityQueue.prototype, "size", {
        get: function () {
            return this._queue.length;
        },
        enumerable: true,
        configurable: true
    });
    return PriorityQueue;
}());
export default PriorityQueue;
//# sourceMappingURL=priority-queue.js.map