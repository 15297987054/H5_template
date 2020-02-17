'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',

  SOURCE_MAP: '1',
  DEFAULT_HOST: {
    host: '192.168.1.50',
    port: 22,
    user: 'root',
    password: '****',
    name: 'bond520-assistant-UAT',
    path: '/usr/local/nginx/html/10808'
  },
  packageName: 'bond520-assistant-UAT'
})
