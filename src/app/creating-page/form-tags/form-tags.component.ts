import {Component} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {DataSender} from '../dataSender.servise';
import {Store} from '@ngrx/store';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-form-tags',
  templateUrl: './form-tags.component.html',
  styleUrls: ['./form-tags.component.scss']
})

export class FormTagsComponent {
  constructor(public sendData: DataSender) {
    this.sendData.defaultTags$.subscribe((tags) => this.tags = tags)
  }

  baseOfTags2 = ['Angular', 'SAP ABAP', 'Java', 'Design', 'Frontend', 'Programmer', 'Python', 'DevOps', 'UX/UI Design', 'Product Development', 'Web Disign', 'SAP TM Consultant'];
  selectable = true;
  removable = true;
  addOnBlur = true;
  tags!: string[];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value)
    }
    this.sendData.transferDefaultTag(this.tags);
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  collectTag(tag: string) {
    if (this.tags.indexOf(tag) !== -1) {
      this.tags.splice(this.tags.indexOf(tag), 1);

    } else {
      this.tags.push(tag)
    }
    this.sendData.transferDefaultTag(this.tags)
  }

}
