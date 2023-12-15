import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  showAulasSubMenu = false;
  showArchivosSubMenu = false;

  toggleAulasSubMenu() {
    this.showAulasSubMenu = !this.showAulasSubMenu;
  }

  toggleArchivosSubMenu() {
    this.showArchivosSubMenu = !this.showArchivosSubMenu;
  }
}
