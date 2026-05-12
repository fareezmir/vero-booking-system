# Vero Booking System

A patient booking flow.

## How to Run

### Prerequisites
- Node.js 18+
- npm

### Steps

1. Clone the repository
```bash
   git clone https://github.com/fareezmir/vero-booking-system.git
   cd vero-booking-system
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root directory, and put: DATABASE_URL="file:./dev.db"

4. Set up the database by typing:
```bash
   npx prisma migrate dev --name init
```

5. Seed mock data
```bash
   npx prisma db seed
```

6. Finally, start the development server
```bash
   npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

> **Patient view**: `http://localhost:3000/book`  
> **Admin view**: `http://localhost:3000/admin`

## What I Built

A patient booking system using Next.js for both the frontend and backend, with SQLite as a lightweight local database powered by Prisma as the ORM.

The booking flow is simple: a patient clicks "Book an Appointment" and is greeted with a list of physicians to choose from. Once selected, they pick from available time slots and finally fill in their basic personal info and reason for visit. The form is intentionally placed at the end to reduce initial friction, since a patient who has already picked a doctor and a time is far more likely to complete the form than one who is asked to fill it out upfront.

On the admin side, physicians and staff can view all bookings and update their status to "Confirmed" or "Cancelled". Filtering by status and physician makes it easy to quickly sift through bookings without scrolling through everything.

## Key Technical Decisions

**Next.js as a fullstack framework**: Next.js API routes handle all backend logic, eliminating the need for a separate Express server. This keeps the project in a single repo with one command to run, which is appropriate for this scope. In production, the backend would be split into a dedicated service to allow for better separation of concerns, and independent scaling for things like authentication.

**SQLite as the database**: SQLite was chosen purely for reviewer convenience. No external database setup required, so anyone can just clone and run. Prisma was used as the ORM to avoid raw SQL, keeping queries readable and type-safe.

**Singleton Prisma pattern**: A single shared PrismaClient instance is stored on `globalThis` to prevent multiple database connections during Next.js hot reloads in development. This is a standard pattern from the official Prisma docs.

**Atomic Design component architecture**: Components are organized into atoms (Button, Input, StatusBadge), molecules (PhysicianCard, SlotCard, BookingCard, FilterChips), and organisms (PhysicianSelector, SlotSelector, PatientDetailsForm, Navbar). This keeps the codebase scalable and each component focused on a single responsibility.

**Services layer**: All API calls are abstracted into a dedicated `bookingService.ts` file. This separates data fetching from UI components and makes it easy to swap the underlying API without touching component code.

**Form-last UX**: The patient details form is placed at the end of the booking flow intentionally. A patient who has already selected a physician and time slot has built momentum and is far more likely to complete the form than one who is asked to fill it out upfront.

**Color palette**: A navy, teal, and beige palette was chosen to feel calm, clinical, and trustworthy, appropriate for a healthcare product.

**Admin route is unprotected**: For demo purposes the admin route is publicly accessible. In production this would require role-based authentication.

## What I Would Improve With More Time

**Authentication**: Add role-based authentication for the admin route. For patients, guest booking is intentionally kept frictionless, but a post-confirmation account creation prompt would allow them to track their booking history.

**Email confirmation receipt**: Once an admin confirms a booking, automatically send the patient a confirmation email with their appointment details (physician, date, time). The `createdAt` timestamp is already captured in the database and would be included in the confirmation.

**Email admin notices**: Send a notification to the admin when a new booking comes in.

**More Sorting options**: Allow the admin to sort bookings by patient name (A-Z), booking date, or appointment date.

**Mobile responsiveness**: Basic responsiveness is in place but the booking flow and admin dashboard could be further optimized for smaller screens since I didn't test on mobile.

**UI polish**: The frontend is intentionally minimal but could be elevated with micro-animations, transitions between booking steps, decorative icons, or a further refined aesthetic to give patients a more premium experience when on the site.

**Booking management**: Admins should be able to hard delete bookings, particularly for outdated or past appointments. Currently cancelled status serves as a soft delete.

**Form validation**: Add proper input validation to ensure the email field contains a valid email address, phone number matches a valid format, and all fields meet minimum length requirements. Currently only checks that fields are non-empty.

**Testing**: Add unit tests for API routes and integration tests for the booking flow using React Testing Library.

**CI/CD**: Add a GitHub Actions pipeline with ESLint and Prettier checks on every push.