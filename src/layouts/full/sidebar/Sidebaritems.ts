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
    children: [
      {
        id: uniqueId(),
        name: "Dashboard",
        icon: "solar:home-2-bold-duotone",
        url: "/gabaritte/home",
        color: "text-blue-600"
      },
      {
        id: uniqueId(),
        name: "Planos de Estudo",
        icon: "solar:book-bookmark-bold-duotone",
        url: "/gabaritte/planos-estudo",
        color: "text-green-600"
      },
      {
        id: uniqueId(),
        name: "Disciplinas",
        icon: "solar:book-2-bold-duotone",
        url: "/gabaritte/disciplinas",
        color: "text-purple-600"
      },
      {
        id: uniqueId(),
        name: "Planejamento",
        icon: "solar:calendar-bold-duotone",
        url: "/gabaritte/planejamento",
        color: "text-orange-600"
      },
      {
        id: uniqueId(),
        name: "Revisões",
        icon: "solar:refresh-bold-duotone",
        url: "/gabaritte/revisoes",
        color: "text-cyan-600"
      },
      {
        id: uniqueId(),
        name: "Trilhas",
        icon: "solar:map-point-bold-duotone",
        url: "/gabaritte/trilhas",
        color: "text-indigo-600"
      },
      {
        id: uniqueId(),
        name: "Conteúdo",
        icon: "solar:document-text-bold-duotone",
        url: "/gabaritte/conteudo",
        color: "text-pink-600"
      },
      {
        id: uniqueId(),
        name: "Resumos",
        icon: "solar:notes-bold-duotone",
        url: "/gabaritte/resumos",
        color: "text-yellow-600"
      },
      {
        id: uniqueId(),
        name: "Simulados",
        icon: "solar:clipboard-check-bold-duotone",
        url: "/gabaritte/simulados",
        color: "text-red-600"
      },
      {
        id: uniqueId(),
        name: "Insights",
        icon: "solar:chart-bold-duotone",
        url: "/gabaritte/insights",
        color: "text-emerald-600"
      },
      {
        id: uniqueId(),
        name: "Histórico",
        icon: "solar:history-bold-duotone",
        url: "/gabaritte/historico",
        color: "text-gray-600"
      },
      {
        id: uniqueId(),
        name: "Estatísticas",
        icon: "solar:graph-bold-duotone",
        url: "/gabaritte/estatisticas",
        color: "text-blue-600"
      },
      {
        id: uniqueId(),
        name: "Configurações",
        icon: "solar:settings-bold-duotone",
        url: "/gabaritte/configuracoes",
        color: "text-slate-600"
      }
    ]
  },
  {
    heading: "UI Components",
    children: [
      {
        id: uniqueId(),
        name: "Typography",
        icon: "solar:text-bold-duotone",
        url: "/ui/typography",
        color: "text-gray-600"
      },
      {
        id: uniqueId(),
        name: "Table",
        icon: "solar:table-bold-duotone",
        url: "/ui/table",
        color: "text-gray-600"
      },
      {
        id: uniqueId(),
        name: "Form",
        icon: "solar:document-add-bold-duotone",
        url: "/ui/form",
        color: "text-gray-600"
      },
      {
        id: uniqueId(),
        name: "Alert",
        icon: "solar:bell-bing-bold-duotone",
        url: "/ui/alert",
        color: "text-gray-600"
      },
      {
        id: uniqueId(),
        name: "Shadow",
        icon: "solar:square-bold-duotone",
        url: "/ui/shadow",
        color: "text-gray-600"
      }
    ]
  },
  {
    heading: "Icons",
    children: [
      {
        id: uniqueId(),
        name: "Solar Icons",
        icon: "solar:star-bold-duotone",
        url: "/icons/solar",
        color: "text-yellow-600"
      }
    ]
  },
  {
    heading: "Sample",
    children: [
      {
        id: uniqueId(),
        name: "Sample Page",
        icon: "solar:file-bold-duotone",
        url: "/sample-page",
        color: "text-gray-600"
      }
    ]
  }
];

export default SidebarContent;
