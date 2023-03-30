import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('reveal-cascade')
export class RevealCascade extends LitElement {
  @property() revealIndicator = 'V';
  @property() revealText = 'Read More';
  @property({type: Boolean}) enablePositioning = false;

  static override styles = css`
  :host {
    width: 100%;
  }
    .container {
      width: 100%;
      min-height: 100%;
      display: grid;
      grid-template-rows: auto 1fr;
      background: var(--visible-content-background, inherit);
      position: var(--relative-enabled, unset);
    }

    ::slotted([slot='visible-content']) {
      background: var(--visible-content-background, inherit);
      margin: var(--content-margin, 0 2em);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    ::slotted([slot='revealable-content']) {
      background: var(--revealable-content-background, inherit);
      margin: var(--content-margin, 0 2em);
    }

    .reveal-controls {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      padding-top: 0.5rem;
      background: var(--reveal-controls-background, inherit);
      background: var(--visible-content-background, inherit);
    }
  `;

  override render() {
    return html`
      <div class="container" style=${
        this.enablePositioning ? '--relative-enabled: relative;' : ''
      }>
        <slot name="visible-content"></slot>
        <div class="reveal-controls">
          <slot name="reveal-button"></slot>
        </div>
      </div>
      <slot name="revealable-content"></slot>
      <style>
      ${
        this.enablePositioning
          ? ':host { position: absolute; top: 0; bottom: 0; left: 0; }'
          : ''
      }
    </style>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'reveal-cascade': RevealCascade;
  }
}
