# Requirements

**QA gate:** all 15 user stories must pass manual QA on **Day 10 (Wed 8/26)**.

## User Stories (15)

### Authentication

| ID | Requirement | Planned |
|---|---|---|
| US-01 | Log into the application to access protected features | Day 5 |
| US-02 | Log out so the session ends securely | Day 5 |
| US-03 | Login state persists while continuing to use the application | Day 5 |

### Navigation

| ID | Requirement | Planned |
|---|---|---|
| US-04 | Navigate between pages without refreshing the browser | Day 3 |
| US-05 | Protected pages require authentication before they can be viewed | Day 5 |

### External API

| ID | Requirement | Planned |
|---|---|---|
| US-06 | View information retrieved from an external API | Day 4–6 |
| US-07 | Application indicates when data is loading | Day 6 |
| US-08 | Meaningful feedback if the API cannot be reached | Day 6, 10 |

### Search and Filtering

| ID | Requirement | Planned |
|---|---|---|
| US-09 | Search available data | Day 6 |
| US-10 | Filter the displayed results | Day 6 |
| US-11 | View detailed information about an individual item | Day 7 |

### User Experience

| ID | Requirement | Planned |
|---|---|---|
| US-12 | Information displayed in a clean and organized layout | Day 3, 9 |
| US-13 | Forms validate input before submission | Day 5, 9 |
| US-14 | Application works across different screen sizes | Day 9 |
| US-15 | Meaningful error messages whenever something goes wrong | Day 9, 10 |

## Project Requirements Checklist (10)

- [ ] Built as a React application using modern React practices and a clean project structure
- [ ] Uses reusable components, React Hooks, and client-side routing to organize functionality
- [ ] Integrates with at least one external REST API, handling loading, success, and error states
- [ ] Functional login/logout experience with protected routes and persistent auth state
- [ ] Intuitive navigation, responsive layouts, and a polished user experience
- [ ] Validates user input and provides clear feedback for invalid input and application errors
- [ ] Clean, maintainable, well-documented code following JavaScript and React best practices
- [ ] Appropriate testing or validation of key application functionality
- [ ] Complete README with setup instructions, architecture, API documentation, and execution steps
- [ ] Shared Git repository with meaningful commit history showing consistent contributions from both members