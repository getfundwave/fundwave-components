import {html, css, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import "./fw-color-pick";
import "./fw-size-pick";
import "./fw-font-pick";
import { home, colors, sizes, fonts, pallette, backgroundcolors, errorcolors, textcolors, fontoptions, initialtheme } from "./models";

@customElement('fw-theme-builder')
class FwThemeBuilder extends LitElement {
    @state()
    nav = "home";

    @property({type : Array, converter: {
        fromAttribute: (value : string) => {
            return JSON.parse(value);
        },
        toAttribute: (value : Object) => {
            return JSON.stringify(value);
        }
    }})
    fontOptions = fontoptions;

    @property({type : Object, converter: {
        fromAttribute: (value : string) => {
            return JSON.parse(value);
        },
        toAttribute: (value : Object) => {
            return JSON.stringify(value);
        }
    }})
    theme = initialtheme;

    colorChangeCallback (e : any, theme : Object) {
        this.theme.colors[e.detail.section][e.detail.type] = e.detail.value;
    }

    sizeChangeCallback (e : any, theme : Object) {
        this.theme.sizes[e.detail.section] = e.detail.value;
    }

    fontChangeCallback (e : any, theme : Object) {
        this.theme.fonts[e.detail.section]= e.detail.value;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('color-change', (e: any) => this.colorChangeCallback(e, this.theme));
        this.addEventListener("size-change", (e: any) => this.sizeChangeCallback(e, this.theme));
        this.addEventListener("font-change", (e: any) => this.fontChangeCallback(e, this.theme));
    }

    disconnectedCallback(): void {
        this.removeEventListener("color-change", (e: any) => this.colorChangeCallback(e, this.theme));
        this.removeEventListener("size-change", (e: any) => this.sizeChangeCallback(e, this.theme));
        this.removeEventListener("font-change", (e: any) => this.fontChangeCallback(e, this.theme));
        super.disconnectedCallback();
    }


    static styles = css`
    .primary-color {
        background-color: var(--primary) !important;
    }

    .secondary-color {
        background-color: var(--secondary) !important;
    }

    .primary-btn-text-color {
        background-color: var(--primary-contrast) !important;
    }

    .secondary-btn-text-color {
        background-color: var(--secondary-contrast) !important;
    }

    .title-text-color {
        background-color: var(--title-text-color) !important;
    }

    .subtitle-text-color {
        background-color: var(--subtitle-text-color) !important;
    }

    .body-text-color {
        background-color: var(--body-text-color) !important;
    }

    .background-color {
        background-color: var(--background-color) !important;
    }

    .floating-container {
        position: absolute;
        bottom: 1rem;
        width: 70rem;
        left: calc((100svw - 72rem)/2);
        height: max-content;
        background-color: #ffffff;
        z-index: 10;
        border-radius: 10px;
        box-shadow: 0px 10px 40px -10px #1b1b1b4c;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem 1rem;
    }

    .content-container {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .back-button {
        user-select: none;
        cursor: pointer;
        width: 3rem;
        padding: 0.5rem 0.5rem;
        z-index: 100;
    }
    .back-hidden {
        opacity: 0;
        cursor: default;
    }
    .back-icon {
        height: 1rem;
    }
    
    .action-button {
        transition: all 0.1s ease-in-out;
        cursor: pointer;
        width: 3.5rem;
        user-select: none;
        text-align: center;
        border-radius: 4px;
        font-family: "DM Sans", sans-serif;
        padding: 0.5rem 0.5rem;
        box-shadow: #1b1b1b3b 0px 4px 2px;
    }
    .save-btn {
        background-color: #aaf16f;
    }
    .discard-btn {
        background-color: #e7e7e7;
    }
    .action-button:active {
        box-shadow: none;
        transform: translateY(-2px);
    }
    

    .theme-button {
        user-select: none;
        width: 6rem;
        height: 3.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e2e2e2;
        border-radius: 4px;
        padding: 0.2rem 0.5rem;
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        color: #2b2b2b;
        cursor: pointer;
        box-shadow: #1b1b1b3b 0px 4px 10px;
    }
    .theme-button:hover {
        background-color: #dddddd;
    }
    .theme-button:active {
        box-shadow: none;
    }
    .theme-button > p {
        margin: 0;
    }
    .content-container > fw-color-pick {
        display : flex;
    }
    .content-container > fw-size-pick {
        display : flex;
    }
    .content-container > fw-font-pick {
        display : flex;
    }
    .contentspan {
        display: flex;
        width: 90%;
        justify-content: center;
        margin-right: 3rem;
    }

    @media (max-width: 1200px) {
        .floating-container {
            width: 44rem;
            left: calc((100vw - 46rem)/2);
        }
    }

    @media (max-width: 965px) {
        .floating-container {
            width: calc(100% - 4rem);
            left: 1rem;
        }
    }
    `;

    sectionChangeHandler (e : any, s : string) {
        this.nav = s;
    }

    navigateBack() {
        if (this.nav == "home")
            return; 
        if (this.nav == "colors" || this.nav == "sizes"  || this.nav == "fonts" ) {
            this.nav = "home";
        } else {
            this.nav = "colors";
        }
    }
    
    render () {
        let content;
        switch (this.nav) {
            case "home":
                content = html`
                <div class="content-container">
                    ${
                        home.filter(obj => (this.theme?Object.keys(this.theme):[]).includes(obj.value)).map((section) => (
                            html`
                            <span class="theme-button" @click=${(e : any) => this.sectionChangeHandler(e, `${section.value}`)}>
                                <p>${section.label}</p>
                            </span>
                            `
                        ))
                    }
                </div>
            `;    
            break;
            case "colors":
                content = html`
                <div class="content-container">
                    ${
                        colors.filter(obj => (this.theme.colors?Object.keys(this.theme.colors):[]).includes(obj.value)).map((clr) => (
                            html`
                            <span class="theme-button" @click=${(e : any) => {this.sectionChangeHandler(e, `colors-${clr.value}`)}}>
                                <p>${clr.label}</p>
                            </span>
                            `
                        ))
                    }
                </div>
                `;
            break;
            case "sizes":
                content = html`
                <span class="content-container">
                    ${
                        sizes.filter(obj => (this.theme.sizes?Object.keys(this.theme.sizes):[]).includes(obj.value)).map((size) => (
                            html`
                            <fw-size-pick
                                label="${size.label}"
                                theme="${this.theme}"
                                value="${size.value}"
                            >
                            </fw-size-pick>
                            `
                        ))
                    }
                </span>
                `;
            break;
            case "fonts":
                content = html`
                <span class="content-container">
                    ${
                        fonts.filter(obj => (this.theme.fonts?Object.keys(this.theme.fonts):[]).includes(obj.value)).map((font) => (
                            html`
                            <fw-font-pick
                                label="${font.label}"
                                value="${font.value}"
                                theme="${this.theme}"
                                .options="${this.fontOptions}"
                            >
                            </fw-font-pick>
                            `
                        ))
                    }
                </span>
                `;
            break;

            case "colors-primary":
                content = html`
                <span class="content-container">
                    ${
                        pallette.filter(obj => (this.theme.colors.primary?Object.keys(this.theme.colors.primary):[]).includes(obj.value)).map((item) => (
                            html`
                                <fw-color-pick
                                    exportparts="color-button, color-label, color-hidden-input"
                                    label="Primary${item.label}"
                                    cssvariable="${item.value == "hex" ? `--primary`: `--primary-${item.value}`}"
                                    .theme="${this.theme}"
                                    value="${item.value}"
                                    type="primary"
                                >
                                </fw-color-pick>
                            `
                        ))
                    }
                </span> 
                `;
            break;
            case "colors-secondary":
                content = html`
                <span class="content-container">
                    ${
                        pallette.filter(obj => (this.theme.colors.secondary?Object.keys(this.theme.colors.secondary):[]).includes(obj.value)).map((item) => (
                            html`
                                <fw-color-pick
                                    exportparts="color-button, color-label, color-hidden-input"
                                    label="Secondary${item.label}"
                                    cssvariable="${item.value == "hex" ? `--secondary`: `--secondary-${item.value}`}"
                                    .theme="${this.theme}"
                                    value="${item.value}"
                                    type="secondary"
                                >
                                </fw-color-pick>
                            `
                        ))
                    }
                </span> 
                `;
            break;
            case "colors-background":
                content = html`
                <span class="content-container">
                    ${
                        backgroundcolors.filter(obj => (this.theme.colors.background?Object.keys(this.theme.colors.background):[]).includes(obj.value)).map((item) => (
                            html`
                                <fw-color-pick
                                    exportparts="color-button, color-label, color-hidden-input"
                                    label="Background${item.label}"
                                    cssvariable="${item.value == "hex" ? `--background`: `--background-${item.value}`}"
                                    .theme="${this.theme}"
                                    value="${item.value}"
                                    type="background"
                                >
                                </fw-color-pick>
                            `
                        ))
                    }
                </span> 
                `;
            break;
            case "colors-error":
                content = html`
                <span class="content-container">
                    ${
                        errorcolors.filter(obj => (this.theme.colors.error?Object.keys(this.theme.colors.error):[]).includes(obj.value)).map((item) => (
                            html`
                                <fw-color-pick
                                    exportparts="color-button, color-label, color-hidden-input"
                                    label="Error${item.label}"
                                    cssvariable="${item.value == "hex" ? `--error`: `--error-${item.value}`}"
                                    .theme="${this.theme}"
                                    value="${item.value}"
                                    type="error"
                                >
                                </fw-color-pick>
                            `
                        ))
                    }
                </span>`;
            break;
            case "colors-text":
                content = html`
                <span class="content-container">
                    ${
                        textcolors.filter(obj => (this.theme.colors.text?Object.keys(this.theme.colors.text):[]).includes(obj.value)).map((clr) => (
                            html`
                                <fw-color-pick
                                    exportparts="color-button, color-label, color-hidden-input"
                                    label="${clr.label}"
                                    cssvariable="--text-${clr.value}"
                                    .theme="${this.theme}"
                                    value="${clr.value}"
                                    type="text"
                                >
                                </fw-color-pick>
                            `
                        ))
                    }
                </span>`;
            break;
        }

        return html`
            <div part="container" class="floating-container">
                <span part="back-icon-container" class="back-button ${this.nav == "home" ? "back-hidden" : ""}" @click="${this.navigateBack}">
                    <img part="back-icon-image" class="back-icon" src="back-arrow.svg" />
                </span>
                <span part="content-container" class="contentspan">
                    ${content}
                </span>
            </div>
        `;
    }
}