-- Tạo extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tạo bảng product
CREATE TABLE product (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Thêm dữ liệu mẫu
INSERT INTO product (name, slug, quantity) VALUES ('Bàn phím cơ', 'ban-phim-co', 50);

-- Tạo index cho slug để tối ưu tìm kiếm
CREATE INDEX IF NOT EXISTS idx_product_slug ON product(slug);

