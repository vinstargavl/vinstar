class Particle {
  constructor(x, y, hu, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0, 0);
    this.size = firework ? 20 : random(5, 12);  // Kích thước ban đầu của hạt nổ

    if (this.firework) {
      this.vel = createVector(0, random(-12, -8)); // Pháo hoa bắn lên
    } else {
      this.vel = p5.Vector.random2D();  // Hạt nổ di chuyển ngẫu nhiên
      this.vel.mult(random(5, 20));  // Tăng tốc độ khi nổ
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.firework) {
      // Làm cho kích thước hạt nổ dần lớn lên theo thời gian
      this.size = lerp(this.size, random(5, 10), 0.05);  // Tăng kích thước theo thời gian

      this.vel.mult(0.9);  // Giảm tốc độ của các hạt nổ theo thời gian
      this.lifespan -= 4;  // Giảm độ trong suốt của các hạt
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
      strokeWeight(this.size);  // Đặt độ dày cho các hạt nổ
      stroke(this.hu, 255, 255, this.lifespan);  // Màu sắc của các hạt nổ
    } else {
      strokeWeight(this.size);  // Đặt độ dày cho pháo hoa chính
      stroke(this.hu, 255, 255);  // Màu sắc của pháo hoa chính
    }

    point(this.pos.x, this.pos.y);
  }
}
