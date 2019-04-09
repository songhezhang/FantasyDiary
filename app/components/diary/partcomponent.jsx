import React, { Component, PropTypes } from 'react';

import ImagePart from 'components/diary/imagepart';
import VedioPart from 'components/diary/vediopart';
import ArticlePart from 'components/diary/articlepart';
import ThumbPart from 'components/diary/thumbpart';
import FreeHtmlPart from 'components/diary/freehtmlpart';

const compMap = {};
compMap[ImagePart.name] = ImagePart;
compMap[VedioPart.name] = VedioPart;
compMap[ArticlePart.name] = ArticlePart;
compMap[ThumbPart.name] = ThumbPart;
compMap[FreeHtmlPart.name] = FreeHtmlPart;

class PartComponent extends Component {

  static propTypes = {
    tag: PropTypes.string
  }

  render() {
    const { tag } = this.props;
    return React.createElement(compMap[tag], this.props);
  }
}

export default PartComponent;
