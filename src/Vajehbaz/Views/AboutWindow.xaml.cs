﻿using System.Reflection;
using System.Windows;
using System.Windows.Navigation;

namespace Vajehbaz.Views
{
    public partial class AboutWindow
    {
        public AboutWindow()
        {
            InitializeComponent();
            VersionTextBlock.Text = "نسخهٔ" + " " + Assembly.GetEntryAssembly()?.GetName().Version.ToSemVersion();
        }

        private void UpdateButton_OnClick(object sender, RoutedEventArgs e)
        {
            Helper.OpenAppOrWebsite(Helper.GetSettings().DirectDownloadLink);
        }

        private void Hyperlink_RequestNavigate(object sender, RequestNavigateEventArgs e)
        {
            Helper.OpenAppOrWebsite(e.Uri.ToString());
        }
    }
}
