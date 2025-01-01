class Particle {
  constructor(x, y, hu, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0, 0);
    this.size = firework ? 2 : random(2, 6); // Khởi tạo kích thước nhỏ hơn nếu là pháo hoa chính
    if (this.firework) {
      this.vel = createVector(0, random(-12, -8));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(2, 10));
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (this.firework) {
      // Tăng kích thước khi pháo hoa đang bắn lên
      this.size = lerp(this.size, 8, 0.1); // Lớn dần đến giá trị 8
    } else {
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
      strokeWeight(this.size);
      stroke(this.hu, 255, 255);
    }

    point(this.pos.x, this.pos.y);
  }
}
