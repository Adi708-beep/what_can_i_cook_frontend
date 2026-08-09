import React from 'react';
import { Badge } from '../common/Badge';
import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

export function ExpiryBadge({ freshness }) {
  switch (freshness) {
    case 'Expired':
      return (
        <Badge variant="danger" className="gap-1">
          <AlertTriangle className="w-3 h-3" /> Expired
        </Badge>
      );
    case 'Expires today':
      return (
        <Badge variant="danger" className="gap-1">
          <AlertTriangle className="w-3 h-3 animate-pulse" /> Expires Today
        </Badge>
      );
    case 'Expires tomorrow':
      return (
        <Badge variant="warning" className="gap-1">
          <Clock className="w-3 h-3" /> Expires Tomorrow
        </Badge>
      );
    case 'Within 3 days':
      return (
        <Badge variant="warning" className="gap-1">
          <Clock className="w-3 h-3" /> Within 3 Days
        </Badge>
      );
    case 'Within 7 days':
      return (
        <Badge variant="accent" className="gap-1">
          <Clock className="w-3 h-3" /> Within 7 Days
        </Badge>
      );
    default:
      return (
        <Badge variant="default" className="gap-1">
          <CheckCircle2 className="w-3 h-3" /> Fresh
        </Badge>
      );
  }
}
