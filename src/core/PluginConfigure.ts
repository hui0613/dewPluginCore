import * as path from 'path'

export default class PluginConfigure {
  private pluginRootPath = ''
  private pluginConfigData: { [key: string]: any } | null = null
  private $id = ''
  private $name = ''
  private $version = ''
  private $entry = ''

  constructor(pluginPath: string) {
    this.pluginRootPath = pluginPath
    this.pluginConfigData = require(path.resolve(pluginPath, 'package.json'))

    this.parseBasic()
  }

  private parseBasic() {
    this.$id = this.pluginConfigData?.id
    this.$name = this.pluginConfigData?.name
    this.$version = this.pluginConfigData?.version
    this.$entry = path.resolve(this.pluginRootPath, this.pluginConfigData?.main)
  }

  get id() {
    return this.$id
  }

  get name() {
    return this.$name
  }

  get version() {
    return this.$version
  }

  get entry() {
    return this.$entry
  }
}
