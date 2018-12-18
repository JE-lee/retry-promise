
/**
 * 
 * @param {Function} fn | supposed to return a promise
 * @param {Number} interval | roll interval
 * @param {Number} rollCount | max roll count, default is 10
 * @param {Function} onAttempt | the hook before retry, with two params, the first is retry times, the second is specified max retry times.
 */
export default function retry(fn, interval, rollCount = 10, onAttempt = null) {
  return new Promise((resolve, reject) => {
    let count = 0,
      retryFn = () => {
        count++;
        onAttempt && onAttempt(count, rollCount )
        fn().then(res => resolve(res))
          .catch((err) => {
            if (count >= rollCount) reject()
            else setTimeout(retryFn, interval || 0)
          })
      }
    retryFn()
  })
}