class MenuLinkStore {

  constructor() {
    this.bindActions(this.alt.getActions('menulink'));

    this.menuLinks = [];
    this.error = null;
  }

  onFetchMenuLinksSuccess(menuLinks: Object[]) {
    this.menuLinks = menuLinks;
    this.error = null;
  }

  onFetchMenuLinksFail({ error }: { error: ?Object }) {
    this.error = error;
  }

}

export default MenuLinkStore;
