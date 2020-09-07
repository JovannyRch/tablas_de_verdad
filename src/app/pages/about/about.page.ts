import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private appVersion: AppVersion) { }
  version: string = "";
  isApp: boolean = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));
  ngOnInit() {
    this.appVersion.getVersionNumber().then(
      v => {
        this.version = v;
      }
    ).catch(e => {
      console.log("Ocurrió un error");

    })
  }

}
