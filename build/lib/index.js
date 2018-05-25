import Ora from 'ora'
import webpack from 'webpack'
import appConfig from './webpack.app'
import bridgeConfig from './webpack.bridge'
import componentConfig from './webpack.component'
import componentsConfig from './webpack.components'
import generateThemes from './themes'

const spinner = new Ora({
  text: 'Building lib',
  color: 'green',
  spinner: 'simpleDots'
})

const entries = [
  //bridgeConfig
  bridgeConfig({
    libraryTarget: 'umd',
    compress: true
  }),
  bridgeConfig({
    libraryTarget: 'umd'
  }),
  //appConfig
  appConfig({
    libraryTarget: 'umd',
    css: true
  }),
  appConfig({
    libraryTarget: 'umd',
    compress: true,
    css: true
  }),
  //uiConfig
  componentConfig({
    libraryTarget: 'umd',
    css: true
  }),
  componentConfig({
    libraryTarget: 'umd',
    compress: true,
    css: true
  }),

  //componentsConfig
  componentsConfig({
    components: true,
    libraryTarget: 'umd',
    compress: true,
    css: true
  })
]

spinner.start()

webpack(entries, (error, stats) => {
  if (error) {
    spinner.fail('ERRORED! Too bad! :(')
    throw error
  }

  spinner.color = 'yellow'
  spinner.text = 'Generating themes'

  generateThemes()

  process.stdout.write('\n\n' + stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  spinner.succeed('gmf Vue generated with success! \\o/')
})
