class Firework {
  constructor() {
    this.hu = random(1000);
    this.firework = new Particle(random(width), height, this.hu, true);
    this.exploded = false;
    this.particles = [];
  }

  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    // Kiểm tra các hạt
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    // Phát âm thanh khi pháo hoa nổ
    const explosionSound = document.getElementById('explosion-sound');
    explosionSound.currentTime = 0;  // Đặt lại thời gian âm thanh về đầu
    explosionSound.play();  // Phát âm thanh

    // Tạo các hạt nổ với tốc độ và kích thước lớn hơn
    for (let i = 0; i < 200; i++) {  // Tăng số lượng hạt nổ
      const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
      p.vel.mult(random(1.5, 3));  // Tăng tốc độ nổ (phát tán rộng hơn)
      p.size = random(10, 30);  // Tăng kích thước của hạt nổ
      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}
