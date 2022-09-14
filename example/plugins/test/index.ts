export default class TestPlugin {
  constructor(context: any) {
    console.log('TestPlugin')

    console.log(context)
  }

  getLoginUrl() {
    return 'login url'
  }
}
