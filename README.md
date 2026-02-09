# PlanIT  

This is a simple **Task Manager** application built with **React, TypeScript, and Tailwind CSS**. The app allows users to add, edit, complete, and delete tasks while categorizing them into different tabs based on their due dates and completion status.

---

## 🚀 Features  

✅ Add new or Edit tasks with details like:  
  - Task name  
  - Due date  
  - Tags (comma-separated)  
  - Urgency (Urgent / Not Urgent)  
  - Importance (Important / Not Important)  

✅ Mark tasks as **Completed / Uncompleted**  

✅ Delete tasks  

✅ Categorized tabs:  
  - **Inbox** → Shows all uncompleted tasks  
  - **Today** → Displays tasks due today  
  - **Missed** → Shows past due (uncompleted) tasks  
  - **Completed** → Displays all completed tasks  

✅ Tasks are **stored in localStorage**, so they persist between page reloads  

---

## 📝 Usage  

### 📂 Display Task based on Category
- Click on a tab : Inbox, Today, Missed, Completed.
- Perceive the corresponding tasks for said tab.

### 📌 Adding a Task  
- Click the **➕ (Plus)** button to open the task input form.  
- Enter task details and click **"Add Task"**.  

### 🖊 Editing a Task  
- Click the **✏️ (Edit)** button next to a task.  
- Modify the details and click **"Update"**.  

### ✅ Completing a Task  
- Click on a task's **checkbox** to mark it as completed.  

### 🗑 Deleting a Task  
- Click the **🗑 (Trash)** button to remove a task.  

---

## 📂 Project Structure  

```
src
├── App.css
├── App.tsx
├── assets
│   └── MyAvatar Notion.png
├── components
│   ├── sidebar.tsx
│   └── tasklist.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

---

## 🛠️ Technologies Used  

- **React** + **TypeScript**  
- **Tailwind CSS**  
- **React Icons** (for UI icons)  
- **Vite** (for fast development)  

<!-- 

---

## 📌 Future Enhancements  

🔹 Add drag-and-drop task reordering  
🔹 Implement task priority sorting  
🔹 Sync tasks with a backend (Node.js/Express + Database)

-->

Enjoy Planing IT 🥁