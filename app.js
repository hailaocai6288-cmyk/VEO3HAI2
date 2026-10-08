const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');
const playBtn = document.getElementById('playBtn');
const progressFill = document.getElementById('progressFill');
const timecode = document.getElementById('timecode');
const progressBar = document.getElementById('progressBar');

const duration = 7;
const fps = 30;
const isWater = false;
const isRain = false;

let isPlaying = true;
let progress = 0;
const img = new Image();
img.src = "assets/image.png";

// Particles setup
const particles = [];
for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: isWater ? 3 + Math.random() * 6 : isRain ? 12 + Math.random() * 18 : 2 + Math.random() * 4,
    speedY: isWater ? -(1.5 + Math.random() * 2.5) : isRain ? (10 + Math.random() * 15) : -(0.5 + Math.random() * 1.5),
    speedX: isRain ? -1.5 : (Math.random() - 0.5) * 0.8,
    opacity: 0.3 + Math.random() * 0.6,
    osc: Math.random() * Math.PI * 2
  });
}

function render() {
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const normP = progress / 100;

  // 1. Image with dynamic 3D camera pan/tilt/zoom
  if (img.complete && img.naturalWidth > 0) {
    ctx.save();
    const zoom = 1.02 + 0.08 * Math.sin(normP * Math.PI);
    const panX = Math.sin(normP * Math.PI * 2) * 16;
    const panY = Math.cos(normP * Math.PI) * 10;
    ctx.translate(w / 2 + panX, h / 2 + panY);
    ctx.scale(zoom, zoom);
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore();
  } else {
    ctx.fillStyle = '#0a0a10';
    ctx.fillRect(0, 0, w, h);
  }

  // 2. Dynamic particles
  ctx.save();
  for (let p of particles) {
    if (isPlaying) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.osc += 0.05;
      p.x += Math.sin(p.osc) * 0.5;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 30) p.y = -20;
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
    }

    ctx.beginPath();
    if (isWater) {
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 229, 255, ' + (p.opacity * 0.4) + ')';
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(200, 250, 255, ' + (p.opacity * 0.8) + ')';
      ctx.stroke();
    } else if (isRain) {
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.speedX * 2, p.y + p.size);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(0, 240, 255, ' + (p.opacity * 0.7) + ')';
      ctx.stroke();
    } else {
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 180, 50, ' + (p.opacity * 0.6) + ')';
      ctx.fill();
    }
  }
  ctx.restore();

  // 3. Sora Lighting Sweep
  ctx.save();
  const sweepX = (normP * 1.4 - 0.2) * w;
  const grad = ctx.createLinearGradient(sweepX - 100, 0, sweepX + 100, h);
  grad.addColorStop(0, 'rgba(0, 229, 255, 0)');
  grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
  grad.addColorStop(1, 'rgba(0, 229, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  // 4. Telemetry Bar
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, h - 30, w, 30);
  ctx.fillStyle = '#00e5ff';
  ctx.font = '11px monospace';
  const curSec = (normP * duration).toFixed(1);
  ctx.fillText('VEO 3.1 HTML5 ENGINE · ' + curSec + 's / ' + duration + '.0s · FRAME ' + Math.floor(normP * duration * fps), 16, h - 10);
  ctx.fillStyle = '#10b981';
  ctx.fillText('KLING 2.0: OK · SEEDANCE 2.0: OK', w - 240, h - 10);
  ctx.restore();

  if (isPlaying) {
    progress += (100 / (duration * 60));
    if (progress >= 100) progress = 0;
    progressFill.style.width = progress + '%';
    timecode.textContent = ((progress * duration) / 100).toFixed(1) + 's / ' + duration + '.0s';
  }

  requestAnimationFrame(render);
}

render();

playBtn.addEventListener('click', () => {
  isPlaying = !isPlaying;
  playBtn.textContent = isPlaying ? 'TẠM DỪNG' : 'PHÁT MÔ PHỎNG';
});

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  progress = (clickX / rect.width) * 100;
});
