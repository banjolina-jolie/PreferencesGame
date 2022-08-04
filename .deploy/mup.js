const process = require('process');

module.exports = {
  servers: {
    one: {
      host: '52.88.84.217',
      username: 'admin',
      pem:`${process.env.HOME}/.ssh/dylan-and-george.pem`
    }
  },
  app: {
    name: 'preferences-game',
    path: '../',
    docker: {
      image: 'abernix/meteord:node-12-base',
    },
    servers: {
      one: {},
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://preferences.dylanocarroll.com',
      MONGO_URL: 'mongodb://localhost:27017/meteor',
    },
  },
  mongo: {
    version: '4.4.2',
    servers: {
      one: {}
    }
  },
};
