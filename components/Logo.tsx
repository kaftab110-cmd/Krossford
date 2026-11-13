export default function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/images/logo.png"
      alt="Krossford"
      width={80}
      height={80}
      className={`object-contain rounded-md ${className}`}
    />
  );
}