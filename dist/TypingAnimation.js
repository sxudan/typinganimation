"use strict";
(function (global) {
    const theme = {
        default: {
            keyword: "#c678dd",
            string: "#98c379",
            comment: "#7f848e",
            background: "#1e1e1e",
            text: "#abb2bf",
            cursor: "#ffffff", // White cursor color
        },
        light: {
            keyword: "#0000FF",
            string: "#008000",
            comment: "#808080",
            background: "#FFFFFF",
            text: "#000000",
            cursor: "#000000", // Black cursor
        },
        dark: {
            keyword: "#ff79c6",
            string: "#50fa7b",
            comment: "#f8f8f2",
            background: "#282a36",
            text: "#f8f8f2",
            cursor: "#ffffff", // White cursor
        },
    };
    class TypingAnimation {
        constructor(element, text, typingSpeed = 50, cursorSpeed = 600, themeName = "default") {
            this.element = element;
            this.text = text;
            this.typingSpeed = typingSpeed;
            this.cursorSpeed = cursorSpeed;
            this.index = 0;
            this.cursorElement = null;
            this.isPaused = false;
            this.isStopped = false;
            this.timeoutId = null;
            // Use the specified theme or fallback to default
            this.theme = theme[themeName] || theme.default;
            // Inject default styles for .code-container and .cursor
            this.injectStyles();
        }
        // Function to inject default styles into the document head
        injectStyles() {
            const style = document.createElement("style");
            style.innerHTML = `
                .code-container {
                    background-color: ${this.theme.background};
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    width: 600px;
                    white-space: pre;
                    overflow: hidden;
                    color: ${this.theme.text};
                    font-family: 'Courier New', monospace;
                    font-size: 16px;
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
            this.element.innerHTML = "";
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
                const currentChar = this.text[this.index];
                this.element.innerHTML += currentChar; // Add character without syntax highlighting
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
            this.element.appendChild(this.cursorElement);
            this.blinkCursor();
        }
        // Function to make the cursor blink
        blinkCursor() {
            if (this.cursorElement) {
                this.cursorElement.style.animation = `blink ${this.cursorSpeed}ms infinite alternate`;
            }
        }
    }
    // Expose TypingAnimation class to global scope
    global.TypingAnimation = TypingAnimation;
})(window);
