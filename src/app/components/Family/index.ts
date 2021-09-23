import { Component, Input } from '@angular/core';
import { FamilyModel } from 'src/app/data';

@Component({
  selector: 'ngx-family',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
})
export class FamilyComponent {
  @Input()
  public family?: FamilyModel;
  public _isExpanded = false;
}
