import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("suggestion-menu")
export class SuggestionMenu extends LitElement {
  @property()
  recommendations: string = "";

  @property()
  onClickRecommendation: Function = (recommendation: string) => {};

  static styles = css`
    ul {
      border: 1px solid grey;
      box-sizing: border-box;
      width: fit-content;
      list-style-type: none;
      padding: 4px 0px;
      margin: 2px;
    }

    li {
      margin: 0px;
      padding: 2px 6px;
    }

    li:focus-visible {
      outline: 1px solid red;
    }
  `;

  handleKeydown(event: KeyboardEvent, recommendation: string) {
    if (event.code == "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.onClickRecommendation(recommendation);
    }
  }

  render() {
    return html`
      <ul class="wysiwyg-suggestion-menu">
        ${this.recommendations.split(",").map((recommendation) => {
          return html`<li
            tabindex="0"
            @click=${(e: any) => this.onClickRecommendation(recommendation)}
            @keydown=${(e: any) => this.handleKeydown(e, recommendation)}
          >
            ${recommendation}
          </li>`;
        })}
      </ul>
    `;
  }
}
