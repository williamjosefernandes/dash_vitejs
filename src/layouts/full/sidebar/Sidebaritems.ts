export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  isPro?: boolean
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
  isPro?: boolean
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "HOME",
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/",
        isPro: false,
      },
    ],
  },
  {
    heading: "GABARITTE",
    children: [
      {
        name: "Disciplinas",
        icon: "solar:book-bold-duotone",
        id: uniqueId(),
        url: "/subjects",
        isPro: false,
      },
      {
        name: "Planejamento",
        icon: "solar:calendar-bold-duotone",
        id: uniqueId(),
        url: "/planning/agile",
        isPro: false,
      },
      {
        name: "Revisões",
        icon: "solar:refresh-bold-duotone",
        id: uniqueId(),
        url: "/reviews",
        isPro: false,
      },
      {
        name: "Trilhas",
        icon: "solar:map-bold-duotone",
        id: uniqueId(),
        url: "/trails",
        isPro: false,
      },
      {
        name: "Conteúdo",
        icon: "solar:library-bold-duotone",
        id: uniqueId(),
        url: "/content",
        isPro: false,
      },
      {
        name: "Resumos",
        icon: "solar:document-text-bold-duotone",
        id: uniqueId(),
        url: "/summaries",
        isPro: false,
      },
      {
        name: "Simulados",
        icon: "solar:test-tube-bold-duotone",
        id: uniqueId(),
        url: "/simulations",
        isPro: false,
      },
      {
        name: "Insights",
        icon: "solar:chart-bold-duotone",
        id: uniqueId(),
        url: "/insights",
        isPro: false,
      },
      {
        name: "Histórico",
        icon: "solar:history-bold-duotone",
        id: uniqueId(),
        url: "/history",
        isPro: false,
      },
      {
        name: "Estatísticas",
        icon: "solar:graph-bold-duotone",
        id: uniqueId(),
        url: "/statistics",
        isPro: false,
      },
      {
        name: "Configurações",
        icon: "solar:settings-bold-duotone",
        id: uniqueId(),
        url: "/settings",
        isPro: false,
      },
    ],
  },
  {
    heading: "UI COMPONENTS",
    children: [
      {
        name: "Typography",
        icon: "solar:text-bold-duotone",
        id: uniqueId(),
        url: "/ui/typography",
        isPro: false,
      },
      {
        name: "Table",
        icon: "solar:table-bold-duotone",
        id: uniqueId(),
        url: "/ui/table",
        isPro: false,
      },
      {
        name: "Form",
        icon: "solar:form-bold-duotone",
        id: uniqueId(),
        url: "/ui/form",
        isPro: false,
      },
      {
        name: "Alert",
        icon: "solar:bell-bold-duotone",
        id: uniqueId(),
        url: "/ui/alert",
        isPro: false,
      },
      {
        name: "Shadow",
        icon: "solar:layers-bold-duotone",
        id: uniqueId(),
        url: "/ui/shadow",
        isPro: false,
      },
    ],
  },
  {
    heading: "ICONS",
    children: [
      {
        name: "Solar Icons",
        icon: "solar:star-bold-duotone",
        id: uniqueId(),
        url: "/icons/solar",
        isPro: false,
      },
    ],
  },
  {
    heading: "EXTRAS",
    children: [
      {
        name: "Sample Page",
        icon: "solar:page-bold-duotone",
        id: uniqueId(),
        url: "/sample-page",
        isPro: false,
      },
    ],
  },
];

export default SidebarContent;
