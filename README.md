# Project Folder Structure

This document outlines the structure of our project, detailing the purpose and contents of each directory and file.

## Components

The **Components** directory contains various subdirectories, each serving a specific function in our application:

- **/auth**
  - Contains components responsible for adding validation to routes.

- **/container**
  - Includes components used as wrappers.

- **/layout**
  - Houses components for rendering data on the UI, such as `RootLayout` for rendering the entire application.

- **/tables**
  - Contains all types of tables used in the application.

- **/tools**
  - Includes components that are part of the tools module.

- **/ui**
  - Contains all UI components used in the application, like buttons, inputs, modals, etc.

- **/waterSystem**
  - Components that are part of the water system module.
  - **/well**
    - Components that are part of the well module.
    - **/visit**
      - Components that are part of the visit module.
      - **/fieldData**
        - Components that are part of the field data module.

## Constants

- **constants.js**
  - Contains all constants used in the application. If a constant value is large enough, it should be placed in a separate file, imported into `constants.js`, and exported from there. Ensure all variables are declared in uppercase.

## Context

- **AuthContext.js**
  - Manages the authentication state of the user.

- **UserContext.js**
  - Maintains user information for the logged-in user and their group.

## Hooks

- **useFileDownload.js**
  - A hook for downloading files. It is designed to handle multiple clicks to download the same file efficiently. Used in pages like notes, visits, and files.

## Pages

This directory contains all pages included in our app routes:

- **/coc**
  - Pages that are part of the COC module.

- **/tools**
  - Routes declared under the `/:vendor` route can be found here.

- **/waterSystem**
  - Routes declared under the `/pws` route can be found here.
  - **/well**
    - Routes declared under the `/:well` route.
    - **/visit**
      - Routes declared under the `/:visit` route.

- Additional pages include signin, create-account, dashboard, etc.

## Services

- Contains all backend services utilized by the application.

## Utility

- **cocUtility.js**
  - Utility functions required for generating the custody chain.

- **encryptionUtility.js**
  - Utility functions required for encrypting and decrypting data.

---

This README provides a clear and organized overview of our project's folder structure, making it easier to navigate and understand each component's role within our application.