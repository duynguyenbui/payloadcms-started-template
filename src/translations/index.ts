import { AcceptedLanguages } from '@payloadcms/translations'

export const translations: Partial<Record<AcceptedLanguages, any>> = {
  vi: {
    general: {
      collections: 'Danh sách',
      save: 'Lưu thay đổi',
      globals: 'Liên kết',
    },
    'plugin-ecommerce': {
      // Global
      header: 'Liên kết trên cùng',
      footer: 'Liên kết dưới cùng',
      navItems: 'Menu điều hướng',
      navItemName: 'Tên mục',
      navItemPath: 'Đường dẫn',
      navItemOpenInNewTab: 'Mở trong tab mới',

      // Media
      media: 'Hình ảnh & tệp tin',
      mediaAlt: 'Mô tả hình ảnh (alt)',

      // Users
      user: 'Người dùng',
      users: 'Người dùng',

      // Ecommerce
      categories: 'Danh mục sản phẩm',
      category: 'Danh mục sản phẩm',
      categoryTitle: 'Tên danh mục sản phẩm',
      categoryParent: 'Danh mục cha',

      products: 'Sản phẩm',
      product: 'Sản phẩm',
      productTitle: 'Tên sản phẩm',
      productDescription: 'Mô tả sản phẩm',
      enableVariants: 'Bật các biến thể sản phẩm',
      inventory: 'Tồn kho (số lượng)',

      productGallery: 'Thư viện',
      productImage: 'Ảnh sản phẩm',

      variants: 'Biến thể sản phẩm',
      variant: 'Biến thể sản phẩm',
      variantTitle: 'Tên biến thể',

      variantOptions: 'Tùy chọn biến thể',
      variantOption: 'Tùy chọn biến thể',
      variantOptionLabel: 'Tên tùy chọn',
      variantOptionValue: 'Giá trị tùy chọn',

      variantType: 'Thuộc tính sản phẩm',
      variantTypes: 'Thuộc tính sản phẩm',
      variantTypeValue: 'Giá trị thuộc tính',
      variantTypeLabel: 'Nhãn thuộc tính',

      relatedProducts: 'Sản phẩm liên quan / gợi ý',

      amount: 'Số tiền',

      currency: 'Đơn vị tiền tệ',
      currencyNotSet: 'Chưa thiết lập đơn vị tiền tệ',

      priceIn: 'Giá bằng {{currency}}',
      enablePriceIn: 'Bật giá bằng {{currency}}',
      priceNotSet: 'Chưa thiết lập giá',
      priceSetInVariants: 'Giá được thiết lập trong từng biến thể sản phẩm',

      orders: 'Đơn hàng',
      order: 'Đơn hàng',
      orderDetails: 'Chi tiết đơn hàng',
      orderItems: 'Sản phẩm trong đơn hàng',
      orderQuantity: 'Số lượng',

      customer: 'Khách hàng',
      customerName: 'Tên',
      customerPhone: 'Số điện thoại',
      customerEmail: 'Email',

      shipping: 'Vận chuyển',
      addressDetail: 'Địa chỉ chi tiết',
      addressWard: 'Phường / xã',
      addressDistrict: 'Quận / huyện',
      addressCity: 'Thành phố / tỉnh',

      payment: 'Thanh toán',
      paymentMethod: 'Phương thức thanh toán',
      paymentMethodCashOnDelivery: 'Thanh toán khi nhận hàng',
      paymentMethodBankTransfer: 'Chuyển khoản ngân hàng',
      paymentStatus: 'Trạng thái thanh toán',
      paymentStatusPending: 'Chờ thanh toán',
      paymentStatusPaid: 'Đã thanh toán',
      paymentStatusFailed: 'Thất bại',
      paymentStatusPartial: 'Đã thanh toán một phần',
      deposit: 'Tiền đặt cọc',
      deliveryFee: 'Phí vận chuyển',
      paidAmount: 'Tiền đã thanh toán',

      orderStatus: 'Trạng thái đơn hàng',
      orderStatusProcessing: 'Đang xử lý',
      orderStatusCompleted: 'Đã hoàn thành',
      orderStatusCancelled: 'Đã hủy',
      orderStatusRefunded: 'Đã hoàn trả',
    },
  },

  en: {
    general: {
      collections: 'Lists',
      save: 'Save changes',
      globals: 'Links',
    },
    'plugin-ecommerce': {
      // Global
      header: 'Header',
      footer: 'Footer',
      navItems: 'Navigation items',
      navItemName: 'Item name',
      navItemPath: 'Item path',
      navItemOpenInNewTab: 'Open in new tab',

      // Media
      media: 'Images & files',
      mediaAlt: 'Image alt text',

      // Users
      user: 'User',
      users: 'Users',

      // Ecommerce
      categories: 'Product categories',
      category: 'Product category',
      categoryTitle: 'Category name',
      categoryParent: 'Parent category',

      products: 'Products',
      product: 'Product',
      productTitle: 'Product name',
      productDescription: 'Product description',
      enableVariants: 'Enable product variants',
      inventory: 'Stock quantity',

      productGallery: 'Product gallery',
      productImage: 'Product image',

      variants: 'Product variants',
      variant: 'Product variant',
      variantTitle: 'Variant name',

      variantOptions: 'Variant options',
      variantOption: 'Variant option',
      variantOptionLabel: 'Option label',
      variantOptionValue: 'Option value',

      variantType: 'Product attribute',
      variantTypes: 'Product attributes',
      variantTypeValue: 'Attribute value',
      variantTypeLabel: 'Attribute label',

      relatedProducts: 'Related / suggested products',

      amount: 'Sale price',

      currency: 'Currency',
      currencyNotSet: 'Currency not set',

      priceIn: 'Price in {{currency}}',
      enablePriceIn: 'Enable price in {{currency}}',
      priceNotSet: 'Price not set',
      priceSetInVariants: 'Price is set in product variants',

      orders: 'Orders',
      order: 'Order',
      orderDetails: 'Order details',
      orderItems: 'Items',
      orderQuantity: 'Quantity',

      customer: 'Customer',
      customerName: 'Name',
      customerPhone: 'Phone',
      customerEmail: 'Email',

      shipping: 'Shipping',
      addressDetail: 'Address detail',
      addressWard: 'Ward / commune',
      addressDistrict: 'District / county',
      addressCity: 'City / province',

      payment: 'Payment',
      paymentMethod: 'Payment method',
      paymentMethodCashOnDelivery: 'Cash on delivery',
      paymentMethodBankTransfer: 'Bank transfer',
      paymentStatus: 'Payment status',
      paymentStatusPending: 'Pending',
      paymentStatusPaid: 'Paid',
      paymentStatusFailed: 'Failed',
      paymentStatusPartial: 'Partial',
      deposit: 'Deposit',
      deliveryFee: 'Delivery fee',
      paidAmount: 'Paid amount',

      orderStatus: 'Order status',
      orderStatusProcessing: 'Processing',
      orderStatusCompleted: 'Completed',
      orderStatusCancelled: 'Cancelled',
      orderStatusRefunded: 'Refunded',
    },
  },
}
