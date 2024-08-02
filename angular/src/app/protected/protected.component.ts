import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-protected',
    standalone: true,
    templateUrl: './protected.component.html',
    styleUrls: ['./protected.component.scss'],
    imports: [
        IonicModule,
        RouterLink
    ]
})
export class ProtectedComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}

export default ProtectedComponent;
