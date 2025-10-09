# 🍰 Pastry E-commerce API

A complete REST API for a pastry e-commerce platform built with Node.js, Express, Sequelize, and MySQL.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database configuration
   ```

3. **Run database seeders:**
   ```bash
   npm run seeders
   # or
   node seeders/runAllSeeders.js
   ```

4. **Start the server:**
   ```bash
   npm start
   # or
   node server.js
   ```

5. **Server runs on:** `http://localhost:3000`

---

## 📊 Database Schema

The API includes the following models:
- **Users** (100 seeded records)
- **Categories** (8 pastry categories)
- **Products** (22+ pastry products)
- **Orders** (8 sample orders with JSON items)

---

## 🛠️ API Endpoints

### **Base URL:** `http://localhost:3000/api`

---

## 📋 **1. CATEGORIES** (`/api/categories`)

| Method | Endpoint | Description | Validation |
|--------|----------|-------------|------------|
| `GET` | `/api/categories` | Get all categories | - |
| `GET` | `/api/categories/:id` | Get category by ID | Valid ID required |
| `POST` | `/api/categories` | Create new category | `name` required |
| `PUT` | `/api/categories/:id` | Update category | Valid ID required |
| `DELETE` | `/api/categories/:id` | Delete category | Valid ID required |

**Sample POST/PUT Body:**
```json
{
  "name": "Bebidas",
  "description": "Refrescos y bebidas calientes para acompañar nuestros postres"
}
```

**Seeded Categories:**
- Pasteles (Cakes)
- Cupcakes
- Galletas (Cookies)
- Panes (Breads)
- Tartas (Tarts)
- Macarons
- Postres Especiales (Special Desserts)
- Productos Sin Gluten (Gluten-Free Products)

---

## 🧁 **2. PRODUCTS** (`/api/products`)

| Method | Endpoint | Description | Validation |
|--------|----------|-------------|------------|
| `GET` | `/api/products` | Get all products | - |
| `GET` | `/api/products/:id` | Get product by ID | Valid ID required |
| `GET` | `/api/products/category/:categoryId` | Get products by category | Valid category ID required |
| `POST` | `/api/products` | Create new product | `name`, `price`, `category_id` required |
| `PUT` | `/api/products/:id` | Update product | Valid ID required |
| `DELETE` | `/api/products/:id` | Delete product | Valid ID required |

**Sample POST/PUT Body:**
```json
{
  "name": "Tarta de Fresa Premium",
  "description": "Deliciosa tarta con fresas frescas y crema chantilly",
  "price": 28.50,
  "stock": 12,
  "category_id": 1,
  "image_url": "https://example.com/tarta-fresa.jpg"
}
```

**Sample Products:**
- Pastel de Chocolate Belga (€32.99)
- Cupcakes de Red Velvet pack 6 (€18.50)
- Galletas de Mantequilla Artesanales (€12.75)
- Pan de Centeno Integral (€4.50)
- Tarta de Manzana Casera (€24.99)

---

## 👥 **3. USERS** (`/api/users`)

| Method | Endpoint | Description | Validation |
|--------|----------|-------------|------------|
| `GET` | `/api/users` | Get all users | - |
| `GET` | `/api/users/:id` | Get user by ID | Valid ID required |
| `POST` | `/api/users` | Create new user | `name`, `email`, `password` required |
| `PUT` | `/api/users/:id` | Update user | Valid ID required |
| `DELETE` | `/api/users/:id` | Delete user | Valid ID required |

**Sample POST/PUT Body:**
```json
{
  "name": "Ana María González",
  "email": "ana.gonzalez@example.com",
  "password": "password123",
  "phone": "666-777-888",
  "address": "Calle Mayor 45, Madrid"
}
```

**User Features:**
- 100 seeded users with Spanish names
- Unique email constraint
- Hashed passwords (bcrypt)
- Phone and address fields

---

## 📦 **4. ORDERS** (`/api/orders`)

