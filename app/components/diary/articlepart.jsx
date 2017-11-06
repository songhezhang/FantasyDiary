import CustomComponent from 'components/shared/customcomponent';
import cx from 'classnames';
import React from 'react';

class ArticlePart extends CustomComponent {

  render() {
    const { content, direction, isMobile } = this.props;
    if (isMobile) {
      return (
        <section>
          <article>
            <h2>{ this.translate(content.title) }</h2>
            { this.getMultiParagraph(content.message) }
          </article>
        </section>
      );
    } else {
      return (
        <div className={ `col${content.span} ${direction}` }>
          <section>
            <article>
              <h2 className={ cx(content.titleClass) }>{ this.translate(content.title) }</h2>
              { this.getMultiParagraph(content.message) }
            </article>
          </section>
        </div>
      );
    }
  }
}

export default ArticlePart;
