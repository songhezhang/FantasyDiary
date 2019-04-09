import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import Spinner from 'components/shared/spinner';
import LangPicker from 'components/shared/lang-picker';

@connect(({ requests: { inProgress }, session: { sessionid } }) =>
  ({ inProgress, sessionid }))
class Header extends Component {

  static propTypes = {
    inProgress: PropTypes.bool,
    sessionid: PropTypes.string
  }

  static contextTypes = {
    locales: PropTypes.array.isRequired,
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  handleLocaleChange = (locale: string) => {
    const { flux } = this.context;
    flux.getActions('locale').switchLocale({ locale });
  }

  handleLogout = () => {
    const { flux } = this.context;
    flux.getActions('session').logout();
  }

  handleHome = () => {
    $('body').animate({ opacity: 0, backgroundColor: '#000' }, () => {
      window.location = '/';
    });
  }

  componentDidMount() {
    if (process.env.BROWSER && window.location.pathname === '/') {
      $(this.refs.home).css('display', 'none');
    }
  }

  render() {
    const { inProgress, sessionid } = this.props;
    const { locales: [ activeLocale ] } = this.context;

    return (
      <div>
        <header>
          {/* Spinner in the top right corner */}
          <Spinner active={ inProgress } />

          {/* LangPicker on the right side */}
          <LangPicker
            activeLocale={ activeLocale }
            onChange={ this.handleLocaleChange } />

          { sessionid ?
            <div>
              <a ref='home' href='#' style={ { position: 'absolute', top: '-50px', left: '10px', display: 'block' } } onClick={ this.handleHome }>
                <span className='glyphicon glyphicon-home'></span>
              </a>
              <a href='#' style={ { position: 'absolute', top: '-50px', left: '30px' } }
                onClick={ this.handleLogout }>
                <span className='glyphicon glyphicon-log-out'></span>
              </a>
            </div>
            : null
          }
        </header>
        <div id='small' style={ { fontSize: '20px' } }>
          <LangPicker
            activeLocale={ activeLocale }
            onChange={ this.handleLocaleChange } />
          <br></br>
        </div>
      </div>
    );
  }
}

export default Header;
