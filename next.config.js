/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'https://cards.scryfall.io'
        ],
        loader: 'default',
    }
}

module.exports = nextConfig
