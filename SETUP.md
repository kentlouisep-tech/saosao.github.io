# SASO Management System

This is the Student Affairs and Services Office (SASO) Management System for Cebu Technological University – Tabogon Extension Campus. It is a web-based administrative application for the SASO Coordinator and SASO Staff to manage student records, counseling sessions, disciplinary cases, scholarship grants, student organizations, and office reports.

You do not need to build anything from scratch. You download this project, install a few free tools, and start it on your computer.

Plan for about 15 to 30 minutes the first time. Most of that is waiting for downloads and package installation.

You will end up with a local site accessible at [http://localhost:8000](http://localhost:8000). "Localhost" means the application is running only on your computer.

---

## 1. Install the tools

You need two free tools to run the application locally on Windows:

| Tool | What it is | Where to get it |
| ---- | ---------- | --------------- |
| **Laragon** | Provides PHP (8.3+), Composer, and database engines | [laragon.org](https://laragon.org/download/) |
| **Node.js** | JavaScript runtime used to build the web frontend | [nodejs.org](https://nodejs.org/) — choose the **LTS** version |

Laragon includes PHP and Composer out of the box, so you do not need to install them separately.

Install them in this order: **Laragon**, then **Node.js**. Accept the default options in each installer. When an installer asks to add the program to your **PATH**, ensure that box remains checked (PATH allows Windows to recognize commands from your terminal).

After the installers complete, close the installation windows. If prompted, restart your computer.

### Check that the tools work

1. Open the Windows Start menu.
2. Type `PowerShell` and open **Windows PowerShell**.
3. Verify your installations by typing each command below and pressing Enter:

```powershell
php -v
composer -V
node -v
npm -v
```

Each command should print a version number rather than an error:

- **PHP** should be **8.3** or higher.
- **Node.js** should be **20.19** or higher (or **22.x** LTS).

> If any command is not recognized, start **Laragon**, click **Start All** (which configures environment variables), close PowerShell, open a new PowerShell window, and try again.

---

## 2. Place the project folder

1. Extract the `sao-ms` project folder (or clone it from GitHub).
2. Place the `sao-ms` folder in an easy-to-access location, such as your **Documents** folder.
3. Open PowerShell and navigate into the project directory:

```powershell
cd $env:USERPROFILE\Documents\sao-ms
```

> All subsequent commands must be executed from within this project folder.

---

## 3. Setup and Start the Website

In your PowerShell window, run the following setup steps. You can execute them one by one or as a block:

```powershell
# 1. Install PHP dependencies
composer install

# 2. Setup application environment configuration
Copy-Item .env.example .env
php artisan key:generate

# 3. Initialize and seed SQLite database
New-Item -ItemType File -Force database\database.sqlite
php artisan migrate --seed

# 4. Install JavaScript dependencies and compile frontend assets
npm install
npm run build

# 5. Start the local web server
php artisan serve
```

Leave this PowerShell window running. When you see:

```
Server running on [http://127.0.0.1:8000]
```

Open your web browser and navigate to:

👉 **[http://localhost:8000](http://localhost:8000)**

You should see the CTU – Tabogon Extension SASO welcome page. Click **Log in** in the top-right corner.

> **To stop the server:** Switch to the PowerShell window and press `Ctrl` + `C`.  
> **To start it again later:** Open PowerShell, navigate to the folder (`cd $env:USERPROFILE\Documents\sao-ms`), and run `php artisan serve`.

---

## 4. Sign in

Public registration is disabled to ensure system security. The SASO Coordinator account is seeded during setup. SASO Staff accounts can be created by a Coordinator from User Management.

The default administrative account credentials:

| Field | Value |
| ----- | ----- |
| **Role** | SASO Coordinator |
| **Name** | Maria Elena Ramos |
| **Email** | `admin@ctu-tabogon.edu.ph` |
| **Password** | `password` |

### System Modules

Signing in with the coordinator account unlocks all administrative modules:

- **Dashboard**: High-level metrics, upcoming counseling sessions, pending scholarship reviews, and recent activities.
- **Student Records**: Master student directory with optional email and phone number, course, year level, section, and school-year/semester filters.
- **Counseling Records**: Guidance and counseling case tracking, academic-period filters, session scheduling, and printable summon letter generation.
- **Disciplinary Records**: Student offense tracking, academic-period filters, sanction monitoring, and case status management.
- **Scholarships**: Scholarship program catalog, period-specific student grant assignment and approval workflow. GWA and Coverage are not collected.
- **Student Organizations**: Recognized student groups, faculty adviser details, officer/member rosters, and school-year/semester-specific requirement uploads.
- **Reports**: Printable summaries, demographic breakdowns, and PDF export.
- **User Management**: Creation and management of office staff accounts and access permissions.

SASO Staff can use the operational modules but cannot access User Management or role and permission assignments.

> **Security Note:** Before entering real institutional data, update the coordinator account password via the profile menu (click your name in the top navigation bar).

---

## 5. Development Mode & Testing

### Running in Development Mode (Live Reload)

When actively developing or modifying React components, CSS, or backend code, you can run the live development servers with hot module replacement:

In your first PowerShell window:
```powershell
php artisan serve
```

In a second PowerShell window:
```powershell
npm run dev
```

### Running Automated Tests

#### Feature & Unit Tests (PHPUnit)
To verify backend functionality and authorization guards:
```powershell
php artisan test
```

#### End-to-End Tests (Playwright)
To run automated browser-based end-to-end tests:
```powershell
# Install Playwright browser binaries (first time only)
npx playwright install

# Run all E2E test suites
npm run test:e2e
```

---

## 6. Troubleshooting

**"php" or "npm" is not recognized**
- Laragon or Node.js was installed while PowerShell was open. Close PowerShell, launch Laragon, click **Start All**, and open a fresh PowerShell window.

**Port 8000 is already in use**
- If another application is using port 8000, specify a different port:
  ```powershell
  php artisan serve --port=8080
  ```
  Then open `http://localhost:8080` in your browser.

**The page opens but looks unstyled or shows "Vite manifest not found"**
- Build the production frontend assets:
  ```powershell
  npm run build
  ```
- Or run `npm run dev` in an open PowerShell window during development.

**Database error or missing SQLite file**
- Ensure the SQLite database file exists and run migrations:
  ```powershell
  New-Item -ItemType File -Force database\database.sqlite
  php artisan migrate --seed
  ```

**Reset sample data back to initial state**
- To wipe local test data and re-seed the default administrator account and sample records:
  ```powershell
  php artisan migrate:fresh --seed
  ```
  *(Caution: This erases any locally added records and resets the database back to clean seeded defaults).*

---

## 7. Using MySQL instead (Optional)

SQLite is configured by default for effortless zero-config local setup. If your environment requires MySQL:

1. In Laragon, click **Start All**.
2. Click **Database** (or open HeidiSQL / phpMyAdmin) and create a database named `sao_ms`.
3. Open the `.env` file in the project root with a text editor and update the database configuration:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sao_ms
DB_USERNAME=root
DB_PASSWORD=
```

4. Run the database migrations with seed data:
```powershell
php artisan migrate --seed
```
