import { TbCoreAccUiPage } from './app.po';

describe('tb-core-acc-ui App', function() {
  let page: TbCoreAccUiPage;

  beforeEach(() => {
    page = new TbCoreAccUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
