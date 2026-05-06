# The_Shelf-Life_Crisis

📌 Project Description

    Inventory and Expiry Alert System is a student project built with HTML CSS, and JavaScript. 
    It helps users track items and expiration dates using color-coded alerts, an at-risk counter, 
    and saved on local storage, making inventory management simple and efficient.

🚀 Features

    📅 Add items with expiration date.

    Color-coded alerts:
        🔴Red → Expires within 48 hours
        🟡Yellow → Expires within 7 days
        🟢Green → Safe

    ⚠️ At-risk items counter
    ✅ Mark items as used (removes from list)
    💾 Data saved using Local Storage

🎨 User-Friendly UI

    Clean and intuitive design.
    Easy to understand and navigate.


📱 Responsive Design

    Fully responsive layout
    Works smoothly on:

        Desktop 💻
        Tablet 📱
        Mobile 📲


📂 Project Structure

    The_Shelf-Life_Crisis/
    >assets
    >documentation
    │── LICENSE
    │── README.md
    │── index.html
    │── script.js
    │── styles.css

▶️ How to Run

    Download or clone the repository.
    Make sure all files are in one folder.
    Open index.html in your browser.
    No installation required.

⚙️ How It Works

    User inputs item name and expiration date.
    JavaScript calculates time difference.
    System assigns status (red, yellow, green).
    Items are displayed dynamically in the dashboard.
    Data is saved in localStorage for persistence.

🔄 App Flow

    User opens the app
          ↓
    Existing data is loaded from LocalStorage
          ↓
    Dashboard displays:
    - Inventory list
    - Status (Critical, Warning, Safe)
    - Statistics counter
          ↓
    User adds a new ingredient
          ↓
    System validates input (name + future date)
          ↓
    Item is saved to inventory
          ↓
    Data is stored in LocalStorage
          ↓
    System calculates expiry status
          ↓
    Items are sorted and grouped:
    [Critical → Warning → Safe]
          ↓
    UI updates automatically:
    - Inventory list refreshes
    - Stats update
    - Warning banner shows (if critical items exist)
          ↓
    User marks item as "Used"
          ↓
    Item is removed from inventory
          ↓
    UI updates again

🎯 Purpose

    Reduce ingredient waste.
    Improve inventory tracking.
    Provide a quick and easy monitoring system.

💡 Future Improvements

    🔔 Notification alerts for expiring items.
    🔍 Search and filter feature.
    📊 Analytics dashboard.
    📱 Convert to Progressive Application.


Clone the Repository:

    git clone https://github.com/khanedith13/The_Shelf-Life_Crisis.git


🛠️ Built With

    HTML, CSS, JavaScript


👨‍💻 Author

    Developed by Delfin G. Octobre / Khan Edith | CodeX

    GitHub Profile: https://github.com/khanedith13
