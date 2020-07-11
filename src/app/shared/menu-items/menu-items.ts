import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS: Menu[] = [];

@Injectable()
export class MenuItems {
  menu: Menu;
  usersJson: Menu[];
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }

  open() {
    const stringToSplit = JSON.parse(localStorage.getItem('menuRecursos'));
    if ( stringToSplit != null) {
      const x = stringToSplit.split('||');
      for ( let i = 0; i < x.length; i++) {
        if ( x[i].length > 0) {
          const y = <Menu>JSON.parse(x[i]);
          MENUITEMS.push(y);
        }
      }
    }
  }
  
  clear() {
    MENUITEMS.length = 0;
  }
}
