import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  showAulasSubMenu = false;

  toggleAulasSubMenu() {
    this.showAulasSubMenu = !this.showAulasSubMenu;
  }

}
