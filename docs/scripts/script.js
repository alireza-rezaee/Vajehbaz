//This code inspired by https://github.com/rastikerdar/vazir-font/blob/gh-pages/index.html
var donators = [];

async function setX86DownloadLink() {
  const downloadLink = (await $.getJSON('https://api.github.com/repos/kokabi1365/vajehdan/releases'))[0].assets[3].browser_download_url;
  $('.section-download__x86').attr('href', downloadLink);
}

async function setX64DownloadLink() {
  const downloadLink = (await $.getJSON('https://api.github.com/repos/kokabi1365/vajehdan/releases'))[0].assets[2].browser_download_url;
  $('.section-download__x64').attr('href', downloadLink);
}

async function setX86PortableDownloadLink() {
  const downloadLink = (await $.getJSON('https://api.github.com/repos/kokabi1365/vajehdan/releases'))[0].assets[1].browser_download_url;
  $('.section-download__x86portable').attr('href', downloadLink);
}

async function setX64PortableDownloadLink() {
  const downloadLink = (await $.getJSON('https://api.github.com/repos/kokabi1365/vajehdan/releases'))[0].assets[0].browser_download_url;
  $('.section-download__x64portable').attr('href', downloadLink);
}


async function setDownloadLink() {
  var downloadLink = '';

  if (navigator.userAgent.includes('WOW64') || navigator.userAgent.includes('Win64')) {
    downloadLink = (await $.getJSON('https://api.github.com/repos/kokabi1365/vajehdan/releases'))[0].assets[0].browser_download_url;
  } else {
    downloadLink = (await $.getJSON('https://api.github.com/repos/kokabi1365/vajehdan/releases'))[0].assets[1].browser_download_url;
  }
  $('.section-download__main').attr('href', downloadLink);
}

async function loadDonators() {
  donators = await $.getJSON('scripts/donators.json');
  await setProjectLifeTimeAsync();
  await setTotalDonatorsCount();
  await setTotalDonationAmount();
  await createDonatorNodes('amount');
}

async function setProjectLifeTimeAsync() {
  const repo = await $.getJSON('https://api.github.com/repos/kokabi1365/vajehdan');
  $('.section-donation__project-life-span').html(toPersianNumber(yearsSince(repo.created_at)));
}

function setTotalDonatorsCount() {
  $('.section-donation__counter').html(toPersianNumber(donators.length));
}

function setTotalDonationAmount() {
  $('.section-donation__amount').html(toPersianNumber(formatNumber(donators.map((donator) => donator.amount).reduce((sum, amount) => sum + amount))));
}

async function createDonatorNodes(sortKey) {
  sortBy(sortKey);
  $('.section-donation__donators').empty();
  for (const donator of donators) {
    donator.photo = donator.photo ? donator.photo : `https://eu.ui-avatars.com/api/?format=svg&background=random&name=${donator.name}`;

    var li = '';

    li = `<li class="donator">`;

    if (donator.website) li += `<a href="${donator.website}" rel="nofollow" target="_blank" title="${donator.date}">`;

    li += `<img class="donator__photo" src="${donator.photo}" alt="${donator.name}" title=${donator.date} loading="lazy">
      <p class="donator__name" ${donator.website ? 'style=color:blue;' : ''}>${donator.name}</p>`;

    li += `<span class="donator__amount">${toPersianNumber(formatNumber(donator.amount))} تومان</span>`;

    if (donator.website) li += '</a>';

    li += '</li>\n';

    $(li).appendTo('.section-donation__donators').hide().fadeIn();
  }
}

function yearsSince(date) {
  var seconds = Math.round((new Date() - new Date(date)) / 1000);
  var interval = seconds / 31536000;
  return Math.round(interval);
}

function toPersianNumber(n) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
}

function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
}

function sortBy(key) {
  if (key == 'date') donators.sort((a, b) => b.date.localeCompare(a.date));
  else if (key == 'amount') donators.sort((a, b) => b.amount - a.amount);
  else if (key == 'alphabet') donators.sort((a, b) => a.name.localeCompare(b.name));

  if (key == 'date') {
    $('.section-donation__date_link').css({ color: 'blue', 'font-weight': 'bold' });
    $('.section-donation__amount_link').removeAttr('style');
    $('.section-donation__alphabet_link').removeAttr('style');
  } else if (key == 'amount') {
    $('.section-donation__amount_link').css({ color: 'blue', 'font-weight': 'bold' });
    $('.section-donation__date_link').removeAttr('style');
    $('.section-donation__alphabet_link').removeAttr('style');
  } else {
    $('.section-donation__alphabet_link').css({ color: 'blue', 'font-weight': 'bold' });
    $('.section-donation__date_link').removeAttr('style');
    $('.section-donation__amount_link').removeAttr('style');
  }
}

$(async function () {
  await setDownloadLink();
  await setX86DownloadLink();
  await setX64DownloadLink();
  await setX86PortableDownloadLink();
  await setX64PortableDownloadLink();
  await loadDonators();
});
