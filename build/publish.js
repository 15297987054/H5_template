const env = require('../config/test.env')
const chalk = require('chalk')
let Client = require('ssh2').Client
let conn = new Client()
let fs = require('fs')

let basePath = '.'

const user = {
  host: env.DEFAULT_HOST.host,
  port: 22,
  username: env.DEFAULT_HOST.user,
  password: env.DEFAULT_HOST.password
}

/**
 * 1.进入目录
 * 2.删除旧的备份项目
 * 3.将原项目名称加上bak标志为备份文件
 * 4.解压缩上传的zip文件并将名称改为项目名称
 * 5.删除zip文件
 * 6.退出
 * @type {string[]}
 */
const uploadShellList = [
  `cd ${env.DEFAULT_HOST.path}\n`,
  `rm -rf ${env.DEFAULT_HOST.name}.bak\n`,
  `unzip ${env.DEFAULT_HOST.name}.zip -d dist/\n`,
  `mv ${env.DEFAULT_HOST.name}.zip ${env.DEFAULT_HOST.name}.bak\n`,
  `rm -rf publish\n`,
  `mv dist publish\n`,
  `rm -rf dist\n`,
  `rm -rf ${env.DEFAULT_HOST.name}.zip\n`,
  `exit\n`
]
const params = {file: `${basePath}/publish/${env.DEFAULT_HOST.name}.zip`, target: `${env.DEFAULT_HOST.path}/${env.DEFAULT_HOST.name}.zip`}

/**
 * 上传文件
 * @param conn
 * @param params
 * @constructor
 */
function UploadFile (conn, params) {
  const file = params.file
  const target = params.target
  if (!conn) {
    return
  }
  conn.sftp(function (err, sftp) {
    if (err) {
      throw err
    }
    sftp.fastPut(file, target, {}, function (err, result) {
      if (err) {
        console.log(chalk.red(err.message))
        throw err
      }
      Shell(conn)
    })
  })
}

function Ready () {
  conn.on('ready', function () {
    console.log('Client :: ready')
    UploadFile(conn, params)
  }).connect(user)
}

/**
 * 上传完成后服务器需要执行的内容
 * 删除本地压缩文件
 * @param conn
 * @constructor
 */
function Shell (conn) {
  conn.shell(function (err, stream) {
    if (err) throw err
    stream.on('close', function () {
      console.log('Stream :: close')
      conn.end()
    }).on('data', function (data) {
      console.log('STDOUT: ' + data)
    }).stderr.on('data', function (data) {
      console.log('STDERR: ' + data)
    })
    stream.end(uploadShellList.join(''))
  })
}

(function () {
  // 删除上次打的包.
  fs.exists(`${basePath}/publish/${env.DEFAULT_HOST.name}.zip`, (exists) => {
    if (exists) {
      try {
        Ready()
      } catch (err) {
        console.log(err)
      }
    } else {
      console.info('没有对应的压缩包.')
    }
  })
})()
