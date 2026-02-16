import os


def print_tree(directory, exclude_items, exclude_subfolders, prefix=""):
    try:
        # دریافت آیتم‌های موجود در دایرکتوری
        items = sorted(os.listdir(directory))
    except PermissionError:
        return

    # جدا کردن فولدرها و فایل‌ها
    folders = [item for item in items if os.path.isdir(
        os.path.join(directory, item))]
    files = [item for item in items if not os.path.isdir(
        os.path.join(directory, item))]

    # ترتیب نمایش: ابتدا فولدرها سپس فایل‌ها
    items = folders + files

    for index, item in enumerate(items):
        path = os.path.join(directory, item)

        # اگر نام فایل یا پوشه در لیست استثناء باشد، از خروجی حذف شود
        if item in exclude_items:
            continue

        is_last = index == len(items) - 1
        connector = "└── " if is_last else "├── "

        # اگر پوشه در لیست exclude_subfolders باشد، فقط نام آن را نمایش دهیم
        if os.path.isdir(path):
            print(f"{prefix}{connector}{item}")
            # بررسی لیست استثناء زیرپوشه‌ها
            if item not in exclude_subfolders:
                new_prefix = f"{prefix}{'    ' if is_last else '│   '}"
                print_tree(path, exclude_items, exclude_subfolders, new_prefix)
        else:
            # نمایش فایل‌ها
            print(f"{prefix}{connector}{item}")


# تنظیم مسیر اصلی و استثناء‌ها
root_directory = os.getcwd()
excluded_items = ["node_modules", "tree.py",
                  "doc",   ".vscode", ".git"]  # استثناء فایل یا پوشه‌ها
# پوشه‌هایی که باید بدون دنباله نمایش داده شوند
exclude_subfolders = [ "logs", "venv", "static", "migrations", "images", "__pycache__", "admin", "media", "assets", "components"]

print_tree(root_directory, excluded_items, exclude_subfolders)
