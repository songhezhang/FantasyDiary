import React, { PropTypes } from 'react';
import CustomComponent from 'components/shared/customcomponent';
import AtvImg from 'react-atv-img';
import _ from 'lodash';
import connect from 'connect-alt';

if (process.env.BROWSER) {
  require('js/jquery');
}

@connect(({ menulink: { menuLinks } }) => ({ menuLinks }))
class MenuLink extends CustomComponent {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  static propTypes = {
    menuLinks: PropTypes.array.isRequired
  }

  baseDivStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%'
  };

  componentWillMount() {
    const { flux } = this.context;
    flux.getActions('menulink').fetchMenuLinks('df1cb6df-a7e8-4c74-b00e-9ac3639ce57e');
  }

  componentDidMount() {
    if (process.env.BROWSER) {
      $('body').addClass('app--menulink');
      // $(this.refs.menulink).fadeIn(1000);
    }
  }

  handleLink(event, linkId) {
    event.preventDefault();
    // const { browserHistory } = require('react-router');
    // browserHistory.replace('/fantasydiary');
    window.location.assign(`/fantasydiary/${linkId}`);
  }

  getLink(json, w, h) {
    return (
    <div onClick={ (event) => this.handleLink(event, json.linkId) }>
      <AtvImg
        layers={ [
          this.resource(json.thumbnail),
          `/api/character/${this.translate(json.caption)}`
        ] }
        staticFallback={ this.resource(json.thumbnail) }
        isStatic={ false }
        className={ 'thisIsOptional' }
        style={ { width: w, height: h, zIndex: 100 } } />
    </div>);
  }

  getColumnLinks(linkArray, key, left, top, w, h) {
    const rows = linkArray.map(link => <div key={ link.id }>{ this.getLink(link, w, h) }<br></br></div>);
    return (
      <div key={ key } style={ Object.assign({}, this.baseDivStyle, { marginLeft: `${left}px`, marginTop: `${top}px` }) }>
      { rows }
      </div>
    );
  }

  render() {
    const smallLinkWidth = 200;
    const smallLinkHeight = 120;
    const bigLinkWidth = 320;
    const bigLinkHeight = 190;
    const margin = 20;
    const { menuLinks } = this.props;
    if (menuLinks.length === 1) {
      return (
        <div style={ Object.assign({}, this.baseDivStyle, { marginLeft: `${-bigLinkWidth / 2}px`, marginTop: `${-bigLinkHeight / 2}px` }) }>
        { this.getLink(menuLinks[0], bigLinkWidth, bigLinkHeight) }
        </div>
      );
    } else if (menuLinks.length === 2) {
      return (
        <div>
          <div style={ Object.assign({}, this.baseDivStyle, { marginLeft: `${-bigLinkWidth / 2}px`, marginTop: `${-bigLinkHeight - margin / 2}px` }) }>
          { this.getLink(menuLinks[0], bigLinkWidth, bigLinkHeight) }
          </div>
          <div style={ Object.assign({}, this.baseDivStyle, { marginLeft: `${-bigLinkWidth / 2}px`, marginTop: `${margin / 2}px` }) }>
          { this.getLink(menuLinks[1], bigLinkWidth, bigLinkHeight) }
          </div>
        </div>
      );
    } else {
      const linkWidth = menuLinks.length <= 4 ? bigLinkWidth : smallLinkWidth;
      const linkHeight = menuLinks.length <= 4 ? bigLinkHeight : smallLinkHeight;
      const columns = Math.ceil(Math.sqrt(menuLinks.length));
      const groups = _.groupBy(menuLinks, link => menuLinks.indexOf(link) % columns);
      let left = 0;
      let top = 0;
      if (columns % 2 === 0) {
        left = -(columns / 2 * (linkWidth + margin) - margin / 2);
        top = -(columns / 2 * (linkHeight + margin) - margin / 2);
      } else {
        const tmp = Math.floor((columns - 1) / 2);
        left = -(tmp * (linkWidth + margin) + linkWidth / 2);
        top = -(tmp * (linkHeight + margin) + linkHeight / 2);
      }
      return (
        <div>
          <div id='big' style={ { visibility: 'hidden' } }>
            { Object.values(groups).map((links, index) => this.getColumnLinks(links, index, left + index * (linkWidth + margin), top, linkWidth, linkHeight)) }
          </div>
          <div id='small' style={ { visibility: 'hidden' } }>
            { menuLinks.map(link => <div key={ `mobile${link.id}` }>{ this.getLink(link, bigLinkWidth, bigLinkHeight) }<br></br></div>) }
          </div>
        </div>
      );
    }
  }
}

export default MenuLink;
