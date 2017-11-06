import debug from 'debug';

const { BROWSER } = process.env;

class SessionStore {

  constructor() {
    this.bindActions(this.alt.getActions('session'));
    this.sessionid = null;
    this.error = null;
  }

  onUpdate({ username, sessionid }: { username: string, sessionid: string }) {
    this.username = username;
    this.sessionid = sessionid;
  }

  onLoginSuccess({ username, sessionid }: { username: string, sessionid: string }) {
    this.sessionid = sessionid;
    this.error = null;
    // transition app to `/login`
    // or to the original asked page
    if (BROWSER) {
      // const { browserHistory } = require('react-router');
      const [ , nextPath = '/' ] = window
        .location.search.match(/\?redirect=(.+)$/) || [];

      const Cookies = require('cookies-js');
      Cookies.set('_auth', username);
      Cookies.set('_session_id', sessionid);
      debug('dev')('redirect after login to %s', nextPath);
      // const { browserHistory } = require('react-router');
      // browserHistory.replace(nextPath);
      window.location.assign('/');
    }
  }

  onLoginFail({ error }: { error: ?Object }) {
    if (error === undefined) {
      this.error = { e: 'Authentication failure.' };
    } else {
      this.error = error;
    }
  }

  onLogout() {
    this.sessionid = null;
    this.error = null;
    if (BROWSER) {
      const Cookies = require('cookies-js');
      const { browserHistory } = require('react-router');
      Cookies.expire('_auth');
      Cookies.expire('_session_id');
      browserHistory.replace('/login');
    }
  }

}

export default SessionStore;
