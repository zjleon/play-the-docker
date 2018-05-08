export const post = (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'signMeIn') {
        resolve({
          code: 200,
          token: 'JWT',
        })
      } else {
        reject({
          code: 401,
          message: 'unautherized',
        })
      }
    }, 3000)
  })
}
