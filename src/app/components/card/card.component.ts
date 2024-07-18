import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title!: string;
  @Input() totalCount!: number;
  @Input() pendingCount!: number;
  @Input() closedCount!: number;
  @Input() iconSvg!: string;
  @Input() cardClass!: string;


  sanitizedIconSvg!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.sanitizedIconSvg = this.sanitizer.bypassSecurityTrustHtml(
      this.iconSvg
    );
  }

 
}
