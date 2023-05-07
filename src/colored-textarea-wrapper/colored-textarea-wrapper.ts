import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('colored-textarea-wrapper')
export class ColoredTextareaWrapper extends LitElement {
  @property({ type: String })
  color: string = 'red';

  @property({ type: Number })
  maxLength: number = 50;

  private remainingCharacters: number = this.maxLength;

  private handleInput(e: Event): void {
    const textareaEl = e.target as HTMLTextAreaElement;
    const text = textareaEl.value;
    const defaultColorText = text.slice(0, this.maxLength);
    const coloredText = text.slice(this.maxLength);
    const formattedText = `<span style="color: initial;">${defaultColorText}</span><span style="color: ${this.color};">${coloredText}</span>`;
    const coloredTextElement = this.shadowRoot?.getElementById('colored-text');

    if (coloredTextElement) {
      coloredTextElement.innerHTML = formattedText;
    }

    this.remainingCharacters = this.maxLength - text.length;

    this.requestUpdate();
  }

  static override styles = css`
  :host {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    resize: both;
    overflow: hidden;
  }
  
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  #colored-text,
  textarea {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    border: 1px solid;
    box-sizing: border-box;
    padding: 2px;
    font-family: inherit;
    font-size: inherit;
    overflow-wrap: anywhere;
  }
  
  textarea {
    background-color: transparent;
    color: transparent;
    caret-color: black;
  }
  
  .remaining-characters {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 12px;
    pointer-events: none;
  }
  
  `;

  protected override render() {
    return html`
      <div class="wrapper">
      <div id="colored-text"></div>
      <textarea @input="${this.handleInput}"></textarea>
      </div>
      <span class="remaining-characters">${this.remainingCharacters}/${this.maxLength}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colored-textarea-wrapper': ColoredTextareaWrapper;
  }
}
