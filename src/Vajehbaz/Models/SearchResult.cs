using System.Windows.Documents;

namespace Vajehbaz.Models
{
    public class SearchResult
    {
        public string DicName { get; set; }
        public string DicDescription { get; set; }
        public FlowDocument ResultDoc { get; set; }
    }
}