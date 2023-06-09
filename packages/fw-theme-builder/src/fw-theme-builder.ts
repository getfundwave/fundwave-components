import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import "./fw-color-pick";

@customElement('fw-theme-builder')
class FwThemeBuilder extends LitElement {
    constructor() {
        super();
    }
    
    @property()
    theme = {
        fonts : {
            primary : {
                "name" : "",
                "import" : "",
            },
            secondary : {
                "name" : "",
                "import" : "",
            }
        },
        sizes : {
            "font-tiny" : "",
            "font-xs" : "",
            "font-s" : "",
            "font-m" : "",
            "font-l" : "",
            "font-xl" : "",
            "font-huge" : "",
        },
        colors : {
            "primary" : {
                "hex" : "",
                "rgb" : "",
                "l1" : "",
                "l2" : "",
                "l3" : "",
                "contrast" : "",
            },
            "secondary" : {
                "hex" : "",
                "rgb" : "",
                "l1" : "",
                "l2" : "",
                "l3" : "",
                "contrast" : "",
            },
            "background" : {
                "hex" : "",
                "rgb" : "",
            },
            "error" : {
                "hex" : "",
                "rgb" : "",
                "l1" : "",
            }
        }
    }

    handleColorChange(e : Event, CSSclass : string) {
        let clr = (e.target as HTMLInputElement)?.value;
        console.log(123, clr);
        if (clr == "rgba(0, 0, 0, 0)")
            return;
        document.body.style.setProperty(("--" + (e.target as HTMLInputElement).parentElement?.classList[0]), clr);
        let rgb = hexToRgb(clr);
        let textClr = rgbToHex((255 - rgb.r), (255 - rgb.g), (255 - rgb.b));
        console.log(321, rgb);
        console.log(123, textClr);
        (e.target as HTMLInputElement).parentElement?.style.setProperty("color", textClr);
    }
    static styles = css`
    .primary-color {
        background-color: var(--primary-color) !important;
    }

    .secondary-color {
        background-color: var(--secondary-color) !important;
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
        justify-content: center;
        gap: 1rem;
        padding: 1rem 1rem;
    }

    .color-button {
        position: relative;
        background-color: #afafaf;
        border-radius: 4px;
        padding: 0.2rem 0.5rem;
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        color: #2b2b2b;
        cursor: pointer;
        box-shadow: #1b1b1b3b 0px 4px 10px;
    }

    .colorpicker-hidden {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 20;
        border-radius: 4px;
        cursor: pointer;
    }

    @media (max-width: 1200px) {
        .floating-container {
            width: 40rem;
            left: calc((100vw - 40rem)/2);
        }
    }
    `;
    render () {
        return html`
        <div class="floating-container">
            <!-- <fw-color-pick
                label="Primary"
                CSSvariable="--primary"
                value="${this.theme.colors.primary.hex}"  
                handleChange=${this.handleColorChange}  
            >
            </fw-color-pick> -->
            <span class="primary-color color-button">
                <p>Primary</p>
                <input 
                    class="colorpicker-hidden" 
                    type="color" 
                    value="#ff0000" 
                    @change="${this.handleColorChange}"
                />
            </span>
            <span class="secondary-color color-button">
                <p>Secondary</p>
                <input 
                    class="colorpicker-hidden" 
                    type="color" 
                    value="#ff0000" 
                    @change="${this.handleColorChange}"
                />
            </span>
            <span class="primary-btn-text-color color-button">
                <p>Primary button text</p>
                <input 
                    class="colorpicker-hidden" 
                    type="color" 
                    value="#ff0000" 
                    @change="${this.handleColorChange}"
                />
            </span>
            <span class="secondary-btn-text-color color-button">
                <p>Secondary button text</p>
                <input 
                    class="colorpicker-hidden" 
                    type="color" 
                    value="#ff0000" 
                    @change="${this.handleColorChange}"
                />
            </span>
            <span class="title-text-color color-button">
                <p>Title text</p>
                <input 
                    class="colorpicker-hidden" 
                    type="color" 
                    value="#ff0000" 
                    @change="${this.handleColorChange}"
                />
            </span>
            <span class="subtitle-text-color color-button">
                <p>Subtitle text</p>
                <input 
                    class="colorpicker-hidden" 
                    type="color" 
                    value="#ff0000" 
                    @change="${this.handleColorChange}"
                />
            </span>
            <span class="body-text-color color-button">
                <p>Body text</p>
                <input 
                    class="colorpicker-hidden" 
                    type="color" 
                    value="#ff0000" 
                    @change="${this.handleColorChange}"
                />
            </span>
            <span class="background-color color-button">
                <p>Background</p>
                <input 
                    class="colorpicker-hidden" 
                    type="color" 
                    value="#ff0000" 
                    @change="${(e : any) => {this.handleColorChange(e, "asdas")}}"
                />
            </span>
        </div>
        `;
    }
}

function hexToRgb(hex : string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {
        r: 0,
        g: 0,
        b: 0
    };
}

function rgbToHex(r : number, g: number, b: number) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}