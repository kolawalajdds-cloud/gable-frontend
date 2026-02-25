import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Step1CreateAccount from "./pages/auth/OpenAccount/Step1CreateAccount";
import Step2AccountType from "./pages/auth/OpenAccount/Step2AccountType";
import Step3AccountDetails from "./pages/auth/OpenAccount/Step3AccountDetails";
import Step4SelectPlan from "./pages/auth/OpenAccount/Step4SelectPlan";
import SignIn from "./pages/auth/SignIn";
import DashboardPage from "./pages/DashboardPage";
import PortfolioPage from "./pages/PortfolioPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import TenantsPage from "./pages/TenantsPage";
import ListingsPage from "./pages/ListingsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import AccountingPage from "./pages/AccountingPage";
import { OpenAccountProvider } from "./context/OpenAccountContext";

// Wraps all open-account routes with shared form context
function OpenAccountRoot() {
  return (
    <OpenAccountProvider>
      <Outlet />
    </OpenAccountProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sign In — initial page */}
        <Route path="/sign-in" element={<SignIn />} />

        {/* Landing page after login */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Portfolio */}
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/add-property" element={<AddPropertyPage />} />

        {/* Tenants */}
        <Route path="/tenants" element={<TenantsPage />} />

        {/* Listings */}
        <Route path="/listings" element={<ListingsPage />} />

        {/* Applications */}
        <Route path="/applications" element={<ApplicationsPage />} />

        {/* Accounting */}
        <Route path="/accounting" element={<AccountingPage />} />

        {/* Open Account — multi-step flow (all share OpenAccountProvider) */}
        <Route path="/open-account" element={<OpenAccountRoot />}>
          <Route index element={<Navigate to="step-1" replace />} />
          {/* Step 1 is standalone full-page (no layout card) */}
          <Route path="step-1" element={<Step1CreateAccount />} />
          {/* Step 2 is standalone full-page (no layout card) */}
          <Route path="step-2" element={<Step2AccountType />} />
          {/* Step 3 is standalone full-page (no layout card) */}
          <Route path="step-3" element={<Step3AccountDetails />} />
          {/* Step 4 is standalone full-page (no layout card) */}
          <Route path="step-4" element={<Step4SelectPlan />} />
        </Route>

        {/* Sign In alias */}
        <Route path="/sign-in" element={<SignIn />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
