(function (global: Window) {
  // TypingAnimation class definition
  type Theme = {
    keyword: string;
    string: string;
    comment: string;
    background: string;
    text: string;
    cursor: string;
  };

  const theme: { [key: string]: Theme } = {
    default: {
      keyword: "#c678dd", // Purple for keywords
      string: "#98c379", // Green for strings
      comment: "#7f848e", // Gray for comments
      background: "#1e1e1e", // Dark background for the code container
      text: "#abb2bf", // Light gray text color
      cursor: "#ffffff", // White cursor color
    },
    light: {
      keyword: "#0000FF", // Blue for keywords
      string: "#008000", // Green for strings
      comment: "#808080", // Light gray for comments
      background: "#FFFFFF", // White background
      text: "#000000", // Black text
      cursor: "#000000", // Black cursor
    },
    dark: {
      keyword: "#ff79c6", // Pink for keywords
      string: "#50fa7b", // Light green for strings
      comment: "#f8f8f2", // Light gray for comments
      background: "#282a36", // Dark background for code container
      text: "#f8f8f2", // Light text
      cursor: "#ffffff", // White cursor
    },
  };

  class TypingAnimation {
    private element: HTMLElement;
    private text: string;
    private typingSpeed: number;
    private cursorSpeed: number;
    private index: number;
    private cursorElement: HTMLSpanElement | null;
    private isPaused: boolean;
    private isStopped: boolean;
    private timeoutId: number | null;
    private theme: Theme;

    constructor(
      element: HTMLElement,
      text: string,
      typingSpeed: number = 50,
      cursorSpeed: number = 600,
      themeName: keyof typeof theme = "default"
    ) {
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
    private injectStyles(): void {
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
    public start(): void {
      this.isPaused = false;
      this.isStopped = false;
      this.typeCode();
    }

    // Function to pause the typing animation
    public pause(): void {
      this.isPaused = true;
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
    }

    // Function to stop the typing animation
    public stop(): void {
      this.isStopped = true;
      this.index = 0;
      this.element.innerHTML = "";
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
    }

    // Function to handle the typing animation logic
    private typeCode(): void {
      if (this.isStopped) return;
      if (this.isPaused) return;

      if (this.index < this.text.length) {
        const currentChar = this.text[this.index];
        this.element.innerHTML += currentChar; // Add character without syntax highlighting
        this.index++;

        this.timeoutId = setTimeout(() => this.typeCode(), this.typingSpeed);
      } else {
        this.addCursor();
      }
    }

    // Function to add a cursor after typing is done
    private addCursor(): void {
      this.cursorElement = document.createElement("span");
      this.cursorElement.classList.add("cursor");
      this.element.appendChild(this.cursorElement);
      this.blinkCursor();
    }

    // Function to make the cursor blink
    private blinkCursor(): void {
      if (this.cursorElement) {
        this.cursorElement.style.animation = `blink ${this.cursorSpeed}ms infinite alternate`;
      }
    }
  }

  // Expose TypingAnimation class to global scope
  global.TypingAnimation = TypingAnimation;
})(window);
