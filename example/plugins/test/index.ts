export default class TestPlugin {
  constructor(context: any) {
    console.log('TestPlugin')

    const hooks = context.hooks
    hooks.createArticle.tapAsync("testPlugin", (article: any, cb: any)=>{
      return new Promise((resolve, reject)=>{
        console.log(article)
        setTimeout(() => {
          cb('123123')
          resolve('dsd')
        }, 2000 * 2);
      })
    })

    hooks.createArticle.tapAsync("testPlugin2", (article: any, cb: any)=>{
      return new Promise((resolve, reject)=>{
        console.log(article)
        setTimeout(() => {
          cb('testPlugin2')
          resolve('dsd')
        }, 2000 * 2);
      })
    })
  }

  getLoginUrl() {
    return 'login url'
  }
}
