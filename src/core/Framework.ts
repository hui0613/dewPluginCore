import * as fs from 'fs'
import * as path from 'path'
import PluginConfigure from './PluginConfigure'
import PluginInstaller from './PluginInstaller'

/**
 * 插件核心框架
 *
 * 需要引入 tapable
 */
export class Framework {
  private pluginRootDir = ''
  private pluginInstanceMap: Map<string, PluginConfigure> = new Map<string, PluginConfigure>()
  private pluginInstaller: PluginInstaller | null = null
  constructor(pluginDirPath: string) {
    this.pluginRootDir = pluginDirPath

    this.pluginInstaller = new PluginInstaller(pluginDirPath)
  }
}
