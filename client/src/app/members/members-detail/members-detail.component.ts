import { ActivatedRoute } from '@angular/router';
import { MembersService } from './../../_services/members.service';
import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-members-detail',
  imports: [TabsModule, GalleryModule],
  templateUrl: './members-detail.component.html',
  styleUrl: './members-detail.component.css'
})
export class MembersDetailComponent implements OnInit{
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Member;
  images: GalleryItem[] = [];

ngOnInit(): void {
  this.loadMember();
}

loadMember(){
  const username = this.route.snapshot.paramMap.get('username');

  if(!username) return;
  this.memberService.getMember(username).subscribe({
  next: member => {this.member = member;
    member.photos.map(p => {
      this.images?.push(new ImageItem({src: p.url, thumb: p.url}))
    })
  }
  })
}




}
