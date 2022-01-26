const esbuild = require('esbuild')
const svgrPlugin = require('esbuild-plugin-svgr')

esbuild
  .serve(
    { servedir: 'public', port: 3000 },
    {
      bundle: true,
      entryPoints: ['src/index.tsx'],
      outdir: 'public',
      plugins: [svgrPlugin()],
    }
  )
  .then((r) => console.log(`Dev server started on http://localhost:${r.port}`))
