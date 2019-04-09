import { Component, PropTypes } from 'react';
import { webdav } from '../../../server/config';
import React from 'react';
import _ from 'lodash';

class CustomComponent extends Component {

  static propTypes = {
    content: PropTypes.object
  }

  static contextTypes = {
    locales: PropTypes.array.isRequired,
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  translate(content) {
    const { flux } = this.context;
    if (typeof content === 'string') {
      return content;
    } else if (typeof content === 'object') {
      return content[flux.getStore('locale').getState().locales[0]];
    }
    return null;
  }

  resource(url) {
    const { flux } = this.context;
    if (typeof url === 'string') {
      return `${webdav}${url}?sessionKey=${flux.getStore('session').getState().sessionid}`;
    } else return url;
  }

  getDirection(direction) {
    if (direction === '2') {
      return 'minus clear';
    } else if (direction === '4') {
      return 'plus clear';
    } else return '';
  }

  getParagraph(paragraph, index: number) {
    return (<p key={ index }>{ this.translate(paragraph) }</p>);
  }

  getMultiParagraph(paragraph) {
    return _.isArray(paragraph) ? paragraph.map((des, index) => this.getParagraph(des, index)) : this.getParagraph(paragraph, 0);
  }
}

export default CustomComponent;
