class MenuLinkActions {

  constructor() {
    this.generateActions(
      'fetchMenuLinksSuccess', 'fetchMenuLinksFail'
    );
  }

  fetchMenuLinks(uuid) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          alt.getActions('requests').start();
          const response = await alt.request({ url: `/menulink/${uuid}` });
          this.fetchMenuLinksSuccess(response);
        } catch (error) {
          this.fetchMenuLinksFail({ error });
        }
        alt.getActions('requests').stop();
      });
  }

}

export default MenuLinkActions;
