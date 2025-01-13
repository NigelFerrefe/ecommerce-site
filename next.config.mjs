import { type } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // eslint: {
    //     ignoreDuringBuilds: true, // Disable ESLint during builds to speed up compilation, but still check it in development
    // },
    // typescript: { ignoreBuildErrors: true, } // Disable TypeScript type checking to speed up compilation, but still check it in development
};

//What we did here is to disable ESLint and TypeScript type checking during the build process, but still check them in development. This will speed up the compilation process, but still provide you with the necessary feedback during development.
//It is better because it will speed up the compilation process, but still provide you with the necessary feedback during development.
//You can do this when you are sure that your code is correct and you don't want to wait for ESLint and TypeScript to finish checking your code during the build process.

export default nextConfig;
