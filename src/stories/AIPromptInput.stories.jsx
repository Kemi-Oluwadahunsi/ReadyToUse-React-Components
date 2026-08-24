import { AIPromptInput, ChatMessageBubble } from "../components/AIPromptInput";

export default {
  title: "Inputs & Forms/AIPromptInput",
  component: AIPromptInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '## 📥 Import\n\n```jsx\nimport { AIPromptInput, ChatMessageBubble } from "readyui-react";\n```',
      },
    },
  },
  argTypes: {
    placeholder: { control: "text", description: "Input placeholder text" },
    defaultModel: { control: "text", description: "Default selected AI model" },
    models: { control: "object", description: "Array of available AI model names" },
    onSubmit: { action: "submitted", description: "Called with { prompt, model, files }" },
    className: { control: "text", description: "Additional CSS classes" },
  },
};

export const Default = {
  args: {
    placeholder: "Ask anything or type a prompt...",
    defaultModel: "Claude 3.5 Sonnet",
  },
  render: (args) => (
    <div className="max-w-xl mx-auto p-8">
      <AIPromptInput {...args} />
    </div>
  ),
};

export const CustomModels = {
  args: {
    models: ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3"],
    defaultModel: "GPT-4o",
    placeholder: "What would you like to know?",
  },
  render: (args) => (
    <div className="max-w-xl mx-auto p-8">
      <AIPromptInput {...args} />
    </div>
  ),
};

export const ChatBubbles = {
  render: () => (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <ChatMessageBubble role="user" content="How do I center a div in CSS?" />
      <ChatMessageBubble
        role="assistant"
        content="You can use flexbox: display: flex; align-items: center; justify-content: center; on the parent container."
      />
      <ChatMessageBubble role="user" content="What about grid?" />
      <ChatMessageBubble
        role="assistant"
        content="With CSS Grid: display: grid; place-items: center; — even simpler!"
        isStreaming
      />
    </div>
  ),
};
