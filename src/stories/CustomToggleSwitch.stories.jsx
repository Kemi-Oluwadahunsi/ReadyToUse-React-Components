import { useState } from "react";
import { ToggleSwitch } from "../components/CustomToggleSwitch";
import { Sun, Moon, Volume2, VolumeX, Check, X, Wifi, WifiOff, Eye, EyeOff, Bell, BellOff } from "lucide-react";

export default {
  title: "Inputs/ToggleSwitch",
  component: ToggleSwitch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { ToggleSwitch } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    label: { control: "text", description: "Label text" },
    labelPosition: { control: "select", options: ["left", "right"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "ios", "material", "pill", "icon", "labeled", "outline", "slim"] },
    disabled: { control: "boolean" },
    onColor: { control: "text", description: 'Tailwind bg class when on (e.g. "bg-blue-600")' },
    offColor: { control: "text", description: "Tailwind bg class when off" },
    onLabel: { control: "text", description: "Text inside track when on (labeled variant)" },
    offLabel: { control: "text", description: "Text inside track when off (labeled variant)" },
    description: { control: "text", description: "Helper text below the label" },
    onChange: { action: "toggled" },
  },
};

/* ── Default ── */
export const Default = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <ToggleSwitch
        {...args}
        checked={checked}
        onChange={(val) => {
          setChecked(val);
          args.onChange?.(val);
        }}
      />
    );
  },
  args: {
    label: "Enable notifications",
  },
};

/* ── iOS Style ── */
export const IOSStyle = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    const [c, setC] = useState(true);
    return (
      <div className="space-y-4">
        <ToggleSwitch variant="ios" label="Wi-Fi" checked={a} onChange={setA} />
        <ToggleSwitch variant="ios" label="Bluetooth" checked={b} onChange={setB} />
        <ToggleSwitch variant="ios" label="Airplane Mode" checked={c} onChange={setC} onColor="bg-orange-500" />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<ToggleSwitch variant="ios" label="Wi-Fi" checked={on} onChange={setOn} />
<ToggleSwitch variant="ios" label="Airplane Mode" onColor="bg-orange-500" checked={on} onChange={setOn} />`,
      },
    },
  },
};

/* ── Material Design ── */
export const MaterialDesign = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
      <div className="space-y-5">
        <ToggleSwitch variant="material" label="Dark mode" checked={a} onChange={setA} />
        <ToggleSwitch variant="material" label="Sync data" checked={b} onChange={setB} />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<ToggleSwitch variant="material" label="Dark mode" checked={on} onChange={setOn} />`,
      },
    },
  },
};

/* ── Pill ── */
export const Pill = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
      <div className="space-y-4">
        <ToggleSwitch variant="pill" label="Auto-save" checked={a} onChange={setA} />
        <ToggleSwitch variant="pill" label="Compact view" checked={b} onChange={setB} onColor="bg-purple-600" />
      </div>
    );
  },
};

/* ── Icon Toggle ── */
export const IconToggle = {
  render: () => {
    const [theme, setTheme] = useState(false);
    const [sound, setSound] = useState(true);
    const [wifi, setWifi] = useState(true);
    const [vis, setVis] = useState(false);
    return (
      <div className="space-y-4">
        <ToggleSwitch variant="icon" label="Dark mode" checked={theme} onChange={setTheme} onIcon={Sun} offIcon={Moon} onColor="bg-amber-500" />
        <ToggleSwitch variant="icon" label="Sound" checked={sound} onChange={setSound} onIcon={Volume2} offIcon={VolumeX} onColor="bg-green-600" />
        <ToggleSwitch variant="icon" label="Wi-Fi" checked={wifi} onChange={setWifi} onIcon={Wifi} offIcon={WifiOff} />
        <ToggleSwitch variant="icon" label="Visibility" checked={vis} onChange={setVis} onIcon={Eye} offIcon={EyeOff} onColor="bg-teal-600" />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { Sun, Moon, Volume2, VolumeX } from "lucide-react";

<ToggleSwitch variant="icon" label="Dark mode" onIcon={Sun} offIcon={Moon} onColor="bg-amber-500" />
<ToggleSwitch variant="icon" label="Sound" onIcon={Volume2} offIcon={VolumeX} onColor="bg-green-600" />`,
      },
    },
  },
};

/* ── Labeled (ON/OFF in track) ── */
export const Labeled = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    const [c, setC] = useState(true);
    return (
      <div className="space-y-4">
        <ToggleSwitch variant="labeled" label="Status" checked={a} onChange={setA} />
        <ToggleSwitch variant="labeled" label="Active" checked={b} onChange={setB} onLabel="YES" offLabel="NO" onColor="bg-blue-600" offColor="bg-gray-400 dark:bg-zinc-600" />
        <ToggleSwitch variant="labeled" label="Power" checked={c} onChange={setC} onLabel="I" offLabel="O" onColor="bg-emerald-600" offColor="bg-red-500" />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<ToggleSwitch variant="labeled" label="Status" checked={on} onChange={setOn} />
<ToggleSwitch variant="labeled" onLabel="YES" offLabel="NO" onColor="bg-blue-600" />
<ToggleSwitch variant="labeled" onLabel="I" offLabel="O" onColor="bg-emerald-600" offColor="bg-red-500" />`,
      },
    },
  },
};

