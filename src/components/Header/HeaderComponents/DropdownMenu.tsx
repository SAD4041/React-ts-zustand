import { useState, useRef, useEffect } from 'react';
import type { DropdownItem, DropdownMenuProps } from '@/types/headerTypes';
import Icon from './nextIcon';
import { useNavigate } from 'react-router-dom';


const DropdownMenu = ({ item }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<DropdownItem | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        menuRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleNavigate = (categorySlug?: string, brandSlug?: string) => {
    if (!categorySlug && !brandSlug) return;
    const params = new URLSearchParams();
    if (categorySlug) params.set('category', categorySlug);
    if (brandSlug) params.set('brand', brandSlug);
    navigate(`/product-list?${params.toString()}`);
    setIsOpen(false);
  };

  const items = item.category.itemsList;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span
        ref={triggerRef}
        className="text-foreground font-medium whitespace-nowrap px-2 py-1 cursor-default relative
          transform
          hover:border-b-2 hover:border-muted hover:text-muted-foreground
          transition-transform duration-200
          hover:-translate-y-5"
      >
        {item.title}
      </span>

      {isOpen && (
        <>
          <div
            className="absolute top-full left-0 right-0 h-4"
            onMouseEnter={() => setIsOpen(true)}
          />
          <div
            ref={menuRef}
            className="
                absolute z-50 mt-2
                min-w-xl max-w-3xl
                bg-background shadow-xl rounded-xl p-6 border border-border right-0
                transform translate-x-16
              "
          >
            <button
              className="text-lg font-semibold text-foreground hover:text-primary
                flex items-center space-x-1 space-x-reverse justify-end w-full mb-4"
            >
              <Icon />
              <span>{item.category.categoryName}</span>
            </button>

            <div className="flex gap-8">
              <div className="w-60 h-full shrink-0 rounded-xl overflow-hidden shadow-md relative">
                {hoveredItem?.image ? (
                  <img
                    src={hoveredItem.image}
                    alt={hoveredItem.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="w-px bg-border"></div>
              <div className="flex-1 min-w-0 mt-2">
                <div className="space-y-2">
                  {items.map((cat, idx) => (
                    <button
                      key={`single-${idx}`}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        handleNavigate(cat.categorySlug, cat.brandSlug);
                      }}
                      onMouseEnter={() => setHoveredItem(cat)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`block w-full text-right px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.name
                        ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                        : 'text-foreground hover:bg-muted hover:border hover:border-border'
                        }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;
