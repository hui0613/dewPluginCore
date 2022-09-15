import * as fs from 'fs'
import * as path from 'path'
import PluginConfigure from './PluginConfigure'
import PluginInstaller from './PluginInstaller'
import PluginStarter from './PluginStarter'
import { AsyncParallelHook } from 'tapable'
import EventManager from './EventManager'

/**
 * 插件核心框架
 *
 * 需要引入 tapable
 */
export class Framework {
  private pluginRootDir = ''
  private pluginInstanceMap: Map<string, PluginConfigure> = new Map<string, PluginConfigure>()
  private pluginInstaller: PluginInstaller | null = null
  private pluginStarter: PluginStarter | null = null
  private hooks: {[key: string]: any} = {}

  constructor(pluginDirPath: string) {
    this.pluginRootDir = pluginDirPath

    this.initHooks()

    this.pluginInstaller = new PluginInstaller(pluginDirPath, this.hooks)

    this.pluginStarter = new PluginStarter(this.pluginInstaller.plugins)


    this.pluginStarter.start()
  }

  private initHooks(){
    this.hooks = Object.freeze({

      //@ts-ignore
      createArticle: new EventManager(),
      //@ts-ignore
      updateArticle: new AsyncParallelHook(['article', 'cb']),
      //@ts-ignore
      publishArticle: new AsyncParallelHook(['article', 'cb'])
    })
  }

  public createArticle(){
    this.hooks.createArticle.callAsync({title: 'test', content: '123'}, (info:any)=>{
      console.log("接受到返回结果")
      console.log(info)
    })
  }
} 
