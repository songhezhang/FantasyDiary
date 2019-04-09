import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';

if (process.env.BROWSER) {
  require('bootstrap-loader');
}

@connect(({ session: { sessionid, error } }) => ({ sessionid, error }))
class Login extends Component {

  static propTypes = {
    error: PropTypes.object
  }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  componentWillMount() {
    // const { flux, i18n } = this.context;
    if (process.env.BROWSER) {
      $('body').addClass('app--login');
    }
  }

  componentDidMount() {
    const Cookies = require('cookies-js');
    if (Cookies.get('_remember_pass') === '1') {
      this.refs.ifremember.checked = true;
      this.refs.password.autoComplete = 'on';
    } else {
      this.refs.ifremember.checked = false;
      this.refs.password.autoComplete = 'off';
    }
  }

  handleLogin(event) {
    event.preventDefault();
    const { flux } = this.context;
    if (this.refs.username.value.trim() === '') {
      $(this.refs.usernameInfoMessage).removeClass('hide');
    } else if (this.refs.password.value.trim() === '') {
      $(this.refs.passwordInfoMessage).removeClass('hide');
    } else {
      flux.getActions('session').login({ username: this.refs.username.value, password: this.refs.password.value });
    }
  }

  handleLoginFail(event) {
    event.preventDefault();
    const { flux } = this.context;
    flux.getStore('session').getState().error = null;
    $(this.refs.errorMessage).addClass('hide');
  }

  handleIfRemember() {
    const Cookies = require('cookies-js');
    if (this.refs.ifremember.checked) {
      Cookies.set('_remember_pass', 1);
      this.refs.ifremember.checked = true;
    } else {
      Cookies.set('_remember_pass', 0);
      this.refs.ifremember.checked = false;
    }
  }

  render() {
    const { i18n } = this.context;
    if (process.env.BROWSER && this.props.error) {
      $(this.refs.errorMessage).removeClass('hide');
    }
    return (
      <div id='login-overlay' className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title' id='myModalLabel'>{ i18n('login.login-to') } { i18n('login.fantasydiary') }</h4>
          </div>
          <div className='modal-body'>
              <div className='row'>
                  <div className='col-md-6 col-sm-0'>
                      <p className='lead'><span className='text-success'>{ i18n('login.ruixi') }</span> & <span className='text-info'>{ i18n('login.ruichen') }</span></p>
                      <image src='http://webdav.fantasystep.com/thumbnail/ruixi/IMG_7607.JPG?sessionKey=8f6df84d-88c8-45d8-8a21-add898c1b165' width='100%'></image>
                  </div>
                  <div className='col-md-6 col-sm-12'>
                      <div className='well'>
                          <form id='loginForm' noValidate='novalidate' autoComplete='on'>
                              <div className='form-group'>
                                  <label htmlFor='username' className='control-label'>{ i18n('login.username.label') }</label>
                                  <input ref='username' type='text' className='form-control' id='username' name='username' required='' title='Please enter your username' placeholder={ i18n('login.username.placeholder') } autoComplete='on' />
                                  <span className='help-block'></span>
                              </div>
                              <div className='form-group'>
                                  <label htmlFor='password' className='control-label'>{ i18n('login.password.label') }</label>
                                  <input ref='password' type='password' className='form-control' id='password' name='password' required='' title='Please enter your password' autoComplete='on' />
                                  <span className='help-block'></span>
                              </div>
                              <div className='checkbox'>
                                  <label>
                                      <input ref='ifremember' type='checkbox' name='ifremember' id='ifremember' onChange= { () => this.handleIfRemember() } /> { i18n('login.remember-pass') }
                                  </label>
                                  <p className='help-block'>({ i18n('login.private') })</p>
                              </div>
                              <button onClick={ (event) => this.handleLogin(event) } className='btn btn-success btn-block'>{ i18n('login.login-to') }</button>
                              <a href='#' data-toggle='modal' data-target='#helpModal' className='btn btn-default btn-block'>{ i18n('login.help') }</a>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div ref='errorMessage' className='alert alert-danger hide fade in' style={ { position: 'fixed', bottom: '0px', right: '10px', width: '300px' } }>
          <a href='#' className='close' onClick={ (event) => this.handleLoginFail(event) } aria-label='close'>&times;</a>
          <strong>{ i18n('login.error') }!</strong> { i18n('login.failure') }
        </div>
        <div ref='usernameInfoMessage' className='alert alert-info hide fade in' style={ { position: 'fixed', bottom: '0px', right: '10px', width: '300px' } }>
          <a href='#' className='close' onClick={ () => $(this.refs.usernameInfoMessage).addClass('hide') } aria-label='close'>&times;</a>
          <strong>{ i18n('login.notice') }!</strong> { i18n('login.usernamenull') }
        </div>
        <div ref='passwordInfoMessage' className='alert alert-info hide fade in' style={ { position: 'fixed', bottom: '0px', right: '10px', width: '300px' } }>
          <a href='#' className='close' onClick={ () => $(this.refs.passwordInfoMessage).addClass('hide') } aria-label='close'>&times;</a>
          <strong>{ i18n('login.notice') }!</strong> { i18n('login.passwordnull') }
        </div>
        <div id='helpModal' className='modal fade' role='dialog'>
          <div className='modal-dialog'>
            {/* Modal content*/}
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal'>×</button>
                <h4 className='modal-title'>{ i18n('login.help') }</h4>
              </div>
              <div className='modal-body'>
                <p>{ i18n('login.helpinfo') }</p>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
              </div>
            </div>
          </div>
          </div>
      </div>
    );
  }
}

export default Login;
