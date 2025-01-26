# TypingAnimation

A simple JavaScript library for creating typing animation effects with customizable typing speed, cursor speed, and themes. This library can be used to create code-like typing effects in web pages.

## Usage

You can easily include the TypingAnimation.js script in your project by linking it directly from the CDN.

### Including in Your HTML

1. Add the following script tag in your HTML to include the TypingAnimation.js file from the CDN:

```html
<script src="https://sxudan.github.io/typinganimation/dist/TypingAnimation.js"></script>
```

Now, you can use the TypingAnimation class to create typing animations on any element.
Example Usage
Here's an example of how to use the TypingAnimation class in your HTML file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Typing Animation Example</title>
  <style>
    /* You can style the container as needed */
    .code-container {
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      width: 600px;
      white-space: pre;
      overflow: hidden;
      color: #abb2bf;
      font-family: 'Courier New', monospace;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <!-- Create a container for the typing animation -->
  <div id="codeContainer" class="code-container"></div>

  <!-- Include TypingAnimation.js from the CDN -->
  <script src="https://sxudan.github.io/typinganimation/dist/TypingAnimation.js"></script>

  <script>
    // Create a new TypingAnimation instance
    const codeText = `const greet = () => {
      console.log("Hello, World!");
    };
    
    greet();`;

    const element = document.getElementById('codeContainer');

    const typingAnimation = new TypingAnimation(element, codeText, 100, 500, 'dark');

    // Start the typing animation
    typingAnimation.start();
  </script>
</body>
</html>
```

### Available Options
- **element (HTMLElement)**: The container element where the text will be typed.
- **text (string)**: The text to be typed, including line breaks \n for multi-line support.
- **typingSpeed (number)**: The typing speed (in milliseconds). Default is 50ms.
- **cursorSpeed (number)**: The cursor blink speed (in milliseconds). Default is 600ms.
- **themeName (string)**: The theme for the animation. Can be 'default', 'light', or 'dark'. Default is 'default'.

### Methods
- start(): Starts the typing animation.
- pause(): Pauses the typing animation.
- stop(): Stops the typing animation and resets the animation.

### Themes
You can customize the appearance by choosing a theme. The available themes are:

- default: A dark theme with purple keywords, green strings, and gray comments.
- light: A light theme with blue keywords, green strings, and gray comments.
- dark: A dark theme with pink keywords, light green strings, and light gray comments.

### Example of Using Pause and Resume

```javascript
// Example of pausing and resuming the animation
const typingAnimation = new TypingAnimation(element, codeText);
typingAnimation.start();

// To pause the typing animation
typingAnimation.pause();

// To resume the typing animation
typingAnimation.start();
```

### Demo
[Demo](https://sxudan.github.io/typinganimation/demo-video.mp4)

### License
This project is open-source and available under the MIT License.
