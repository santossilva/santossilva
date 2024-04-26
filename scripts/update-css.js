const fs = require('fs');

// Define the paths to your JSON and CSS files
const jsonFilePath = 'src/json/tokensStudio/customization.json';
const cssFilePath = 'src/css/customization.css';

// Load the design tokens JSON
const tokens = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Function to generate CSS content from tokens
function generateCSS(tokens) {
    let cssContent = ":root {\n";

    // Iterate over breakpoints and tokens
    for (const [breakpoint, data] of Object.entries(tokens.headline)) {
        const fontSizeBase = `--sd-headline-font-size-base-breakpoint${breakpoint.slice(-2)}: ${data.fontSize.base.value}px;\n`;
        const fontSizeFactor = `--sd-headline-font-size-factor-breakpoint${breakpoint.slice(-2)}: ${data.fontSize.factor.value};\n`;
        const lineHeightRatio = `--sd-headline-line-height-ratio-breakpoint${breakpoint.slice(-2)}: ${data.lineHeight.sizeHeightRatio.value};\n`;
        const lineHeightDampener = `--sd-headline-line-height-factor-dampener-breakpoint${breakpoint.slice(-2)}: ${data.lineHeight['factor-dampener'].value};\n`;

        cssContent += `  /* Breakpoint ${breakpoint} */\n`;
        cssContent += fontSizeBase;
        cssContent += fontSizeFactor;
        cssContent += lineHeightRatio;
        cssContent += lineHeightDampener;
    }

    cssContent += "}\n";

    // Handle media queries if necessary (not shown here for brevity)
    // You would add conditions to modify the CSS for specific breakpoints

    return cssContent;
}

// Write the CSS to a file
const cssContent = generateCSS(tokens);
fs.writeFileSync(cssFilePath, cssContent);
console.log('CSS file has been updated based on JSON design tokens.');
