import {
  AsyncPipe,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Context } from '@dspace/core/shared/context.model';
import { ViewMode } from '@dspace/core/shared/view-mode.model';
import { TranslateModule } from '@ngx-translate/core';

import { UsageStatisticsBadgesComponent } from '../../../statistics-badges/usage-statistics-badges.component';
import { AttachmentSectionComponent } from '../../../../../../../app/shared/bitstream-attachment/section/attachment-section.component';
import { DsoEditMenuComponent } from '../../../../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from '../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '../../../../../../../app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from '../../../../../../../app/thumbnail/themed-thumbnail.component';
import { CollectionsComponent } from '../../../../../../../app/item-page/field-components/collections/collections.component';
import { ThemedMediaViewerComponent } from '../../../../../../../app/item-page/media-viewer/themed-media-viewer.component';
import { MiradorViewerComponent } from '../../../../../../../app/item-page/mirador-viewer/mirador-viewer.component';
import { ThemedFileSectionComponent } from '../../../../../../../app/item-page/simple/field-components/file-section/themed-file-section.component';
import { ItemPageAbstractFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component';
import { ItemPageDateFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/date/item-page-date-field.component';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { GeospatialItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/geospatial/geospatial-item-page-field.component';
import { ItemPageLicenseFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/license/item-page-license-field.component';
import { ThemedItemPageTitleFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { ItemPageUriFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';
import { ThemedMetadataRepresentationListComponent } from '../../../../../../../app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { RelatedItemsComponent } from '../../../../../../../app/item-page/simple/related-items/related-items-component';
import { PublicationComponent as BaseComponent } from '../../../../../../../app/item-page/simple/item-types/publication/publication.component';

/**
 * BUID themed component that represents a publication Item page,
 * extended with the usage statistics badges (Total Visits & Total Downloads)
 */
@listableObjectComponent('Publication', ViewMode.StandalonePage, Context.Any, 'buid')
@Component({
  selector: 'ds-publication',
  styleUrls: ['../../../../../../../app/item-page/simple/item-types/publication/publication.component.scss'],
  templateUrl: './publication.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    AttachmentSectionComponent,
    CollectionsComponent,
    DsoEditMenuComponent,
    GenericItemPageFieldComponent,
    GeospatialItemPageFieldComponent,
    ItemPageAbstractFieldComponent,
    ItemPageDateFieldComponent,
    ItemPageLicenseFieldComponent,
    ItemPageUriFieldComponent,
    MetadataFieldWrapperComponent,
    MiradorViewerComponent,
    RelatedItemsComponent,
    RouterLink,
    ThemedFileSectionComponent,
    ThemedItemPageTitleFieldComponent,
    ThemedMediaViewerComponent,
    ThemedMetadataRepresentationListComponent,
    ThemedResultsBackButtonComponent,
    ThemedThumbnailComponent,
    TranslateModule,
    UsageStatisticsBadgesComponent,
  ],
})
export class PublicationComponent extends BaseComponent {

}
