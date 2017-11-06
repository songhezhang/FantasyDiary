import CustomComponent from 'components/shared/customcomponent';
import React from 'react';

class ThumbPart extends CustomComponent {

  getThumb(image, index: number) {
    return (
      <figure className='thumb' key={ index } >
        <a href={ this.resource(image.url) } className='lightbox' title={ this.translate(image.urlCaption) }>
          <img src={ this.resource(image.url) } width={ image.urlWidth } height={ image.urlHeight } alt='' />
        </a>
        <figcaption>
          <p>{ this.translate(image.urlCaption) }</p>
        </figcaption>
      </figure>
    );
  }

  getUnclickedThumb(image, index: number) {
    return (
      <figure className='thumb' key={ index } >
        <img src={ this.resource(image.url) } width={ image.urlWidth } height={ image.urlHeight } alt='' />
        <figcaption>
          <p>{ this.translate(image.urlCaption) }</p>
        </figcaption>
      </figure>
    );
  }

  getSmallImage(image, index: number) {
    return (<img key={ index } src={ this.resource(image.url) } width={ image.urlWidth } height={ image.urlHeight } alt='' />);
  }

  render() {
    const { content, direction, isMobile } = this.props;
    const title = <h2>{ this.translate(content.title) }</h2>;
    if (isMobile) {
      return (
        <section>
          <article>
            { content.imageFirst !== true ? title : null }
            { content.imageFirst !== true ? this.getMultiParagraph(content.description) : null }
            { content.images.map((image, index) => this.getUnclickedThumb(image, index)) }
            { content.imageFirst === true ? title : null }
            { content.imageFirst === true ? this.getMultiParagraph(content.description) : null }
          </article>
        </section>
      );
    } else {
      return (
        <div className={ `col${content.span} ${direction}` }>
          <section>
            <article>
              { content.imageFirst !== true ? title : null }
              { content.imageFirst !== true ? this.getMultiParagraph(content.description) : null }
              { content.images.map((image, index) => content.pure ? this.getSmallImage(image, index) : this.getThumb(image, index)) }
              { content.imageFirst === true ? title : null }
              { content.imageFirst === true ? this.getMultiParagraph(content.description) : null }
            </article>
          </section>
        </div>
      );
    }
  }
}

export default ThumbPart;
