export interface InvolvedPartiesCriteria {
    id?: number;
    nameAr: string;
    nameEn?: string;
    children?: InvolvedPartiesCriteria[];
    parentId?: number;
    isActive?: boolean;
}
