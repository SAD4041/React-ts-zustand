
export function IconFromImageComponent({
  src,
  className = "w-8 h-8 sm:w-10 sm:h-10",
  alt = "",
}: {
  src:string;
  className?: string;
  alt?: string;
}) {
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />;
}