import CustomComponent from 'components/shared/customcomponent';
import React from 'react';

class VedioPart extends CustomComponent {

  render() {
    const { content, direction, isMobile } = this.props;
    if (isMobile) {
      return (
        <section>
          <figure>
            <video controls style={ { width: '276px', height: '168px' } } >
              {/* <source src={ this.resource(content.vedio.url) } type='video/mp4' /> */}
              <source src='http://www.zeitgeistbot.com/assets/videos/dancer.ogv' type='video/ogg' />
            </video>
            <figcaption>
              <p>{ this.translate(content.vedio.urlCaption) }</p>
            </figcaption>
          </figure>
          <h2>{ this.translate(content.title) }</h2>
          <p>{ this.translate(content.description) }</p>
        </section>);
    } else {
      return (
        <div className={ `col${content.span} ${direction}` }>
          <section>
            <article>
              <figure>
                <video controls>
                  <source src={ this.resource(content.vedio.url) } type='video/mp4' />
                  <source src='http://www.zeitgeistbot.com/assets/videos/dancer.ogv' type='video/ogg' />
                </video>
                <figcaption>
                  <p>{ this.translate(content.vedio.urlCaption) }</p>
                </figcaption>
              </figure>
              <h2>{ this.translate(content.title) }</h2>
              <p>{ this.translate(content.description) }</p>
            </article>
          </section>
        </div>
      );
    }
  }
}

export default VedioPart;
