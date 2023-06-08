import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Parser } from "./parser.js";
import { Cursor } from "./cursor.js";
import "./suggestion-menu.js";

@customElement("formula-editor")
export class FormulaEditor extends LitElement {
  private _parser: Parser;

  constructor() {
    super();

    this._parser = new Parser(this.variables);
  }

  /**
   * These `states` and `properties` can't be defined as `static get properties`,
   * because TS doesn't support that.
   * @see https://github.com/lit/lit-element/issues/414
   */

  @state()
  _content: string = "";

  @state()
  _formattedContent: Element | null = null;

  @state()
  _recommendations: string[] | null = null;

  @state()
  _errorStr: string | null = null;

  @state()
  _calculatedResult: number | null = null;

  /**
   * If `parseInput` is called to add a recommendation, say by clicking,
   * browser removes focus from the input box. In that case, we have no way
   * of knowing where the cursor previously was, other than storing it somewhere.
   */

  @state()
  currentCursorPosition: number | null = null;

  @property({
    type: Map<string, number>,
    converter: {
      fromAttribute: (value) => {
        if (value) {
          return new Map<string, number>(JSON.parse(value));
        }
      },
      toAttribute: (value: Map<string, number>) => {
        return JSON.stringify(Array.from(value.entries()));
      },
    },
  })
  variables = new Map();

  styles = `
    #wysiwyg-editor {
      display: inline-block;
      border: none;
      padding: 4px;
    }

    #wysiwyg-editor:focus {
      border: none;
    }

    .wysiwygInternals.error {
      text-decoration: underline;
      text-decoration-color: red;
    }

    .wysiwygInternals.bracket {
      color: #AA3731;
    }

    .wysiwygInternals.operator {
      font-weight: bold;
      color: #777777;
    }
  `;

  handleChange(event: InputEvent) {
    console.log(this.variables);
    this._content = (event.target as HTMLDivElement).innerText;
    this.parseInput();
    (event.target as HTMLDivElement).focus();
  }

  onClickRecommendation(recommendation: string) {
    let editor = document.getElementById("wysiwyg-editor");
    if (!editor) return;

    this.parseInput(recommendation);
    this.currentCursorPosition = null;
  }

  parseInput(addRecommendation: string | null = null) {
    // TODO: Research if cursor-detection can work with shadow-root somehow

    let editor = document.getElementById("wysiwyg-editor");
    if (!editor) return;

    this.currentCursorPosition = addRecommendation
      ? this.currentCursorPosition
      : Cursor.getCurrentCursorPosition(editor);

    const parseOutput = this._parser.parseInput(
      this._content,
      this.currentCursorPosition,
      addRecommendation
    );

    this._recommendations = parseOutput.recommendations;
    this._formattedContent = parseOutput.formattedContent;
    this._errorStr = parseOutput.errorStr;
    editor.innerHTML = parseOutput.formattedString!;
    this._content = (editor as HTMLDivElement).innerText;

    if (addRecommendation) {
      this._recommendations = null;
      this.currentCursorPosition = parseOutput.newCursorPosition;
    }

    Cursor.setCurrentCursorPosition(this.currentCursorPosition!, editor);
    editor?.focus();

    this.requestUpdate();
  }

  requestCalculate() {
    this._calculatedResult = this._parser.calculate(this._content)!;
    this._content = this._parser.addParens(this._content) ?? this._content;
    this.parseInput();
    this.requestUpdate();
  }

  // Disable shadow-root as it messes up cursor detection.
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${this.styles}
      </style>
      <div
        contenteditable
        id="wysiwyg-editor"
        style="min-width: 200px; height: 30px; border: 0px solid black; outline: 1px solid black;"
        spellcheck="false"
        @input=${this.handleChange}
      ></div>
      ${this._recommendations
        ? html`<suggestion-menu
            .recommendations=${this._recommendations.join(",")}
            .onClickRecommendation=${(e: any) => this.onClickRecommendation(e)}
          ></suggestion-menu>`
        : html``}
      <button @click=${this.requestCalculate}>Calculate</button>
      <p style="color: red;">${this._errorStr}</p>
      <p>${this._calculatedResult}</p>
    `;
  }
}
