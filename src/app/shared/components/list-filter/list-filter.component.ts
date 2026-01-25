import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterCriteriaModel } from '@shared/models/base/criteria.model';
import { InputType } from '../base-input-component/base-input.component';

export interface ListFilterConfig {
    propertyName: string;
    filterType: InputType;
    values?: any[];
    isSingle: boolean;
    label?: string;
    placeholder?: string;
    optionLabel?: string;
    optionValue?: string;
    options?: any[];
}

@Component({
    selector: 'app-list-filter',
    templateUrl: './list-filter.component.html',
    standalone: false,
})
export class ListFilterComponent implements OnInit {
    @Input() configs: ListFilterConfig[] = [];
    @Output() filtersChange = new EventEmitter<FilterCriteriaModel[]>();

    filterValues: Map<string, any> = new Map();

    ngOnInit(): void {
        this.configs.forEach((cfg) => {
            if (cfg.isSingle) {
                this.filterValues.set(cfg.propertyName, cfg.values?.[0] ?? null);
            } else {
                this.filterValues.set(cfg.propertyName, cfg.values ?? []);
            }
        });
    }

    onFilterChange(propertyName: string, value: any): void {
        this.filterValues.set(propertyName, value);
    }

    applyFilters(): void {
        const allFilters: FilterCriteriaModel[] = Array.from(this.filterValues.entries())
            .filter(
                ([_, val]) => val !== null && val !== '' && (!Array.isArray(val) || val.length > 0),
            )
            .map(([prop, val]) => ({
                propertyName: prop,
                values: Array.isArray(val) ? val : [val.toString()],
                type: 'Equals',
                operator: 'And',
            }));

        this.filtersChange.emit(allFilters);
    }

    clearFilter(propertyName: string): void {
        const config = this.configs.find((c) => c.propertyName === propertyName);
        if (config) {
            const clearedValue = config.isSingle ? null : [];
            this.onFilterChange(propertyName, clearedValue);
        }

        this.filtersChange.emit([]);
    }

    clearAllFilters(): void {
        this.configs.forEach((cfg) => {
            this.clearFilter(cfg.propertyName);
        });
    }
}
