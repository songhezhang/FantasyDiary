class SessionActions {

  constructor() {
    this.generateActions('loginSuccess', 'loginFail', 'logout', 'update');
  }

  login({ username, password }: { username: string, password: string }) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          alt.getActions('requests').start();
          const response = await alt.request({ url: `/logindiary/${username}/${password}` });
          this.loginSuccess(response);
        } catch (error) {
          this.loginFail(error);
        }
        alt.getActions('requests').stop();
      });
  }

}

export default SessionActions;
