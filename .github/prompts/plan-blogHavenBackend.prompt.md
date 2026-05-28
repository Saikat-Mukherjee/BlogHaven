# Plan: Java Microservices Architecture for BlogHaven

This plan proposes a **Database-per-Service** pattern using **Spring Boot** microservices, communicating effectively to support the blog's rich social features and content management.

### Top-Level Architecture
*   **Infrastructure:** Java 21, Spring Boot 3, Docker.
*   **Communication:** Synchronous REST APIs for frontend interaction; Asynchronous **Kafka/RabbitMQ** for inter-service updates (e.g., "Post Liked" $\to$ "Update Author Stats").
*   **Entry Point:** **API Gateway** (Spring Cloud Gateway) to route requests from your Next.js app to the correct service.

### 1. The Microservices
These 5 core services map directly to your application's folder structure.

1.  **Identity Service (Auth)**
    *   **Responsibility:** Registration, Login, and Token Management.
    *   **Tech:** Spring Security (OAuth2 Resource Server).
    *   **Endpoints:** `/auth/signup`, `/auth/login`, `/auth/refresh`.
    *   **Action:** Generates JWTs containing `user_id` and `role` which the Next.js Middleware will verify.

2.  **Profile Service (User)**
    *   **Responsibility:** Manages "Authors", user bios, social links, and skills.
    *   **Maps to:** `app/profile/[username]` and `app/authors`.
    *   **Key Detail:** Stores the public profile data distinguished from specific login credentials.

3.  **Content Service (Blog)**
    *   **Responsibility:** CRUD for Blog Posts, Drafts, and Tags.
    *   **Maps to:** `app/posts/[slug]`, `app/dashboard/create`.
    *   **Key Detail:** Handles the large HTML strings from your **Tiptap** editor and manages `slug` uniqueness.

4.  **Social Service (Interaction)**
    *   **Responsibility:** Comments, Likes, Bookmarks, and Follows.
    *   **Maps to:** `components/comments-section.tsx`, `components/post-interactions.tsx`.
    *   **Key Detail:** Highly relational data; decoupling this prevents high traffic (likes) from slowing down post reading.

5.  **Media Service**
    *   **Responsibility:** Image uploads (Post thumbnails, User avatars).
    *   **Action:** Accepts `MultipartFile`, uploads to storage, and returns a public URL for the frontend.

### 2. Database Strategy
I recommend **PostgreSQL** as the primary engine due to the highly relational nature of a social blog (Users $\leftrightarrow$ Posts $\leftrightarrow$ Comments).

| Service | Database / Schema | Why? |
| :--- | :--- | :--- |
| **Identity** | **PostgreSQL** (`db_auth`) | Strict ACID compliance for credentials and roles. |
| **Profile** | **PostgreSQL** (`db_profile`) | Structured data; relational links to "Skills". |
| **Content** | **MongoDB** (or Postgres JSONB) | *Option A (Mongo):* Excellent for flexible blog post schemas and complex drafts.<br>*Option B (Postgres):* Easier to maintain if you want a single DB technology. |
| **Social** | **PostgreSQL** (`db_social`) | Efficient joining of comments/replies and strict integrity for "Likes". |
| **Cache** | **Redis** | **Critical.** Cache rendered blog posts and user session data to speed up the `page.tsx` loads. |

### 3. Next Steps
1.  **Setup Monorepo:** Create a `backend/` folder alongside your `app/`.
2.  **Define API Gateway:** Configure Spring Cloud Gateway to proxy `/api/v1/posts` to the Content Service.
3.  **Data Migration:** Create DTOs (Data Transfer Objects) in Java that match your TypeScript interfaces (e.g., `PostDTO`, `AuthorProfileDTO`).

### Further Considerations
1.  **Drafts vs. Published:** The Content Service needs a `status` ENUM (DRAFT, PUBLISHED) to support your `dashboard` features.
2.  **Aggregated Data:** Since data is split (User name in Profile Service, Post content in Content Service), how will you display "Post with Author Name"?
    *   *Solution:* The Content Service stores a cached "Author Name" snapshot, or the Frontend fetches both in parallel.
3.  **Search:** For the `explore` page, simple SQL `LIKE` queries might fulfill the need initially, but **Elasticsearch** is the industry standard if the blog grows.
