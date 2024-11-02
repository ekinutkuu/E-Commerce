<p align="center">
	<h1 align="center">E-Commerce Project</h1>
	<p align="left">
Project with important features that an e-commerce site should have. Users, products and categories in the database can be managed through an admin panel that only administrators can access. The system has token-based protection, so that unauthorized users cannot access the admin panel. The products registered in the database are listed on a page for users to interact with, and users can categorize products according to categories. Users can add products to their carts and view their carts.
	</p>
</p>

## Dependencies:

 - Java 22
 - NodeJS v16.8.0
 - npm v7.21.0
 - VS Code (for frontend)
 - Intellij IDEA (for backend)
 - MySQL Workbench

## Getting Started

- If you don't have necessary dependencies, please install them.

- Create a database on MySQL Workbench.

- Make the necessary database connection in the `E-Commerce/backend/src/main/resources/application.properties` file:
	- `spring.datasource.url = jbdc:mysql://localhost:port /databasename?useSSL=false`
	- `spring.datasource.username = database_username`
	- `spring.datasource.password = database_password`

- You can recompile the project cleanly from scratch by running `mvn clean install -DskipTests` on the command line. After the process is completed, you can run the backend side of the project by pressing the run button on the IDE.

- Inside the `E-Commerce/frontend` directory, install the packages by running `npm install` on the command line.

- Run the frontend side of the project with the `npm start` command. You can view the project in your browser on http://localhost:3000

## Pages and Descriptions

### Login and Register

Users can create a new account or log in to their account using the form on this page. Each user has its own role. Customers without authorization have the **“USER”** role, while people with special authorization in the system have the **“ADMIN”** role.

During the login process, when the API call is made, user authorization is performed with JWT (Json Web Token). User roles are checked and a specific token to their role is given to them. This way, unauthorized users cannot see admin content.

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="45%" src="/screenshots/login.png" align="center" alt="" />
	<img width="45%" src="/screenshots/register.png" align="center" alt="" />
</div>

### Admin Page

This page of the site is accessible to users with the **“ADMIN”** role. Authorized users can manage users, products and categories here. On the relevant page, you can view, edit, delete and create new data.

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="90%" src="/screenshots/admin_home.png" align="center" alt="" />
</div>

### User Management

When a user registers to the system, user role is automatically assigned the **“USER”**, which means that unauthorized role. If you want to give admin authorization to this user, the new role can be assigned from this panel.

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="90%" src="/screenshots/user_management-1.png" align="center" alt="" />
</div>

<br />

Users are warned with a pop up if any of the requested information is empty while performing an operation with products or categories.

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="90%" src="/screenshots/user_management-2.png" align="center" alt="" />
</div>

<br />

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="45%" src="/screenshots/user_management-3.png" align="center" alt="" />
	<img width="45%" src="/screenshots/user_management-4.png" align="center" alt="" />
</div>

### Product Management

Viewing, adding, updating and deleting operations are available on the product management page.

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="90%" src="/screenshots/product_management-1.png" align="center" alt="" />
</div>

<br />

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="90%" src="/screenshots/product_management-2.png" align="center" alt="" />
</div>

### Category Management

On this page you can view the categories, update the names of existing categories, add new categories to the database.

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="90%" src="/screenshots/category_management-1.png" align="center" alt="" />
</div>

<br />

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="90%" src="/screenshots/category_management-2.png" align="center" alt="" />
</div>

### Product Listing

This page of the project lists the products in the database. No special authorization is required for this part, all user roles can access here. Users can filter products according to their categories.

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="90%" src="/screenshots/products-1.png" align="center" alt="" />
</div>

<br />

By clicking on the products, you can switch to the page with details about the products. In this page, information such as seller, product details and price are displayed by retrieving them from the database.

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="90%" src="/screenshots/products-2.png" align="center" alt="" />
</div>

<br />

Users can add products to their carts by clicking the “add to cart” button on both pages. If users are not logged in to the system, a pop up screen will appear and the user will be informed.

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="90%" src="/screenshots/products-3.png" align="center" alt="" />
</div>

### User Cart

Users can view the products they have added to their carts and remove them.

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="90%" src="/screenshots/cart.png" align="center" alt="" />
</div>

## Database Model

### Users Table

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="60%" src="/screenshots/db_users.png" align="center" alt="" />
</div>

### Products Table

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="60%" src="/screenshots/db_products.png" align="center" alt="" />
</div>

### Product Category Table

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="60%" src="/screenshots/db_product_category.png" align="center" alt="" />
</div>

### Carts Table

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="60%" src="/screenshots/db_carts.png" align="center" alt="" />
</div>

### Cart Items Table

<div align="center" style="width:100%;display:flex;justify-content:space-between;">
	<img width="60%" src="/screenshots/db_cart_items.png" align="center" alt="" />
</div>
