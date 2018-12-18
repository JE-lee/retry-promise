import retry from '../index'
const assert = require('assert')

const fetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(reject, 20);
  })
}

let c = 0
const fetch2 = () => {
  c ++ 
  return new Promise((resolve, reject) => {
    setTimeout(c >= 3 ? resolve: reject, 20);
  })
}


describe('retry', function(){
  it('should retry 5',function(){
    this.timeout(10000)
    let retries = 0

    return retry(fetch, 50, 5, r => retries = r)
      .catch(() => {
        if (retries != 5) return Promise.reject()
        return Promise.resolve()
      })
  })

  it('should retry 3', function(){
    this.timeout(10000)
    let retries = 0

    return retry(fetch2, 50, 5, r => retries = r)
      .catch(() => {
        if (retries != 3) return Promise.reject()
        return Promise.resolve()
      }) 
  })
})