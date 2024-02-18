import { defineConfig } from 'vitepress'

const currentYear = new Date().getFullYear()
const startYear = currentYear === 2024 ? '' : '2024-'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ксения Семипядная",
  description: "Just testing...",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.png',

    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Статьи', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Статьи',
        items: [
          { text: 'Статья 1', link: '/markdown-examples' },
          { text: 'Статья 2', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'instagram', link: 'https://instagram.com/ksushabernal' }
    ],

    footer: {
      message: 'Использование материалов разрешено только со ссылкой на автора и сайт',
      copyright: '© ' + startYear + currentYear + ' ― Ксения Семипядная'
    },

    docFooter: {
      prev: 'Назад',
      next: 'Вперед',
    },

    darkModeSwitchLabel: 'Тема',
    lightModeSwitchTitle: 'Включить светлую тему',
    darkModeSwitchTitle: 'Включить темную тему',
    sidebarMenuLabel: 'Меню',
    outlineTitle: 'Содержание',
    returnToTopLabel: 'Наверх',
    externalLinkIcon: true,
  }
})
