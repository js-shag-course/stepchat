module.exports = {
  apps : [{
    name: 'stepchat-api',
    script: './server/index.js',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  },
  {
    name: 'stepchat-ui',
    script: 'serve',
    env: {
      PM2_SERVE_PATH: './web/build',
      PM2_SERVE_PORT: 8080,
      PM2_SERVE_SPA: 'true',
      PM2_SERVE_HOMEPAGE: '/index.html'
    }
  }],
  production : {
    user : 'stepchat',
    host : '104.248.90.46',
    ref  : 'origin/master',
    repo : 'git@github.com:js-shag-course/stepchat.git',
    path : '/home/stepchat',
    ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
    postDeploy : 'pm2 startOrRestart all --env production',
    env  : {
      NODE_ENV: 'production'
    }
  }
}
