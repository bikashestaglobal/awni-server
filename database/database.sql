-- Create Database
DROP DATABASE IF EXISTS awni;
CREATE DATABASE awni;

-- Drop Table 
-- DROP TABLE IF EXISTS par_categories CASCADE;

-- Create Parent Categoey Table
CREATE TABLE IF NOT EXISTS  par_categories(
   id BIGSERIAL PRIMARY KEY,
	name VARCHAR ( 250 ) UNIQUE NOT NULL,
	slug VARCHAR ( 250 ) UNIQUE NOT NULL,
	image VARCHAR ( 1000 ),
	created_at TIMESTAMP DEFAULT NOW(),
   status BOOLEAN DEFAULT true
);

-- Drop Table 
-- DROP TABLE IF EXISTS categories CASCADE;

-- Create Category Table
CREATE TABLE IF NOT EXISTS categories(
   id BIGSERIAL PRIMARY KEY,
   par_cat_id INTEGER REFERENCES par_categories (id) ON DELETE CASCADE,
   name VARCHAR(255) NOT NULL,
   slug VARCHAR ( 250 ) UNIQUE NOT NULL,
   image VARCHAR ( 1000 ),
   catalogue VARCHAR ( 1000 ),
   breadcrumb_banner VARCHAR ( 1000 ) DEFAULT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   status BOOLEAN DEFAULT true
);

-- Drop Table 
-- DROP TABLE IF EXISTS child_categories CASCADE;

-- Create Child Category Table
CREATE TABLE IF NOT EXISTS child_categories(
   id BIGSERIAL PRIMARY KEY,
   par_cat_id integer REFERENCES par_categories (id) ON DELETE CASCADE,
   cat_id integer REFERENCES categories (id) ON DELETE CASCADE,
   name VARCHAR(255) NOT NULL,
   slug VARCHAR ( 250 ) UNIQUE NOT NULL,
   image VARCHAR ( 1000 ) NULL,
   catalogue VARCHAR ( 1000 ) NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   status BOOLEAN DEFAULT true
);

-- Drop Table 
-- DROP TABLE IF EXISTS admins CASCADE;

-- Create Admin Table
CREATE TABLE IF NOT EXISTS admins (
   id BIGSERIAL PRIMARY KEY,
   name VARCHAR(250) NOT NULL,
   mobile VARCHAR(12),
   email VARCHAR(250) UNIQUE NOT NULL,
   passWord VARCHAR(255),
   created_at TIMESTAMP DEFAULT NOW(),
   status BOOLEAN DEFAULT true
);

-- Drop Table 
-- DROP TABLE IF EXISTS ranges CASCADE;

-- Range
CREATE TABLE IF NOT EXISTS ranges(
   id BIGSERIAL PRIMARY KEY,
   name VARCHAR(2000) UNIQUE,
   created_at TIMESTAMP DEFAULT NOW()
);

-- Drop Table 
-- DROP TABLE IF EXISTS colors CASCADE;

-- Colors
CREATE TABLE IF NOT EXISTS colors(
   id BIGSERIAL PRIMARY KEY,
   name VARCHAR(2000) UNIQUE NOT NULL,
   created_at TIMESTAMP DEFAULT NOW()
);

-- Drop Table 
DROP TABLE IF EXISTS customers CASCADE;

-- Create Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    mobile VARCHAR(12) UNIQUE NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(255),
    is_verified BOOLEAN DEFAULT false,
    billing_name VARCHAR(250) NULL,
    billing_email VARCHAR(550) NULL,
    billing_mobile VARCHAR(10) NULL,
    address_1 VARCHAR(1000) NULL,
    address_2 VARCHAR(1000) NULL,
    country VARCHAR(200) NULL,
    state VARCHAR(200) NULL,
    city VARCHAR(200) NULL,
    pincode INTEGER,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Drop Table 
DROP TABLE IF EXISTS enquiries CASCADE;

-- Create enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    mobile VARCHAR(10) NOT NULL,
    city VARCHAR(1000),
    email VARCHAR(250) NULL,
    status VARCHAR(250) DEFAULT 'PENDING',
    message VARCHAR(2500) NULL,
    product_slug VARCHAR(2500) NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Drop Table 
DROP TABLE IF EXISTS franchisee CASCADE;

-- Create franchisee Table
CREATE TABLE IF NOT EXISTS franchisee (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    mobile VARCHAR(10) NOT NULL,
    email VARCHAR(250) NULL,
    address VARCHAR(250) NOT NULL,
    occupation VARCHAR(100) NOT NULL,
    interested_city VARCHAR(100) NOT NULL,
    work_profile VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);


-- Drop Table 
-- DROP TABLE IF EXISTS products CASCADE;

-- Create Product Table
CREATE TABLE IF NOT EXISTS products(
   id BIGSERIAL PRIMARY KEY,
   par_cat_id integer REFERENCES par_categories (id) ON DELETE CASCADE,
   cat_id integer REFERENCES categories (id) ON DELETE CASCADE,
   child_cat_id integer REFERENCES child_categories (id) ON DELETE CASCADE NULL,
   range_id integer REFERENCES ranges (id) ON DELETE CASCADE,
   color_id integer REFERENCES colors (id) ON DELETE CASCADE,
   name VARCHAR(255) NOT NULL,
   slug VARCHAR ( 250 ) UNIQUE NOT NULL,
   mrp INTEGER NOT NULL,
   selling_price INTEGER NOT NULL,
   size VARCHAR(500) NOT NULL,
   default_image VARCHAR(1000) NOT NULL,
   material VARCHAR(200) NULL,
   weight VARCHAR(200) NULL,
   code VARCHAR(200) NOT NULL,
   description VARCHAR(1000) NOT NULL,
   status BOOLEAN DEFAULT true,
   created_at TIMESTAMP DEFAULT NOW()
);


