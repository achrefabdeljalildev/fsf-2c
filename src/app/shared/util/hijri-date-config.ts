import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
import { Arabic } from 'flatpickr/dist/l10n/ar';
import { DateTime } from 'luxon';

const HijriDateConfig: FlatpickrDefaultsInterface = {
    monthSelectorType: 'dropdown',
    locale: Arabic,
    plugins: [
        window.hijriCalendarPlugin(DateTime, {
            showHijriDates: true,
            showHijriToggle: false,
        }),
    ],
};
export default HijriDateConfig;
