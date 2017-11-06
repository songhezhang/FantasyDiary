class DiaryActions {

  constructor() {
    this.generateActions(
      'fetchContentSuccess', 'fetchContentFail'
    );
  }

  fetchContent(uuid) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          alt.getActions('requests').start();
          const response = await alt.request({ url: `/diary/${uuid}` });
          this.fetchContentSuccess(response);
        } catch (error) {
          this.fetchContentFail({ error });
        }
        alt.getActions('requests').stop();
      });
  }

}

export default DiaryActions;
