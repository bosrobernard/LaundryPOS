import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | undefined): string {
    if (!value) return 'Never logged in';
    
    const now = new Date().getTime();
    const timeStamp = new Date(value).getTime();
    const difference = now - timeStamp;
    const seconds = Math.floor(difference / 1000);

    if (seconds < 60) {
      return 'Just now';
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days}d ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months}mo ago`;
    }

    return `${Math.floor(months / 12)}y ago`;
  }
}