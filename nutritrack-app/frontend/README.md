# NutriTrack - Frontend

This is the frontend application for NutriTrack, a comprehensive health and nutrition tracking system built with React and Vite.

## Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **User Authentication**: Secure login and registration with JWT
- **Role-Based Access**: Separate dashboards for Admin and Patient users
- **Health Tracking**: 
  - Meal logging with calorie tracking
  - Exercise logging with activity tracking
  - BMI calculation and health profile management
- **Diet Planning**: Personalized diet plans based on nutritional goals
- **Appointment Scheduling**: Book appointments with certified dieticians
- **Progress Reports**: Comprehensive health reports and analytics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Heroicons** - Icon library
- **Axios** - HTTP client for API calls

## Getting Started

### Prerequisites

- Node.js (v20 LTS recommended)
- npm or yarn
- Backend server running (see backend README)

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:4000/api
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified in vite.config.js)

### Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── common/         # Shared components
│   └── ...
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── ...
├── services/           # API services
│   └── api.js         # API configuration and utilities
├── styles/            # CSS and styling files
│   ├── tailwind.css   # Tailwind CSS imports
│   ├── button.css     # Button styles
│   ├── Modal.css      # Modal styles
│   └── ...
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## Features Breakdown

### Landing Page
- Modern, eye-catching design with animated graphics
- Trust indicators (user count, ratings)
- Feature highlights
- Call-to-action buttons

### Authentication
- Secure login and registration
- JWT token-based authentication
- Protected routes
- Role-based access control

### Admin Dashboard
- User management
- View all users
- Add/Edit/Delete users
- User statistics

### Patient Dashboard
- Health profile management
- BMI calculation
- Goal setting
- Quick access to all features

### Meal Logging
- Log meals with calorie tracking
- Meal recommendations
- Nutritional information
- Meal history

### Exercise Logging
- Track exercises and activities
- Calorie burn calculation
- Exercise history
- Activity statistics

### Diet Planning
- Personalized diet plans
- Meal recommendations based on goals
- Nutritional goal setting
- Diet plan customization

### Appointment Scheduling
- Book appointments with dieticians
- View appointment history
- Appointment management
- Calendar integration

### Reports
- Comprehensive health reports
- Progress tracking
- Analytics and insights
- Export functionality (future enhancement)

## API Integration

The frontend communicates with the backend via RESTful API. All API calls are configured in `src/services/api.js`.

### API Endpoints

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Admin**: `/api/admin/users`, `/api/admin/users/:id`
- **Patient**: `/api/patient/profile`, `/api/patient/health-profile`
- **Meals**: `/api/meals/*`
- **Exercises**: `/api/exercises/*`
- **Appointments**: `/api/appointments/*`
- **Reports**: `/api/reports/*`
- **Diet**: `/api/diet/*`

## Styling

The application uses Tailwind CSS for styling with custom CSS for specific components. The design system includes:

- **Color Palette**: Green, Blue, and Purple gradients
- **Typography**: Inter and Poppins fonts
- **Components**: Buttons, Cards, Modals, Forms
- **Animations**: Smooth transitions and animations using Framer Motion

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables
4. Ensure SPA routing is supported (redirect all routes to `index.html`)

## Development Notes

- The application uses React Router for client-side routing
- All API calls are made through Axios
- JWT tokens are stored in localStorage
- Protected routes require authentication
- Role-based access is implemented for admin and patient features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
