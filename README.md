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
    <title>Typing Animation</title>
</head>

<body>
    <!-- The code container will be dynamically created and styled by the library -->

    <!-- Include the typing animation library -->
    <script src="../dist/TypingAnimation.js"></script>

    <script>
        // The text to be animated
        const codeText = `
body {
    background-color: #282c34;
    color: #abb2bf;
    font-family: 'Courier New', monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
} 
`;

    // Create a container element where the animation will appear
    const codeContainer = document.createElement('div');
    document.body.appendChild(codeContainer);
    // Initialize and start the typing animation
    const typing = new TypingAnimation({ element: codeContainer, text: codeText });
    typing.start();
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
- **width (number)**: The width of the container.

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

https://github.com/user-attachments/assets/2b5a1525-9019-404d-a62c-e719a0201950

[Demo Website](https://sxudan.github.io/typinganimation/example/index.html)




### License
This project is open-source and available under the MIT License.