-- Drop Table 
-- DROP TABLE IF EXISTS wishlists CASCADE;

-- Create Wishists Table
CREATE TABLE IF NOT EXISTS wishlists(
   id BIGSERIAL PRIMARY KEY,
   customer_id integer REFERENCES customers (id) ON DELETE CASCADE,
   product_id integer REFERENCES products (id) ON DELETE CASCADE,
   status BOOLEAN DEFAULT true,
   created_at TIMESTAMP DEFAULT NOW()
);


-- Drop Table 
-- DROP TABLE IF EXISTS product_images CASCADE;

-- Create Product Images Table
CREATE TABLE IF NOT EXISTS product_images(
   id BIGSERIAL PRIMARY KEY,
   product_id integer REFERENCES products (id) ON DELETE CASCADE,
   url VARCHAR(1000) NOT NULL,
   status BOOLEAN DEFAULT true,
   created_at TIMESTAMP DEFAULT NOW()
);


-- Drop Table 
-- DROP TABLE IF EXISTS product_colors CASCADE;

-- Create Product Colors Table
CREATE TABLE IF NOT EXISTS product_colors(
   id BIGSERIAL PRIMARY KEY,
   product_id integer REFERENCES products (id) ON DELETE CASCADE,
   color_id integer REFERENCES colors (id) ON DELETE CASCADE,
   status BOOLEAN DEFAULT true,
   created_at TIMESTAMP DEFAULT NOW()
);


-- Drop Table 
-- DROP TABLE IF EXISTS contact_us CASCADE;

-- Contact Us
CREATE TABLE IF NOT EXISTS contact_us(
   id BIGSERIAL PRIMARY KEY,
   address VARCHAR(5000), 
   email VARCHAR(255),
   mobile_1 VARCHAR ( 10 ),
   mobile_2 VARCHAR(10),
   customer_care_no VARCHAR(10),
   whatsapp_no VARCHAR(10),
   facebook VARCHAR(2000),
   instagram VARCHAR(2000),
   twitter VARCHAR(2000),
   linkedin VARCHAR(2000),
   created_at TIMESTAMP DEFAULT NOW()
);


-- Drop Table 
-- DROP TABLE IF EXISTS experience_centres CASCADE;

-- Experience Centre
CREATE TABLE IF NOT EXISTS experience_centres(
   id BIGSERIAL PRIMARY KEY,
   name VARCHAR(2000) NOT NULL,
   address VARCHAR (5000 ),
   mobile_1 VARCHAR ( 10 ),
   mobile_2 VARCHAR(10),
   whatsapp_no VARCHAR(10),
   facebook VARCHAR(2000),
   instagram VARCHAR(2000),
   twitter VARCHAR(2000),
   linkedin VARCHAR(2000),
   google_map VARCHAR(5000),
   created_at TIMESTAMP DEFAULT NOW()
);


-- Drop Table 
-- DROP TABLE IF EXISTS about_us CASCADE;

-- About 
CREATE TABLE IF NOT EXISTS about_us(
   id BIGSERIAL PRIMARY KEY,
   about_title VARCHAR(500), 
   about_description VARCHAR(5000),
   about_bg_image VARCHAR(1000) NULL,
   about_fe_image VARCHAR(1000) NULL,
   about_image_title VARCHAR(1000),
   
   mission_title VARCHAR(500),
   mission_description VARCHAR(2000),
   vision_title VARCHAR(500),
   vision_description VARCHAR(2000),
   mission_bg_image VARCHAR(1000) NULL,
   mission_fe_image VARCHAR(1000) NULL,
   
   why_title VARCHAR(500),
   why_description VARCHAR(10000),

   youtube_video VARCHAR(100),
   
   created_at TIMESTAMP DEFAULT NOW()
);


-- Drop Table 
-- DROP TABLE IF EXISTS why_awni CASCADE;

-- Why Awni
CREATE TABLE IF NOT EXISTS why_awni(
   id BIGSERIAL PRIMARY KEY,
   image VARCHAR(2000),
   title VARCHAR (1000),
   created_at TIMESTAMP DEFAULT NOW()
);


-- Drop Table 
-- DROP TABLE IF EXISTS sliders CASCADE;

-- Sliders
CREATE TABLE IF NOT EXISTS sliders(
   id BIGSERIAL PRIMARY KEY,
   image VARCHAR(2000),
   title VARCHAR (1000),
   webpage_url VARCHAR (1000),
   created_at TIMESTAMP DEFAULT NOW(),
   position INTEGER
);


-- Drop Table 
-- DROP TABLE IF EXISTS homepage_banners CASCADE;

-- Homepage Banners
CREATE TABLE IF NOT EXISTS homepage_banners(
   id BIGSERIAL PRIMARY KEY,
   image VARCHAR(2000),
   title VARCHAR (1000),
   place VARCHAR(100),
   webpage_url VARCHAR (1000),
   created_at TIMESTAMP DEFAULT NOW(),
   position INTEGER
);
