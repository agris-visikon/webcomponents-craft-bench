var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let RevealCascade = class RevealCascade extends LitElement {
    constructor() {
        super(...arguments);
        this.revealIndicator = 'V';
        this.revealText = 'Read More';
        this.enablePositioning = false;
    }
    render() {
        return html `
      <div class="container" style=${this.enablePositioning ? '--relative-enabled: relative;' : ''}>
        <slot name="visible-content"></slot>
        <div class="reveal-controls">
          <slot name="reveal-button"></slot>
        </div>
      </div>
      <slot name="revealable-content"></slot>
      <style>
      ${this.enablePositioning
            ? ':host { position: absolute; top: 0; bottom: 0; left: 0; }'
            : ''}
    </style>
    `;
    }
};
RevealCascade.styles = css `
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
__decorate([
    property()
], RevealCascade.prototype, "revealIndicator", void 0);
__decorate([
    property()
], RevealCascade.prototype, "revealText", void 0);
__decorate([
    property({ type: Boolean })
], RevealCascade.prototype, "enablePositioning", void 0);
RevealCascade = __decorate([
    customElement('reveal-cascade')
], RevealCascade);
export { RevealCascade };
//# sourceMappingURL=reveal-cascade.js.map