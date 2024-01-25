interface Second {
  label: string;
  icon: string;
  link: string;
}

export interface Nav {
  label: string;
  icon: string;
  link: string;
  active: boolean;
  childs?: Second[];
  showMenu?: boolean;
  preIcon?: string;
}
