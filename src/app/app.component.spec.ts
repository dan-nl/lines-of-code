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

  it('AppComponent should contain a static method .processCode()', async(() => {
    expect(typeof AppComponent.processCode).toEqual('function');
  }));

  it('AppComponent instance should contain a variable, lines_of_code, set initially to 0', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.lines_of_code).toEqual(0);
  }));

  it('AppComponent instance should contain a method, onKey()', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(typeof app.onKey).toEqual('function');
  }));

  it('AppComponent instance method, onKey(), should process the event.target.value, received by the textarea keyup listener, with processCode(), and set the instance variable lines_of_code to the returned value', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    let event = {
      target: {
        value: 'public interface Dave {\n' +
        'int countLines(File inFile); // not the real signature!\n' +
        '}'
      }
    };

    app.onKey(event);
    expect(app.lines_of_code).toEqual(3);
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

  it('.processCode() should add lines of code that begin with whitespace', async(() => {
    let code = `
       public interface Dave {,
           int countLines(File inFile); // not the real signature!
      }
    `;

    expect(AppComponent.processCode(code)).toEqual(3);
  }));

  it('.processCode() should add lines of code that begin with tab character(s)', async(() => {
    let code = `
      \tpublic interface Dave {
      \t
       \t    int countLines(File inFile); // not the real signature!
      }
      \t
    `;

    expect(AppComponent.processCode(code)).toEqual(3);
  }));

  it('.processCode() should not add lines of code that begin with //', async(() => {
    let code = `
      public interface Dave {
        int countLines(File inFile); // single line comment after some code
        // another single line comment
      }
    `;

    expect(AppComponent.processCode(code)).toEqual(3);
  }));

  it('.processCode() should not add multi-line comment on single line', async(() => {
    let code = `
      public interface Dave {

        /* multi-line comment on single line */
        int countLines(File inFile); /* multi-line comment on single line after some code */

      }
    `;

    expect(AppComponent.processCode(code)).toEqual(3);
  }));

  it('.processCode() should not add multi-line comment on multiple lines', async(() => {
    let code = `
      /*
       * multi-line comment on multiple lines
       */
      public interface Dave {
        int countLines(File inFile); // single line comment after some code
      }
    `;

    expect(AppComponent.processCode(code)).toEqual(3);
  }));

  it('.processCode() should not add multi-line edge case 1', async(() => {
    let code = `
      /*****
       * This is a test program with 5 lines of code
       *  \\/* no nesting allowed!
       //*****//***/// Slightly pathological comment ending...

      public class Hello {
        public static final void main(String [] args) { // gotta love Java
            // Say hello
          System./*wait*/out./*for*/println/*it*/("Hello/*");
        }

      }
    `;

    expect(AppComponent.processCode(code)).toEqual(5);
  }));

  it('.processCode() should not add multi-line edge case 2', async(() => {
    let code = `
      /*****
       * This is a test program with 5 lines of code
       *  \\/* no nesting allowed!
       //*****//***/// Slightly pathological comment ending...

      public class Hello {
        public static final void main(String [] args) { // gotta love Java
            // Say hello
          System./*wait*/out./*for*/println/*it*/("Hello/*");
        }

        string sourceCode = "Quotation \\" /* comment inside the string */ \\";

      }
    `;

    expect(AppComponent.processCode(code)).toEqual(6);
  }));
});
