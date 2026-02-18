import { useState } from "react";
import { Stepper } from "../components/InteractiveStepper";
import { User, CreditCard, Settings, CheckCircle2 } from "lucide-react";

export default {
  title: "Navigation/InteractiveStepper",
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    currentStep: { control: { type: "number", min: 0 } },
    allowClickNavigation: { control: "boolean" },
    showNavButtons: { control: "boolean" },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};

const defaultSteps = [
  { id: 1, title: "Account Info", description: "Enter your email & password" },
  { id: 2, title: "Personal Details", description: "Name, address, phone" },
  { id: 3, title: "Payment", description: "Add payment method" },
  { id: 4, title: "Confirmation", description: "Review and submit" },
];

const iconSteps = [
  { id: 1, title: "Account", description: "Create your account", icon: User },
  { id: 2, title: "Payment", description: "Add billing details", icon: CreditCard },
  { id: 3, title: "Preferences", description: "Configure settings", icon: Settings },
  { id: 4, title: "Complete", description: "All done!", icon: CheckCircle2 },
];

export const Default = {
  args: {
    steps: defaultSteps,
    currentStep: 0,
    allowClickNavigation: true,
    showNavButtons: true,
    orientation: "horizontal",
  },
  render: (args) => {
    const [step, setStep] = useState(args.currentStep);
    return <Stepper {...args} currentStep={step} onStepChange={setStep} />;
  },
  parameters: {
    docs: {
      source: {
        code: `const [step, setStep] = useState(0);

<Stepper
  steps={[
    { id: 1, title: "Account Info", description: "Enter your email & password" },
    { id: 2, title: "Personal Details", description: "Name, address, phone" },
    { id: 3, title: "Payment", description: "Add payment method" },
    { id: 4, title: "Confirmation", description: "Review and submit" },
  ]}
  currentStep={step}
  onStepChange={setStep}
  allowClickNavigation
  showNavButtons
/>`,
      },
    },
  },
};

export const WithIcons = {
  args: {
    steps: iconSteps,
    currentStep: 1,
    allowClickNavigation: true,
    showNavButtons: true,
    orientation: "horizontal",
  },
  render: (args) => {
    const [step, setStep] = useState(args.currentStep);
    return <Stepper {...args} currentStep={step} onStepChange={setStep} />;
  },
  parameters: {
    docs: {
      source: {
        code: `import { User, CreditCard, Settings, CheckCircle2 } from "lucide-react";

<Stepper
  steps={[
    { id: 1, title: "Account", description: "Create your account", icon: User },
    { id: 2, title: "Payment", description: "Add billing details", icon: CreditCard },
    { id: 3, title: "Preferences", description: "Configure settings", icon: Settings },
    { id: 4, title: "Complete", description: "All done!", icon: CheckCircle2 },
  ]}
  currentStep={step}
  onStepChange={setStep}
/>`,
      },
    },
  },
};

export const Vertical = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    orientation: "vertical",
    allowClickNavigation: true,
    showNavButtons: true,
  },
  render: (args) => {
    const [step, setStep] = useState(args.currentStep);
    return <Stepper {...args} currentStep={step} onStepChange={setStep} />;
  },
  parameters: {
    docs: {
      source: {
        code: `<Stepper
  steps={steps}
  currentStep={step}
  onStepChange={setStep}
  orientation="vertical"
/>`,
      },
    },
  },
};

export const WithStepContent = {
  args: {
    steps: defaultSteps,
    currentStep: 0,
    allowClickNavigation: true,
    showNavButtons: true,
    orientation: "horizontal",
    renderStepContent: (step, index) => (
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Step {index + 1}: {step.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
        <div className="mt-4 p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your form content for &ldquo;{step.title}&rdquo; goes here.
          </p>
        </div>
      </div>
    ),
  },
  render: (args) => {
    const [step, setStep] = useState(args.currentStep);
    return <Stepper {...args} currentStep={step} onStepChange={setStep} />;
  },
  parameters: {
    docs: {
      source: {
        code: `<Stepper
  steps={steps}
  currentStep={step}
  onStepChange={setStep}
  renderStepContent={(step, index) => (
    <div>
      <h3>Step {index + 1}: {step.title}</h3>
      <p>{step.description}</p>
    </div>
  )}
/>`,
      },
    },
  },
};
