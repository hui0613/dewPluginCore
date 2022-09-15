import { Framework } from './core/Framework'
export default class DewCore {
  public static dewInstance: DewCore
  private framework: Framework | null = null

  private constructor(pluginPath: string) {
    console.log(pluginPath)

    this.framework = new Framework(pluginPath)
  }

  public static getSignInstance(pluginPath: string) {
    if (!DewCore.dewInstance) {
      DewCore.dewInstance = new DewCore(pluginPath)
    }
    return DewCore.dewInstance
  }

  public createArticle(){
    this.framework?.createArticle()
  }
  
}
