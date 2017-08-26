import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  lines_of_code = 0;

  /**
   * @param {String} code
   *
   * @returns {Number}
   */
  public static processCode(code) {
    let result = 0;

    if (typeof code !== 'string') {
      console.warn('AppComponent.processCode(): expects a String, but got a [' + typeof code + ']');
      return result;
    }

    let code_lines = code.split('\n');
    let multi_line_comments_open = 0;

    return code_lines.reduce(
      (acc, code_line) => {
        if (code_line.trim().length === 0) {
          return acc;
        }

        if (code_line.trim().indexOf('/*') !== -1 && multi_line_comments_open === 0) {
          if (code_line.trim().indexOf('/*') > 0) {
            acc++;
          }

          multi_line_comments_open++;
        }

        if (multi_line_comments_open > 0 ) {
          if (code_line.trim().indexOf('*/') !== -1) {
            multi_line_comments_open--;
          }

          return acc;
        }

        if (code_line.trim().indexOf('//') === 0) {
          return acc;
        }

        return acc + 1;
      },
      result
    );
  }

  /**
   * @param {Event} event
   */
  onKey(event: any) {
    this.lines_of_code = AppComponent.processCode(event.target.value);
  }
}
