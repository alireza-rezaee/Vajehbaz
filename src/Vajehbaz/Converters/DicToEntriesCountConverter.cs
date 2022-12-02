using System;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.Windows.Data;
using Vajehbaz.Models;

namespace Vajehbaz.Converters
{
    class DicToEntriesCountConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            int sum = 0;
            var dics = ((ObservableCollection<Dic>)value)?.ToList();
            dics?.ForEach(d => sum += d.Entries.Count);
            return sum.ToString("N0");
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
