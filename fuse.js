const { FuseBox, Sparky, EnvPlugin, CSSPlugin, TypeScriptHelpers, WebIndexPlugin, QuantumPlugin } = require('fuse-box')
let fuse, app
let isProduction = false

Sparky.task('config', _ => {
  console.log('==> isProduction : ', isProduction)
  fuse = new FuseBox({
    homeDir: 'src/',
    sourceMaps: !isProduction,
    hash: isProduction,
    target: 'browser',
    output: 'dist/$name.js',
    useTypescriptCompiler: true,
    experimentalFeatures: true,
    plugins: [
      EnvPlugin({ NODE_ENV: isProduction ? 'production' : 'development' }),
      CSSPlugin(),
      TypeScriptHelpers(),
      WebIndexPlugin({ title: 'Hyperapp Fusebox Starter' }),
      isProduction &&
        QuantumPlugin({
          bakeApiIntoBundle: 'app',
          treeshake: true,
          uglify: true
        })
    ]
  })
  app = fuse.bundle('app').instructions('> app.js')
})
Sparky.task('clean', _ => Sparky.src('dist/').clean('dist/'))
Sparky.task('env', _ => (isProduction = true))
Sparky.task('dev', ['clean', 'config'], _ => {
  fuse.dev({ port: 9000, reload: true })
  app.watch().hmr()
  return fuse.run()
})
Sparky.task('prod', ['clean', 'env', 'config'], _ => {
  fuse.dev({ reload: true }) // remove after demo
  return fuse.run()
})
