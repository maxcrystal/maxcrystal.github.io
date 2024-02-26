import { defineConfig } from "vitepress";

const currentYear = new Date().getFullYear();
const startYear = currentYear === 2024 ? "" : "2024-";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/favicon.png" }],
         ["meta", { property: 'og:title', content: 'Психолог Ксения Семипядная' }],
         ["meta", { property: 'og:description', content: 'Немедицинский психотерапевт по вопросам детско-родительских, парных, семейных отношений, а также - самоопределения, самореализации, самоидентичности' }],
         ["meta", { property: 'og:image', content: '/ksu.png' }],
         ["meta", { property: 'og:url', content: 'https://semipyadnaya.ru' }],
         ["meta", { property: 'og:type', content: 'website' }],
        ],
  title: "Ксения Семипядная",
  description: "Психолог Ксения Семипядная",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon.png",

    lastUpdated: {
      text: 'Дата',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    nav: [
      { text: "Главная", link: "/" },
      { text: "Обо мне", link: "/about" },
      { text: "Игра", link: "/ksuasks" },
      { text: "Блог", link: "/blog/separation-1" },
    ],

    sidebar: [
      {
        text: 'Статьи',
        items: [
          { text: 'Сепарация. Вопросы к размышлению', link: '/blog/separation-1' },
          { text: 'Сепарация. Разбор', link: '/blog/separation-2' }
        ]
      }
    ],

    socialLinks: [
      { icon: "instagram", link: "https://instagram.com/ksushabernal" },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><path d="M66.964 134.874s-32.08-10.062-51.344-16.002c-17.542-6.693-1.57-14.928 6.015-17.59 7.585-2.66 186.38-71.948 194.94-75.233 8.94-4.147 19.884-.35 14.767 18.656-4.416 20.407-30.166 142.874-33.827 158.812-3.66 15.937-18.447 6.844-18.447 6.844l-83.21-61.442z" fill="none" stroke="#222" stroke-width="10"/><path d="M92.412 201.62s4.295.56 8.83-3.702c4.536-4.26 26.303-25.603 26.303-25.603" fill="none" stroke="#222" stroke-width="10"/><path d="M66.985 134.887l28.922 14.082-3.488 52.65s-4.928.843-6.25-3.613c-1.323-4.455-19.185-63.12-19.185-63.12z" fill-rule="evenodd" stroke="#222" stroke-width="10" stroke-linejoin="bevel"/><path d="M66.985 134.887s127.637-77.45 120.09-71.138c-7.55 6.312-91.168 85.22-91.168 85.22z" fill-rule="evenodd" stroke="#222" stroke-width="9.67" stroke-linejoin="bevel"/></svg>',
        },
        link: "https://ksushabernal.t.me",
      },
    ],

    footer: {
      message:
        "Использование материалов разрешено только со ссылкой на автора и сайт",
      copyright: "© " + startYear + currentYear + " ― Ксения Семипядная",
    },

    docFooter: {
      prev: "Назад",
      next: "Вперед",
    },

    darkModeSwitchLabel: "Тема",
    lightModeSwitchTitle: "Включить светлую тему",
    darkModeSwitchTitle: "Включить темную тему",
    sidebarMenuLabel: "Меню",
    outlineTitle: "Содержание",
    returnToTopLabel: "Наверх",
    externalLinkIcon: true,
  },
});
