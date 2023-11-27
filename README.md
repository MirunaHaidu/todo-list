# todo-list# Todo List Project

## Overview

This Todo List project is a dynamic web application where users can manage their tasks efficiently. It incorporates essential features for organizing tasks into projects, setting due dates, and prioritizing activities. The application utilizes modern web development techniques, including the Web Storage API for data persistence.
Check out the live demo [here](https://mirunahaidu.github.io/todo-list/).


## Table of Contents

- [Features](#features)
- [Assignment Details](#assignment-details)
- [Implementation](#implementation)
- [Usage](#usage)
- [External Libraries](#external-libraries)
- [Persistence](#persistence)
- [Inspiration](#inspiration)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Features

- Create and manage projects to organize todos.
- Dynamically generate todo items with titles, descriptions, due dates, priorities, notes, and checklists.
- View all projects and todos, including title and due date information.
- Expand individual todos to view and edit details.
- Delete unwanted todos.
- External library integration (date-fns) for efficient date formatting and manipulation.

## Assignment Details

### Todo Items

- Todos are represented as objects with properties such as title, description, due date, priority, notes, and a checklist.

### Project Organization

- Todos are organized into projects or separate lists. A default project exists for initial todos, and users can create new projects.

### Code Organization

- Application logic and DOM-related code are separated into distinct modules for clarity and maintainability.

### User Interface

- The UI allows users to view all projects and todos, expand todos for detailed information, and delete unwanted todos.

## Implementation

- Utilizes webpack for bundling and managing dependencies.
- Implements external library (`date-fns`) for efficient date handling.
- Achieves data persistence using the Web Storage API (`localStorage`).

## Usage

1. Clone the repository: `git clone https://github.com/MirunaHaidu/todo-list`
2. Open `index.html` in your preferred web browser.

## External Libraries

- [date-fns](https://date-fns.org/) - Provides useful functions for formatting and manipulating dates and times.

## Persistence

- Implements `localStorage` for data persistence, allowing users to retain their todos even after page refresh.

## Inspiration

This project draws inspiration from popular todo apps such as Todoist, Things, and any.do. It explores similar features and aims to provide a user-friendly experience.

## Acknowledgments

Special thanks to the [Odin Project](https://www.theodinproject.com/) for providing the assignment details and guidance.

## License

This project is licensed under the [MIT License](LICENSE).

