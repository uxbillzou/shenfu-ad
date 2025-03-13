// 狐狸奔跑动画 - 为banner添加动态效果

document.addEventListener('DOMContentLoaded', function() {
    // 获取hero部分并添加canvas元素
    const hero = document.querySelector('.hero');
    
    // 创建canvas元素
    const canvas = document.createElement('canvas');
    canvas.id = 'fox-animation';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0'; // 确保在内容下方
    
    // 将canvas添加到hero部分
    hero.insertBefore(canvas, hero.firstChild);
    
    // 获取canvas上下文
    const ctx = canvas.getContext('2d');
    
    // 加载图像资源
    const foxImage = new Image();
    foxImage.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMTAwIj48c3R5bGU+LmZveC1ib2R5e2ZpbGw6I2ZmYTUwMH0uZm94LWVhcnN7ZmlsbDojZmY4YzAwfS5mb3gtbGVnc3tmaWxsOiNmZjhjMDB9LmZveC10YWlse2ZpbGw6I2ZmYTUwMH08L3N0eWxlPjxnIGNsYXNzPSJmb3giPjxlbGxpcHNlIGNsYXNzPSJmb3gtYm9keSIgY3g9IjEwMCIgY3k9IjUwIiByeD0iNTAiIHJ5PSIzMCIvPjxwb2x5Z29uIGNsYXNzPSJmb3gtZWFycyIgcG9pbnRzPSI4MCwyMCA2MCwzNSA3MCw0MCIvPjxwb2x5Z29uIGNsYXNzPSJmb3gtZWFycyIgcG9pbnRzPSIxMjAsMjAgMTQwLDM1IDEzMCw0MCIvPjxyZWN0IGNsYXNzPSJmb3gtbGVncyIgeD0iNzAiIHk9IjcwIiB3aWR0aD0iMTAiIGhlaWdodD0iMjAiLz48cmVjdCBjbGFzcz0iZm94LWxlZ3MiIHg9IjEyMCIgeT0iNzAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIyMCIvPjxwYXRoIGNsYXNzPSJmb3gtdGFpbCIgZD0iTTE1MCw1MCBDMTgwLDMwIDIwMCw0MCAxOTAsNjAgQzE4MCw4MCAxNjAsNjAgMTUwLDUweiIvPjxjaXJjbGUgY3g9IjgwIiBjeT0iNDAiIHI9IjUiIGZpbGw9IiMwMDAiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSI0MCIgcj0iNSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik05MCw1NSBDOTUsNjAgMTA1LDYwIDExMCw1NSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48L2c+PC9zdmc+'; // 内嵌SVG数据
    
    // 树木数据
    const trees = [];
    const numTrees = 20;
    
    // 初始化树木位置
    for (let i = 0; i < numTrees; i++) {
        trees.push({
            x: Math.random() * canvas.width,
            y: canvas.height - Math.random() * 100 - 100,
            width: Math.random() * 30 + 20,
            height: Math.random() * 100 + 100,
            speed: Math.random() * 2 + 1
        });
    }
    
    // 狐狸参数
    const fox = {
        x: canvas.width * 0.2,
        y: canvas.height - 100,
        width: 100,
        height: 50,
        frameX: 0,
        frameY: 0,
        speed: 0,
        maxSpeed: 5,
        legAngle: 0,
        tailAngle: 0
    };
    
    // 动画参数
    let animationId;
    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;
    
    // 绘制树木
    function drawTrees() {
        trees.forEach(tree => {
            // 树干
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(tree.x, tree.y, tree.width, tree.height);
            
            // 树冠
            ctx.fillStyle = '#228B22';
            ctx.beginPath();
            ctx.arc(tree.x + tree.width / 2, tree.y - 30, tree.width * 1.5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    // 绘制狐狸
    function drawFox() {
        ctx.save();
        
        // 计算腿部摆动
        fox.legAngle += 0.2;
        fox.tailAngle += 0.1;
        
        // 绘制狐狸图像
        ctx.drawImage(foxImage, fox.x, fox.y, fox.width, fox.height);
        
        ctx.restore();
    }
    
    // 更新场景
    function update() {
        // 加速狐狸
        if (fox.speed < fox.maxSpeed) {
            fox.speed += 0.1;
        }
        
        // 移动树木（制造狐狸奔跑的错觉）
        trees.forEach(tree => {
            tree.x -= tree.speed * fox.speed;
            
            // 如果树木移出屏幕，重新放置到右侧
            if (tree.x + tree.width < 0) {
                tree.x = canvas.width + Math.random() * 100;
                tree.y = canvas.height - Math.random() * 100 - 100;
                tree.width = Math.random() * 30 + 20;
                tree.height = Math.random() * 100 + 100;
            }
        });
    }
    
    // 动画循环
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        
        if (deltaTime >= interval) {
            // 清除画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 绘制森林背景
            ctx.fillStyle = 'rgba(0, 50, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 更新和绘制场景
            update();
            drawTrees();
            drawFox();
            
            lastTime = timestamp;
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // 处理窗口大小变化
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // 重新定位狐狸
        fox.y = canvas.height - 100;
    });
    
    // 开始动画
    foxImage.onload = function() {
        animate(0);
    };
});