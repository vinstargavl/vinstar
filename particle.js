class Particle {
  constructor(x, y, hu, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0, 0);
    this.size = firework ? 20 : random(4, 10); // Kích thước lớn hơn ngay từ đầu nếu là pháo hoa chính
    if (this.firework) {
      this.vel = createVector(0, random(-12, -8));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(10, 20));
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    colorMode(HSB);

    if (!this.firework) {
      strokeWeight(this.size);
      stroke(this.hu, 255, 255, this.lifespan);
    } else {
      strokeWeight(this.size); // Hiển thị kích thước lớn ngay từ đầu
      stroke(this.hu, 255, 255);
    }

    point(this.pos.x, this.pos.y);
  }
}
