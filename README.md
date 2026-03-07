# AbhiRa Bank

A full-stack banking application that allows users to create bank accounts, deposit and withdraw funds, transfer money between accounts, and manage account details — all through a modern, responsive web interface.

## Features

- **Create Account** — Register a new bank account with holder name and initial balance
- **View Accounts** — Browse all existing accounts with real-time balance display
- **Deposit Funds** — Add money to any account
- **Withdraw Funds** — Withdraw money with insufficient-balance validation
- **Transfer Funds** — Move money between two accounts with full validation (insufficient balance, same-account check, invalid amount)
- **Delete Account** — Remove an account permanently (with confirmation prompt)
- **Total Balance Overview** — Dashboard summary showing aggregate balance across all accounts
- **Error Handling** — User-friendly error banners with dismiss functionality
- **Loading Skeletons** — Smooth loading states while data is being fetched

## Tech Stack

### Backend

| Technology              | Version |
|-------------------------|---------|
| Java                    | 21      |
| Spring Boot             | 4.0.1   |
| Spring Data JPA         | —       |
| Hibernate               | —       |
| MySQL                   | —       |
| Maven                   | —       |

### Frontend

| Technology              | Version  |
|-------------------------|----------|
| React                   | 19.2.0   |
| Redux Toolkit           | 2.11.2   |
| React Redux             | 9.2.0    |
| Axios                   | 1.13.2   |
| Vite                    | 7.2.4    |
| ESLint                  | 9.39.1   |

## Project Architecture

```
bank/                              # Root repository
├── bank/                          # Backend (Spring Boot)
│   ├── pom.xml                    # Maven dependencies & build config
│   ├── mvnw / mvnw.cmd           # Maven wrapper scripts
│   └── src/
│       └── main/
│           ├── java/com/abhi/bank/
│           │   ├── BankApplication.java          # Spring Boot entry point
│           │   ├── controller/
│           │   │   └── AccountController.java    # REST API endpoints
│           │   ├── dto/
│           │   │   ├── AccountDto.java           # Account data transfer object
│           │   │   └── TransferRequest.java      # Transfer request payload
│           │   ├── entity/
│           │   │   └── Account.java              # JPA entity (accounts table)
│           │   ├── mapper/
│           │   │   └── AccountMapper.java        # Entity ↔ DTO mapper
│           │   ├── repository/
│           │   │   └── AccountRepository.java    # JPA repository interface
│           │   ├── service/
│           │   │   ├── AccountService.java       # Service interface
│           │   │   └── impl/
│           │   │       └── AccountServiceImpl.java  # Service implementation
│           │   └── exception/                    # (Custom exceptions)
│           └── resources/
│               └── application.properties        # DB & server configuration
│
└── front/                         # Frontend
    └── my-react-app/
        ├── package.json           # NPM dependencies & scripts
        ├── vite.config.js         # Vite config with API proxy
        ├── index.html             # HTML entry point
        └── src/
            ├── main.jsx           # React + Redux Provider bootstrap
            ├── App.jsx            # Main application component
            ├── App.css            # Application styles
            ├── components/
            │   ├── AccountItem.jsx      # Single account card
            │   ├── AccountList.jsx      # Account grid with loading skeletons
            │   ├── CreateAccountForm.jsx # New account form
            │   ├── ErrorBanner.jsx      # Dismissable error banner
            │   └── TransferForm.jsx     # Fund transfer form
            └── store/
                ├── store.js             # Redux store configuration
                └── accountsSlice.js     # Accounts state, async thunks & reducers
```

## Prerequisites

- **Java 21** (JDK)
- **Maven** (or use the included Maven wrapper `mvnw` / `mvnw.cmd`)
- **MySQL** server running on `localhost:3306`
- **Node.js** (v18+ recommended) and **npm**

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bank
```

### 2. Set Up the Database

Create a MySQL database named `bankingapp`:

```sql
CREATE DATABASE bankingapp;
```

### 3. Configure Backend

Edit `bank/src/main/resources/application.properties` and update the database credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bankingapp
spring.datasource.username=root
spring.datasource.password=<your-mysql-password>
```

