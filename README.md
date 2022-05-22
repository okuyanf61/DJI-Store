
# CENG 3502 Dynamic-Web-Programming Final Project

Develop a complete e-shopping website.

1- There will be two types of users on your system. Customers and admins.

2- There will be an admin created by you on the system and that admin can
create users with administrative privileges. These administrative type
users can search, add, update or delete a product. So, create the
necessary pages for these operations.

3- Customers should be able to register by themselves using the form that
you have provided. Customers can update their information.

4- Provide a registration and login page.

5- You should sell at least one type of product on your page. But your
product should have categories. For example, if you are selling only books
on your website, books should have categories like romance, science,
adventure etc.

6- Products should have title(name), picture, price, description.

7- Implement the shopping cart mechanism. Customers should be able to
search and view products. They should be able to add, view and remove
products from the shopping cart.

8- Shopping cart should also show the total cost. It should also have the
options; continue shopping and checkout.

9- In the checkout part you should display the shipping address and ask for
the payment method.


## Deployment

To deploy this project run

```bash
docker-compose up
```

or

just copy `app` folder to xampp's www folder.


After deploying project create database on phpMyAdmin. There is a backup file called `sqldump.sql`. You can use it for table importing after creating the database.
## Note

If you deploy project with docker-compose, you should run some commands in webserver container.

```bash
docker-php-ext-install mysqli pdo pdo_mysql
```

After installation complete just restart the container.
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## License

[Demo](demo.gif)


## TODO

- [ ] Write a Dockerfile for webserver. So users won't have to install php extensions manually.

