class DlRandomQuote extends HTMLElement {
    constructor() {
        super();
        /**
         * ES2015 classes don’t have the concept of declaring private variables. 
         * But prefixing a variable or method with underscore means that it’s private 
         * and probably shouldn’t used externally. So we can add a condition in render 
         * method to set it to null if there is any variable starting with underscore.
         */
        this._quotes = [
            "Things should be simple but not too simple.",
            "Sometimes the questions are complicated and the answers are simple.",
            "Teeth are always in style."
        ];

        /**
         * $prefix to variable means a variable which is going to store a reference 
         * to the element in a DOM. So it’s easy to see what type of data you 
         * are dealing with.
         */
        this._$quote = null;

        /**
         * instance used to update the quote
         */
        this._interval = null;
    }
    /**
     * lifecycle callback
     * Invoked each time the custom element is appended into a document-connected element. 
     * This will happen each time the node is moved, and may happen before the element's 
     * contents have been fully parsed.
     */
    connectedCallback() {
        this.innerHTML = `
        <style>
            .dl-container {
                width: 500px;
                margin: auto;
                border: dotted 1px #999;
                padding: 20px;
            }
            .dl-container h1 {
                font-size: 20px;
                margin: 0;
            }
        </style>
        <div class="dl-container">
            <h1>Random Quote: </h1>
            <p>"<span id="quote"></span>"</p>
        </div>
        `;

        // pull the reference to quote element out and configure the interval
        this._$quote = this.querySelector("#quote");
        this._interval = setInterval(() => this._render(), 500);
        this._render();
    }
    _render() {
        if (this._$quote !== null) {
            this._$quote.innerHTML = this._quotes[Math.floor(Math.random() * this._quotes.length)];
        }
    }
    disconnectedCallback() {
        clearInterval(this._interval);
    }
}

window.customElements.define("dl-random-quote", DlRandomQuote)