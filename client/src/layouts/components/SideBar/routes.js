export const roleEnum = {
  Customer: 0,
  Staff: 1,  // Đổi giá trị của Staff từ 2 thành 1
  Admin: 2   // Đổi giá trị của Admin từ 3 thành 2
}

export const routes = [
  {
    title: 'Tổng quan',
    path: '/admin',
    exactly: true,
    permissions: [roleEnum.Staff, roleEnum.Admin]

  },
  {
    title: 'Quản lý sách',
    path: '/admin/book',
    subMenu: [
       {
        title: 'Thêm sách mới',
        path: '/admin/book/add',
       },
       {
        title: 'Quản lý tác giả',
        path: '/admin/author',
      },
    ],
    permissions: [roleEnum.Staff, roleEnum.Admin]
  },
  {
    title: 'Quản lý đơn hàng',
    path: '/admin/order',
    permissions: [roleEnum.Staff, roleEnum.Admin]
  },
  {
    title: 'Quản lý thể loại',
    path: '/admin/genre',
    permissions: [roleEnum.Staff, roleEnum.Admin]
  },
  {
    title: 'Quản lý nhà xuất bản',
    path: '/admin/publisher',
    permissions: [roleEnum.Staff, roleEnum.Admin]
  },
  {
    title: 'Mã giảm giá',
    path: '/admin/voucher',
    permissions: [roleEnum.Staff, roleEnum.Admin]
  },
  {
    title: 'Khách hàng',
    path: '/admin/customer',
    permissions: [roleEnum.Staff, roleEnum.Admin]
  },
  {
    title: 'Nhân viên',
    path: '/admin/staff',
    permissions: [roleEnum.Admin]
  },
];