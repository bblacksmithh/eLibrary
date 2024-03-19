import { LibraryManagementTemplatePage } from './app.po';

describe('LibraryManagement App', function() {
  let page: LibraryManagementTemplatePage;

  beforeEach(() => {
    page = new LibraryManagementTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
