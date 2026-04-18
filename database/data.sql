USE boutique_db;

-- 1. Insertamos Categorías
INSERT INTO categories (id, nombre) VALUES 
(1, 'eléctricas'), 
(2, 'bajos'), 
(3, 'acústicas');

-- 2. Insertamos Productos (asociándolos a los IDs de arriba)
INSERT INTO products (name, description, price, image, colors, category_id) VALUES 
('Squier Classic Vibe 60s Custom Telecaster', 'Cuerpo de nato, mango de arce en forma de C. Una joya clásica con sonido vintage.', 439000, 'guitarra-1.jpg', 'Oxblood, Sunburst', 1),
('Gibson Les Paul Standard', 'El estándar de oro de las guitarras eléctricas. Tono cálido y sustain infinito.', 2800000, 'guitarra-2.jpg', 'Goldtop, Heritage Cherry', 1),
('Bajo Fender Precision Bass Professional', 'El bajo más grabado de la historia. Sonido potente y definido.', 1200000, 'bajo-1.jpg', 'Black, Olympic White', 2),
('Guitarra Acústica Taylor 214ce', 'Excelente proyección sonora y una comodidad inigualable para tocar horas.', 950000, 'acustica-1.jpg', 'Natural', 3);

-- 3. Insertamos Usuarios
INSERT INTO users (nombre, email, password, avatar) VALUES 
('cocho suarlos', 'cochos@cochos.com', '$2b$10$lTLXlCn.PGEWDIHtdXeeWO57vW3sMpy3XmqKsGpd7CdGjRIc9uWa2', '1774708148359_user.jpg'),
('Jimi Hendrix', 'jimiH@woodstock.com', '$2b$10$TjzyYIIT3vkyPW9.kXT/k.TeUH3ZK1NCMqI9OKO7QxxmPOk7fIHsm', '1776344508408_user.jpg');