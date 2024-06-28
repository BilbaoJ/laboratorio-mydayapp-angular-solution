import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/header/header.component'
import { FooterComponent } from '@shared/footer/footer.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ FooterComponent, HeaderComponent, CommonModule  ],
  templateUrl: './home.component.html',
})
export class HomeComponent{

  constructor() { }

}