> Hibernate is configured with `ddl-auto=update`, so tables will be created/updated automatically on startup.

### 4. Install Frontend Dependencies

```bash
cd front/my-react-app
npm install
```

## Environment Variables / Configuration

All backend configuration is managed in `bank/src/main/resources/application.properties`:

| Property                              | Description                       | Default Value                          |
|---------------------------------------|-----------------------------------|----------------------------------------|
| `spring.datasource.url`              | MySQL JDBC connection URL         | `jdbc:mysql://localhost:3306/bankingapp`|
| `spring.datasource.username`         | Database username                 | `root`                                 |
| `spring.datasource.password`         | Database password                 | *(must be set)*                        |
| `spring.jpa.hibernate.ddl-auto`      | Schema auto-generation strategy   | `update`                               |
| `spring.jpa.show-sql`               | Log SQL queries to console        | `true`                                 |
| `server.port`                        | Backend server port               | `8080`                                 |

The frontend Vite dev server proxies all `/api` requests to `http://localhost:8080` (configured in `vite.config.js`).

## Running the Application

### Start the Backend

```bash
cd bank
./mvnw spring-boot:run
```

On Windows:

```cmd
cd bank
mvnw.cmd spring-boot:run
```

The backend API will be available at `http://localhost:8080`.

### Start the Frontend

```bash
cd front/my-react-app
npm run dev
```

The frontend dev server will start (typically at `http://localhost:5173`) and proxy API calls to the backend.

### Production Build (Frontend)

```bash
cd front/my-react-app
npm run build
npm run preview
```

## API Endpoints

All endpoints are prefixed with `/api/accounts`.

| Method   | Endpoint                  | Description                        | Request Body                                                  |
|----------|---------------------------|------------------------------------|---------------------------------------------------------------|
| `GET`    | `/api/accounts`           | Get all accounts                   | —                                                             |
| `GET`    | `/api/accounts/{id}`      | Get account by ID                  | —                                                             |
| `POST`   | `/api/accounts`           | Create a new account               | `{ "accountHolderName": "string", "balance": number }`        |
| `PUT`    | `/api/accounts/{id}/deposit`  | Deposit to an account          | `{ "amount": number }`                                        |
| `PUT`    | `/api/accounts/{id}/withdraw` | Withdraw from an account       | `{ "amount": number }`                                        |
| `POST`   | `/api/accounts/transfer`  | Transfer between accounts          | `{ "fromAccount": number, "toAccount": number, "amount": number }` |
| `DELETE` | `/api/accounts/{id}`      | Delete an account                  | —                                                             |

### Example: Create Account

```bash
curl -X POST http://localhost:8080/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"accountHolderName": "John Doe", "balance": 1000.00}'
```

### Example: Transfer Funds

```bash
curl -X POST http://localhost:8080/api/accounts/transfer \
  -H "Content-Type: application/json" \
  -d '{"fromAccount": 1, "toAccount": 2, "amount": 250.00}'
```

## Screenshots

<!-- Add screenshots of your application here -->

| Screen             | Preview                         |
|--------------------|---------------------------------|
| Dashboard          | ![Dashboard](screenshots/dashboard.png) |
| Create Account     | ![Create Account](screenshots/create-account.png) |
| Transfer Funds     | ![Transfer](screenshots/transfer.png) |

## Future Improvements

- [ ] User authentication and authorization (Spring Security + JWT)
- [ ] Transaction history with timestamps
- [ ] Account types (Savings, Current, etc.)
- [ ] Input validation with Bean Validation (Jakarta Validation)
- [ ] Global exception handling with `@ControllerAdvice`
- [ ] Pagination and sorting for account listings
- [ ] Unit and integration tests
- [ ] Dockerized deployment (Docker Compose for app + MySQL)
- [ ] Environment-based configuration with Spring Profiles
- [ ] API documentation with Swagger / OpenAPI

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
