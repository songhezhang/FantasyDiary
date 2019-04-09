type State = {
  title: ?Object,
  titleBase: ?Object,
  description: ?string,
  statusCode: ?number
};

class HelmetStore {

  constructor() {
    this.bindActions(this.alt.getActions('helmet'));

    this.state = {
      title: { en: '',
                   sv: '',
                   zh: '' },
      titleBase: { en: 'Fantansy Diary',
                   sv: 'Fantastiskt Dagbok',
                   zh: '梦幻日记' },
      description: 'Fantansy Diary',
      statusCode: 200
    };
  }

  onUpdate(props: State) {
    this.setState({ ...this.state, ...props });
  }

}

export default HelmetStore;
