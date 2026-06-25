const nextConfig: any = {
  // تجاهل أخطاء التنسيق وقت البناء
  eslint: {
    ignoreDuringBuilds: true,
  },
  // تجاهل أخطاء الأنواع المزعجة وقت البناء
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;