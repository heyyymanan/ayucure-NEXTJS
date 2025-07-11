/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bynatablet.in',
  generateRobotsTxt: true,
  exclude: [
    '/cart',
    '/thank-you',
    '/payment-failed',
    '/payment-pending',
    '/order-success'
  ],
}
