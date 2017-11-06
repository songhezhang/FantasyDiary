import { users } from './data.json';
import config from '../backend-conf';
import axios from 'axios';

function routes(router) {
  router.get('/character/:characters', async function (ctx) {
    const { characters } = ctx.params;
    const size = ctx.query['size'] | 50;
    const font = ctx.query['font'] | 'STKaiti';
    const width = ctx.query['width']| 320;
    const height = ctx.query['height'] | 190;
    const divide = characters.match(/[\u3400-\u9FBF]/) ? 2 : 4;
    const x = width / 2 - size * characters.length / divide;
    const y = height / 2 + size / 4;
    ctx.compress = true;
    ctx.body =`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg"
xmlns="http://www.w3.org/2000/svg" width="${ width }px" height="${ height }px">
<g transform="translate(0, 2.4)" style="font-family: ${ font };">
<text x="${ x }px" y="${ y }px" transform="scale(1, 1)" font-size="${ size }" style="stroke: white; fill: white;">${ characters }</text>
</g></svg>`;
    ctx.type = 'image/svg+xml';
  });

  router.get('/logindiary/:username/:password', async function (ctx) {
    const { username, password } = ctx.params;
    try {
      const { data } = await axios({ method: 'get', url: `${config.endpoint}rest/auth/?username=${username}&password=${password}` });
      ctx.body = { username: username, sessionid: data };
    } catch (error) {
      ctx.body = { username: username, sessionid: null };
      // throw error && error.data || error.stack;
    }
  });

  router.get('/diary/:uuid', async function (ctx) {
    const { uuid } = ctx.params;
    const { data } = await axios({ method: 'get', url: `${config.endpoint}rest/TestMongo2/${uuid}?sessionKey=${ctx.cookies.get('_session_id')}` });

    let layout = data['ddd']['layout'];
    let content = data['eee'];

    content.forEach((c, index) => Object.assign(c, layout[index + 1]));
    ctx.body = content;
  });

  router.get('/menulink/:uuid', async function (ctx) {
    const { uuid } = ctx.params;
    const { data } = await axios({ method: 'get', url: `${config.endpoint}rest/TestMongo2/${uuid}?sessionKey=${ctx.cookies.get('_session_id')}` });
    let content = data['fff'];
    ctx.body = content;
  });
}

// can't export directly function, run into const issue
// see: https://phabricator.babeljs.io/T2892
export default routes;
