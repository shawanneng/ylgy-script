const express = require('express');
let router = express.Router();
const axios = require('axios');
router.put('/run', async (req, res) => {
  const { token, account } = req.body;
  smtRun(token, account);
  res.send('提交成功,请刷新小程序查看');
});

// run(
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ0NDkwMDMsIm5iZiI6MTY2MzM0NjgwMywiaWF0IjoxNjYzMzQ1MDAzLCJqdGkiOiJDTTpjYXRfbWF0Y2g6bHQxMjM0NTYiLCJvcGVuX2lkIjoiIiwidWlkIjo3MTM2ODMxMiwiZGVidWciOiIiLCJsYW5nIjoiIn0.DiP6UMSq-exz6v2lrJ4m-pnPT8L0iivSmPwKYdMqNvc'
// ).then((e) => {
//   console.log('e  ----->  ', e);
// });

function run(token) {
  const randomTime = String(Math.random()).substring(4, 8);
  return new Promise((resolve) => {
    axios({
      url: `https://cat-match.easygame2021.com/sheep/v1/game/game_over`,
      params: {
        rank_score: 1,
        rank_state: 1,
        rank_time: Number(randomTime),
        rank_role: 1,
        skin: 1,
      },
      headers: {
        Host: 'cat-match.easygame2021.com',
        Connection: 'keep-alive',
        t: token,
        'content-type': 'application/json',
        'Accept-Encoding': 'gzip,compress,br,deflate',
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.27(0x18001b37) NetType/WIFI Language/zh_CN',
        Referer:
          'https://servicewechat.com/wx141bfb9b73c970a9/18/page-frame.html',
      },
    })
      .then((res) => {
        console.log('res.data  ----->  ', res.data);
        resolve(res.data);
      })
      .catch((err) => {
        console.log('err.message  ----->  ', err.message);
        resolve(err.message);
      });
  });
}

async function smtRun(token, account = 1) {
  await Promise.all(new Array(+account).fill(account).map(() => run(token)));
}

module.exports = router;
