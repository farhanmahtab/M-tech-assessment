# Retailer Sales Representative App - Backend

---

## 🚀 Key Features

### 🔐 Authentication & Authorization
- **JWT Authentication**: Secure stateless authentication for all users.
- **RBAC (Role-Based Access Control)**: Strict separation between `ADMIN` and `SALES_REP` roles.
- **Secure Password Hashing**: Using `bcrypt` for user credential protection.

### 🏢 Admin Management
- **Master Data CRUD**: Manage Regions, Areas, Territories, and Distributors.
- **Bulk CSV Import**: High-speed retailer ingestion from CSV files.
- **Bulk Assignment**: Efficient mapping of retailers to Sales Representatives.

### 💼 Sales Representative Features
- **Assigned Retailer Listing**: Paginated views of retailers explicitly assigned to the SR.
- **Advanced Search**: Search by Name, UID, or Phone number.
- **Multi-Level Filtering**: Filter retailers by Region, Area, Distributor, or Territory.
- **Retailer Property Updates**: SRs can update specific fields like `Points`, `Routes`, and `Notes`.

### ⚡ Performance & Scalability
- **Redis Caching**: Caching of SR assigned retailer lists to minimize DB load.
- **Database Indexing**: Optimized indexing for hierarchical and relational lookups.
- **Hierarchical Modeling**: Efficient geographic structure for regional management.

---

## 🏗️ Architecture & Project Structure

The project follows the standard NestJS modular architecture:

```text
src/
├── admin/          # Admin-specific controllers, services, and DTOs
├── auth/           # Authentication logic, JWT strategies, and role guards
├── common/         # Shared decorators, interceptors, and filters
├── prisma/         # Prisma service and module
├── retailers/      # Retailer management and Sales Rep features
├── users/          # User (Admin/SR) management
└── main.ts         # Application entry point & Swagger setup
```

---

## 🛠️ Tech Stack
- **Framework**: [NestJS](https://nestjs.com/) (v11)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (v15)
- **ORM**: [Prisma](https://www.prisma.io/) (v6)
- **Caching**: [Redis](https://redis.io/) via `cache-manager-redis-yet`
- **Validation**: `class-validator` & `class-transformer`
- **Documentation**: [Swagger UI](https://swagger.io/tools/swagger-ui/)

---

## 🏁 Getting Started

Refer to the [**startup.md**](./startup.md) for detailed installation and setup instructions.

### Quick Start
```bash
docker-compose up -d
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

### Start server thorugh whole stack
```bash
docker-compose up --build
```
---

## 📖 API Documentation

Once the server is running, visit:
👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

The Swagger UI provides full documentation for all endpoints, including request bodies, response models, and authentication requirements.

---

## 📈 Scalability Focus

To handle **1 million+ retailers**, the following design decisions were made:
1.  **Read optimization**: Heavy use of Redis for SR-specific lookups.
2.  **Efficient Writes**: `upsert` and `createMany` patterns for bulk data operations.
3.  **Normalized Hierarchies**: Minimizing redundancy in geographic data while maintaining fast query paths.
4.  **Pagination**: Strict enforced pagination across all collection endpoints.


