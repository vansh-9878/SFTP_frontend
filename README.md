# 🎨 SecureSFTP Frontend

A **secure, modern frontend** built with **React + TypeScript + Vite**, styled using **Tailwind CSS**, and hosted on **Vercel**. This UI interfaces seamlessly with the Go-based backend to enable **secure PDF upload, retrieval, and on-demand decryption**.

---

## 🧩 **Features**

✅ **PDF Upload Interface** – Simple drag-and-drop UI for uploading files  
✅ **User Email Integration** – Associate uploads with recipient’s email address  
✅ **File Retrieval** – Users can securely request and download their encrypted files  
✅ **Responsive Design** – Tailwind-powered layout optimized for all screen sizes  
✅ **Environment Configurable** – Easy setup for backend API URLs using `.env`  
✅ **Deployed on Vercel** – Fast and scalable frontend hosting  

---

## 🛠 **Tech Stack**

- **React + Vite** – Fast frontend with modern developer experience  
- **TypeScript** – Type-safe, scalable codebase  
- **Tailwind CSS** – Utility-first styling for clean UI  
- **Vercel** – Production-ready frontend deployment  

---

## 📁 **Project Structure**

```
frontend/
├── public/                
├── src/                  
│   ├── components/
│       ├── UploadFile.tsx
│       ├── ReadFile.tsx          
│   ├── App.tsx            
│   ├── main.tsx           
├── tailwind.config.ts     
├── vite.config.ts         
├── index.html             
├── .env                   
└── package.json           
```

---

## ⚙️ **Installation & Setup**

### 1️⃣ Navigate to Frontend Directory

```sh
cd frontend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Run the Dev Server

```sh
npm run dev
```

---

## 🧪 **Build for Production**

```sh
npm run build
```

Then deploy to **Vercel** or your preferred static host.

---

## 🖼️ **User Flow**

1️⃣ **Upload Page**  
- Drag & drop or browse PDF files  
- Enter recipient’s email  
- Submit to upload securely  

2️⃣ **Download Page**  
- Enter your email  
- Fetch list of your encrypted files  
- Click to decrypt & download  

---

## 🚀 **Future Enhancements**

🔹 Add loading & error handling states  
🔹 Implement authentication flow  
🔹 Improve UI/UX animations and transitions  
🔹 Add file preview before upload  

---

## 💬 **Contributing**

We welcome frontend contributions! Open issues or submit PRs for bug fixes, UI improvements, or new features.

---

## 📜 **License**

This project is licensed under the **MIT License**.
