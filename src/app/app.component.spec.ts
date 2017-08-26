import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should contain a static method .processCode()', async(() => {
    expect(typeof AppComponent.processCode).toEqual('function');
  }));

  it('app should contain a variable, lines_of_code, set initially to 0 ', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.lines_of_code).toEqual(0);
  }));

  it('.processCode() should return 0 if not passed a String', async(() => {
    expect(AppComponent.processCode([])).toEqual(0);
    expect(AppComponent.processCode(3)).toEqual(0);
    expect(AppComponent.processCode(true)).toEqual(0);
    expect(AppComponent.processCode({})).toEqual(0);
  }));

  it('.processCode() should add each line of code', async(() => {
    let code =
      'public interface Dave {\n' +
        'int countLines(File inFile); // not the real signature!\n' +
      '}';

    expect(AppComponent.processCode(code)).toEqual(3);
  }));

  it('.processCode() should not add blank or whitespace lines of code', async(() => {
    let code = `
      public interface Dave {',

           int countLines(File inFile); // not the real signature!'
      }

    `;

    expect(AppComponent.processCode(code)).toEqual(3);
  }));
});
