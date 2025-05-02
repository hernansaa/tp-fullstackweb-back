# Beach Product Rental Management System API (Backend)

## Overview

This system is designed to manage the rental of beach products at a parador located in the Caribbean. Customers can rent a variety of products such as **JetSky**, **Cuatriciclos**, **Diving Equipment**, and **Surfboards** (for both kids and adults). 

The system handles the entire rental process including product availability, rental duration, security requirements, payment processing, and discounts.


## 📚 API Documentation
You can find the full API documentation here: [View API Docs](https://documenter.getpostman.com/view/11325396/2sB2j4gX6N)


## Products Available for Rental:

- **JetSky**  
  - Requires a helmet  
  - Requires a life jacket  
  - Maximum 2 persons  
  - 30 minutes per rental session  

- **Cuatriciclos**  
  - Requires a helmet  
  - Maximum 2 persons  
  - 30 minutes per rental session  

- **Diving Equipment**  
  - No specific security requirements  

- **Surfboards**  
  - For children or adults  
  - 30 minutes per rental session  

## Rental Rules & Conditions:

- **Security Requirements:**  
  For **JetSky** and **Cuatriciclos**, the user must rent a helmet and a life jacket (for **JetSky**). The rental will be limited to 1 or 2 safety devices based on the number of persons.
  
- **Rental Duration:**  
  All products are rented for **30 minutes** per session. A customer can rent up to **3 consecutive slots**.

- **Discounts:**  
  If a customer rents multiple products, they will receive a **10% discount** on the total payment.

- **Advance Booking:**  
  Products can be reserved up to **48 hours** in advance.

- **Cancellation Policy:**  
  Cancellations can be made **free of charge** up to **2 hours** before the scheduled rental time.

- **Payment Terms:**  
  - Payments can be made **in cash at the parador**.
  - If paying in cash, payment must be made **2 hours before the scheduled rental time**. If payment is not received, the reservation will be canceled and the product will be released.
  - Payments can be made in **local currency** or **foreign currency**.
  
- **Storm Insurance:**  
  If the user cannot enjoy their rental due to unforeseen storms, they will be refunded **50% of the amount paid**.

## Features

- **Manage Products:**  
  Manage a catalog of beach products including JetSki, Cuatriciclos, Diving Equipment, and Surfboards. Ensure proper availability and manage the security requirements for certain products.

- **Booking and Reservation:**  
  Allow customers to book rental sessions in advance. Restrict booking time to a maximum of 48 hours in advance and ensure up to 3 consecutive slots per customer.

- **Discount Calculation:**  
  Apply a **10% discount** when a customer rents more than one product in a single transaction.

- **Payment System:**  
  Track and manage payments (both cash and foreign/local currencies). Enforce payment deadlines to prevent no-shows.

- **Cancellation Management:**  
  Allow users to cancel bookings without penalty up to **2 hours before the scheduled rental time**.

- **Storm Refund:**  
  If a storm prevents customers from using the rented products, process a **50% refund** for the affected session.

## Setup

### Prerequisites:

1. **Node.js**  
   Ensure that you have Node.js installed on your machine. If not, you can install it from [here](https://nodejs.org/).

2. **MongoDB**  
   The backend system uses MongoDB to store data about products, reservations, payments, etc. Set up MongoDB locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud database.

3. **Install Dependencies**  
   Install the necessary Node.js dependencies:

   ```bash
   npm install
