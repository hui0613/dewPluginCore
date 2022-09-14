/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs'
import * as path from 'path'
import Plugin from './Plugin'
import PluginConfigure from './PluginConfigure'

export default class PluginInstaller {
  private pluginRootDir = ''
  private pluginMap: Map<string, Plugin> = new Map<string, Plugin>()

  constructor(pluginPath: string) {
    this.pluginRootDir = pluginPath

    this.loadAllPlugins()
  }

  // 加载所有的插件
  private loadAllPlugins() {
    const plugins = fs.readdirSync(this.pluginRootDir).filter((item: string) => {
      const fullPath = path.resolve(this.pluginRootDir, item)
      const fsStats: fs.Stats = fs.statSync(fullPath)
      return fsStats.isDirectory()
    })

    for (const pluginDirName of plugins) {
      const fullPath = path.resolve(this.pluginRootDir, pluginDirName)
      const pluginConfigure = new PluginConfigure(fullPath)

      const plugin = new Plugin(fullPath, pluginConfigure)

      this.pluginMap.set(pluginConfigure.id, plugin)
    }
    this.start()
  }

  // 启动插件
  start() {
    for (const plugin of this.pluginMap.values()) {
      plugin.start()
    }
  }
}
