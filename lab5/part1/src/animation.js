// Создание приложения PixiJS
const app = new PIXI.Application({
    width: 400,
    height: 400,
    backgroundColor: 0xffffff
});
document.body.appendChild(app.view);

// Создание прямоугольника
const rect = new PIXI.Graphics();
rect.beginFill(0x3498db);
rect.drawRect(-50, -25, 100, 50);
rect.endFill();
rect.x = app.screen.width / 2;
rect.y = app.screen.height / 2;
app.stage.addChild(rect);

// Анимация вращения
app.ticker.add(() => {
    rect.rotation += 0.03;
}); 