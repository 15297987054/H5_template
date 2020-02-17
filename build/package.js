/**
 * 打包脚本. 编译的同时自动打一个包. 方便发到UAT 或者生产.
 * @type {vending}
 */
const archiver = require('archiver')
let fs = require('fs')

const args = process.argv.splice(2)
let basePath = '.'
const env = args[0] === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

let zipPath = `${basePath}/publish/${env.packageName}.zip`

function zipPackage() {
  console.info('开始压缩')
  let output = fs.createWriteStream(zipPath)
  let archive = archiver('zip', {
    zlib: { level: 9 }
  })

  output.on('close', function () {
    console.log('压缩完成.')
  })

  output.on('end', function () {
    console.info('压缩完成')
  })

  archive.on('error', function (err) {
    throw err
  })

  archive.pipe(output)
  archive.directory(basePath + '/dist/', false)
  archive.finalize()
}

(function () {
  // 删除上次打的包.
  fs.exists(zipPath, (exists) => {
    exists && fs.unlinkSync(zipPath)
    zipPackage()
  })
})()
