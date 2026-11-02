import { PublicationComponent } from './app/item-page/simple/item-types/publication/publication.component';
import { UntypedItemComponent } from './app/item-page/simple/item-types/untyped-item/untyped-item.component';

/**
 * Add components that use the @listableObjectComponent decorator here.
 * This will ensure that the decorators get picked up when the app loads
 */
export const LISTABLE_COMPONENTS = [
  PublicationComponent,
  UntypedItemComponent,
];