| Method | Endpoint | Description | Validation |
|--------|----------|-------------|------------|
| `GET` | `/api/orders` | Get all orders | - |
| `GET` | `/api/orders/:id` | Get order by ID | Valid ID required |
| `POST` | `/api/orders` | Create new order | `items`, `total` required |
| `PUT` | `/api/orders/:id` | Update order | Valid ID required |
| `DELETE` | `/api/orders/:id` | Delete order | Valid ID required |

**Sample POST/PUT Body:**
```json
{
  "items": [
    {
      "product_id": 1,
      "name": "Pastel de Chocolate",
      "price": 25.99,
      "quantity": 2
    },
    {
      "product_id": 3,
      "name": "Cupcake de Vainilla",
      "price": 3.50,
      "quantity": 4
    }
  ],
  "total": 65.98,
  "status": "pendiente"
}
```

**Order Statuses:**
- `pendiente` - Pending
- `procesando` - Processing
- `enviado` - Shipped
- `completado` - Completed
- `cancelado` - Cancelled

---

## 📰 **5. ARTICLES** (`/api/articles`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/articles` | Get all articles |
| `GET` | `/api/articles/:id` | Get article by ID |
| `POST` | `/api/articles` | Create new article |
| `PUT` | `/api/articles/:id` | Update article |
| `DELETE` | `/api/articles/:id` | Delete article |

---

## 🔐 **6. AUTHENTICATION** (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | User login |

**Sample Login Body:**
```json
{
  "email": "guillermina9@yahoo.com",
  "password": "password123"
}
```

**Test Users:**
- All seeded users have password: `password123`
- Example email: `guillermina9@yahoo.com`

---

## 🧪 **7. EXAMPLES** (`/api/examples`)

Template endpoints for development reference:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/examples` | Get all examples |
| `GET` | `/api/examples/:id` | Get example by ID |
| `POST` | `/api/examples` | Create new example |
| `PATCH` | `/api/examples/:id` | Update example |
| `DELETE` | `/api/examples/:id` | Delete example |

---

## 🏠 **8. HOME**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Welcome page with API info |

---

## 🧪 **Testing Examples**

### **Quick Browser Tests:**
- Home: `http://localhost:3000/`
- Categories: `http://localhost:3000/api/categories`
- Products: `http://localhost:3000/api/products`
- Users: `http://localhost:3000/api/users`
- Orders: `http://localhost:3000/api/orders`

### **cURL Examples:**

**Get all products:**
```bash
curl -X GET http://localhost:3000/api/products
```

**Create new category:**
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Temporada Navideña", "description": "Productos especiales para navidad"}'
```

**Create new order:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"product_id": 1, "name": "Pastel de Chocolate", "price": 25.99, "quantity": 1}
    ],
    "total": 25.99,
    "status": "pendiente"
  }'
```

### **Postman Collection:**

Import these endpoints into Postman with:
- **Environment Variable:** `baseUrl` = `http://localhost:3000`
- **Pre-request Scripts:** For authentication if needed
- **Tests:** To validate responses

---

## 🗄️ **Database Seeders**

Run seeders to populate the database with test data:

```bash
npm run seeders
```

**What gets seeded:**
- ✅ **100 Users** - Realistic Spanish names and data
- ✅ **8 Categories** - Pastry shop categories
- ✅ **22+ Products** - Delicious pastry items with prices
- ✅ **8 Orders** - Sample orders with multiple items

---

## 🔧 **Development**

### **Project Structure:**
```
anima-ecommerce-back/
├── controllers/         # Business logic
├── middlewares/         # Authentication, validation
├── models/              # Database models (Sequelize)
├── routes/              # API routes
├── seeders/             # Database seeders
├── validations/         # Input validation rules
├── public/              # Static files
├── server.js            # Main server file
└── database.js          # Database configuration
```

### **Environment Variables:**
```env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=pastry_ecommerce
DB_USERNAME=your_username
DB_PASSWORD=your_password
APP_PORT=3000
```

### **Scripts:**
- `npm start` - Start server
- `npm run dev` - Start with nodemon
- `npm run seeders` - Run database seeders

---

## 📋 **Status Codes**

- `200` - Success (GET, PUT)
- `201` - Created (POST)
- `204` - No Content (DELETE)
- `400` - Bad Request (validation errors)
- `404` - Not Found (invalid ID)
- `500` - Server Error


