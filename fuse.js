const { FuseBox, Sparky, EnvPlugin, CSSPlugin, TypeScriptHelpers, WebIndexPlugin, QuantumPlugin } = require('fuse-box')
let fuse, app
let isProduction = false

Sparky.task('config', _ => {
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
      CSSPlugin({ minify: isProduction }),
      TypeScriptHelpers(),
      WebIndexPlugin({ template: 'src/index.html' }),
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
Sparky.task('copy', _ => Sparky.src('*', { base: 'public/' }).dest('dist/'))
Sparky.task('env', _ => (isProduction = true))
Sparky.task('dev', ['clean', 'config', 'copy'], _ => {
  fuse.dev({ port: 9000, reload: true })
  app.watch().hmr()
  return fuse.run()
})
Sparky.task('prod', ['clean', 'env', 'config', 'copy'], _ => {
  fuse.dev({ reload: true })
  return fuse.run()
})
Sparky.task('dist', ['clean', 'env', 'config', 'copy'], _ => {
  return fuse.run()
})
