const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: 'lime',
    speed: 5,
    dx: 0
};

// Aliens
const alienInfo = {
    width: 40,
    height: 30,
    color: 'red',
    speed: 2,
    gap: 10,
    rows: 5,
    cols: 10,
    dx: 1 // 1 for right, -1 for left
};

const aliens = [];
for (let i = 0; i < alienInfo.rows; i++) {
    aliens[i] = [];
    for (let j = 0; j < alienInfo.cols; j++) {
        const x = j * (alienInfo.width + alienInfo.gap) + 30;
        const y = i * (alienInfo.height + alienInfo.gap) + 30;
        aliens[i][j] = { x, y, width: alienInfo.width, height: alienInfo.height, alive: true };
    }
}

// Alien Bullets
const alienBulletInfo = {
    width: 5,
    height: 15,
    color: 'yellow',
    speed: 5
};
const alienBullets = [];

let score = 0;
let gameOver = false;

// --- DRAW FUNCTIONS ---
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawAliens() {
    ctx.fillStyle = alienInfo.color;
    for (let i = 0; i < alienInfo.rows; i++) {
        for (let j = 0; j < alienInfo.cols; j++) {
            if (aliens[i][j].alive) {
                ctx.fillRect(aliens[i][j].x, aliens[i][j].y, alienInfo.width, alienInfo.height);
            }
        }
    }
}

function drawBullets() {
    ctx.fillStyle = bulletInfo.color;
    for (const bullet of bullets) {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
    ctx.fillStyle = alienBulletInfo.color;
    for (const bullet of alienBullets) {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);
}

function drawGameOver() {
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.font = '20px Arial';
    ctx.fillText('Press Enter to Restart', canvas.width / 2, canvas.height / 2 + 40);
    ctx.textAlign = 'left';
}

// --- MOVEMENT & LOGIC FUNCTIONS ---
function movePlayer() {
    player.x += player.dx;
    // Wall detection
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

function moveAliens() {
    let moveDown = false;
    for (let i = 0; i < alienInfo.rows; i++) {
        for (let j = 0; j < alienInfo.cols; j++) {
            if (aliens[i][j].alive) {
                aliens[i][j].x += alienInfo.speed * alienInfo.dx;
                if (aliens[i][j].x + alienInfo.width > canvas.width || aliens[i][j].x < 0) {
                    moveDown = true;
                }
            }
        }
    }

    if (moveDown) {
        alienInfo.dx *= -1; // Change direction
        for (let i = 0; i < alienInfo.rows; i++) {
            for (let j = 0; j < alienInfo.cols; j++) {
                aliens[i][j].y += alienInfo.height;
            }
        }
    }
}

function moveBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.y -= bullet.speed;
        if (bullet.y + bullet.height < 0) {
            bullets.splice(i, 1);
        }
    }
    for (let i = alienBullets.length - 1; i >= 0; i--) {
        const bullet = alienBullets[i];
        bullet.y += bullet.speed;
        if (bullet.y > canvas.height) {
            alienBullets.splice(i, 1);
        }
    }
}

function fireBullet() {
    if (gameOver) return;
    const bullet = {
        x: player.x + player.width / 2 - bulletInfo.width / 2,
        y: player.y - bulletInfo.height,
        width: bulletInfo.width,
        height: bulletInfo.height,
        color: bulletInfo.color,
        speed: bulletInfo.speed
    };
    bullets.push(bullet);
}

function alienFire() {
    if (gameOver) return;
    // Find a random alien to fire
    const firingAliens = [];
    for (let i = 0; i < alienInfo.rows; i++) {
        for (let j = 0; j < alienInfo.cols; j++) {
            if (aliens[i][j].alive) {
                firingAliens.push(aliens[i][j]);
            }
        }
    }

    if (firingAliens.length > 0 && Math.random() < 0.02) { // Adjust probability
        const randomAlien = firingAliens[Math.floor(Math.random() * firingAliens.length)];
        const bullet = {
            x: randomAlien.x + randomAlien.width / 2 - alienBulletInfo.width / 2,
            y: randomAlien.y + randomAlien.height,
            width: alienBulletInfo.width,
            height: alienBulletInfo.height,
            color: alienBulletInfo.color,
            speed: alienBulletInfo.speed
        };
        alienBullets.push(bullet);
    }
}

function checkCollisions() {
    if (gameOver) return;
    // Bullets and aliens
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = 0; j < alienInfo.rows; j++) {
            for (let k = 0; k < alienInfo.cols; k++) {
                const alien = aliens[j][k];
                if (alien.alive &&
                    bullets[i].x < alien.x + alien.width &&
                    bullets[i].x + bullets[i].width > alien.x &&
                    bullets[i].y < alien.y + alien.height &&
                    bullets[i].y + bullets[i].height > alien.y) {
                    
                    alien.alive = false;
                    bullets.splice(i, 1);
                    score += 10;
                    // Break inner loops since bullet is gone
                    return; 
                }
            }
        }
    }

    // Alien bullets and player
    for (let i = alienBullets.length - 1; i >= 0; i--) {
        const bullet = alienBullets[i];
        if (bullet.x < player.x + player.width &&
            bullet.x + bullet.width > player.x &&
            bullet.y < player.y + player.height &&
            bullet.y + bullet.height > player.y) {
            
            gameOver = true;
            alienBullets.splice(i, 1);
            return;
        }
    }

    // Aliens and player
    for (let i = 0; i < alienInfo.rows; i++) {
        for (let j = 0; j < alienInfo.cols; j++) {
            const alien = aliens[i][j];
            if (alien.alive &&
                alien.x < player.x + player.width &&
                alien.x + alien.width > player.x &&
                alien.y < player.y + player.height &&
                alien.y + alien.height > player.y) {
                
                gameOver = true;
                return;
            }
        }
    }
}

function restartGame() {
    gameOver = false;
    score = 0;
    player.x = canvas.width / 2 - 25;
    player.y = canvas.height - 60;
    bullets.length = 0;
    alienBullets.length = 0;

    for (let i = 0; i < alienInfo.rows; i++) {
        for (let j = 0; j < alienInfo.cols; j++) {
            const x = j * (alienInfo.width + alienInfo.gap) + 30;
            const y = i * (alienInfo.height + alienInfo.gap) + 30;
            aliens[i][j] = { x, y, width: alienInfo.width, height: alienInfo.height, alive: true };
        }
    }
    update();
}

// --- MAIN GAME LOOP ---
function update() {
    if (gameOver) {
        drawGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPlayer();
    drawAliens();
    drawBullets();
    drawScore();
    
    movePlayer();
    moveAliens();
    moveBullets();
    alienFire();
    
    checkCollisions();
    
    requestAnimationFrame(update);
}

// --- KEYBOARD HANDLERS & EVENT LISTENERS ---
function keyDown(e) {
    if (gameOver && e.key === 'Enter') {
        restartGame();
        return;
    }

    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    } else if (e.key === ' ' || e.key === 'Spacebar') {
        fireBullet();
    }
}

function keyUp(e) {
    if (
        e.key === 'ArrowRight' ||
        e.key === 'Right' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Left'
    ) {
        player.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// --- START GAME ---
update();