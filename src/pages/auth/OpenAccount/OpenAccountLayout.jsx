import { Outlet, useLocation } from "react-router-dom";
import StepIndicator from "../../../components/auth/StepIndicator";

const STEP_ROUTES = [
  "/open-account/step-1",
  "/open-account/step-2",
  "/open-account/step-3",
  "/open-account/step-4",
];

export default function OpenAccountLayout() {
  const { pathname } = useLocation();
  const currentStep =
    STEP_ROUTES.findIndex((r) => pathname.startsWith(r)) + 1 || 1;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4">
      {/* Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Open an Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Complete all steps to create your account
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Active Step */}
        <Outlet />
      </div>
    </div>
  );
}
