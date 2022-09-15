import Plugin from "./Plugin";

export default class PluginStarter{
  private plugins: Array<Plugin>  = []

  constructor(plugins: Array<Plugin>){
    this.plugins = plugins
  }

  public start(){
    for(const plugin of this.plugins){
      plugin.start()
    }
  }
}