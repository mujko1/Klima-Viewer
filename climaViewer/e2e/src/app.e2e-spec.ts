import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message Live Weather', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Live Weather');
  });

  it('should display description Live Weather', () => {
    page.navigateTo();
    expect(page.getDescriptionText()).toEqual('Live Weather zeigt Wetterdaten ausgewählter Städte. Fügen Sie neue Städte hinzu!');
  });


  it('should display welcome message Historical', () => {
    page.navigateToHistorical();
    expect(page.getTitleText()).toEqual('Historische Daten');
  });

  it('should display description Historical', () => {
    page.navigateToHistorical();
    expect(page.getDescriptionText()).toEqual('Hier können Daten in einem Zeitraum abgerufen und in einem Chart angezeigt werden.');
  });

});
