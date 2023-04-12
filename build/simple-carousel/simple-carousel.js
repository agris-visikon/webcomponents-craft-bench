var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements, state, } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import './slide-button.js';
import { BOOTSTRAP_CHEVRON_LEFT, BOOTSTRAP_CHEVRON_RIGHT, SLIDE_LEFT_OUT, SLIDE_RIGHT_OUT, SLIDE_LEFT_IN, SLIDE_RIGHT_IN, } from './constants.js';
let SimpleCarousel = class SimpleCarousel extends LitElement {
    constructor() {
        super(...arguments);
        this.containerHeight = 0;
        this.slideIndex = 0;
        this.navigateToNextSlide = () => {
            this.navigateWithAnimation(1, SLIDE_LEFT_OUT, SLIDE_RIGHT_IN);
        };
        this.navigateToPrevSlide = () => {
            this.navigateWithAnimation(-1, SLIDE_RIGHT_OUT, SLIDE_LEFT_IN);
        };
    }
    render() {
        const containerStyles = {
            height: `${this.containerHeight}px`,
        };
        return html `
    <slide-button
    @click=${this.navigateToPrevSlide}>
    ${BOOTSTRAP_CHEVRON_LEFT}
    </slide-button>
    <div id="container"
    style="${styleMap(containerStyles)}">
    <slot></slot>
    </div>
    <slide-button
      @click=${this.navigateToNextSlide}>
      ${BOOTSTRAP_CHEVRON_RIGHT}
    </slide-button>
    `;
    }
    firstUpdated() {
        this.containerHeight = getMaxElHeight(this.slideElements);
        this.initializeSlide();
    }
    initializeSlide() {
        for (let i = 0; i < this.slideElements.length; i++) {
            if (i === this.slideIndex) {
                showSlide(this.slideElements[i]);
            }
            else {
                hideSlide(this.slideElements[i]);
            }
        }
    }
    changeSlide(offset) {
        const slideCount = this.slideElements.length;
        this.slideIndex =
            (slideCount + ((this.slideIndex + offset) % slideCount)) % slideCount;
    }
    async navigateWithAnimation(nextSlideOffset, leavingAnimation, enteringAnimation) {
        const elLeaving = this.slideElements[this.slideIndex];
        const leavingAnim = elLeaving.animate(leavingAnimation[0], leavingAnimation[1]);
        // Change slide
        this.changeSlide(nextSlideOffset);
        // Entering slide
        const newSlideEl = this.slideElements[this.slideIndex];
        // Show the new slide
        showSlide(newSlideEl);
        // Teleport it out of view and animate it in
        const enteringAnim = newSlideEl.animate(enteringAnimation[0], enteringAnimation[1]);
        try {
            // Wait for animations
            await Promise.all([leavingAnim.finished, enteringAnim.finished]);
            // Hide the element that left
            hideSlide(elLeaving);
        }
        catch {
            /* Animation was cancelled */
        }
    }
};
SimpleCarousel.styles = css `
    ::slotted(.slide-hidden) {
      display: none;
    }
    /** So the elements all overlap **/
    ::slotted(*) {
      position: absolute;
      padding: 1em;
    }
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    #container {
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin: 0 18px;
      padding: 1em;
      overflow: hidden;
      position: relative;
      box-shadow: var(--carousel-box-shadow, 
        #293198 0.2em 0.2em 0.4em, 
        #ceffff -0.1em -0.1em 0.2em);
    }
  `;
__decorate([
    state()
], SimpleCarousel.prototype, "containerHeight", void 0);
__decorate([
    property({ type: Number })
], SimpleCarousel.prototype, "slideIndex", void 0);
__decorate([
    queryAssignedElements()
], SimpleCarousel.prototype, "slideElements", void 0);
SimpleCarousel = __decorate([
    customElement('simple-carousel')
], SimpleCarousel);
export { SimpleCarousel };
function hideSlide(el) {
    el.classList.add('slide-hidden');
}
function showSlide(el) {
    el.classList.remove('slide-hidden');
}
function getMaxElHeight(els) {
    return Math.max(0, ...els.map((el) => el.getBoundingClientRect().height));
}
//# sourceMappingURL=simple-carousel.js.map