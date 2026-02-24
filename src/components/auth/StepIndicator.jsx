const STEPS = [
  { id: 1, label: "Create Account" },
  { id: 2, label: "Account Type" },
  { id: 3, label: "Account Details" },
  { id: 4, label: "Select Plan" },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-start justify-center gap-0 w-full mb-10">
      {STEPS.map((step, idx) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isLast = idx === STEPS.length - 1;

        return (
          <div key={step.id} className="flex items-start flex-1">
            {/* Step circle + label */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white"
                      : isActive
                        ? "bg-white border-blue-600 text-blue-600"
                        : "bg-white border-gray-300 text-gray-400"
                  }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center leading-tight
                  ${isActive ? "text-blue-600" : isCompleted ? "text-blue-500" : "text-gray-400"}`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line (hidden after last step) */}
            {!isLast && (
              <div className="flex-1 mt-4">
                <div
                  className={`h-0.5 w-full transition-all duration-500
                    ${isCompleted ? "bg-blue-600" : "bg-gray-200"}`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
