﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Octokit;

namespace Vajehdan
{
    public sealed class Database
    {
        public static Database Instance { get; } = new Database();

        public List<List<string>> words_motaradef { get; } = new List<List<string>>();
        public List<List<string>> words_teyfi { get; } = new List<List<string>>();
        public List<string> words_emlaei { get; } = new List<string>();

        private Database()
        {
            string dictMotaradef = Properties.Resources.Motaradef_Motazad;
            //string dictMotaradef = Properties.Resources.Sample;
            string dictTeyfi = Properties.Resources.Teyfi;
            string dictEmlaei = Properties.Resources.Emlaei;

            string[] lines1 = dictMotaradef.Split(new[] {Environment.NewLine},
                StringSplitOptions.RemoveEmptyEntries);

            string[] lines2 = dictTeyfi.Split(new[] {Environment.NewLine},
                StringSplitOptions.RemoveEmptyEntries);

            string[] lines3 = dictEmlaei.Split(new[] {Environment.NewLine},
                StringSplitOptions.RemoveEmptyEntries);

            foreach (string line in lines1)
            {
                words_motaradef.Add(line.Split('،').ToList());
            }

            foreach (string line in lines2)
            {
                words_teyfi.Add(line.Split('،').ToList());
            }
            
            words_emlaei.AddRange(lines3);
            
        }

    }
}
