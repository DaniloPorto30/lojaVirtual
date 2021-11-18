import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  btnMobile = document.getElementById("btn-mobile");
  logo: string = "/assets/img/horizontal_on_white_by_logaster.png";
  login: string = "/assets/img/login.png";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  toggleMenu() {
    const nav = document.getElementById('nav');
    nav?.classList.toggle('active');
  }
  fechar(){
    const nav = document.getElementById('nav');
    nav?.classList.toggle('active');
}

logout(): void {
  this.auth.logout();
}
}
