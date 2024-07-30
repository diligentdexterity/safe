# SAFE

**SAFE** is a password manager with advanced encryption and security. Designed to protect your sensitive information, SAFE combines modern technologies to deliver a secure and user-friendly experience.

## Features

- 🔐 **Google Authentication**: Seamless login with [NextAuth](https://next-auth.js.org/) and [Auth JS](https://authjs.dev/).
- 🗃️ **Database**: Robust data handling with [PostgreSQL](https://www.postgresql.org/), hosted on [Vercel](https://vercel.com/) using [Prisma](https://www.prisma.io/).
- 🔒 **Encryption**: Advanced encryption using [Node.js Crypto](https://nodejs.org/api/crypto.html).
- 🎨 **User Interface**: Elegant and responsive UI built with [Shadcn UI](https://shadcn.dev/), [Acernity UI](https://acernity.com/), and [Tailwind CSS](https://tailwindcss.com/).
- ⏱️ **Session Management**: Secure session time-out management.
- 🛡️ **Data Protection**: Additional layer of security with a master password.
- 🌑 **Dark Mode**: Eye-friendly dark mode available.
- 📱 **Cross-Platform**: Applications available for both [Android](https://www.android.com/) and [iOS](https://www.apple.com/ios/).
- 📜 **State Management**: Efficient state management with [createContextHook](https://reactjs.org/docs/context.html).

## Installation

To get started with SAFE, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/diligentdexterity/safe.git
    ```

2. **Navigate to the project directory:**
    ```sh
    cd safe
    ```

3. **Install dependencies:**
    ```sh
    npm install
    ```

4. **Set up environment variables:**
    - Create a `.env` file in the root directory and add the following variables:
        ```
        AUTH_SECRET=
        DATABASE_URL=
        AUTH_GOOGLE_ID=
        AUTH_GOOGLE_SECRET=
        NEXT_PUBLIC_API=
        NEXT_PUBLIC_SECRET_IV= *optional*
        NEXT_PUBLIC_ECNRYPTION_METHOD=
        ```

5. **Run the development server:**
    ```sh
    npm run dev
    ```

6. **Build for production:**
    ```sh
    npm run build
    ```

7. **Start the application:**
    ```sh
    npm start
    ```

## Usage

- **Sign Up/Log In**: Use your Google account to sign up or log in.
- **Add Passwords**: Save your passwords securely with encryption.
- **Access Passwords**: Retrieve your saved passwords with ease.
- **Session Management**: Your session will time out automatically for added security.
- **Dark Mode**: Toggle dark mode for a better viewing experience.

## Contributing

We welcome contributions to enhance SAFE. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.


For any inquiries or support, please contact [Darshan Dhakal](mailto:diligentdexterity@gmail.com).

---

Thank you for using SAFE! Your security is our priority.
