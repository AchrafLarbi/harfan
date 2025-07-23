# Landing Page Content Management System

## Overview

This system allows administrators to dynamically manage the text content of the About and Plans sections on the landing page through a Django admin interface.

## Backend Components

### Models

#### LandingPageSection

- Manages text content for About and Plans sections
- Fields include titles, descriptions, and badge text
- Supports both Arabic and localized content

#### PlanDetail

- Manages individual subscription plans
- Includes pricing, features, and styling options
- Supports categorization (regular vs special plans)

### API Endpoints

Base URL: `http://localhost:8000/api/content/`

#### Public Endpoints (No Authentication Required)

- `GET /sections/get_content/` - Get all landing page content
- `GET /sections/about/` - Get about section content only
- `GET /sections/plans_content/` - Get plans section content only
- `GET /plans/` - Get all active plans
- `GET /plans/by_category/` - Get plans grouped by category

#### Admin Endpoints (Authentication Required)

- `PUT /sections/{id}/` - Update landing page section
- `PUT /plans/{id}/` - Update plan details
- `POST /sections/` - Create new section
- `POST /plans/` - Create new plan

## Frontend Components

### Dynamic Components

- `AboutDynamic.jsx` - Fetches about content from API
- `PlansDynamic.jsx` - Fetches plans content from API
- `AdminContentManager.jsx` - Admin interface for content management
- `ProtectedAdminRoute.jsx` - Route protection for admin access

### Services

- `contentApi.js` - API service for content management

### Frontend Routes

The application includes the following routes:

- `/` - Main landing page (uses dynamic components)
- `/signup` - User registration
- `/login` - User authentication
- `/verify-email` - Email verification
- `/forgot-password` - Password reset request
- `/auth/reset-password/:encoded_pk/:token` - Password reset confirmation
- `/admin/content` - Admin content management interface (protected route)

### Navigation

- Admin users will see an "إدارة المحتوى" (Content Management) link in both desktop and mobile navigation
- The admin link is only visible to authenticated users with staff/superuser privileges
- Clicking the admin link navigates to the content management interface

- `contentApi.js` - API service for content management

## Setup Instructions

### 1. Backend Setup

1. Add the content_management app to INSTALLED_APPS:

```python
INSTALLED_APPS = [
    # ... other apps
    'content_management',
]
```

2. Run migrations:

```bash
cd Harfan_backend
python manage.py makemigrations content_management
python manage.py migrate
```

3. Populate initial content:

```bash
python manage.py populate_initial_content
```

4. Create a superuser to access admin:

```bash
python manage.py createsuperuser
```

5. Start the development server:

```bash
python manage.py runserver
```

### 2. Frontend Setup

1. The application has been updated to use dynamic components automatically:

   - `Landing.jsx` now imports and uses `AboutDynamic` and `PlansDynamic`
   - Admin route `/admin/content` has been added to `App.jsx`
   - Navigation includes admin access for staff users

2. Update your main landing page component imports (already done):

```jsx
// In src/components/Landing.jsx
import AboutDynamic from "../components/landing/AboutDynamic";
import PlansDynamic from "../components/landing/PlansDynamic";

// Use AboutDynamic and PlansDynamic instead of About and Plans
```

3. Admin route configuration (already done):

```jsx
// In src/App.jsx
import AdminContentManager from "./components/AdminContentManager";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Route is added as:
<Route
  path="/admin/content"
  element={
    <ProtectedAdminRoute>
      <AdminContentManager />
    </ProtectedAdminRoute>
  }
/>;
```

4. Navigation updates (already done):
   - `Navbar.jsx` shows admin link for staff users
   - Admin link appears in both desktop and mobile navigation

## Admin Usage

### 1. Django Admin Interface

Access the admin interface at: `http://localhost:8000/admin/`

#### Managing Landing Page Sections

1. Navigate to "Content Management" → "Landing Page Sections"
2. Edit existing sections (About or Plans)
3. Update text content including:
   - Badge text
   - Main titles
   - Highlighted titles
   - Secondary titles
   - Descriptions

#### Managing Plans

1. Navigate to "Content Management" → "Plan Details"
2. Edit existing plans or create new ones
3. Update:
   - Plan names and pricing
   - Features (JSON format)
   - Styling options
   - Display order

### 2. Frontend Admin Interface (Optional)

For a more user-friendly interface, use the `AdminContentManager` component:

```jsx
import AdminContentManager from "./components/AdminContentManager";

// Use this component for admin users
<AdminContentManager />;
```

## Data Structure Examples

### About Section Content

```json
{
  "badge_text": "من نحن ؟",
  "title_main": "منصة",
  "title_highlighted": "تعليمية",
  "title_secondary": "إسلامية متطورة",
  "description": "حرفان منصة تعليمية تفاعلية..."
}
```

### Plan Content

```json
{
  "name_arabic": "اشتراك شهري فردي",
  "price": 29.0,
  "currency": "$",
  "duration_text": "/ شهر",
  "badge_text": "فردي",
  "features": ["دروس محدودة", "جلسات مباشرة أساسية", "دعم عام"],
  "button_text": "اشترك الان"
}
```

## Security Considerations

1. **Authentication**: Admin endpoints require proper authentication
2. **Permissions**: Only staff users can modify content
3. **Validation**: Models include validation for required fields
4. **CORS**: Ensure proper CORS configuration for production

## Customization

### Adding New Sections

1. Extend the `LandingPageSection` model with new fields
2. Update the serializers and views
3. Create new frontend components
4. Add migration for new fields

### Adding New Plan Fields

1. Add fields to the `PlanDetail` model
2. Update the admin form and serializer
3. Modify the frontend plan card rendering

## API Response Examples

### Get All Content Response

```json
{
  "about": {
    "title_main": "منصة",
    "title_highlighted": "تعليمية",
    "title_secondary": "إسلامية متطورة",
    "description": "...",
    "badge_text": "من نحن ؟"
  },
  "plans_section": {
    "title_main": "اختر",
    "title_highlighted": "الخطة",
    "title_secondary": "المناسبة لك",
    "description": "...",
    "badge_text": "الخطط والأسعار"
  },
  "plans": [
    {
      "id": 1,
      "name_arabic": "اشتراك شهري فردي",
      "price": "29.00",
      "features": ["دروس محدودة", "..."],
      "plan_category": "regular"
    }
  ]
}
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure CORS is properly configured in Django settings
2. **Authentication Errors**: Check that JWT tokens are properly sent with admin requests
3. **Loading Issues**: Verify API endpoints are accessible and returning expected data
4. **Styling Issues**: Check that Tailwind classes are being applied correctly

### Debug Tips

1. Check browser network tab for API request/response details
2. Verify Django logs for backend errors
3. Use Django admin to verify data is being saved correctly
4. Test API endpoints directly using tools like Postman

## Future Enhancements

1. **Image Management**: Add support for dynamic image uploads
2. **Multi-language**: Extend for multiple language support
3. **Version Control**: Add content versioning and rollback functionality
4. **Cache Management**: Implement caching for better performance
5. **Content Scheduling**: Add ability to schedule content changes
