/* eslint-disable @typescript-eslint/no-var-requires */
import * as path from 'path'
import PluginConfigure from './PluginConfigure'

export default class Plugin {
  private pluginRootPath = ''
  private pluginConfigure: PluginConfigure | null = null
  private pluginInstance = null
  private $context: any = null
  private hooks: any
  constructor(pluginRootPath: string, pluginConfigure: PluginConfigure, hooks: any) {
    this.pluginRootPath = pluginRootPath
    this.pluginConfigure = pluginConfigure
    this.hooks = hooks
  }

  /**
   * 启动该插件
   */
  start() {
    const entry = path.resolve(this.pluginRootPath, this.pluginConfigure!.entry)

    const pluginClass = require(entry).default

    this.$context = {
      pluginPath: this.pluginRootPath,
      hooks: this.hooks
    }

    if (pluginClass instanceof Function) {
      this.pluginInstance = new pluginClass(this.$context)
    }
  }
}
