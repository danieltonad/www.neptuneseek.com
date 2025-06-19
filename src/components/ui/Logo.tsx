import "./ui.scss";

interface LogoProps {
  size?: "small" | "large";
}

export default function Logo({ size = "large" }: LogoProps) {
  return (
    <div className={`logo logo-${size}`}>
      <img src="neptune.png" alt="Logo" />
    </div>
  );
}
