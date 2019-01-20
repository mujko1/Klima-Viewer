// Helper methods for test cases
import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToHistorical() {
    return browser.get('/historical');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getDescriptionText() {
    return element(by.css('app-root h4')).getText();
  }

}