/* ── Outline ── */
export const Outline = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
      <div className="space-y-4">
        <ToggleSwitch variant="outline" label="Minimal mode" checked={a} onChange={setA} />
        <ToggleSwitch variant="outline" label="Eco mode" checked={b} onChange={setB} />
      </div>
    );
  },
};

/* ── Slim ── */
export const Slim = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
      <div className="space-y-5">
        <ToggleSwitch variant="slim" label="Compact toggle" checked={a} onChange={setA} />
        <ToggleSwitch variant="slim" label="Another option" checked={b} onChange={setB} onColor="bg-teal-500" />
      </div>
    );
  },
};

/* ── All Sizes ── */
export const Sizes = {
  render: () => {
    const [sm, setSm] = useState(true);
    const [md, setMd] = useState(true);
    const [lg, setLg] = useState(true);
    return (
      <div className="space-y-4">
        <ToggleSwitch label="Small" size="sm" checked={sm} onChange={setSm} />
        <ToggleSwitch label="Medium" size="md" checked={md} onChange={setMd} />
        <ToggleSwitch label="Large" size="lg" checked={lg} onChange={setLg} />
      </div>
    );
  },
};

/* ── With Description ── */
export const WithDescription = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
      <div className="space-y-5">
        <ToggleSwitch label="Email notifications" description="Receive email updates about your account activity" checked={a} onChange={setA} />
        <ToggleSwitch variant="ios" label="Marketing emails" description="Get notified about new features and promotions" checked={b} onChange={setB} />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<ToggleSwitch
  label="Email notifications"
  description="Receive email updates about your account activity"
  checked={on}
  onChange={setOn}
/>`,
      },
    },
  },
};

/* ── Custom Colors ── */
export const CustomColors = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    const [c, setC] = useState(true);
    return (
      <div className="space-y-4">
        <ToggleSwitch label="Green toggle" onColor="bg-green-500" checked={a} onChange={setA} />
        <ToggleSwitch label="Pink toggle" onColor="bg-pink-500" checked={b} onChange={setB} />
        <ToggleSwitch variant="ios" label="Orange iOS" onColor="bg-orange-500" checked={c} onChange={setC} />
      </div>
    );
  },
};

/* ── Settings Panel Demo ── */
export const SettingsPanel = {
  render: () => {
    const [notif, setNotif] = useState(true);
    const [sound, setSound] = useState(true);
    const [dark, setDark] = useState(false);
    const [auto, setAuto] = useState(true);
    const [loc, setLoc] = useState(false);
    return (
      <div className="max-w-sm mx-auto bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm divide-y divide-gray-100 dark:divide-zinc-700">
        <div className="px-4 py-3">
          <ToggleSwitch variant="ios" label="Notifications" description="Push & in-app alerts" checked={notif} onChange={setNotif} />
        </div>
        <div className="px-4 py-3">
          <ToggleSwitch variant="icon" label="Sound" onIcon={Volume2} offIcon={VolumeX} onColor="bg-green-600" checked={sound} onChange={setSound} />
        </div>
        <div className="px-4 py-3">
          <ToggleSwitch variant="icon" label="Dark mode" onIcon={Sun} offIcon={Moon} onColor="bg-amber-500" checked={dark} onChange={setDark} />
        </div>
        <div className="px-4 py-3">
          <ToggleSwitch variant="labeled" label="Auto-update" onLabel="ON" offLabel="OFF" checked={auto} onChange={setAuto} />
        </div>
        <div className="px-4 py-3">
          <ToggleSwitch variant="outline" label="Location services" description="Allow apps to access your location" checked={loc} onChange={setLoc} />
        </div>
      </div>
    );
  },
};

/* ── Disabled ── */
export const Disabled = {
  args: {
    label: "Can't touch this",
    checked: true,
    disabled: true,
    labelPosition: "left",
  },
};
