# 🚀 ToDoList-Csharp-AspNetCore-Azure-TypeScript
Hey guys this is a project I've been working on and learning a lot from it basically consist in a to do list app that you know it can remind you about stuff you have to do I intentionally and specifically wanted it to use this tech stack (to learn about it) that includes Typescript via node.js, C# ASP.NETCORE , Azure and Azure SQL.




![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)
![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Azure SQL](https://img.shields.io/badge/Azure%20SQL-00BEF2?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white)



> **⚠️ IMPORTANT NOTE ON LOAD TIMES (Cold Start):**
> Because this project is hosted on the **Azure Free Tier**, the App Service and SQL Database scale down to a "hibernation" mode after periods of inactivity to conserve cloud resources.
>
> **If the application takes a moment to load or shows a blank screen initially, please allow 1-2 minutes for the Azure services to "spin up".** Thank you for your patience!
>
> **🔴 LIVE DEMO:** [👉 Click here to view the App running on Azure](https://todoapp-franc-frontend-hbe9dpapd4awbcfz.mexicocentral-01.azurewebsites.net/)
---

![demo todo list app](https://github.com/user-attachments/assets/b47b610c-43b5-4caa-8aad-e4b5367e57ce)


## 📋 Project Overview

A blueprint for a full-stack web application built with **TypeScript (React/Vite)** and a **.NET 8 (C#) API**, running on **Azure App Service** and backed by an **Azure SQL Database**.

This project is not just a "To-Do List"; it is a technical proof of concept designed to demonstrate the complete **Software Development Life Cycle (SDLC)** using the modern Microsoft ecosystem. It illustrates the transition from a local development environment to a production-grade cloud architecture.

## 🖼️ Application Preview

![Screenshot of the deployed App](PON_AQUI_EL_LINK_DE_TU_FOTO_O_SCREENSHOT)

---

## 💡 The "Why" (Project Vision)

In a world where AI simplifies code generation, the true value of a Software Engineer lies in **architecture, deployment, and scalability**.

My goal with this project was to master the challenges of distributed systems:
* **Decoupling:** Separating the Client (Frontend) from the Server (Backend).
* **Persistence:** Migrating from volatile memory to a relational Cloud Database.
* **DevOps:** Understanding deployment pipelines and cloud resource management.

---

## 🏗️ Application Architecture

This application utilizes the following Azure resources:

* **Azure App Service:** Hosts both the Web Frontend and the API Backend.
* **Azure SQL Database:** Provides relational data storage with high availability.
* **Entity Framework Core:** Acts as the ORM for efficient data manipulation.

Here is a high-level architecture diagram that illustrates these components:

![Azure Architecture Diagram](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/images/compute-decision-tree.png)
*(Note: This is a conceptual representation of the Azure PaaS services used).*

```mermaid
graph TD
    User(👤 User / Browser)
    
    subgraph "☁️ Azure Cloud Environment"
        style Front fill:#e1f5fe,stroke:#01579b,stroke-width:2px
        style Back fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
        style DB fill:#fff3e0,stroke:#ef6c00,stroke-width:2px

        Front[🖥️ Frontend <br/> TypeScript + Vite <br/> <i>(Azure App Service)</i>]
        Back[⚙️ Backend API <br/> .NET 8 Core <br/> <i>(Azure App Service)</i>]
        DB[(🗄️ Database <br/> Azure SQL <br/> <i>(PaaS)</i>)]
    end

    User -->|HTTPS / JSON| Front
    Front -->|REST API Fetch| Back
    Back -->|Entity Framework Core| DB

---

## ✅ Prerequisites

To run this project locally, ensure you have the following installed:

* **Azure Subscription:** (Free account is sufficient).
* **The .NET 8 SDK:** For the Backend API.
* **Node.js (LTS):** For the Web Frontend.
* **Git:** For version control.

---

## ⚡ Quickstart (Run Locally)

Follow these steps to get the application up and running on your local machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/francisco-rivera-viveros/ToDoList-Csharp-AspNetCore-Azure-TypeScript.git](https://github.com/francisco-rivera-viveros/ToDoList-Csharp-AspNetCore-Azure-TypeScript.git)


