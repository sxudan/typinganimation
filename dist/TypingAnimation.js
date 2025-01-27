"use strict";
(function (global) {
    const theme = {
        default: {
            keyword: "#c678dd",
            string: "#98c379",
            comment: "#7f848e",
            background: "#1e1e1e",
            text: "#abb2bf",
            cursor: "#ffffff",
            property: "#56b6c2",
            value: "#98c379",
            symbol: "#e06c75",
        },
        light: {
            keyword: "#0000FF",
            string: "#008000",
            comment: "#808080",
            background: "#FFFFFF",
            text: "#000000",
            cursor: "#000000",
            property: "#56b6c2",
            value: "#98c379",
            symbol: "#e06c75",
        },
        dark: {
            keyword: "#ff79c6",
            string: "#50fa7b",
            comment: "#f8f8f2",
            background: "#282a36",
            text: "#f8f8f2",
            cursor: "#ffffff",
            property: "#56b6c2",
            value: "#98c379",
            symbol: "#e06c75",
        },
    };
    class TypingAnimation {
        constructor({ element, text, typingSpeed = 50, cursorSpeed = 600, themeName = "default", showMacHeader = true, width = 600, highlight = true, extraHeightOffset = 50, fixedHeight = true, }) {
            this.width = width;
            this.highlight = highlight;
            this.element = element;
            this.element.classList.add("container");
            this.text = text;
            this.typingSpeed = typingSpeed;
            this.cursorSpeed = cursorSpeed;
            this.index = 0;
            this.cursorElement = null;
            this.isPaused = false;
            this.isStopped = false;
            this.timeoutId = null;
            this.extraHeightOffset = extraHeightOffset;
            // Use the specified theme or fallback to default
            this.theme = theme[themeName] || theme.default;
            if (showMacHeader) {
                this.addMacHeader();
            }
            this.container = document.createElement("div");
            this.container.classList.add("code-container");
            this.element.appendChild(this.container);
            // temp
            if (fixedHeight) {
                const temporary = document.createElement("div");
                temporary.innerText = text;
                this.element.appendChild(temporary);
                this.contentHeight = temporary.clientHeight;
                temporary.style.display = "none";
            }
            else {
                this.contentHeight = 0;
            }
            // Inject default styles for .code-container and .cursor
            this.injectStyles();
        }
        addMacHeader() {
            const header = document.createElement("div");
            const dotContainer = document.createElement("div");
            dotContainer.classList.add("dot-container");
            const dot1 = document.createElement("div");
            dot1.classList.add("dot1");
            const dot2 = document.createElement("div");
            dot2.classList.add("dot2");
            const dot3 = document.createElement("div");
            dot3.classList.add("dot3");
            dotContainer.appendChild(dot1);
            dotContainer.appendChild(dot2);
            dotContainer.appendChild(dot3);
            header.appendChild(dotContainer);
            header.classList.add("mac-header");
            this.element.appendChild(header);
        }
        // Function to inject default styles into the document head
        injectStyles() {
            const style = document.createElement("style");
            style.innerHTML = `
                .container {
                  background-color: ${this.theme.background};
                  width: ${this.width}px;
                  border-radius: 16px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                  overflow: hidden;
                }
                .mac-header {
                  background-color: #282C34;
                  height: 44px;
                  padding-left: 16px;
                  padding-right: 16px;
                }
                .dot-container {
                  display: flex;
                  width: 60px;
                  height: 100%;
                  align-items: center;
                }
                .dot1, .dot2, .dot3 {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  margin: 0 5px;
                }
                .dot1 {
                  background-color: #FF5952;
                }
                .dot2 {
                  background-color: #E6C029;
                }
                .dot3 {
                  background-color: #52C12C;
                }  
                .code-container {
                    background-color: ${this.theme.background};
                    padding: 20px;
                    white-space: pre;
                    overflow: hidden;
                    color: ${this.theme.text};
                    font-family: 'Courier New', monospace;
                    font-size: 16px;
                    height: ${this.contentHeight
                ? this.contentHeight + this.extraHeightOffset + "px"
                : "auto"};
                }
                .cursor {
                    display: inline-block;
                    width: 8px;
                    height: 16px;
                    background-color: ${this.theme.cursor};
                    animation: blink ${this.cursorSpeed}ms infinite alternate;
                }
                @keyframes blink {
                    0% { opacity: 1; }
                    100% { opacity: 0; }
                }
                .keyword { color: ${this.theme.keyword}; }
                .property { color: ${this.theme.property}; }
                .value { color: ${this.theme.value}; }
                .symbol { color: ${this.theme.symbol} }
            `;
            document.head.appendChild(style);
        }
        // Function to start the typing animation
        start() {
            this.isPaused = false;
            this.isStopped = false;
            this.typeCode();
        }
        // Function to pause the typing animation
        pause() {
            this.isPaused = true;
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
        }
        // Function to stop the typing animation
        stop() {
            this.isStopped = true;
            this.index = 0;
            this.container.innerHTML = "";
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
        }
        // Function to handle the typing animation logic
        typeCode() {
            if (this.isStopped)
                return;
            if (this.isPaused)
                return;
            if (this.index < this.text.length) {
                let char = this.text[this.index];
                if (char === "\n") {
                    this.container.innerHTML += "<br>";
                }
                else if (char === " ") {
                    this.container.innerHTML += "&nbsp;";
                }
                else {
                    if (this.highlight) {
                        this.container.innerHTML = this.highlightCode(this.container.innerText + char);
                    }
                    else {
                        this.container.innerHTML += char;
                    }
                }
                this.index++;
                this.timeoutId = setTimeout(() => this.typeCode(), this.typingSpeed);
            }
            else {
                this.addCursor();
            }
        }
        // Function to add a cursor after typing is done
        addCursor() {
            this.cursorElement = document.createElement("span");
            this.cursorElement.classList.add("cursor");
            this.container.appendChild(this.cursorElement);
            this.blinkCursor();
        }
        // Function to make the cursor blink
        blinkCursor() {
            if (this.cursorElement) {
                this.cursorElement.style.animation = `blink ${this.cursorSpeed}ms infinite alternate`;
            }
        }
        highlightCode(text) {
            text = text.replace(/</g, "___+++___").replace(/>/g, "___%%%___");
            return (text
                // 🔹 Highlight JavaScript keywords FIRST
                .replace(/\b(function|const|let|var|if|else|return|for|while|switch|case|break|continue|default|class|extends|new|try|catch|throw|typeof|instanceof|import|export|await|async)\b/g, '<span class="keyword">$1</span>')
                // 🔹 Highlight CSS properties
                .replace(/(body|position|overflow|background|font-size|border-radius|border|cursor|outline|opacity|transform|animation|pointer-events|padding|margin|border-radius|display|justify-content|align-items|height|color|background-color|font-family)/g, '<span class="property">$1</span>')
                // 🔹 Highlight hex color values
                .replace(/(#\w{6})/g, '<span class="value">$1</span>')
                // 🔹 Highlight font-family values
                .replace(/('Courier New', monospace)/g, '<span class="value">$1</span>')
                // 🔹 Highlight symbols LAST to avoid breaking keywords
                .replace(/(:|;|\{|\})/g, '<span class="symbol">$1</span>')
                .replace(/___\+\+\+___/g, "&lt;")
                .replace(/___%%%___/g, "&gt;"));
            // 🔹 Highlight symbols ONLY if they are NOT inside quotes
        }
    }
    // Expose TypingAnimation class to global scope
    global.TypingAnimation = TypingAnimation;
})(window);
