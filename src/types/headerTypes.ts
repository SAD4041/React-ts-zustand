export interface DropdownMenuProps {
  item: MenuItem;
}

export type DropdownItem = {
  name: string;
  image?: string;
  categorySlug?: string;
  brandSlug?: string;
};

export type CategoryData = {
  categoryName: string;
  itemsList: DropdownItem[];
};

export type MenuItem = {
  title: string;
  image?: string;
  category: CategoryData;
};
