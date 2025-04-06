import { Component, input } from '@angular/core';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-members-card',
  imports: [],
  templateUrl: './members-card.component.html',
  styleUrl: './members-card.component.css'
})
export class MembersCardComponent {
  member = input.required<Member>();
}
