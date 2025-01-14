import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Đảm bảo Vite có thể lắng nghe từ bên ngoài container
    port: 3000,  // Cổng mặc định cho Vite
    watch: {
      usePolling: true, // Quan trọng trên Docker để phát hiện thay đổi
    },
    proxy: {
      '/api': {
        target: 'http://backend:5000',  // Địa chỉ backend nếu bạn có một API backend
        changeOrigin: true,  // Thay đổi header của origin, cần thiết để proxy thành công
        rewrite: (path) => path.replace(/^\/api/, ''),  // Đảm bảo đường dẫn đúng
      },
    },
  },
})
