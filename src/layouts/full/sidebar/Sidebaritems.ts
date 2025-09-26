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
        name: "Home",
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
        name: "Planos",
        icon: "solar:book-bold-duotone",
        id: uniqueId(),
        url: "/study-plans",
        isPro: false,
      },
      {
        name: "Disciplinas",
        icon: "solar:book-bold-duotone",
        id: uniqueId(),
        url: "/subjects",
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
        name: "Cronograma",
        icon: "solar:calendar-bold-duotone",
        id: uniqueId(),
        url: "/cronograma",
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
        name: "Simulados",
        icon: "solar:test-tube-bold-duotone",
        id: uniqueId(),
        url: "/simulations",
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
];

export default SidebarContent;
