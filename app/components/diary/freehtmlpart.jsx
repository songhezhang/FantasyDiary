import CustomComponent from 'components/shared/customcomponent';
import React from 'react';

class FreeHtmlPart extends CustomComponent {

  render() {
    const { content, direction, isMobile } = this.props;
    if (isMobile) {
      return (<section>
        <article>
          <div dangerouslySetInnerHTML={ { __html: content.html } }></div>
        </article>
      </section>);
    } else {
      return (
        <div className={ `col${content.span} ${direction}` }>
          <section>
            <article>
              <div dangerouslySetInnerHTML={ { __html: content.html } }></div>
            </article>
          </section>
        </div>
      );
    }
  }
}

export default FreeHtmlPart;
