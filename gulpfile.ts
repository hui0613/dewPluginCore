import {series} from 'gulp'
import path from 'path'
import { rollup } from 'rollup'
import fse from 'fs-extra'
import {
  Extractor,
  ExtractorConfig,
  ExtractorResult,
} from '@microsoft/api-extractor'
import rollupConfig from './rollup.config'

interface TaskFunc{
  (cb:Function): void
}

const log = {
  error: (text: string)=>{
    console.log((text))
  }
}

const paths = {
  lib: path.resolve(__dirname, 'lib')
}

const clearLib: TaskFunc = async (cb)=>{
  fse.removeSync(paths.lib)
  cb()
}

const buildByRollup: TaskFunc =async (cb) => {
  const rollupOptions = {
    input: rollupConfig.input,
    plugins: rollupConfig.plugins
  }

  const outputOptions = rollupConfig.output
  const bundle = await rollup(rollupOptions)
  if(Array.isArray(outputOptions)){
    for(let i =0;i<outputOptions.length; i++){
      await bundle.write(outputOptions[i] as any)
    }
    cb()
  }
}

const apiExtractorGenerate:TaskFunc = async (cb) => {
  const apiExtractorJsonPath: string = path.resolve(__dirname, 'api-extractor.json')


  // 加载并解析 api-extractor.json 文件
  const extractorConfig: ExtractorConfig = await ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath)
  // 判断是否存在 index.d.ts 文件，这里必须异步先访问一边，不然后面找不到会报错
  const isExist: boolean = await fse.pathExists(extractorConfig.mainEntryPointFilePath)

  

  if (!isExist) {
    log.error('API Extractor not find index.d.ts')
    return
  }

  // 调用 API
  const extractorResult: ExtractorResult = await Extractor.invoke(extractorConfig, {
    localBuild: true,
    // 在输出中显示信息
    showVerboseMessages: true,
  })

  if (extractorResult.succeeded) {
    // 删除多余的 .d.ts 文件
    const libFiles: string[] = await fse.readdir(paths.lib)
    libFiles.forEach(async file => {
      if (file.endsWith('.d.ts') && !file.includes('dew')) {
        await fse.remove(path.join(paths.lib, file))
      }
    })
    cb()
  } else {
    log.error(`API Extractor completed with ${extractorResult.errorCount} errors`
      + ` and ${extractorResult.warningCount} warnings`)
  }
  cb()
}

export const build = series(clearLib, buildByRollup, apiExtractorGenerate)

