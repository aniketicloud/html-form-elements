
const template = document.createElement('template');
template.innerHTML = `
<style>
    h3 {
        color: blue;
    }
    input {
        background-color: red;
    }
</style>
<div class="dl-input">
    <h3></h3>
    <input />
</div>
`;

class DlInput extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('h3').innerText = 'From Input Component';

        const typeAttribute = this.getAttribute('type');
        const defaultType = "text";
        this.shadowRoot.querySelector('input').setAttribute('type', !typeAttribute ? defaultType : typeAttribute)

        // WIP: make array of all attributes, add null condition too
        // then make "text" as default
        const sizeAttribute = this.getAttribute('size');
        
    }
}

window.customElements.define('dl-input', DlInput)