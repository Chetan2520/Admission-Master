# 🎓 Admission Master - Full Project Documentation

Admission Master is a high-end, data-driven EdTech platform designed to simplify the complex college admission process for students. It combines AI-powered prediction tools with expert human counselling to provide a "Freemium to Premium" experience.

---

## 🧭 Project Vision & Objective
*   **Predict**: Accurate college predictions based on exam ranks.
*   **Explore**: Deep insights into exams, colleges, and scholarships.
*   **Guide**: Expert-led VIP counselling for personalized admission strategies.
*   **Convert**: A seamless funnel from registration to paid VIP services.

---

## 🔄 Updated User Flow (Login Mandatory)
1.  **Visit Home Page**: Explore basic info, exams, and benefits.
2.  **Access Predictor**: User clicks "Check Colleges".
3.  **Mandatory Login/Signup**: User is prompted to login/register to see any results.
4.  **View Basic Results**: Limited college list with basic cutoff data.
5.  **Unlock Advanced Features**: Registration also unlocks the "Advanced Predictor" (with additional filters/AI).
6.  **Upgrade to VIP**: User opts for personalized expert counselling (Paid).

---

## 🏠 Detailed Feature Breakdown

### 1. Home Page Structure
*   **Header Section**: Logo, Navigation (Exams, Colleges, Counselling, Scholarships), and prominent Login/Register button.
*   **Hero Section**: High-impact headline ("Predict Your College with Accuracy"), sub-headline, and quick-action buttons.
*   **Promotional Highlight**: Dynamic banner for "30% OFF VIP Career Counselling".
*   **Scholarship Section**: Highlights Admission Master Institute's scholarship opportunities.
*   **Basic College Predictor**:
    *   **Input**: Exam selection (NEET, JEE, CUET, etc.) + Expected Rank.
    *   **Action**: "Check Colleges" (Triggers Login if not authenticated).
*   **Advanced Features Section (Locked UI)**:
    *   Visual placeholders for Admission Probability %, Budget Filters, and AI Recommendations.
    *   CTA: "Unlock Full Insights After Login".
*   **Popular Exams Section**: Quick links to detailed pages for NEET UG, PG, CUET, JEE, etc.
*   **VIP Benefits**: Showcase of personal mentors, strategy planning, and scholarship support.

### 🔐 2. Authentication System (The Gateway)
*   **Features**: 
    *   Email/Password Login & Signup.
    *   **Google OAuth**: For one-click registration.
    *   **OTP Verification**: Mobile verification via MSG91 for high-quality leads.
*   **Role**: Unlocks both Basic and Advanced predictor features.

### 📊 3. College Predictors (The Core Engine)
#### A. Basic Predictor (After Login)
*   **Output**: Limited list of eligible colleges.
*   **Data**: Basic cutoff data, classification (Govt. vs Private).
*   **Restriction**: No probability percentage, no advanced filters.

#### B. Advanced Predictor (Full Value)
*   **Admission Probability**: AI-calculated percentage chance of getting a seat.
*   **Smart Filters**: Rank range, Budget, Location (State/City), Category (Gen/OBC/SC/ST).
*   **Comparison Tool**: Side-by-side analysis of 2-3 colleges.
*   **AI Recommendations**: Personalized list based on rank + career goals.

### 📄 4. Exam Details Page (SEO & Education)
Each exam (e.g., `/exams/neet-ug`) will have:
*   **Overview**: Syllabus, pattern, and eligibility criteria.
*   **Live Data**: Previous year cutoffs and important dates (Registration, Admit Card, Results).
*   **Top Colleges**: List of premier institutions accepting the exam.
*   **Engagement**: Floating CTA for "Free Counselling" and "Scholarship Alerts".

### 👤 5. Student Portal (Dashboard)
*   **Overview**: Application status tracker and deadline alerts.
*   **College Explorer**: A searchable database of 1000+ colleges.
*   **Career Guidance**: AI-generated roadmap based on the student's profile.
*   **VIP Section**: Subscription management, mentor chat interface, and document vault.

### 💎 6. VIP Counselling System (Revenue Source)
*   **Services**: 1-on-1 sessions, personalized choice filling, seat locking support, and college visit assistance.
*   **Pricing**: Multi-tier plans (Basic, Advanced, Premium VIP).
*   **Integration**: Razorpay for secure payments.

---

## 🔌 Technology Stack
*   **Frontend**: Next.js 15, Tailwind CSS, Framer Motion (Animations), Lucide (Icons).
*   **Backend**: Node.js, Express.js.
*   **Database**: **MongoDB (Mongoose)** - Flexible schema for varied college/exam data.
*   **Payments**: Razorpay.
*   **Messaging**: MSG91 (SMS), SendGrid (Email).

---

## 📅 Development Roadmap

### 🛠️ Phase 1: Foundation & Auth (Days 1-10)
*   Initialize Backend & MongoDB connection.
*   Setup User Authentication (JWT + Google + OTP).
*   Build the Login/Signup UI & Logic.
*   **Predictor Integration**: Connect Homepage Predictor to Auth gate.

### 🧠 Phase 2: Data & Core Logic (Days 10-25)
*   Populate MongoDB with College & Cutoff data.
*   Build the Predictor API (Basic + Advanced logic).
*   Implement Student Dashboard & College Explorer.

### 💎 Phase 3: VIP & Payments (Days 25-45)
*   Integrate Razorpay.
*   Build the Mentor Booking & VIP Support system.
*   SEO Optimization & Final Launch.

---

## 🎯 Success Metrics
*   **High Conversion**: Smooth flow from Home -> Login -> Predictor.
*   **Data Accuracy**: 99% accuracy in cutoff predictions.
*   **User Engagement**: Time spent on College Explorer and Exam pages.
