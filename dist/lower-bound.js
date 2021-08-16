// Port of lower_bound from http://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion index to keep queue sorted after insertion
export default function lowerBound(array, value, comparator) {
    var first = 0;
    var count = array.length;
    while (count > 0) {
        var step = (count / 2) | 0;
        var it = first + step;
        if (comparator(array[it], value) <= 0) {
            first = ++it;
            count -= step + 1;
        }
        else {
            count = step;
        }
    }
    return first;
}
//# sourceMappingURL=lower-bound.js.map