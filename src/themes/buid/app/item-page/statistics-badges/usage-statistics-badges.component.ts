import {
  AsyncPipe,
  DecimalPipe,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { UsageReport } from '@dspace/core/statistics/models/usage-report.model';
import { UsageReportDataService } from '@dspace/core/statistics/usage-report-data.service';
import { Item } from '@dspace/core/shared/item.model';
import { hasValue } from '@dspace/shared/utils/empty.util';
import { TranslateModule } from '@ngx-translate/core';
import {
  Observable,
  of,
} from 'rxjs';
import {
  catchError,
  map,
} from 'rxjs/operators';

/**
 * A single statistics badge displayed on the item page
 */
export interface UsageStatisticsBadge {
  iconClass: string;
  labelKey: string;
  views: number;
}

/**
 * A data point of a usage report, as returned by the REST API.
 * The values map may contain "views" and/or "downloads" counts depending on the report.
 */
interface UsageReportPoint {
  values?: unknown;
}

/**
 * Report types for which badges are rendered
 */
const TOTAL_VISITS_REPORT = 'TotalVisits';
const TOTAL_DOWNLOADS_REPORT = 'TotalDownloads';

/**
 * Number of usagereports to fetch. Large enough to contain all the default reports
 * (TotalVisits, TotalDownloads, TotalVisitsPerMonth, TopCountries, TopCities)
 */
const REPORTS_PAGE_SIZE = 10;

/**
 * Displays the usage statistics of an item as a row of badges:
 * Total Visits and Total Downloads.
 *
 * The data is fetched with a single REST request to
 * /server/api/statistics/usagereports/search/object?uri={item.selflink}
 * through the existing UsageReportDataService.
 */
@Component({
  selector: 'ds-usage-statistics-badges',
  templateUrl: './usage-statistics-badges.component.html',
  styleUrls: ['./usage-statistics-badges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    DecimalPipe,
    TranslateModule,
  ],
})
export class UsageStatisticsBadgesComponent implements OnChanges {

  /**
   * The item for which the statistics should be displayed
   */
  @Input() item: Item;

  /**
   * The badges to display
   */
  badges$: Observable<UsageStatisticsBadge[]> = of([]);

  constructor(protected usageReportService: UsageReportDataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item && hasValue(this.item)) {
      this.setupBadges();
    }
  }

  /**
   * Fetch all usagereports of the item with a single request and map them to badges
   */
  protected setupBadges(): void {
    this.badges$ = this.usageReportService.searchStatistics(this.item.self, 0, REPORTS_PAGE_SIZE).pipe(
      // The badge simply stays hidden if the statistics cannot be retrieved
      catchError(() => of([])),
      map((reports: UsageReport[]) => this.getBadges(reports)),
    );
  }

  /**
   * Map the TotalVisits and TotalDownloads reports of the item to badges.
   * A badge is only rendered if its report exists.
   */
  protected getBadges(reports: UsageReport[]): UsageStatisticsBadge[] {
    const badges: UsageStatisticsBadge[] = [];

    const totalVisits = this.getReportTotal(reports, TOTAL_VISITS_REPORT);
    if (hasValue(totalVisits)) {
      badges.push({
        iconClass: 'fas fa-eye',
        labelKey: 'statistics.table.title.TotalVisits',
        views: totalVisits,
      });
    }

    const totalDownloads = this.getReportTotal(reports, TOTAL_DOWNLOADS_REPORT);
    if (hasValue(totalDownloads)) {
      badges.push({
        iconClass: 'fas fa-download',
        labelKey: 'statistics.table.title.TotalDownloads',
        views: totalDownloads,
      });
    }

    return badges;
  }

  /**
   * Return the total of the given report's points, or undefined when the report isn't available
   */
  protected getReportTotal(reports: UsageReport[], reportType: string): number {
    const report = reports.find((candidate: UsageReport) => candidate.reportType === reportType);
    if (!hasValue(report)) {
      return undefined;
    }

    let total = 0;
    for (const point of report.points ?? []) {
      total += getPointValue(point);
    }

    return total;
  }

}

/**
 * Sum the numeric entries of a point's values map, no matter whether the REST API
 * reports them as "views" (TotalVisits) or "downloads" (TotalDownloads)
 */
function getPointValue(point: UsageReportPoint): number {
  const values = (point.values ?? {}) as Record<string, unknown>;
  let total = 0;

  for (const value of Object.values(values)) {
    if (typeof value === 'number') {
      total += value;
    }
  }

  return total;
}
