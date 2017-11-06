import CustomComponent from 'components/shared/customcomponent';
import React from 'react';

class ImagePart extends CustomComponent {

  render() {
    const { content, direction, isMobile } = this.props;
    if (isMobile) {
      return (
        <section>
          <h2>{ this.translate(content.title) }</h2>
          <figure> <img src={ this.resource(content.image.url) } width='276' height='168' alt='' />
            <figcaption>
              <p>{ this.translate(content.image.urlCaption) }</p>
            </figcaption>
          </figure>
          { this.getMultiParagraph(content.description) }
        </section>
      );
    } else {
      return (
        <div className={ `col${content.span} ${direction}` }>
          <section>
            <article>
              <figure> <img src={ this.resource(content.image.url) } alt='' width={ content.image.urlWidth || 145 } height={ content.image.urlHeight || 193 } />
                <figcaption>
                  <p>{ this.translate(content.image.urlCaption) }</p>
                </figcaption>
              </figure>
                <h2>{ this.translate(content.title) }</h2>
                { this.getMultiParagraph(content.description) }
            </article>
          </section>
        </div>
      );
    }
  }
}

export default ImagePart;
