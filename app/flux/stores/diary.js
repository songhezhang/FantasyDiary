class DiaryStore {

  constructor() {
    this.bindActions(this.alt.getActions('diary'));

    this.collection = [];
    this.error = null;
  }

  onFetchContentSuccess(diaries: Object[]) {
    this.collection = diaries;
    this.error = null;
  }

  onFetchContentFail({ error }: { error: ?Object }) {
    this.error = error;
  }

}

export default DiaryStore;
