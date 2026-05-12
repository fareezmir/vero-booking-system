interface StepIndicatorProps {
    currentStep: number;
  }
  
  export default function StepIndicator({ currentStep }: StepIndicatorProps) {
    return (
      <div className="flex items-center gap-3 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${currentStep >= s ? 'bg-navy text-white' : 'bg-sky text-teal'}`}>
              {s}
            </div>
            {s < 3 && <div className={`h-px w-12 ${currentStep > s ? 'bg-navy' : 'bg-sky'}`} />}
          </div>
        ))}
      </div>
    );
  }