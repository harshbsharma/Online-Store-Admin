/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['res.cloudinary.com'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'demo.themesberg.com',
              port: '',
              pathname: '/landwind/images/hero.png',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
                port: '',
                pathname: '/api/portraits/**',
            }
          ],
    }
}

module.exports = nextConfig
