import DewCore from '../src/index'
import * as path from 'path'

const dewCore = DewCore.getSignInstance(path.resolve(__dirname, './plugins'))

dewCore.createArticle()