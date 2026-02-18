import { useState } from "react";
import { ProgressBarSteps } from "../components/ProgressBarSteps";

export default {
  title: "Navigation/ProgressBarSteps",
  component: ProgressBarSteps,
  tags: ["autodocs"],
  argTypes: {
    currentStep: { control: { type: "number", min: 1 } },
    clickable: { control: "boolean" },
    showProgress: { control: "boolean" },
    showNavButtons: { control: "boolean" },
    activeColor: { control: "text" },
  },
};

const defaultSteps = [
  { id: 1, label: "Account", description: "Create your account" },
  { id: 2, label: "Profile", description: "Set up your profile" },
  { id: 3, label: "Settings", description: "Configure preferences" },
  { id: 4, label: "Complete", description: "Review & finish" },
];

export const Default = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    clickable: true,
    showProgress: true,
    showNavButtons: true,
  },
  render: (args) => {
    const [step, setStep] = useState(args.currentStep);
    return <ProgressBarSteps {...args} currentStep={step} onStepChange={setStep} />;
  },
  parameters: {
    docs: {
      source: {
        code: `const [step, setStep] = useState(1);

<ProgressBarSteps
  steps={[
    { id: 1, label: "Account", description: "Create your account" },
    { id: 2, label: "Profile", description: "Set up your profile" },
    { id: 3, label: "Settings", description: "Configure preferences" },
    { id: 4, label: "Complete", description: "Review & finish" },
  ]}
  currentStep={step}
  onStepChange={setStep}
  clickable
  showProgress
  showNavButtons
/>`,
      },
    },
  },
};

export const MidProgress = {
  args: {
    steps: defaultSteps,
    currentStep: 3,
    clickable: true,
    showProgress: true,
    showNavButtons: true,
  },
  render: (args) => {
    const [step, setStep] = useState(args.currentStep);
    return <ProgressBarSteps {...args} currentStep={step} onStepChange={setStep} />;
  },
  parameters: {
    docs: {
      source: {
        code: `<ProgressBarSteps
  steps={steps}
  currentStep={3}
  onStepChange={setStep}
/>`,
      },
    },
  },
};

export const NoNavButtons = {
  args: {
    steps: [
      { id: 1, label: "Upload" },
      { id: 2, label: "Process" },
      { id: 3, label: "Done" },
    ],
    currentStep: 2,
    clickable: true,
    showProgress: true,
    showNavButtons: false,
  },
  render: (args) => {
    const [step, setStep] = useState(args.currentStep);
    return <ProgressBarSteps {...args} currentStep={step} onStepChange={setStep} />;
  },
  parameters: {
    docs: {
      source: {
        code: `<ProgressBarSteps
  steps={[
    { id: 1, label: "Upload" },
    { id: 2, label: "Process" },
    { id: 3, label: "Done" },
  ]}
  currentStep={2}
  onStepChange={setStep}
  showNavButtons={false}
/>`,
      },
    },
  },
};

export const CustomColor = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    clickable: true,
    showProgress: true,
    showNavButtons: true,
    activeColor: "bg-purple-600 border-purple-600",
  },
  render: (args) => {
    const [step, setStep] = useState(args.currentStep);
    return <ProgressBarSteps {...args} currentStep={step} onStepChange={setStep} />;
  },
  parameters: {
    docs: {
      source: {
        code: `<ProgressBarSteps
  steps={steps}
  currentStep={2}
  onStepChange={setStep}
  activeColor="bg-purple-600 border-purple-600"
/>`,
      },
    },
  },
};
