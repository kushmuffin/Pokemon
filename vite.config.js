import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite環境下 推上github page需要這行 本地端開發須備註
  // base: "/Pokemon/",
})
