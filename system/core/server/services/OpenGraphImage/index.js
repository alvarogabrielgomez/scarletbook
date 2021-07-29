const { createCanvas, loadImage, registerFont, Image } = require('canvas');
const config = require('../../../config');
const path = require('path');
const assetsFolder = config.get('assetsFolder');

class OpenGraphImageService {
    constructor(options) {
        this.canvasSize = {
            width: 1200,
            height: 600
        };

        this.margins = {
            top: 120,
            right: 50,
            botton: 100,
            left: 50
        }

        this.lineGap = 95;
    }

    createCanvas(article) {
        return new Promise(async (resolve, reject) => {
            const canvas = createCanvas(this.canvasSize.width, this.canvasSize.height);
            const context = canvas.getContext('2d');
            registerFont(path.join(assetsFolder, '/internal/fonts/montserrat/Montserrat-SemiBold.ttf'), { family: 'Montserrat' });
        
            // Draw Background Color
            context.fillStyle = '#000';
            context.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    
            // Draw Background Image from URL
            await this.drawBackground(context, article.heroImage, this.canvasSize);
    
            // Draw Logo from Internal Asset
           this.drawLogo(context, this.canvasSize);
    
            // Render Text
            this.renderLines(context, article.title, 140);
    
            canvas.toBuffer((err, buffer) => {
                if(!err) {
                    resolve(buffer);
                }
                reject(err);
            }, 'image/png');
        });
    }

    drawBackground(context, heroImageUrl, canvasSize) {
        return new Promise(async (resolve, reject) => {
            let backgroundImage = new Image();
            backgroundImage.src = heroImageUrl;

            backgroundImage.onload = () => {
                var sourceX = 0;
                var sourceY = backgroundImage.height > canvasSize.height ? backgroundImage.height * 0.15 : 0;
                var sourceWidth = backgroundImage.width;
                var sourceHeight = backgroundImage.height;
                var destWidth = canvasSize.width;
                var destHeight = sourceHeight;
                var destX = 0;
                var destY = 0;
                  
                context.drawImage(
                    backgroundImage, 
                    sourceX, 
                    sourceY, 
                    sourceWidth, 
                    sourceHeight, 
                    destX, 
                    destY, 
                    destWidth,
                    destHeight
                    );
                    
                const gradient = context.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, "rgba(14, 23, 47, 0.71)");
                gradient.addColorStop(0.7777777777777778, "rgba(14, 23, 47, 0.22)");
                gradient.addColorStop(1, "rgba(14, 23, 47, 0.22)");
                context.fillStyle = gradient;
                context.fillRect(0, 0, canvasSize.width, canvasSize.height);
                resolve();
            }

            backgroundImage.onerror = () => {
                // Draw Fallback Background
                context.fillStyle = '#000';
                context.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
                resolve();
            }
        });
    }

    async drawLogo(context, canvasSize) {
        const logoPath = path.join(assetsFolder, '/public/logos/xl_logo_white.png');
        let logoImage = await loadImage(logoPath);
        
        const clickPath = path.join(assetsFolder, '/internal/icons/click.png');
        let clickImage = await loadImage(clickPath);

        const marginBottom = this.margins.botton;
        const marginFromTop = canvasSize.height - marginBottom;
    
        const marginRight = this.margins.right + 50;
        const marginFromLeft = canvasSize.width - marginRight;
    
        context.drawImage(logoImage, 50, marginFromTop);
        context.drawImage(clickImage, marginFromLeft, marginFromTop - 10);
    
        const textFinal = "Entra para leer más";
    
        const fontSize = 30;
        context.font = `Semibold ${fontSize}pt Montserrat`;
        context.textAlign = 'right';
        context.fillStyle = '#fff';
        context.shadowOffsetX = 3;
        context.shadowOffsetY = 3;
        context.shadowColor = "rgba(0,0,0,0.3)";
        context.shadowBlur = 5;
        context.fillText(textFinal, marginFromLeft - 10, marginFromTop + fontSize);
    }

    renderLines(context, text, maxWidth) {
        const lines = this.getLines(context, text, maxWidth);
        var currentLine = lines[0];
        const marginLeft = this.margins.left;
        const marginTop = this.margins.top;
        const lineGap = this.lineGap;
    
        let actualMarginTop = marginTop;
        for (let index = 0; index < lines.length; index++) {
            const element = lines[index];
            
            context.font = 'Semibold 50pt Montserrat'
            context.textAlign = 'left';
            context.fillStyle = '#fff';
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
            context.shadowColor = "rgba(0,0,0,0.3)";
            context.shadowBlur = 4;
            context.fillText(element, marginLeft, actualMarginTop);
            actualMarginTop = actualMarginTop + lineGap;
        }
    
    }

    getLines(ctx, text, maxWidth) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];
    
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
}

module.exports = {
    createService(options) {
        return new OpenGraphImageService(options);
    }
};