module.exports = (phase, config) => {
  console.log('here', phase, config)
  return {
    experimental: {
      swcPlugins: [[require.resolve('telefunc/swc'), { displayName: true, basePath: __dirname }]]
      // swcPlugins: [[require.resolve('css-variable/swc'), {displayName: true, basePath: __dirname}]]
    }
  }
}
