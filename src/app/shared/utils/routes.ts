import { Nav } from '../interfaces';

export const RoutesNav: Nav[] = [
  {
    label: 'Inicio',
    link: './home',
    active: false,
    icon: 'fa-solid fa-house',
  },
  {
    label: 'Adopción',
    link: './adoption',
    active: false,
    icon: 'fa-solid fa-heart-circle-check',
  },
  {
    label: 'Ayudanos a Rescatar',
    icon: 'fa-solid fa-users',
    preIcon: 'fa-solid fa-caret-down',
    link: './help-us',
    active: false,
    childs: [
      {
        label: 'Información de Donaciones',
        link: './help-us/donations',
        icon: 'fa-solid fa-circle-dollar-to-slot',
      },
      {
        label: 'Hogar Temporal',
        link: './help-us/temporary-home',
        icon: 'fa-solid fa-house-circle-check',
      },
      {
        label: 'Rescate',
        link: './help-us/rescue',
        icon: 'fa-solid fa-kit-medical',
      },
    ],
    showMenu: false,
  },
  {
    label: 'Programas',
    icon: 'fa-solid fa-clipboard',
    preIcon: 'fa-solid fa-caret-down',
    link: './programs',
    active: false,
    childs: [
      {
        label: 'Apadrinamiento',
        link: './programs/sponsors',
        icon: 'fa-solid fa-hand-holding-medical',
      },
      {
        label: 'Voluntariado',
        link: './programs/volunteering',
        icon: 'fa-solid fa-handshake-angle',
      },
    ],
    showMenu: false,
  },
  {
    label: 'Contáctanos',
    icon: 'fa-solid fa-id-card-clip',
    link: './contact-us',
    active: false,
  },
];
