import React, { PropTypes } from 'react';

import Header from 'components/header';
import CustomComponent from 'components/shared/customcomponent';
// import Footer from 'components/footer';
if (process.env.BROWSER) require('styles/app.css');

class App extends CustomComponent {

  static propTypes = { children: PropTypes.node }
  static contextTypes = { flux: PropTypes.object.isRequired,
                          i18n: PropTypes.func.isRequired }

  state = { i18n: this.context
      .flux.getStore('locale').getState() }

  componentDidMount() {
    const { flux } = this.context;
    flux.getStore('helmet').listen(::this.handleTitleChange);
    flux.getStore('locale').listen(::this.handleTitleChange);
    flux.getActions('helmet').update({ title: { sv: 'Ruixi & Ruichen', en: 'Ruixi & Ruichen', zh: '瑞曦 & 瑞宸' } });
  }

  componentWillUnmount() {
    const { flux } = this.context;
    flux.getStore('helmet').unlisten(::this.handleTitleChange);
    flux.getStore('locale').unlisten(::this.handleTitleChange);
  }

  handleTitleChange() {
    const { flux } = this.context;
    const { titleBase, title } = flux.getStore('helmet').getState();
    document.title = `${this.translate(titleBase)} ${this.translate(title)}`;
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <Header />
        { children }
      </div>
    );
  }
}
export default App;
