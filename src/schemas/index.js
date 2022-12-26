const mongoose = require('mongoose');

const connect = () => {
  // 개발 환경일 때만 콘솔을 통해 mongoose가 생성하는 쿼리 내용 확인
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  console.log('connect');

  // mongoose와 mongoDB 연결하는 부분
  mongoose.connect(
    'mongodb://root:hyunsu@localhost:27017/admin',
    {
      dbName: 'nodejs',
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    (error) => {
      if (error) {
        console.log('mongoDB 연결 에러', error);
      } else {
        console.log('mongoDB 연결 성공');
      }
    }
  );
};

mongoose.connection.on('error', (error) => {
  console.error('mongoDB 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('mongoDB 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect;
