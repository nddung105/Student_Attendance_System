import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Bảng điều khiển',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  {
    name: 'Cấu hình camera',
    url: '/camera',
    icon: 'icon-drop'
  },
  // {
  //   name: 'Nhận diện biển số xe từ ảnh',
  //   url: '/plate-detection/pd-by-picture',
  //   icon: 'icon-pencil'
  // },
  {
    name: 'Nhận diện từ Stream Camera',
    url: '/stream-recognition',
    icon: 'icon-puzzle',
  },
//   {
//     name: 'Cập nhật kết quả Realtime',
//     url: '/realtime',
//     icon: 'icon-cursor'
//   },
  {
    name: 'Cài đặt hệ thống',
    url: '/config',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Kiểm tra cập nhật',
    url: '/update',
    icon: 'icon-star'
  },
  // {
  //   name: 'Disabled',
  //   url: '/dashboard',
  //   icon: 'icon-ban',
  //   badge: {
  //     variant: 'secondary',
  //     text: 'NEW'
  //   },
  //   attributes: { disabled: true },
  // },
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // }
];
