import React, { PropTypes } from 'react';
import connect from 'connect-alt';
import PartComponent from 'components/diary/partcomponent';
import CustomComponent from 'components/shared/customcomponent';

import _ from 'lodash';

if (process.env.BROWSER) {
  require('js/jquery');
  require('js/jquery-css-transform');
  require('js/jquery-animate-css-rotate-scale');
  require('js/jquery-ui-1.8.23.custom.min');
  require('js/QueryLoader');
  require('js/slimbox2');
  require('js/initDairy');
	// require('bootstrap-loader');
	// require('styles/app.css');
}

@connect(({ diary: { collection } }) => ({ collection }))
class Diary extends CustomComponent {

  static propTypes = {
    collection: PropTypes.array.isRequired,
    nodeid: PropTypes.string,
    isMobile: PropTypes.bool
  }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  componentWillMount() {
			// this.refs.test.style.display = none;
    const { flux } = this.context;
    const { nodeid } = this.props.params;
    flux.getActions('diary').fetchContent(nodeid);
  }

  componentWillUnmount() {
    $('body').css('background-color', 'none');
    $('header a').css('background', 'none');
  }

  componentDidMount() {
    const { collection, isMobile } = this.props;
    if (!isMobile) {
      collection.forEach((block) =>
					$(`#${block.id}`).click(() => $('#screen').animate(block.animation, 2000)));

      const colors = [ '#f8a61c', '#f8a61c', '#ed1b24', '#d25134', '#5dc0df' ];
      const rand = Math.floor(Math.random() * colors.length);

      $.diary.goingHome(colors[rand]);
      $.diary.initLink(colors[rand]);
    }
  }

  renderPart(jsonpart, gap, isMobile = false) {
    const direction = this.getDirection(jsonpart.position.split('-')[2]);
    const rows = isMobile ? [] : this.getMarginDivs(gap);
    jsonpart.sections.forEach((part, index) =>
				rows.push(<PartComponent direction={ direction } key={ index } { ...part } isMobile={ isMobile } />));
    return rows;
  }

  getMarginDivs(gap) {
    const gaprows = [];
    while (gap > 0) {
      if (gap >= 2) {
        gaprows.push(<div className='col2'><section></section></div>);
        gap = gap - 2;
      } else if (gap === 1) {
        gaprows.push(<div className='col1'><section></section></div>);
        gap = gap - 1;
      }
    }
    return gaprows;
  }

  getCaption(block, activeLocale, index) {
    return ((<li key={ index }><a href='#' id={ block.id }>{ block.caption[activeLocale] || block.caption }</a></li>));
  }

  getGaps(collection) {
    const starts = collection.map((block) => (parseInt(block.position.split('-')[0], 10) - 1) * 14 + parseInt(block.position.split('-')[1], 10));
    const ends = collection.map((block, index) => starts[index] + _.sumBy(block.sections, (obj) => obj.content.span));
    return starts.map((start, index) => (index > 0 ? start - ends[index - 1] : start - 1));
  }

  render() {
    const { collection } = this.props;
    const { flux } = this.context;
    const activeLocale = flux.getStore('locale').getState().locales[0];
    const gaps = this.getGaps(collection);
    if (collection.length === 0) {
      return <div></div>;
    } else {
      return (
        <div>
          <nav>
            <ul>
            { _.chain(collection).sortBy((block) =>
                  block.captionIndex).map((block, index) => this.getCaption(block, activeLocale, index)).value() }
            </ul>
          </nav>
          <div id='screen'>
          { collection.map((block, index) => this.renderPart(block, gaps[index])) }
          </div>
          <div id='mobile'>
          { collection.map((block, index) => this.renderPart(block, gaps[index], true)) }
          </div>
          <footer>
            <p>&copy; <script>document.write(new Date().getFullYear())</script> Fantasystep AB</p>
            <br></br>
            <audio controls style={ { width: '280px', height: '18px', opacity: 0.5 } } autoPlay>
              <source src={ this.resource('13_More_Than_Words.mp3') } type='audio/mpeg' />
              {/* http://pupunzi.com/sounds/Cage-John_Mureau_1_1972.mp3 */}
              Your browser does not support the audio element.
            </audio>
          </footer>
        </div>
      );
    }
  }
}

export default Diary;
