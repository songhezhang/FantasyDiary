export default {
  messages: {
    header: {
      users: 'Users List',
      guides: 'Guides',
      account: 'Account',
      logout: 'Logout',
      login: 'Login'
    },
    guides: {
      'page-title': 'Guides'
    },
    protected: {
      'page-title': 'Protected Page'
    },
    profile: {
      'page-title': 'Profile - {fullName}',
      'not-found-page-title': 'User profile not found'
    },
    users: {
      'page-title': '用户',
      title: 'Some random users',
      email: 'Email address',
      actions: 'Actions',
      add: 'Add random user',
      profile: 'Profile'
    },
    login: {
      'login-to': '登录',
      fantasydiary: '幻想日志',
      ruixi: '瑞曦',
      ruichen: '瑞宸',
      'ruixi-ruichen': '瑞曦 & 瑞宸',
      help: '帮助',
      helpinfo: '帮助 帮助 帮助 帮助 帮助 ',
      username: {
        label: '用户',
        placeholder: 'example@app.cn'
      },
      password: {
        label: '密码'
      },
      'remember-pass': '记住密码',
      private: '是否私人电脑',
      submit: '提交',
      notice: '注意',
      error: '错误',
      failure: '登录失败',
      usernamenull: '用户名为空',
      passwordnull: '密码为空'
    },
    routes: {
      users: '/users',
      guides: '/guides',
      login: '/login',
      profile: '/profile/:seed',
      account: '/account'
    }
  }
};
