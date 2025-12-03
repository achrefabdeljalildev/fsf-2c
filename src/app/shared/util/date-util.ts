import { DateModel } from '../../modules/shared/models/date-model';

export class DateUtil {
    public static getFormattedDate(dateString: string): DateModel| undefined {
        if (!dateString) {
            return undefined;
        }
        let dateModel: DateModel = new DateModel()
        const date = new Date(dateString);
        dateModel.day = date.getDate();
        dateModel.month = date.getMonth() + 1;
        dateModel.year = date.getFullYear();
        return dateModel;
    }

    public static getDateString(dateModel: DateModel | undefined): string {
        if (dateModel && dateModel.year && dateModel.month && dateModel.day) {
            const year = dateModel.year;
            const month = String(dateModel.month).padStart(2, '0'); // pad with 0 if needed
            const day = String(dateModel.day).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return '';
    }
}
